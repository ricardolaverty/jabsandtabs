"use client";

import * as React from "react";
import Link from "next/link";
import { BadgeCheck, CircleDashed, Search } from "lucide-react";
import type { Provider } from "@/types";
import { Input, Label } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CtaLink, type CtaData } from "@/components/affiliate/cta-link";
import { PROVIDER_TYPE_LABELS } from "@/lib/labels";

export interface DirectoryProvider {
  slug: string;
  name: string;
  type: Provider["type"];
  medications: { slug: string; name: string }[];
  verified: boolean;
  trustpilot: Provider["trustpilot"];
  gphcNumber: string | null;
  cta: CtaData;
}

const ALL = "all";

export function ProviderDirectory({ providers, medications }: { providers: DirectoryProvider[]; medications: { slug: string; name: string }[] }) {
  const [query, setQuery] = React.useState("");
  const [type, setType] = React.useState<string>(ALL);
  const [med, setMed] = React.useState<string>(ALL);
  const [verifiedOnly, setVerifiedOnly] = React.useState(false);

  const filtered = providers.filter(
    (p) =>
      (!query || p.name.toLowerCase().includes(query.toLowerCase())) &&
      (type === ALL || p.type === type) &&
      (med === ALL || p.medications.some((m) => m.slug === med)) &&
      (!verifiedOnly || p.verified),
  );

  return (
    <div>
      <div role="search" aria-label="Filter providers" className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-4 md:items-end">
        <div className="space-y-2">
          <Label htmlFor="provider-search">Search</Label>
          <div className="relative">
            <Search aria-hidden className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input id="provider-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Provider name" className="pl-9" />
          </div>
        </div>
        <div className="space-y-2">
          <Label id="type-label">Type of service</Label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger aria-labelledby="type-label">
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
        <div className="space-y-2">
          <Label id="med-label">Medicine</Label>
          <Select value={med} onValueChange={setMed}>
            <SelectTrigger aria-labelledby="med-label">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>All medicines</SelectItem>
              {medications.map((m) => (
                <SelectItem key={m.slug} value={m.slug}>
                  {m.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <label className="flex h-10 items-center gap-2 text-sm font-medium">
          <input type="checkbox" checked={verifiedOnly} onChange={(e) => setVerifiedOnly(e.target.checked)} className="size-4 accent-primary" />
          Verified providers only
        </label>
      </div>

      <p className="mt-4 text-sm text-muted-foreground" aria-live="polite">
        Showing {filtered.length} of {providers.length} providers, in alphabetical order.
      </p>

      {filtered.length === 0 ? (
        <p className="mt-6 rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
          No providers match these filters.{verifiedOnly ? " No providers have completed verification yet." : ""}
        </p>
      ) : (
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <li key={p.slug}>
              <article className="flex h-full flex-col rounded-xl border bg-card p-5 shadow-sm">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{PROVIDER_TYPE_LABELS[p.type]}</Badge>
                  {p.verified ? (
                    <Badge variant="success">
                      <BadgeCheck aria-hidden /> Verified
                    </Badge>
                  ) : (
                    <Badge variant="outline">
                      <CircleDashed aria-hidden /> Being verified
                    </Badge>
                  )}
                </div>
                <h3 className="mt-3 text-lg font-semibold">
                  <Link href={`/providers/${p.slug}`} className="hover:underline">
                    {p.name}
                  </Link>
                </h3>
                <dl className="mt-3 flex-1 space-y-1 text-sm">
                  <div className="flex gap-2">
                    <dt className="text-muted-foreground">GPhC:</dt>
                    <dd>{p.gphcNumber ?? "Not yet verified"}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="text-muted-foreground">Trustpilot:</dt>
                    <dd>{p.trustpilot ? `${p.trustpilot.score.toFixed(1)} / 5` : "Not yet rated"}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="text-muted-foreground">Medicines:</dt>
                    <dd>{p.medications.length ? p.medications.map((m) => m.name).join(", ") : "Not yet verified"}</dd>
                  </div>
                </dl>
                <CtaLink cta={p.cta} className="mt-4 w-full" />
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
