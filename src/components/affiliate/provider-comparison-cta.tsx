import Link from "next/link";
import { ArrowRight, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getMedication } from "@/data/medications";
import { flags } from "@/config/flags";

/**
 * MDX-allowed CTA. Always points to our own comparison pages, never out to a
 * provider (CONTRACTS.md §3). With pomPricing on it may link to /prices/{med}.
 */
export function ProviderComparisonCTA({ medication }: { medication?: string }) {
  const med = medication ? getMedication(medication) : undefined;
  const name = med?.name;
  const priceHref = med ? `/prices/${med.slug}` : "/prices";
  return (
    <aside aria-label="Compare providers" className="my-8 rounded-xl border bg-card p-5 shadow-sm md:flex md:items-center md:justify-between md:gap-6">
      <div className="flex gap-3">
        <Scale aria-hidden className="mt-0.5 size-6 shrink-0 text-primary" />
        <div>
          <p className="font-semibold">
            {name ? `Comparing UK providers that prescribe ${name}?` : "Comparing UK weight loss providers?"}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            We compare regulated online providers on regulation, consultation model, clinical support, delivery and
            transparency. Rankings are never paid for.
          </p>
        </div>
      </div>
      <div className="mt-4 flex shrink-0 flex-wrap gap-2 md:mt-0">
        <Button asChild>
          <Link href="/providers">
            Compare providers <ArrowRight aria-hidden />
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href={priceHref}>{flags.pomPricing ? "Compare costs" : "Compare services"}</Link>
        </Button>
      </div>
    </aside>
  );
}
