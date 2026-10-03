import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CLUSTER_LABELS, articleHref, type Article } from "@/lib/content";

export function ArticleCard({ article }: { article: Article }) {
  const fm = article.frontmatter;
  return (
    <article className="group relative flex h-full flex-col rounded-xl border bg-card p-5 transition-shadow hover:shadow-md">
      <Badge variant="secondary">{CLUSTER_LABELS[fm.cluster]}</Badge>
      <h3 className="mt-3 font-semibold leading-snug">
        <Link href={articleHref(fm)} className="after:absolute after:inset-0 group-hover:underline">
          {fm.title}
        </Link>
      </h3>
      <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted-foreground">{fm.description}</p>
      <p className="mt-4 flex items-center gap-1 text-xs font-medium text-primary">
        {fm.readingMinutes} min read <ArrowRight aria-hidden className="size-3" />
      </p>
    </article>
  );
}

export function ArticleGrid({ articles, emptyMessage }: { articles: Article[]; emptyMessage?: string }) {
  if (!articles.length) {
    return (
      <p className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
        {emptyMessage ?? "Guides in this section are being written and clinically reviewed. Check back soon."}
      </p>
    );
  }
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((a) => (
        <li key={a.frontmatter.slug}>
          <ArticleCard article={a} />
        </li>
      ))}
    </ul>
  );
}
