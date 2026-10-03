import Link from "next/link";
import { BookOpen } from "lucide-react";
import type { GuideLink } from "@/lib/content";

/** List of published guides (already filtered to existing articles). */
export function RelatedGuides({ guides, title = "Related guides", emptyText }: { guides: GuideLink[]; title?: string; emptyText?: string }) {
  return (
    <div>
      <h3 className="font-semibold">{title}</h3>
      {guides.length ? (
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {guides.map((g) => (
            <li key={g.slug}>
              <Link href={g.href} className="flex items-start gap-2 rounded-lg border bg-card p-3 text-sm font-medium hover:border-primary hover:bg-secondary/50">
                <BookOpen aria-hidden className="mt-0.5 size-4 shrink-0 text-primary" />
                {g.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-sm text-muted-foreground">
          {emptyText ?? "In-depth guides on this topic are being written and clinically reviewed."}{" "}
          <Link href="/guides" className="font-medium text-primary underline">
            Browse all guides
          </Link>
        </p>
      )}
    </div>
  );
}
