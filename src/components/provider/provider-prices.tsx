import Link from "next/link";
import type { Medication, Provider } from "@/types";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getPrices } from "@/lib/repo";
import { articleHref, getArticle } from "@/lib/content";
import { flags } from "@/config/flags";
import { formatDate, formatMg, formatPrice } from "@/lib/utils";

/**
 * Provider price section. GATED by flags.pomPricing: with the flag off it
 * renders compliant copy only and never shows a drug price.
 */
export async function ProviderPrices({ provider, medications, medication }: { provider: Provider; medications: Medication[]; medication?: string }) {
  if (!flags.pomPricing) {
    const costGuide = getArticle("weight-loss-treatment-hidden-costs");
    return (
      <div className="max-w-3xl space-y-3 leading-relaxed">
        <p>
          We do not currently publish medicine prices. Weight loss medicines are prescription-only, and UK rules restrict
          promoting them to the public. Instead we explain{" "}
          {costGuide ? (
            <Link href={articleHref(costGuide)} className="font-medium text-primary underline">
              what affects the total cost
            </Link>
          ) : (
            "what affects the total cost"
          )}{" "}
          (consultation fees, delivery, dose changes and subscription terms) so you can ask the right questions.
        </p>
        <p>
          Compare {provider.name}&apos;s service with other providers on our{" "}
          <Link href="/prices" className="font-medium text-primary underline">service comparison</Link>.
        </p>
      </div>
    );
  }
  const prices = await getPrices({ providerSlug: provider.slug, medication });
  if (!prices.length) {
    return <p className="text-muted-foreground">Prices for {provider.name} have not yet been verified.</p>;
  }
  const doseLabel = (med: string, dose: string) => {
    const m = medications.find((x) => x.slug === med);
    const d = m?.doses.find((x) => x.slug === dose);
    return `${m?.name ?? med} ${d ? formatMg(d.mg) : dose}`;
  };
  return (
    <Table>
      <TableCaption>Prices as checked on the dates shown, for a 4-week supply. Always confirm the current price with the provider.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead scope="col">Medicine and dose</TableHead>
          <TableHead scope="col">Price</TableHead>
          <TableHead scope="col">Delivery</TableHead>
          <TableHead scope="col">Checked</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {prices.map((pp) => (
          <TableRow key={`${pp.medication}-${pp.doseSlug}`}>
            <TableCell className="font-medium">{doseLabel(pp.medication, pp.doseSlug)}</TableCell>
            <TableCell>{formatPrice(pp.discountPrice ?? pp.retailPrice)}</TableCell>
            <TableCell>{formatPrice(pp.deliveryCharge)}</TableCell>
            <TableCell>
              {pp.sourceUrl ? (
                <a href={pp.sourceUrl} target="_blank" rel="noopener noreferrer nofollow" className="underline">
                  {formatDate(pp.checkedAt)}
                </a>
              ) : (
                formatDate(pp.checkedAt)
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
