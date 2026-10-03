import type { Medication } from "@/types";
import { UK_STATUS_LABELS } from "@/lib/labels";
import { doseRange, frequencyLabel } from "@/lib/medication-content";
import { NOT_VERIFIED } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

/** Key facts definition list for a medication. */
export function MedicationFacts({ medication: m }: { medication: Medication }) {
  const facts: [string, string][] = [
    ["Active ingredient", m.genericName],
    ["Drug class", m.drugClass],
    ["Manufacturer", m.manufacturer],
    ["How it is taken", `${m.route === "injection" ? "Injection" : "Tablet"}, ${frequencyLabel(m)}`],
    ...(m.device ? ([["Device", m.device]] as [string, string][]) : []),
    ["Dose range", doseRange(m) ?? NOT_VERIFIED],
    ...(m.administration ? ([["How to take it", m.administration]] as [string, string][]) : []),
    ["MHRA authorisation", m.mhraApproval ?? NOT_VERIFIED],
    ["NICE guidance", m.niceGuidance ?? NOT_VERIFIED],
  ];
  return (
    <div className="rounded-xl border bg-card p-5">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant={m.ukStatus === "licensed" ? "success" : m.ukStatus === "verify" ? "warning" : "secondary"}>
          {UK_STATUS_LABELS[m.ukStatus]}
        </Badge>
        <Badge variant="outline">Prescription-only medicine</Badge>
      </div>
      <dl className="mt-4 grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
        {facts.map(([k, v]) => (
          <div key={k} className="border-b pb-2">
            <dt className="text-muted-foreground">{k}</dt>
            <dd className={v === NOT_VERIFIED ? "font-medium text-muted-foreground" : "font-medium"}>{v}</dd>
          </div>
        ))}
      </dl>
      {m.availabilityNote && <p className="mt-4 rounded-md bg-warning p-3 text-sm text-warning-foreground">{m.availabilityNote}</p>}
      {m.sourceUrls && m.sourceUrls.length > 0 && (
        <p className="mt-3 text-xs text-muted-foreground">
          Regulatory source{m.sourceUrls.length > 1 ? "s" : ""}:{" "}
          {m.sourceUrls.map((u, i) => (
            <span key={u}>
              {i > 0 && ", "}
              <a href={u} target="_blank" rel="noopener noreferrer" className="underline">
                {new URL(u).hostname.replace(/^www\./, "")}
              </a>
            </span>
          ))}
        </p>
      )}
    </div>
  );
}
