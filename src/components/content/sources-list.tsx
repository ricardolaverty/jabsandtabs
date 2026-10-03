import type { ArticleFrontmatter } from "@/types";

export function SourcesList({ sources }: { sources: ArticleFrontmatter["sources"] }) {
  if (!sources.length) return null;
  return (
    <section aria-labelledby="sources-heading" className="my-12">
      <h2 id="sources-heading" className="font-serif text-2xl font-semibold tracking-tight">
        Sources
      </h2>
      <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
        {sources.map((s, i) => (
          <li key={i}>
            {s.url ? (
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="font-medium text-foreground underline underline-offset-2">
                {s.title}
              </a>
            ) : (
              <span className="font-medium text-foreground">{s.title}</span>
            )}
            . {s.publisher}, {s.year}.
          </li>
        ))}
      </ol>
    </section>
  );
}
