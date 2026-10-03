import type { TocItem } from "@/lib/content";
import { cn } from "@/lib/utils";

export function TableOfContents({ items, className }: { items: TocItem[]; className?: string }) {
  if (items.length < 2) return null;
  return (
    <nav aria-label="On this page" className={cn("text-sm", className)}>
      <p className="font-semibold">On this page</p>
      <ol className="mt-3 space-y-2 border-l">
        {items.map((i) => (
          <li key={i.id} className={cn(i.depth === 3 && "pl-3")}>
            <a href={`#${i.id}`} className="-ml-px block border-l border-transparent pl-3 text-muted-foreground hover:border-primary hover:text-foreground">
              {i.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
