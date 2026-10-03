import type { Medication } from "@/types";
import { titrationTimeline } from "@/lib/medication-content";
import { cn, formatMg } from "@/lib/utils";

/** Visual step-up timeline. Highlights the current dose when `current` is set. */
export function TitrationTimeline({ medication, current }: { medication: Medication; current?: string }) {
  const steps = titrationTimeline(medication);
  if (!steps.length) return null;
  return (
    <div>
      <ol className="relative grid gap-3 sm:grid-flow-col sm:auto-cols-fr" aria-label={`${medication.name} dose step-up timeline`}>
        {steps.map((s, i) => {
          const active = current === s.slug;
          return (
            <li
              key={s.slug}
              aria-current={active ? "step" : undefined}
              className={cn(
                "relative rounded-lg border bg-card p-3 text-center",
                active && "border-primary bg-secondary ring-2 ring-primary/30",
              )}
            >
              <span className="block text-xs text-muted-foreground">Step {i + 1}</span>
              <span className="block text-lg font-semibold">{formatMg(s.mg)}</span>
              <span className="block text-xs text-muted-foreground">{s.fromWeek ? `from week ${s.fromWeek}` : "timing per SmPC"}</span>
            </li>
          );
        })}
      </ol>
      <p className="mt-3 text-xs text-muted-foreground">
        {medication.titrationStepWeeks
          ? `The UK product information says to stay on each dose for at least ${medication.titrationStepWeeks === 1 ? "one week" : `${medication.titrationStepWeeks} weeks`} before increasing. Weeks shown are the earliest possible; many people stay on a dose for longer, and some stay on a lower dose.`
          : "Step timings are not yet verified; check the SmPC."}
      </p>
    </div>
  );
}
