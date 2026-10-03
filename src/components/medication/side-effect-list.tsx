import Link from "next/link";
import { AlertOctagon } from "lucide-react";
import type { Medication, SideEffect } from "@/types";
import { Badge } from "@/components/ui/badge";
import { hrefForSideEffect } from "@/lib/route-hrefs";

const seriousnessLabel: Record<SideEffect["seriousness"], string> = {
  common: "Commonly reported",
  "less-common": "Less common",
  serious: "Serious: know the signs",
};

export function SideEffectList({ medication, sideEffects }: { medication: Medication; sideEffects: SideEffect[] }) {
  const groups: SideEffect["seriousness"][] = ["common", "less-common", "serious"];
  return (
    <div className="space-y-6">
      {groups.map((g) => {
        const items = sideEffects.filter((s) => s.seriousness === g);
        if (!items.length) return null;
        return (
          <div key={g}>
            <h3 className="flex items-center gap-2 font-semibold">
              {g === "serious" && <AlertOctagon aria-hidden className="size-4 text-destructive" />}
              {seriousnessLabel[g]}
            </h3>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {items.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={hrefForSideEffect(medication.slug, s.slug)}
                    className="flex items-center justify-between gap-2 rounded-lg border bg-card px-4 py-3 text-sm font-medium hover:border-primary hover:bg-secondary/50"
                  >
                    <span>
                      {medication.name} and {s.name.toLowerCase()}
                    </span>
                    {medication.commonSideEffects.includes(s.slug) && <Badge variant="secondary">Common</Badge>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
      <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm leading-relaxed">
        <p className="font-semibold">When to get urgent help</p>
        <p className="mt-1 text-muted-foreground">
          Stop taking the medicine and get urgent medical help (NHS 111, A&amp;E or 999) if you have severe, persistent
          stomach pain that may spread to your back, signs of a serious allergic reaction, or yellowing of your skin or
          eyes. Report suspected side effects to the{" "}
          <a href="https://yellowcard.mhra.gov.uk/" target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline">
            MHRA Yellow Card scheme
          </a>
          .
        </p>
      </div>
    </div>
  );
}
