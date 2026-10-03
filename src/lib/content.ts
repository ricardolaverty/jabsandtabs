import "server-only";
import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import { z } from "zod";
import GithubSlugger from "github-slugger";
import type { ArticleFrontmatter, ContentCluster } from "@/types";
import { flags } from "@/config/flags";
import pillarsJson from "../../content/plan/pillars.json";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

export const CONTENT_CLUSTERS = [
  "medications",
  "pricing",
  "side-effects",
  "dosing",
  "eligibility",
  "comparisons",
  "results",
  "maintenance",
  "switching",
  "exercise",
  "diet",
  "plateau",
  "long-term",
  "providers",
  "safety",
  "special-populations",
  "faqs",
] as const satisfies readonly ContentCluster[];

export const CLUSTER_LABELS: Record<ContentCluster, string> = {
  medications: "Medications",
  pricing: "Costs and pricing",
  "side-effects": "Side effects",
  dosing: "Doses and dosing",
  eligibility: "Eligibility",
  comparisons: "Comparisons",
  results: "Results and evidence",
  maintenance: "Maintenance",
  switching: "Switching treatment",
  exercise: "Exercise",
  diet: "Diet and nutrition",
  plateau: "Plateaus",
  "long-term": "Long-term treatment",
  providers: "Choosing a provider",
  safety: "Safety",
  "special-populations": "Specific groups",
  faqs: "FAQs",
};

/** YAML dates may arrive as Date objects; normalise to YYYY-MM-DD strings. */
const dateString = z.preprocess(
  (v) => (v instanceof Date ? v.toISOString().slice(0, 10) : v),
  z.string().min(4),
);

export const frontmatterSchema = z.object({
  title: z.string().min(5),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be lowercase kebab-case"),
  description: z.string().min(20).max(200),
  cluster: z.enum(CONTENT_CLUSTERS),
  hub: z.enum(["mounjaro", "wegovy", "oral-glp1", "injections", "general"]),
  primaryKeyword: z.string().min(2),
  secondaryKeywords: z.array(z.string()).default([]),
  author: z.string().min(1),
  medicalReviewer: z.string().nullable().default(null),
  reviewStatus: z.enum(["draft", "pending-clinical-review", "clinically-reviewed"]),
  publishedAt: dateString.nullable().default(null),
  updatedAt: dateString,
  readingMinutes: z.number().int().positive(),
  faqs: z.array(z.object({ q: z.string().min(3), a: z.string().min(3) })).default([]),
  sources: z
    .array(
      z.object({
        title: z.string().min(3),
        publisher: z.string().min(2),
        year: z.number().int(),
        url: z.string().url().optional(),
      }),
    )
    .default([]),
  related: z.array(z.string()).default([]),
  canonicalPath: z
    .string()
    .regex(/^\/[a-z0-9-]+(?:\/[a-z0-9-]+)*$/, "canonicalPath must be a lowercase site-relative path, e.g. /mounjaro-side-effects")
    .optional(),
});

export interface TocItem {
  id: string;
  text: string;
  depth: 2 | 3;
}

export interface Article {
  frontmatter: ArticleFrontmatter;
  body: string;
  toc: TocItem[];
  file: string;
}

export interface ArticleLoadError {
  file: string;
  message: string;
}

export interface PillarPlanItem {
  n: number;
  slug: string;
  title: string;
  cluster: ContentCluster;
  hub: ArticleFrontmatter["hub"];
  primaryKeyword: string;
}

export const pillars = pillarsJson as PillarPlanItem[];

function includeSamples() {
  return process.env.INCLUDE_SAMPLE_CONTENT === "true" && process.env.NODE_ENV !== "production";
}

/** Whether unreviewed articles may be shown (always in dev/preview builds). */
export function showUnreviewed(): boolean {
  return flags.showUnreviewedContent || process.env.NODE_ENV !== "production";
}

/** Extracts h2/h3 headings from markdown, matching rehype-slug's ids. */
export function extractToc(body: string): TocItem[] {
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];
  let inFence = false;
  for (const line of body.split("\n")) {
    if (/^\s*```/.test(line)) inFence = !inFence;
    if (inFence) continue;
    const m = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!m) continue;
    const text = m[2].replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").replace(/[*_`]/g, "").trim();
    items.push({ id: slugger.slug(text), text, depth: m[1].length as 2 | 3 });
  }
  return items;
}

interface LoadResult {
  articles: Article[];
  errors: ArticleLoadError[];
}

/** Reads and validates every article file once per build/request. */
const loadAll = cache((): LoadResult => {
  const articles: Article[] = [];
  const errors: ArticleLoadError[] = [];
  if (!fs.existsSync(ARTICLES_DIR)) return { articles, errors };

  const files = fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .filter((f) => !f.startsWith("_") || includeSamples())
    .sort();

  for (const file of files) {
    try {
      const raw = fs.readFileSync(path.join(ARTICLES_DIR, file), "utf8");
      const { data, content } = matter(raw);
      const parsed = frontmatterSchema.safeParse(data);
      if (!parsed.success) {
        const message = parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ");
        errors.push({ file, message });
        console.warn(`[content] Skipping ${file}: invalid frontmatter (${message})`);
        continue;
      }
      const fm = parsed.data as ArticleFrontmatter;
      articles.push({ frontmatter: fm, body: content, toc: extractToc(content), file });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      errors.push({ file, message });
      console.warn(`[content] Skipping ${file}: ${message}`);
    }
  }

  // Guard against duplicate slugs: keep the first, report the rest.
  const seen = new Set<string>();
  const unique = articles.filter((a) => {
    if (seen.has(a.frontmatter.slug)) {
      errors.push({ file: a.file, message: `duplicate slug "${a.frontmatter.slug}"` });
      return false;
    }
    seen.add(a.frontmatter.slug);
    return true;
  });

  return { articles: unique, errors };
});

function isVisible(a: Article): boolean {
  return a.frontmatter.reviewStatus === "clinically-reviewed" || showUnreviewed();
}

/** All visible articles, newest first. */
export function getAllArticles(): Article[] {
  return loadAll()
    .articles.filter(isVisible)
    .sort((a, b) => b.frontmatter.updatedAt.localeCompare(a.frontmatter.updatedAt) || a.frontmatter.title.localeCompare(b.frontmatter.title));
}

export function getArticle(slug: string): Article | undefined {
  return getAllArticles().find((a) => a.frontmatter.slug === slug);
}

/** Canonical URL of an article: its mount point if it has one, else /guides/{slug}. */
export function articleHref(a: Article | ArticleFrontmatter): string {
  const fm = "frontmatter" in a ? a.frontmatter : a;
  return fm.canonicalPath ?? `/guides/${fm.slug}`;
}

/** Visible article mounted at a programmatic path (see canonicalPath), if any. */
export function getMountedArticle(path: string): Article | undefined {
  return getAllArticles().find((a) => a.frontmatter.canonicalPath === path);
}

/** canonicalPath for a slug from ANY loaded article (visible or not), used to rewrite internal links. */
export function getCanonicalPathForSlug(slug: string): string | undefined {
  return loadAll().articles.find((a) => a.frontmatter.slug === slug)?.frontmatter.canonicalPath;
}

/** Visible articles served at /guides/{slug} (i.e. not mounted elsewhere). */
export function getGuideRouteArticles(): Article[] {
  return getAllArticles().filter((a) => !a.frontmatter.canonicalPath);
}

export function getArticleSlugs(): string[] {
  return getAllArticles().map((a) => a.frontmatter.slug);
}

export function getArticleLoadErrors(): ArticleLoadError[] {
  return loadAll().errors;
}

export function getArticlesByCluster(cluster: ContentCluster): Article[] {
  return getAllArticles().filter((a) => a.frontmatter.cluster === cluster);
}

export function getArticlesByHub(hub: ArticleFrontmatter["hub"]): Article[] {
  return getAllArticles().filter((a) => a.frontmatter.hub === hub);
}

/** Clusters that have at least one visible article. */
export function getActiveClusters(): ContentCluster[] {
  const present = new Set(getAllArticles().map((a) => a.frontmatter.cluster));
  return CONTENT_CLUSTERS.filter((c) => present.has(c));
}

/** Resolves related slugs to visible articles, topping up from the same cluster. */
export function getRelatedArticles(article: Article, limit = 4): Article[] {
  const all = getAllArticles();
  const bySlug = new Map(all.map((a) => [a.frontmatter.slug, a]));
  const out: Article[] = [];
  for (const slug of article.frontmatter.related) {
    const a = bySlug.get(slug);
    if (a && a.frontmatter.slug !== article.frontmatter.slug) out.push(a);
  }
  for (const a of all) {
    if (out.length >= limit) break;
    if (a.frontmatter.cluster === article.frontmatter.cluster && a.frontmatter.slug !== article.frontmatter.slug && !out.includes(a)) {
      out.push(a);
    }
  }
  return out.slice(0, limit);
}

export interface GuideLink {
  slug: string;
  title: string;
  href: string;
  cluster: ContentCluster;
}

/**
 * Guides for a hub (and optionally clusters), drawn from the pillar plan but
 * only returned when the article is actually published, so we never link to a 404.
 */
export function getGuideLinks(opts: { hubs?: ArticleFrontmatter["hub"][]; clusters?: ContentCluster[]; limit?: number }): GuideLink[] {
  const visible = new Map(getAllArticles().map((a) => [a.frontmatter.slug, a]));
  const items = pillars
    .filter((p) => (!opts.hubs || opts.hubs.includes(p.hub)) && (!opts.clusters || opts.clusters.includes(p.cluster)))
    .filter((p) => visible.has(p.slug))
    .map((p) => ({
      slug: p.slug,
      title: visible.get(p.slug)!.frontmatter.title,
      href: articleHref(visible.get(p.slug)!),
      cluster: p.cluster,
    }));
  return typeof opts.limit === "number" ? items.slice(0, opts.limit) : items;
}
