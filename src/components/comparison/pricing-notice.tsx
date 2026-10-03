import Link from "next/link";
import { Info } from "lucide-react";

/** Explains why drug prices are not shown while flags.pomPricing is off. */
export function PricingNotice() {
  return (
    <aside role="note" className="my-6 flex gap-3 rounded-xl border bg-info p-5 text-info-foreground">
      <Info aria-hidden className="mt-0.5 size-5 shrink-0" />
      <div className="text-sm leading-relaxed">
        <p className="font-semibold">Why we compare services, not medicine prices</p>
        <p className="mt-1">
          Weight loss medicines such as Mounjaro and Wegovy are prescription-only. UK law (the Human Medicines
          Regulations 2012) and the CAP Code restrict promoting prescription-only medicines to the public, and price
          tables for named medicines can amount to promotion. So we compare the things that matter for safe treatment:
          how each provider is regulated, how consultations work, clinical support, delivery and maintenance policies.
        </p>
        <p className="mt-2">
          When choosing a provider, ask for the total cost including consultation, delivery and dose changes. See{" "}
          <Link href="/methodology" className="font-semibold underline">how we compare providers</Link>.
        </p>
      </div>
    </aside>
  );
}
