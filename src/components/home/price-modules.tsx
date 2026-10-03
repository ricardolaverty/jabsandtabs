import Link from "next/link";
import { getMedications, getOffers, getPrices, getProviders } from "@/lib/repo";
import { flags } from "@/config/flags";
import { formatDate, formatMg, formatPrice } from "@/lib/utils";

/**
 * GATED modules. Each returns null unless its flag is on, so nothing
 * price- or discount-related renders by default.
 */

const GROUPS: { label: string; meds: string[]; href: string }[] = [
  { label: "Mounjaro", meds: ["mounjaro"], href: "/prices/mounjaro" },
  { label: "Wegovy", meds: ["wegovy"], href: "/prices/wegovy" },
  { label: "Oral GLP-1", meds: ["oral-semaglutide", "foundayo"], href: "/prices" },
];

export async function CheapestToday() {
  if (!flags.pomPricing) return null;
  const [prices, providers, meds] = await Promise.all([getPrices(), getProviders(), getMedications()]);
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {GROUPS.map((g) => {
        const candidates = prices
          .filter((p) => g.meds.includes(p.medication))
          .map((p) => {
            const m = meds.find((x) => x.slug === p.medication);
            const isStart = m?.doses.find((d) => d.slug === p.doseSlug)?.role === "starting";
            return { p, price: p.discountPrice ?? p.retailPrice, isStart, m };
          })
          .filter((c) => c.price !== null && c.isStart)
          .sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
        const best = candidates[0];
        const provider = best ? providers.find((x) => x.slug === best.p.providerSlug) : undefined;
        const dose = best?.m?.doses.find((d) => d.slug === best.p.doseSlug);
        return (
          <div key={g.label} className="rounded-xl border bg-card p-5">
            <p className="text-sm text-muted-foreground">Lowest recorded starting-dose price</p>
            <h3 className="mt-1 text-lg font-semibold">{g.label}</h3>
            {best && provider ? (
              <>
                <p className="mt-3 text-2xl font-semibold">{formatPrice(best.price)}</p>
                <p className="text-sm text-muted-foreground">
                  {provider.name}, {best.m?.name} {dose ? formatMg(dose.mg) : ""} · checked {formatDate(best.p.checkedAt)}
                </p>
              </>
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">No verified prices recorded yet.</p>
            )}
            <Link href={g.href} className="mt-4 inline-block text-sm font-semibold text-primary underline">
              Compare all
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export async function LatestDiscounts() {
  if (!flags.discountCodes) return null;
  const [offers, providers] = await Promise.all([getOffers(), getProviders()]);
  if (!offers.length) return <p className="text-sm text-muted-foreground">No verified offers at the moment.</p>;
  return (
    <ul className="grid gap-3 md:grid-cols-3">
      {offers.slice(0, 6).map((o) => {
        const p = providers.find((x) => x.slug === o.providerSlug);
        return (
          <li key={o.id} className="rounded-xl border bg-card p-4">
            <p className="font-semibold">{p?.name ?? o.providerSlug}</p>
            <p className="mt-1 text-sm">{o.title}</p>
            <p className="mt-2 text-xs text-muted-foreground">Verified {formatDate(o.verifiedAt)}</p>
            <Link href={`/providers/${o.providerSlug}/discount-codes`} className="mt-2 inline-block text-sm font-medium text-primary underline">
              Details
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
