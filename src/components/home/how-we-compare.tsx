import Link from "next/link";
import { effectiveWeights } from "@/config/methodology";
import { flags } from "@/config/flags";

/** Compliant alternative to price modules: our methodology at a glance. */
export function HowWeCompare() {
  const weights = effectiveWeights(flags.pomPricing).filter((c) => c.effectiveWeight > 0);
  return (
    <div className="rounded-xl border bg-card p-6">
      <h3 className="text-xl font-semibold">How we compare providers</h3>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        Every provider is assessed against the same published criteria. Commission and other commercial relationships
        are never inputs.
      </p>
      <ul className="mt-5 space-y-3">
        {weights.map((c) => (
          <li key={c.key}>
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{c.label}</span>
              <span className="text-muted-foreground">{c.effectiveWeight}%</span>
            </div>
            <div className="mt-1 h-2 rounded-full bg-muted" aria-hidden>
              <div className="h-2 rounded-full bg-primary" style={{ width: `${c.effectiveWeight}%` }} />
            </div>
          </li>
        ))}
      </ul>
      <Link href="/methodology" className="mt-5 inline-block text-sm font-semibold text-primary underline">
        Read the full methodology
      </Link>
    </div>
  );
}
