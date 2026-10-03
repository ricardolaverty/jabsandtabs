"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Fuse from "fuse.js";
import { Search } from "lucide-react";
import { Input, Label } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface SearchDoc {
  id: string;
  title: string;
  description: string;
  href: string;
  type: string;
  keywords: string[];
}

export function SiteSearch() {
  const router = useRouter();
  const params = useSearchParams();
  const [query, setQuery] = React.useState(params.get("q") ?? "");
  const [docs, setDocs] = React.useState<SearchDoc[] | null>(null);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;
    fetch("/search-index.json")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d: SearchDoc[]) => !cancelled && setDocs(d))
      .catch(() => !cancelled && setError(true));
    return () => {
      cancelled = true;
    };
  }, []);

  const fuse = React.useMemo(
    () =>
      docs
        ? new Fuse(docs, {
            keys: [
              { name: "title", weight: 0.6 },
              { name: "keywords", weight: 0.25 },
              { name: "description", weight: 0.15 },
            ],
            threshold: 0.35,
            ignoreLocation: true,
          })
        : null,
    [docs],
  );

  const q = query.trim();
  const results = fuse && q.length >= 2 ? fuse.search(q, { limit: 30 }).map((r) => r.item) : [];

  // Keep the URL in sync (shareable searches) without adding history entries.
  React.useEffect(() => {
    const t = setTimeout(() => router.replace(q ? `/search?q=${encodeURIComponent(q)}` : "/search", { scroll: false }), 250);
    return () => clearTimeout(t);
  }, [q, router]);

  return (
    <div>
      <form role="search" onSubmit={(e) => e.preventDefault()} className="max-w-2xl">
        <Label htmlFor="site-search" className="sr-only">
          Search JabsAndTabs
        </Label>
        <div className="relative">
          <Search aria-hidden className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="site-search"
            type="search"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search medicines, providers and guides"
            className="h-12 pl-11 text-base"
          />
        </div>
      </form>
      <div className="mt-6" aria-live="polite">
        {error && <p className="text-sm text-destructive">Search is unavailable right now. Please try again later.</p>}
        {!docs && !error && <p className="text-sm text-muted-foreground">Loading search…</p>}
        {docs && q.length >= 2 && (
          <p className="text-sm text-muted-foreground">
            {results.length} result{results.length === 1 ? "" : "s"} for &ldquo;{q}&rdquo;
          </p>
        )}
        <ul className="mt-4 divide-y rounded-xl border bg-card">
          {results.map((r) => (
            <li key={r.id} className="p-4">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{r.type}</Badge>
                <Link href={r.href} className="font-semibold hover:underline">
                  {r.title}
                </Link>
              </div>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{r.description}</p>
            </li>
          ))}
        </ul>
        {docs && q.length >= 2 && results.length === 0 && (
          <p className="mt-4 text-sm text-muted-foreground">
            No results. Try a medicine name (for example &ldquo;Mounjaro&rdquo;) or browse our <Link href="/guides" className="text-primary underline">guides</Link>.
          </p>
        )}
      </div>
    </div>
  );
}
