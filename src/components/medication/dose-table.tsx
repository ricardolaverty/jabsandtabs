import Link from "next/link";
import type { Medication } from "@/types";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DOSE_ROLE_LABELS } from "@/lib/labels";
import { titrationTimeline } from "@/lib/medication-content";
import { formatMg } from "@/lib/utils";

/** Doses table from verified data. Renders a notice instead when doses are unverified. */
export function DoseTable({ medication, linkDoses = true }: { medication: Medication; linkDoses?: boolean }) {
  const steps = titrationTimeline(medication);
  if (!steps.length) {
    return (
      <p className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
        The UK dose schedule for {medication.name} has not yet been verified by our editorial team, so we do not list
        doses. Check the current SmPC and follow your prescriber&apos;s instructions.
      </p>
    );
  }
  return (
    <Table>
      <TableCaption>
        Doses listed in the UK product information for {medication.name}. Your prescriber decides your dose; not
        everyone increases to the highest dose.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead scope="col">Dose</TableHead>
          <TableHead scope="col">Role</TableHead>
          <TableHead scope="col">Earliest start (if increased at every step)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {steps.map((s) => (
          <TableRow key={s.slug}>
            <TableCell className="font-semibold">
              {linkDoses ? (
                <Link href={`/${medication.slug}-${s.slug}`} className="text-primary hover:underline">
                  {medication.name} {formatMg(s.mg)}
                </Link>
              ) : (
                `${medication.name} ${formatMg(s.mg)}`
              )}
            </TableCell>
            <TableCell>
              {DOSE_ROLE_LABELS[s.role]}
              {s.note && <span className="mt-1 block text-xs text-muted-foreground">{s.note}</span>}
            </TableCell>
            <TableCell>{s.fromWeek ? `Week ${s.fromWeek}` : "See SmPC"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
