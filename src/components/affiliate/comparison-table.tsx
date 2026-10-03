import * as React from "react";
import type { Provider } from "@/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RatingDisplay } from "@/components/affiliate/rating-display";
import { AffiliateButton } from "@/components/affiliate/affiliate-button";
import { PROVIDER_TYPE_LABELS } from "@/lib/labels";
import { getMedication } from "@/data/medications";
import { formatDate, formatPrice, NOT_VERIFIED } from "@/lib/utils";

interface Row {
  label: string;
  render: (p: Provider) => React.ReactNode;
}

const nv = <span className="text-muted-foreground">{NOT_VERIFIED}</span>;

/** Side-by-side provider comparison (rows = attributes, columns = providers). Service facts only, no drug prices. */
export function ComparisonTable({ providers, fromPath, showConsultationFee = false }: { providers: Provider[]; fromPath?: string; showConsultationFee?: boolean }) {
  const rows: Row[] = [
    { label: "Type of service", render: (p) => PROVIDER_TYPE_LABELS[p.type] },
    { label: "GPhC registration", render: (p) => p.gphcNumber ?? nv },
    { label: "CQC registered", render: (p) => (p.cqcRegistered === null ? nv : p.cqcRegistered ? "Yes" : "No") },
    {
      label: "Medicines listed",
      render: (p) => (p.medications.length ? p.medications.map((m) => getMedication(m)?.name ?? m).join(", ") : nv),
    },
    { label: "Delivery", render: (p) => p.delivery ?? nv },
    { label: "Clinical support", render: (p) => (p.support?.length ? p.support.join(", ") : nv) },
    { label: "Maintenance policy", render: (p) => p.maintenancePolicy ?? nv },
    ...(showConsultationFee ? [{ label: "Consultation fee", render: (p: Provider) => formatPrice(p.consultationFee) }] : []),
    { label: "Trustpilot", render: (p) => <RatingDisplay trustpilot={p.trustpilot} /> },
    { label: "Last verified", render: (p) => formatDate(p.lastVerifiedAt) },
  ];
  return (
    <Table>
      <caption className="sr-only">Side-by-side comparison of {providers.map((p) => p.name).join(" and ")}</caption>
      <TableHeader>
        <TableRow>
          <TableHead scope="col" className="w-48">
            <span className="sr-only">Attribute</span>
          </TableHead>
          {providers.map((p) => (
            <TableHead key={p.slug} scope="col" className="min-w-48">
              {p.name}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((r) => (
          <TableRow key={r.label}>
            <TableHead scope="row" className="h-auto py-3 align-top font-medium text-muted-foreground">
              {r.label}
            </TableHead>
            {providers.map((p) => (
              <TableCell key={p.slug}>{r.render(p)}</TableCell>
            ))}
          </TableRow>
        ))}
        <TableRow>
          <TableHead scope="row" className="h-auto py-3 font-medium text-muted-foreground">
            Next step
          </TableHead>
          {providers.map((p) => (
            <TableCell key={p.slug}>
              <AffiliateButton provider={p} fromPath={fromPath} size="sm" />
            </TableCell>
          ))}
        </TableRow>
      </TableBody>
    </Table>
  );
}
