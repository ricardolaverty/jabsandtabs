"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowDown, ArrowUp, ArrowUpDown, Search } from "lucide-react";
import type { Provider } from "@/types";
import { Input, Label } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CtaLink, type CtaData } from "@/components/affiliate/cta-link";
import { PROVIDER_TYPE_LABELS } from "@/lib/labels";
import { cn } from "@/lib/utils";

/**
 * The comparison engine.
 * mode="prices"  (flags.pomPricing ON):  drug-price columns per provider/dose.
 * mode="service" (flags.pomPricing OFF): service comparison, no drug prices at all.
 * The server decides the mode and only sends price data when prices are enabled.
 */

export interface PriceRow {
  id: string;
  providerSlug: string;
  providerName: string;
  providerType: Provider["type"];
  medication: string;
  medicationName: string;
  doseSlug: string;
  doseMg: number | null;
  retailPrice: number | null;
  discountPrice: number | null;
  deliveryCharge: number | null;
  consultationFee: number | null;
  total: number | null;
  trustpilot: number | null;
  support: string | null;
  checkedAt: string | null;
  cta: CtaData;
}

export interface ServiceRow {
  id: string;
  providerSlug: string;
  providerName: string;
  providerType: Provider["type"];
  medications: string[];
  medicationNames: string[];
  consultationModel: string;
  delivery: string | null;
  support: string | null;
  regulator: string | null;
  maintenancePolicy: string | null;
  trustpilot: number | null;
  verified: boolean;
  cta: CtaData;
}

type Props =
  | { mode: "prices"; rows: PriceRow[]; medications: { slug: string; name: string; doses: { slug: string; label: string }[] }[]; initialMedication?: string }
  | { mode: "service"; rows: ServiceRow[]; medications: { slug: string; name: string; doses: { slug: string; label: string }[] }[]; initialMedication?: string };

type SortDir = "asc" | "desc";
const ALL = "all";
const NV = "Not yet verified";

const gbp = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" });
const money = (v: number | null) => (v === null ? NV : gbp.format(v));

interface Column<R> {
  key: string;
  label: string;
  sortValue?: (r: R) => string | number | null;
  render: (r: R) => React.ReactNode;
  className?: string;
}

function compare(a: string | number | null, b: string | number | null, dir: SortDir) {
  // Nulls ("Not yet verified") always sort last, whatever the direction.
  if (a === null && b === null) return 0;
  if (a === null) return 1;
  if (b === null) return -1;
  const r = typeof a === "number" && typeof b === "number" ? a - b : String(a).localeCompare(String(b), "en-GB");
  return dir === "asc" ? r : -r;
}

function ProviderCell({ name, slug }: { name: string; slug: string }) {
  return (
    <div className="min-w-36">
      <Link href={`/providers/${slug}`} className="font-semibold hover:underline">
        {name}
      </Link>
    </div>
  );
}

const muted = (v: string | null) => (v ? v : <span className="text-muted-foreground">{NV}</span>);

const priceColumns: Column<PriceRow>[] = [
  { key: "provider", label: "Provider", sortValue: (r) => r.providerName, render: (r) => <ProviderCell name={r.providerName} slug={r.providerSlug} /> },
  { key: "dose", label: "Dose", sortValue: (r) => r.doseMg, render: (r) => `${r.medicationName} ${r.doseMg !== null ? `${r.doseMg}mg` : r.doseSlug}` },
  { key: "retail", label: "Retail price", sortValue: (r) => r.retailPrice, render: (r) => money(r.retailPrice) },
  { key: "discount", label: "Discount price", sortValue: (r) => r.discountPrice, render: (r) => money(r.discountPrice) },
  { key: "delivery", label: "Delivery", sortValue: (r) => r.deliveryCharge, render: (r) => money(r.deliveryCharge) },
  { key: "consultation", label: "Consultation fee", sortValue: (r) => r.consultationFee, render: (r) => money(r.consultationFee) },
  { key: "total", label: "Total", sortValue: (r) => r.total, render: (r) => <span className="font-semibold">{money(r.total)}</span> },
  { key: "trustpilot", label: "Trustpilot", sortValue: (r) => r.trustpilot, render: (r) => (r.trustpilot === null ? <span className="text-muted-foreground">Not yet rated</span> : `${r.trustpilot.toFixed(1)} / 5`) },
  { key: "support", label: "Support", sortValue: (r) => r.support, render: (r) => muted(r.support) },
  { key: "cta", label: "Next step", render: (r) => <CtaLink cta={r.cta} /> },
];

const serviceColumns: Column<ServiceRow>[] = [
  { key: "provider", label: "Provider", sortValue: (r) => r.providerName, render: (r) => <ProviderCell name={r.providerName} slug={r.providerSlug} /> },
  { key: "model", label: "Consultation model", sortValue: (r) => r.consultationModel, render: (r) => r.consultationModel },
  { key: "delivery", label: "Delivery", sortValue: (r) => r.delivery, render: (r) => muted(r.delivery) },
  { key: "support", label: "Support", sortValue: (r) => r.support, render: (r) => muted(r.support) },
  { key: "regulator", label: "Regulator status", sortValue: (r) => r.regulator, render: (r) => muted(r.regulator) },
  { key: "maintenance", label: "Maintenance policy", sortValue: (r) => r.maintenancePolicy, render: (r) => muted(r.maintenancePolicy) },
  { key: "trustpilot", label: "Trustpilot", sortValue: (r) => r.trustpilot, render: (r) => (r.trustpilot === null ? <span className="text-muted-foreground">Not yet rated</span> : `${r.trustpilot.toFixed(1)} / 5`) },
  { key: "verified", label: "Verified", sortValue: (r) => (r.verified ? 1 : 0), render: (r) => (r.verified ? <Badge variant="success">Verified</Badge> : <Badge variant="outline">Being verified</Badge>) },
  { key: "cta", label: "Next step", render: (r) => <CtaLink cta={r.cta} /> },
];

export function PriceComparison(props: Props) {
  const [query, setQuery] = React.useState("");
  const [medication, setMedication] = React.useState<string>(props.initialMedication ?? ALL);
  const [dose, setDose] = React.useState<string>(ALL);
  const [type, setType] = React.useState<string>(ALL);
  const [sortKey, setSortKey] = React.useState<string>(props.mode === "prices" ? "total" : "provider");
  const [sortDir, setSortDir] = React.useState<SortDir>("asc");

  const doseOptions = props.medications.find((m) => m.slug === medication)?.doses ?? [];

  const toggleSort = (key: string) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const q = query.trim().toLowerCase();

  let table: React.ReactNode;
  let count = 0;
  let total = 0;

  if (props.mode === "prices") {
    const rows = props.rows.filter(
      (r) =>
        (medication === ALL || r.medication === medication) &&
        (dose === ALL || r.doseSlug === dose) &&
        (type === ALL || r.providerType === type) &&
        (!q || `${r.providerName} ${r.medicationName}`.toLowerCase().includes(q)),
    );
    const col = priceColumns.find((c) => c.key === sortKey);
    if (col?.sortValue) rows.sort((a, b) => compare(col.sortValue!(a), col.sortValue!(b), sortDir));
    count = rows.length;
    total = props.rows.length;
    table = <DataTable columns={priceColumns} rows={rows} sortKey={sortKey} sortDir={sortDir} onSort={toggleSort} caption="Recorded prices for a 4-week supply, with the date each price was checked." />;
  } else {
    const rows = props.rows.filter(
      (r) =>
        (medication === ALL || r.medications.includes(medication)) &&
        (type === ALL || r.providerType === type) &&
        (!q || `${r.providerName} ${r.medicationNames.join(" ")}`.toLowerCase().includes(q)),
    );
    const col = serviceColumns.find((c) => c.key === sortKey);
    if (col?.sortValue) rows.sort((a, b) => compare(col.sortValue!(a), col.sortValue!(b), sortDir));
    count = rows.length;
    total = props.rows.length;
    table = <DataTable columns={serviceColumns} rows={rows} sortKey={sortKey} sortDir={sortDir} onSort={toggleSort} caption="Service comparison of UK weight loss providers. No medicine prices are shown." />;
  }

  return (
    <div>
      <div role="search" aria-label="Filter comparison" className={cn("grid gap-4 rounded-xl border bg-card p-4 md:items-end", props.mode === "prices" ? "md:grid-cols-4" : "md:grid-cols-3")}>
        <div className="space-y-2">
          <Label htmlFor="cmp-search">Search</Label>
          <div className="relative">
            <Search aria-hidden className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input id="cmp-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Provider or medicine" className="pl-9" />
          </div>
        </div>
        <div className="space-y-2">
          <Label id="cmp-med">Medicine</Label>
          <Select
            value={medication}
            onValueChange={(v) => {
              setMedication(v);
              setDose(ALL);
            }}
          >
            <SelectTrigger aria-labelledby="cmp-med">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>All medicines</SelectItem>
              {props.medications.map((m) => (
                <SelectItem key={m.slug} value={m.slug}>
                  {m.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {props.mode === "prices" && (
          <div className="space-y-2">
            <Label id="cmp-dose">Dose</Label>
            <Select value={dose} onValueChange={setDose} disabled={medication === ALL || doseOptions.length === 0}>
              <SelectTrigger aria-labelledby="cmp-dose">
                <SelectValue placeholder="Choose a medicine first" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>All doses</SelectItem>
                {doseOptions.map((d) => (
                  <SelectItem key={d.slug} value={d.slug}>
                    {d.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        <div className="space-y-2">
          <Label id="cmp-type">Provider type</Label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger aria-labelledby="cmp-type">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>All types</SelectItem>
              {Object.entries(PROVIDER_TYPE_LABELS).map(([k, v]) => (
                <SelectItem key={k} value={k}>
                  {v}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <p className="mt-4 text-sm text-muted-foreground" aria-live="polite">
        Showing {count} of {total} {props.mode === "prices" ? "price records" : "providers"}. Select a column heading to sort.
      </p>
      <div className="mt-3">{count === 0 ? <EmptyState mode={props.mode} hasData={total > 0} /> : table}</div>
    </div>
  );
}

function EmptyState({ mode, hasData }: { mode: Props["mode"]; hasData: boolean }) {
  return (
    <p className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
      {hasData
        ? "Nothing matches these filters."
        : mode === "prices"
          ? "No verified prices have been recorded yet. Prices are only shown once captured from the provider's own site with a date and source."
          : "No providers to show yet."}
    </p>
  );
}

function DataTable<R extends { id: string }>({
  columns,
  rows,
  sortKey,
  sortDir,
  onSort,
  caption,
}: {
  columns: Column<R>[];
  rows: R[];
  sortKey: string;
  sortDir: SortDir;
  onSort: (key: string) => void;
  caption: string;
}) {
  return (
    <div className="relative w-full overflow-x-auto rounded-lg border">
      <table className="w-full caption-bottom text-sm">
        <caption className="mt-3 px-3 pb-3 text-left text-xs text-muted-foreground">{caption}</caption>
        <thead className="bg-muted/60">
          <tr className="border-b">
            {columns.map((c) => {
              const active = sortKey === c.key;
              const ariaSort = active ? (sortDir === "asc" ? "ascending" : "descending") : "none";
              return (
                <th key={c.key} scope="col" aria-sort={c.sortValue ? ariaSort : undefined} className="h-11 whitespace-nowrap px-3 text-left font-semibold">
                  {c.sortValue ? (
                    <button type="button" onClick={() => onSort(c.key)} className="inline-flex items-center gap-1 rounded hover:text-primary focus-visible:outline-2 focus-visible:outline-ring">
                      {c.label}
                      {active ? sortDir === "asc" ? <ArrowUp aria-hidden className="size-3.5" /> : <ArrowDown aria-hidden className="size-3.5" /> : <ArrowUpDown aria-hidden className="size-3.5 opacity-50" />}
                    </button>
                  ) : (
                    c.label
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-b last:border-0 hover:bg-muted/40">
              {columns.map((c) => (
                <td key={c.key} className={cn("px-3 py-3 align-top", c.className)}>
                  {c.render(r)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
