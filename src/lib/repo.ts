import "server-only";
import { cache } from "react";
import type { Dose, Medication, MedicationSlug, PricePoint, Provider, SideEffect, UkStatus } from "@/types";
import { medications as staticMedications, sideEffects as staticSideEffects, medicationComparisons } from "@/data/medications";
import { providers as staticProviders, providerComparisons } from "@/data/providers";
import { prices as staticPrices } from "@/data/prices";
import { authors as staticAuthors, type Author } from "@/data/authors";
import type { Prisma } from "@prisma/client";
import { getPrisma } from "@/lib/prisma";

/**
 * Data access layer. Uses Prisma when DATABASE_URL is set, otherwise the
 * static data in src/data so the site always builds without a database.
 * If a database query fails, we log and fall back to static data rather than
 * failing the build; the admin surfaces DB errors directly.
 */

const fromEnum = (v: string) => v.replace(/_/g, "-");
const toNumber = (v: unknown): number | null => {
  if (v === null || v === undefined) return null;
  const n = typeof v === "number" ? v : Number(String(v));
  return Number.isFinite(n) ? n : null;
};
const toIsoDate = (d: Date | null | undefined): string | null => (d ? d.toISOString().slice(0, 10) : null);

async function withFallback<T>(label: string, dbFn: () => Promise<T>, fallback: () => T): Promise<T> {
  const prisma = getPrisma();
  if (!prisma) return fallback();
  try {
    return await dbFn();
  } catch (err) {
    console.error(`[repo] ${label} failed, using static data:`, err);
    return fallback();
  }
}

// ---------------------------------------------------------------- Medications

export const getMedications = cache(async (): Promise<Medication[]> =>
  withFallback(
    "getMedications",
    async () => {
      const prisma = getPrisma()!;
      const rows = await prisma.medication.findMany({
        include: { doses: { orderBy: [{ sortOrder: "asc" }, { mg: "asc" }] }, sideEffects: { include: { sideEffect: true } } },
      });
      if (rows.length === 0) return staticMedications;
      const order = staticMedications.map((m) => m.slug as string);
      return rows
        .map(
          (r): Medication => ({
            slug: r.slug as MedicationSlug,
            name: r.name,
            genericName: r.genericName,
            drugClass: r.drugClass,
            manufacturer: r.manufacturer,
            route: r.route,
            frequency: r.frequency,
            device: r.device ?? undefined,
            doses: r.doses.map((d): Dose => ({ mg: d.mg, slug: d.slug, role: d.role })),
            dosesVerified: r.dosesVerified,
            ukStatus: fromEnum(r.ukStatus) as UkStatus,
            mhraApproval: r.mhraApproval,
            niceGuidance: r.niceGuidance,
            summary: r.summary,
            commonSideEffects: r.sideEffects.filter((s) => s.common).map((s) => s.sideEffect.slug),
            hub: r.hub === "oral" ? "oral" : "injections",
            titrationStepWeeks: r.titrationStepWeeks,
          }),
        )
        .sort((a, b) => order.indexOf(a.slug) - order.indexOf(b.slug));
    },
    () => staticMedications,
  ),
);

export async function getMedication(slug: string): Promise<Medication | undefined> {
  return (await getMedications()).find((m) => m.slug === slug);
}

export const getSideEffects = cache(async (): Promise<SideEffect[]> =>
  withFallback(
    "getSideEffects",
    async () => {
      const rows = await getPrisma()!.sideEffect.findMany();
      if (rows.length === 0) return staticSideEffects;
      return rows.map((r) => ({
        slug: r.slug,
        name: r.name,
        injectableOnly: r.injectableOnly || undefined,
        seriousness: fromEnum(r.seriousness) as SideEffect["seriousness"],
      }));
    },
    () => staticSideEffects,
  ),
);

export async function getSideEffect(slug: string): Promise<SideEffect | undefined> {
  return (await getSideEffects()).find((s) => s.slug === slug);
}

/**
 * Side effects that get their own /{med}-side-effects/{effect} page:
 * the medication's common side effects plus the serious class warnings.
 * Injection-only effects are excluded for tablets.
 */
export async function getSideEffectsForMedication(med: Medication): Promise<SideEffect[]> {
  const all = await getSideEffects();
  return all.filter(
    (s) =>
      (med.commonSideEffects.includes(s.slug) || s.seriousness === "serious") &&
      !(s.injectableOnly && med.route !== "injection"),
  );
}

export function getMedicationComparisons(): [string, string][] {
  return medicationComparisons;
}

// ---------------------------------------------------------------- Providers

const providerInclude = {
  medications: { include: { medication: { select: { slug: true } } } },
} satisfies Prisma.ProviderInclude;

type ProviderRow = Prisma.ProviderGetPayload<{ include: typeof providerInclude }>;

function mapProvider(r: ProviderRow): Provider {
  return {
    slug: r.slug,
    name: r.name,
    type: fromEnum(r.type) as Provider["type"],
    website: r.website,
    gphcNumber: r.gphcNumber,
    cqcRegistered: r.cqcRegistered,
    trustpilot:
      r.trustpilotScore !== null && r.trustpilotReviews !== null && r.trustpilotChecked
        ? { score: r.trustpilotScore, reviews: r.trustpilotReviews, checkedAt: toIsoDate(r.trustpilotChecked)! }
        : null,
    medications: r.medications.filter((m) => m.available).map((m) => m.medication.slug as MedicationSlug),
    delivery: r.delivery,
    support: r.support.length ? r.support : null,
    maintenancePolicy: r.maintenancePolicy,
    consultationFee: toNumber(r.consultationFee),
    pros: r.pros,
    cons: r.cons,
    verified: r.verified,
    lastVerifiedAt: toIsoDate(r.lastVerifiedAt),
  };
}

export const getProviders = cache(async (): Promise<Provider[]> =>
  withFallback(
    "getProviders",
    async () => {
      const rows = await getPrisma()!.provider.findMany({
        include: providerInclude,
        orderBy: { name: "asc" },
      });
      if (rows.length === 0) return sortProviders(staticProviders);
      return sortProviders(rows.map((r) => mapProvider(r)));
    },
    () => sortProviders(staticProviders),
  ),
);

/** Alphabetical. Rankings are never influenced by commercial terms. */
function sortProviders(list: Provider[]): Provider[] {
  return [...list].sort((a, b) => a.name.localeCompare(b.name, "en-GB"));
}

export async function getProvider(slug: string): Promise<Provider | undefined> {
  return (await getProviders()).find((p) => p.slug === slug);
}

export async function getProvidersForMedication(slug: string): Promise<Provider[]> {
  return (await getProviders()).filter((p) => p.medications.includes(slug as MedicationSlug));
}

/** Curated provider pairs, normalised to alphabetical order and de-duplicated. */
export function getProviderComparisonPairs(): [string, string][] {
  const seen = new Set<string>();
  const out: [string, string][] = [];
  for (const [x, y] of providerComparisons) {
    const [a, b] = [x, y].sort() as [string, string];
    const key = `${a}-vs-${b}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push([a, b]);
  }
  return out;
}

// ---------------------------------------------------------------- Prices

export interface PriceFilter {
  medication?: string;
  providerSlug?: string;
  doseSlug?: string;
}

/** Latest price point per provider/medication/dose. */
export const getPrices = cache(async (filter: PriceFilter = {}): Promise<PricePoint[]> => {
  const list = await withFallback(
    "getPrices",
    async () => {
      const rows = await getPrisma()!.pricePoint.findMany({
        include: { provider: { select: { slug: true } }, medication: { select: { slug: true } } },
        orderBy: { checkedAt: "desc" },
      });
      const latest = new Map<string, PricePoint>();
      for (const r of rows) {
        const key = `${r.provider.slug}|${r.medication.slug}|${r.doseSlug}`;
        if (latest.has(key)) continue;
        latest.set(key, {
          providerSlug: r.provider.slug,
          medication: r.medication.slug as MedicationSlug,
          doseSlug: r.doseSlug,
          retailPrice: toNumber(r.retailPrice),
          discountPrice: toNumber(r.discountPrice),
          deliveryCharge: toNumber(r.deliveryCharge),
          consultationFee: toNumber(r.consultationFee),
          checkedAt: toIsoDate(r.checkedAt),
          sourceUrl: r.sourceUrl,
        });
      }
      return [...latest.values()];
    },
    () => staticPrices,
  );
  return list.filter(
    (p) =>
      (!filter.medication || p.medication === filter.medication) &&
      (!filter.providerSlug || p.providerSlug === filter.providerSlug) &&
      (!filter.doseSlug || p.doseSlug === filter.doseSlug),
  );
});

// ---------------------------------------------------------------- Offers

export interface ActiveOffer {
  id: string;
  providerSlug: string;
  title: string;
  description: string | null;
  code: string | null;
  terms: string | null;
  sourceUrl: string;
  validUntil: string | null;
  verifiedAt: string | null;
}

/** Only active, verified offers. Static fallback has none. */
export const getOffers = cache(async (providerSlug?: string): Promise<ActiveOffer[]> =>
  withFallback(
    "getOffers",
    async () => {
      const now = new Date();
      const rows = await getPrisma()!.offer.findMany({
        where: {
          active: true,
          verifiedAt: { not: null },
          OR: [{ validUntil: null }, { validUntil: { gte: now } }],
          ...(providerSlug ? { provider: { slug: providerSlug } } : {}),
        },
        include: { provider: { select: { slug: true } } },
        orderBy: { verifiedAt: "desc" },
      });
      return rows.map((r) => ({
        id: r.id,
        providerSlug: r.provider.slug,
        title: r.title,
        description: r.description,
        code: r.code,
        terms: r.terms,
        sourceUrl: r.sourceUrl,
        validUntil: toIsoDate(r.validUntil),
        verifiedAt: toIsoDate(r.verifiedAt),
      }));
    },
    () => [],
  ),
);

// ---------------------------------------------------------------- Affiliate

export async function getActiveAffiliateLink(providerSlug: string): Promise<{ id: string; trackingUrl: string } | null> {
  const prisma = getPrisma();
  if (!prisma) return null;
  try {
    const link = await prisma.affiliateLink.findFirst({
      where: { active: true, provider: { slug: providerSlug } },
      orderBy: { updatedAt: "desc" },
      select: { id: true, trackingUrl: true },
    });
    return link;
  } catch (err) {
    console.error("[repo] getActiveAffiliateLink failed:", err);
    return null;
  }
}

/** Anonymous click log: link id, page path and timestamp only. */
export async function recordClick(linkId: string, page: string | null): Promise<void> {
  const prisma = getPrisma();
  if (!prisma) return;
  try {
    await prisma.clickEvent.create({ data: { linkId, page } });
  } catch (err) {
    console.error("[repo] recordClick failed:", err);
  }
}

// ---------------------------------------------------------------- Authors

export async function getAuthors(): Promise<Author[]> {
  return staticAuthors;
}

export async function getAuthor(slug: string): Promise<Author | undefined> {
  return staticAuthors.find((a) => a.slug === slug);
}

export type { Author };
