import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function LinkGrid({ links, columns = 3 }: { links: { href: string; label: string; description?: string }[]; columns?: 2 | 3 | 4 }) {
  const cols = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[columns];
  return (
    <ul className={`grid gap-3 ${cols}`}>
      {links.map((l) => (
        <li key={l.href}>
          <Link href={l.href} className="group flex h-full flex-col rounded-lg border bg-card p-4 hover:border-primary hover:bg-secondary/40">
            <span className="flex items-center justify-between gap-2 font-semibold">
              {l.label}
              <ArrowRight aria-hidden className="size-4 text-primary transition-transform group-hover:translate-x-0.5" />
            </span>
            {l.description && <span className="mt-1 text-sm text-muted-foreground">{l.description}</span>}
          </Link>
        </li>
      ))}
    </ul>
  );
}
