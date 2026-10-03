import "server-only";
import type { Medication, Provider } from "@/types";
import type { PriceRow, ServiceRow } from "@/components/comparison/price-comparison";
import { getMedications, getPrices, getProviders } from "@/lib/repo";
import { getProviderCta } from "@/lib/affiliate";
import { PROVIDER_TYPE_LABELS } from "@/lib/labels";
import { flags } from "@/config/flags";
import { formatMg } from "@/lib/utils";

/** Builds the serializable rows for the comparison engine on the server. */

function regulatorStatus(p: Provider): string | null {
  const parts: string[] = [];
  if (p.gphcNumber) parts.push(`GPhC ${p.gphcNumber}`);
  if (p.cqcRegistered === true) parts.push("CQC registered");
  return parts.length ? parts.join(" · ") : null;
}

export function medicationOptions(meds: Medication[]) {
  return meds.map((m) => ({
    slug: m.slug as string,
    name: m.name,
    doses: m.dosesVerified ? m.doses.map((d) => ({ slug: d.slug, label: formatMg(d.mg) })) : [],
  }));
}

export async function buildServiceRows(fromPath: string, medication?: string): Promise<ServiceRow[]> {
  const [providers, meds] = await Promise.all([getProviders(), getMedications()]);
  return providers
    .filter((p) => !medication || p.medications.includes(medication as Provider["medications"][number]))
    .map((p) => ({
      id: p.slug,
      providerSlug: p.slug,
      providerName: p.name,
      providerType: p.type,
      medications: p.medications,
      medicationNames: p.medications.map((m) => meds.find((x) => x.slug === m)?.name ?? m),
      consultationModel: PROVIDER_TYPE_LABELS[p.type],
      delivery: p.delivery,
      support: p.support?.join(", ") ?? null,
      regulator: regulatorStatus(p),
      maintenancePolicy: p.maintenancePolicy,
      trustpilot: p.trustpilot?.score ?? null,
      verified: p.verified,
      cta: getProviderCta(p, fromPath),
    }));
}

/** GATED: returns [] unless flags.pomPricing is on, so price data never reaches the client otherwise. */
export async function buildPriceRows(fromPath: string, medication?: string): Promise<PriceRow[]> {
  if (!flags.pomPricing) return [];
  const [providers, meds, prices] = await Promise.all([getProviders(), getMedications(), getPrices({ medication })]);
  const rows: PriceRow[] = [];
  for (const pp of prices) {
    const p = providers.find((x) => x.slug === pp.providerSlug);
    const m = meds.find((x) => x.slug === pp.medication);
    if (!p || !m) continue;
    const dose = m.doses.find((d) => d.slug === pp.doseSlug);
    const base = pp.discountPrice ?? pp.retailPrice;
    const consultation = pp.consultationFee ?? p.consultationFee;
    const total = base === null ? null : base + (pp.deliveryCharge ?? 0) + (consultation ?? 0);
    rows.push({
      id: `${p.slug}-${m.slug}-${pp.doseSlug}`,
      providerSlug: p.slug,
      providerName: p.name,
      providerType: p.type,
      medication: m.slug,
      medicationName: m.name,
      doseSlug: pp.doseSlug,
      doseMg: dose?.mg ?? null,
      retailPrice: pp.retailPrice,
      discountPrice: pp.discountPrice,
      deliveryCharge: pp.deliveryCharge,
      consultationFee: consultation,
      // Total is only shown when delivery and consultation are known, to avoid understating cost.
      total: pp.deliveryCharge === null || consultation === null ? null : total,
      trustpilot: p.trustpilot?.score ?? null,
      support: p.support?.join(", ") ?? null,
      checkedAt: pp.checkedAt,
      cta: getProviderCta(p, fromPath),
    });
  }
  return rows;
}
