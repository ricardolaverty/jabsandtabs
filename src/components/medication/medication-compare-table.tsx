import Link from "next/link";
import type { Medication, SideEffect } from "@/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UK_STATUS_LABELS } from "@/lib/labels";
import { commonSideEffectNames, doseRange, frequencyLabel, startingDose } from "@/lib/medication-content";
import { formatMg, NOT_VERIFIED } from "@/lib/utils";

/** Side-by-side medication comparison (columns = medications). */
export function MedicationCompareTable({ medications, sideEffects }: { medications: Medication[]; sideEffects: SideEffect[] }) {
  const rows: [string, (m: Medication) => string][] = [
    ["Active ingredient", (m) => m.genericName],
    ["Drug class", (m) => m.drugClass],
    ["Manufacturer", (m) => m.manufacturer],
    ["Form", (m) => (m.route === "injection" ? "Injection" : "Tablet")],
    ["How often", (m) => frequencyLabel(m)],
    ["Device", (m) => m.device ?? (m.route === "tablet" ? "None (tablet)" : NOT_VERIFIED)],
    ["Starting dose", (m) => { const d = startingDose(m); return d ? formatMg(d.mg) : NOT_VERIFIED; }],
    ["Dose range", (m) => doseRange(m) ?? NOT_VERIFIED],
    ["UK status", (m) => UK_STATUS_LABELS[m.ukStatus]],
    ["NICE guidance", (m) => m.niceGuidance ?? NOT_VERIFIED],
    ["Common side effects", (m) => commonSideEffectNames(m, sideEffects).join(", ")],
  ];
  return (
    <Table>
      <caption className="sr-only">Comparison of {medications.map((m) => m.name).join(", ")}</caption>
      <TableHeader>
        <TableRow>
          <TableHead scope="col" className="w-44">
            <span className="sr-only">Attribute</span>
          </TableHead>
          {medications.map((m) => (
            <TableHead key={m.slug} scope="col" className="min-w-44">
              <Link href={`/${m.slug}`} className="text-primary hover:underline">
                {m.name}
              </Link>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map(([label, fn]) => (
          <TableRow key={label}>
            <TableHead scope="row" className="h-auto py-3 align-top font-medium text-muted-foreground">
              {label}
            </TableHead>
            {medications.map((m) => {
              const v = fn(m);
              return (
                <TableCell key={m.slug} className={v === NOT_VERIFIED ? "text-muted-foreground" : undefined}>
                  {v}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
