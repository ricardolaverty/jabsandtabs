import Link from "next/link";
import { ArrowRight, Pill, Syringe } from "lucide-react";
import type { Medication } from "@/types";
import { Badge } from "@/components/ui/badge";
import { UK_STATUS_LABELS } from "@/lib/labels";
import { frequencyLabel } from "@/lib/medication-content";

export function MedicationCard({ medication: m }: { medication: Medication }) {
  const Icon = m.route === "injection" ? Syringe : Pill;
  return (
    <article className="group relative flex h-full flex-col rounded-xl border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex size-10 items-center justify-center rounded-lg bg-secondary text-primary">
          <Icon aria-hidden className="size-5" />
        </span>
        <Badge variant={m.ukStatus === "licensed" ? "success" : "warning"}>
          {m.ukStatus === "licensed" ? "UK licensed" : UK_STATUS_LABELS[m.ukStatus]}
        </Badge>
      </div>
      <h3 className="mt-4 text-lg font-semibold">
        <Link href={`/${m.slug}`} className="after:absolute after:inset-0 group-hover:underline">
          {m.name}
        </Link>
      </h3>
      <p className="text-sm text-muted-foreground">
        {m.genericName} · {m.route === "injection" ? "Injection" : "Tablet"} {frequencyLabel(m)}
      </p>
      <p className="mt-3 flex-1 text-sm leading-relaxed">{m.summary}</p>
      <p className="mt-4 flex items-center gap-1 text-sm font-semibold text-primary">
        {m.name} guide <ArrowRight aria-hidden className="size-4" />
      </p>
    </article>
  );
}
