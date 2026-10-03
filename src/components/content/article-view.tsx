import * as React from "react";
import Link from "next/link";
import { CalendarDays, Clock } from "lucide-react";
import type { Medication } from "@/types";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { ReviewStatusBadge } from "@/components/content/review-status-badge";
import { TableOfContents } from "@/components/content/toc";
import { FaqSection } from "@/components/content/faq-section";
import { SourcesList } from "@/components/content/sources-list";
import { AuthorBox } from "@/components/content/author-box";
import { ArticleGrid } from "@/components/content/article-card";
import { Prose } from "@/components/content/prose";
import { StickyCta } from "@/components/affiliate/sticky-cta";
import { CLUSTER_LABELS, articleHref, getRelatedArticles, type Article } from "@/lib/content";
import { renderMdx } from "@/lib/mdx";
import { getAuthor } from "@/lib/repo";
import { articleSchema, medicalWebPageSchema, type Crumb } from "@/lib/schema";
import { formatDate } from "@/lib/utils";

/**
 * Full article template. Used at /guides/{slug} and, for mounted pillars
 * (frontmatter canonicalPath), at the programmatic URL with data-driven
 * `modules` (dose tables, side-effect lists, comparison tables) inserted
 * between the header and the article body.
 */
export async function ArticleView({
  article,
  crumbs,
  modules,
  about,
  notices,
}: {
  article: Article;
  crumbs?: Crumb[];
  modules?: React.ReactNode;
  about?: Medication[];
  notices?: React.ReactNode;
}) {
  const fm = article.frontmatter;
  const path = articleHref(article);
  const [author, reviewer, content] = await Promise.all([
    getAuthor(fm.author),
    fm.medicalReviewer ? getAuthor(fm.medicalReviewer) : Promise.resolve(undefined),
    renderMdx(article.body),
  ]);
  const related = getRelatedArticles(article, 3);
  const trail: Crumb[] = crumbs ?? [
    { name: "Guides", href: "/guides" },
    { name: CLUSTER_LABELS[fm.cluster], href: `/guides/topic/${fm.cluster}` },
    { name: fm.title, href: path },
  ];

  return (
    <>
      <JsonLd
        data={[
          articleSchema(fm, author),
          medicalWebPageSchema({ path, title: fm.title, description: fm.description, updatedAt: fm.updatedAt, frontmatter: fm, reviewer, about }),
        ]}
      />
      <Container className="py-8">
        <Breadcrumbs items={trail} />
        <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_16rem]">
          <article className="min-w-0">
            <header>
              <Badge variant="secondary">{CLUSTER_LABELS[fm.cluster]}</Badge>
              <h1 className="mt-3 max-w-3xl font-serif text-3xl font-semibold tracking-tight md:text-4xl lg:text-[2.75rem] lg:leading-tight">{fm.title}</h1>
              <p className="mt-4 max-w-3xl text-lg text-muted-foreground">{fm.description}</p>
              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-y py-3 text-sm text-muted-foreground">
                <span>
                  By{" "}
                  {author ? (
                    <Link href={`/authors/${author.slug}`} className="font-medium text-foreground hover:underline">
                      {author.name}
                    </Link>
                  ) : (
                    "JabsAndTabs"
                  )}
                </span>
                {reviewer && fm.reviewStatus === "clinically-reviewed" && (
                  <span>
                    Reviewed by{" "}
                    <Link href={`/authors/${reviewer.slug}`} className="font-medium text-foreground hover:underline">
                      {reviewer.name}
                    </Link>
                  </span>
                )}
                <ReviewStatusBadge status={fm.reviewStatus} />
                <span className="inline-flex items-center gap-1">
                  <CalendarDays aria-hidden className="size-4" /> Updated <time dateTime={fm.updatedAt}>{formatDate(fm.updatedAt)}</time>
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock aria-hidden className="size-4" /> {fm.readingMinutes} min read
                </span>
              </div>
            </header>

            {notices}

            <details className="mt-6 rounded-lg border bg-card p-4 lg:hidden">
              <summary className="cursor-pointer font-semibold">On this page</summary>
              <TableOfContents items={article.toc} className="mt-3" />
            </details>

            {modules && <div className="mt-6 space-y-2 border-b pb-6">{modules}</div>}

            <Prose className="mt-8">{content}</Prose>

            <FaqSection faqs={fm.faqs} />
            <SourcesList sources={fm.sources} />
            <AuthorBox author={author} reviewer={reviewer} />

            {related.length > 0 && (
              <section aria-labelledby="related-heading" className="my-12">
                <h2 id="related-heading" className="mb-4 font-serif text-2xl font-semibold tracking-tight">
                  Related guides
                </h2>
                <ArticleGrid articles={related} />
              </section>
            )}
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <TableOfContents items={article.toc} />
              <div className="rounded-xl border bg-card p-4 text-sm">
                <p className="font-semibold">Compare providers</p>
                <p className="mt-1 text-muted-foreground">Regulated UK providers compared on safety, support and service.</p>
                <Link href="/providers" className="mt-3 inline-block font-medium text-primary underline">
                  View the directory
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </Container>
      <StickyCta />
    </>
  );
}
