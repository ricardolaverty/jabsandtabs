import Link from "next/link";
import { Calculator, ClipboardList } from "lucide-react";

export function ToolTeaser() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Link href="/tools/bmi-calculator" className="group flex gap-4 rounded-xl border bg-card p-6 hover:border-primary">
        <Calculator aria-hidden className="size-8 shrink-0 text-primary" />
        <span>
          <span className="block text-lg font-semibold group-hover:underline">BMI calculator</span>
          <span className="mt-1 block text-sm text-muted-foreground">
            Metric or imperial, with NICE thresholds explained, including lower thresholds for some ethnic groups.
          </span>
        </span>
      </Link>
      <Link href="/tools/eligibility-checker" className="group flex gap-4 rounded-xl border bg-card p-6 hover:border-primary">
        <ClipboardList aria-hidden className="size-8 shrink-0 text-primary" />
        <span>
          <span className="block text-lg font-semibold group-hover:underline">Eligibility checker</span>
          <span className="mt-1 block text-sm text-muted-foreground">
            Understand the questions prescribers ask, and any red flags to raise. Informational only, never a prescribing decision.
          </span>
        </span>
      </Link>
    </div>
  );
}
