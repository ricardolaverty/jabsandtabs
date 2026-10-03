import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { ArticleView } from "@/components/content/article-view";
import { getArticle, getGuideRouteArticles } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

/** Mounted articles (canonicalPath) are excluded: next.config.ts 301s /guides/{slug} to their canonical URL. */
export function generateStaticParams() {
  return getGuideRouteArticles().map((a) => ({ slug: a.frontmatter.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  const fm = a.frontmatter;
  return buildMetadata({
    title: fm.title,
    description: fm.description,
    path: `/guides/${fm.slug}`,
    type: "article",
    publishedTime: fm.publishedAt,
    modifiedTime: fm.updatedAt,
    keywords: [fm.primaryKeyword, ...fm.secondaryKeywords],
    // Only clinically reviewed articles are indexed.
    index: fm.reviewStatus === "clinically-reviewed",
  });
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  // Safety net; the redirect normally happens in next.config.ts before rendering.
  if (article.frontmatter.canonicalPath) permanentRedirect(article.frontmatter.canonicalPath);
  return <ArticleView article={article} />;
}
