import "server-only";
import type { Dose, Medication, Provider, SideEffect } from "@/types";
import { flags } from "@/config/flags";
import {
  getMedications,
  getMedicationComparisons,
  getProviders,
  getProviderComparisonPairs,
  getSideEffectsForMedication,
  getAuthors,
} from "@/lib/repo";
import { CONTENT_CLUSTERS, getActiveClusters, getGuideRouteArticles, getMountedArticle, isIndexableArticle } from "@/lib/content";
import { topicSlug, doseSlug, comparisonSlug } from "@/lib/route-hrefs";

export * from "@/lib/route-hrefs";

/**
 * THE route registry (CONTRACTS.md §2).
 *
 * Every programmatic URL is enumerated here from the data, and every dynamic
 * slug is resolved here to a typed page descriptor. Pages, the sitemap and the
 * search index all use this module, so a URL either exists everywhere or
 * nowhere. Gated routes are excluded when their flag is off.
 */

export const MEDICATION_TOPICS = [
  "prices",
  "side-effects",
  "dosage",
  "maintenance",
  "eligibility",
  "results",
  "how-it-works",
  "faqs",
] as const;
export type MedicationTopic = (typeof MEDICATION_TOPICS)[number];

export const TOPIC_LABELS: Record<MedicationTopic, string> = {
  prices: "Prices and costs",
  "side-effects": "Side effects",
  dosage: "Dosage",
  maintenance: "Maintenance",
  eligibility: "Eligibility",
  results: "Results",
  "how-it-works": "How it works",
  faqs: "FAQs",
};

export const CLASS_HUBS = {
  "weight-loss-injections": { hub: "injections", title: "Weight loss injections", short: "Jabs" },
  "oral-glp1": { hub: "oral", title: "Oral GLP-1 tablets", short: "Tabs" },
} as const;
export type ClassHubSlug = keyof typeof CLASS_HUBS;

export const TRUST_PAGES = [
  { path: "/about", label: "About us" },
  { path: "/editorial-policy", label: "Editorial policy" },
  { path: "/fact-checking", label: "Fact-checking" },
  { path: "/methodology", label: "How we compare providers" },
  { path: "/affiliate-disclosure", label: "How we make money" },
  { path: "/medical-disclaimer", label: "Medical disclaimer" },
  { path: "/corrections", label: "Corrections" },
  { path: "/privacy", label: "Privacy policy" },
  { path: "/cookies", label: "Cookie policy" },
  { path: "/terms", label: "Terms of use" },
  { path: "/contact", label: "Contact" },
] as const;

// ---------------------------------------------------------------- Descriptors

export type TopLevelPage =
  | { kind: "medication-hub"; slug: string; medication: Medication }
  | { kind: "class-hub"; slug: ClassHubSlug; hub: "injections" | "oral"; medications: Medication[] }
  | { kind: "medication-topic"; slug: string; medication: Medication; topic: MedicationTopic }
  | { kind: "dose"; slug: string; medication: Medication; dose: Dose }
  | { kind: "medication-comparison"; slug: string; a: Medication; b: Medication };

export type NestedPage = {
  kind: "medication-side-effect";
  slug: string;
  sub: string;
  medication: Medication;
  sideEffect: SideEffect;
};

/** Medication data that the editorial team has not verified. Pages are noindexed. */
export function isMedicationUnverified(m: Medication): boolean {
  return m.ukStatus === "verify" || !m.dosesVerified;
}

// ---------------------------------------------------------------- Top level

async function buildTopLevelMap(): Promise<Map<string, TopLevelPage>> {
  const meds = await getMedications();
  const map = new Map<string, TopLevelPage>();

  for (const [slug, info] of Object.entries(CLASS_HUBS) as [ClassHubSlug, (typeof CLASS_HUBS)[ClassHubSlug]][]) {
    map.set(slug, { kind: "class-hub", slug, hub: info.hub, medications: meds.filter((m) => m.hub === info.hub) });
  }

  for (const m of meds) {
    map.set(m.slug, { kind: "medication-hub", slug: m.slug, medication: m });
    for (const topic of MEDICATION_TOPICS) {
      const s = topicSlug(m.slug, topic);
      map.set(s, { kind: "medication-topic", slug: s, medication: m, topic });
    }
    // Dose pages only when the dose schedule is verified against the UK SmPC.
    if (m.dosesVerified) {
      for (const d of m.doses) {
        const s = doseSlug(m.slug, d);
        map.set(s, { kind: "dose", slug: s, medication: m, dose: d });
      }
    }
  }

  for (const [a, b] of getMedicationComparisons()) {
    const ma = meds.find((m) => m.slug === a);
    const mb = meds.find((m) => m.slug === b);
    if (!ma || !mb) continue;
    const s = comparisonSlug(a, b);
    map.set(s, { kind: "medication-comparison", slug: s, a: ma, b: mb });
  }

  return map;
}

export async function getTopLevelSlugs(): Promise<string[]> {
  return [...(await buildTopLevelMap()).keys()];
}

export async function resolveTopLevel(slug: string): Promise<TopLevelPage | null> {
  return (await buildTopLevelMap()).get(slug.toLowerCase()) ?? null;
}

// ---------------------------------------------------------------- Nested

export async function getNestedParams(): Promise<{ slug: string; sub: string }[]> {
  const out: { slug: string; sub: string }[] = [];
  for (const m of await getMedications()) {
    for (const se of await getSideEffectsForMedication(m)) {
      out.push({ slug: topicSlug(m.slug, "side-effects"), sub: se.slug });
    }
  }
  return out;
}

export async function resolveNested(slug: string, sub: string): Promise<NestedPage | null> {
  const m = /^(.+)-side-effects$/.exec(slug);
  if (!m) return null;
  const meds = await getMedications();
  const medication = meds.find((x) => x.slug === m[1]);
  if (!medication) return null;
  const sideEffect = (await getSideEffectsForMedication(medication)).find((s) => s.slug === sub);
  if (!sideEffect) return null;
  return { kind: "medication-side-effect", slug, sub, medication, sideEffect };
}

// ---------------------------------------------------------------- Providers

export async function getProviderSlugs(): Promise<string[]> {
  return (await getProviders()).map((p) => p.slug);
}

export async function getProviderMedicationParams(): Promise<{ slug: string; med: string }[]> {
  const meds = await getMedications();
  const medSlugs = new Set(meds.map((m) => m.slug as string));
  return (await getProviders()).flatMap((p) =>
    p.medications.filter((m) => medSlugs.has(m)).map((med) => ({ slug: p.slug, med })),
  );
}

/** GATED: flags.pomPricing. Empty when the flag is off. */
export async function getProviderDoseParams(): Promise<{ slug: string; med: string; dose: string }[]> {
  if (!flags.pomPricing) return [];
  const meds = await getMedications();
  const out: { slug: string; med: string; dose: string }[] = [];
  for (const p of await getProviders()) {
    for (const medSlug of p.medications) {
      const med = meds.find((m) => m.slug === medSlug);
      if (!med || !med.dosesVerified) continue;
      for (const d of med.doses) out.push({ slug: p.slug, med: med.slug, dose: d.slug });
    }
  }
  return out;
}

/** GATED: flags.discountCodes. Empty when the flag is off. */
export async function getDiscountCodeProviderSlugs(): Promise<string[]> {
  if (!flags.discountCodes) return [];
  return getProviderSlugs();
}

export interface ComparePair {
  slug: string;
  a: Provider;
  b: Provider;
}

export async function getComparePairs(): Promise<ComparePair[]> {
  const providers = await getProviders();
  const out: ComparePair[] = [];
  for (const [x, y] of getProviderComparisonPairs()) {
    const a = providers.find((p) => p.slug === x);
    const b = providers.find((p) => p.slug === y);
    if (a && b) out.push({ slug: `${x}-vs-${y}`, a, b });
  }
  return out;
}

export async function resolveComparePair(pair: string): Promise<ComparePair | null> {
  return (await getComparePairs()).find((p) => p.slug === pair) ?? null;
}

// ---------------------------------------------------------------- All routes

export type RouteKind =
  | "home"
  | "static"
  | "trust"
  | "tool"
  | TopLevelPage["kind"]
  | NestedPage["kind"]
  | "provider-index"
  | "provider"
  | "provider-medication"
  | "provider-dose"
  | "provider-discounts"
  | "compare"
  | "prices"
  | "guide"
  | "guide-cluster"
  | "author";

export interface RouteEntry {
  path: string;
  kind: RouteKind;
  indexable: boolean;
  lastModified?: string;
  priority: number;
  changeFrequency: "daily" | "weekly" | "monthly" | "yearly";
}

/** Every URL on the site. Used by the sitemap (indexable only) and search index. */
export async function getAllRoutes(): Promise<RouteEntry[]> {
  const routes: RouteEntry[] = [];
  const push = (r: RouteEntry) => routes.push(r);

  push({ path: "/", kind: "home", indexable: true, priority: 1, changeFrequency: "daily" });
  for (const path of ["/providers", "/compare", "/prices", "/guides", "/tools"]) {
    push({ path, kind: path === "/providers" ? "provider-index" : "static", indexable: true, priority: 0.8, changeFrequency: "weekly" });
  }
  push({ path: "/search", kind: "static", indexable: false, priority: 0.1, changeFrequency: "monthly" });
  for (const path of ["/tools/bmi-calculator", "/tools/eligibility-checker"]) {
    push({ path, kind: "tool", indexable: true, priority: 0.6, changeFrequency: "monthly" });
  }
  for (const t of TRUST_PAGES) {
    push({ path: t.path, kind: "trust", indexable: true, priority: 0.4, changeFrequency: "monthly" });
  }

  const top = await buildTopLevelMap();
  for (const [slug, page] of top) {
    const unverified =
      page.kind === "class-hub"
        ? false
        : page.kind === "medication-comparison"
          ? isMedicationUnverified(page.a) || isMedicationUnverified(page.b)
          : isMedicationUnverified(page.medication);
    // A mounted article that is visible but unreviewed (dev/preview only) keeps the page out of the index.
    const mounted = getMountedArticle(`/${slug}`);
    push({
      path: `/${slug}`,
      kind: page.kind,
      indexable: !unverified && (!mounted || isIndexableArticle(mounted.frontmatter)),
      lastModified: mounted?.frontmatter.updatedAt,
      priority: page.kind === "medication-hub" || page.kind === "class-hub" ? 0.9 : 0.7,
      changeFrequency: "weekly",
    });
  }
  for (const n of await getNestedParams()) {
    const med = n.slug.replace(/-side-effects$/, "");
    const m = (await getMedications()).find((x) => x.slug === med);
    push({
      path: `/${n.slug}/${n.sub}`,
      kind: "medication-side-effect",
      indexable: m ? !isMedicationUnverified(m) : false,
      priority: 0.6,
      changeFrequency: "monthly",
    });
  }

  const providers = await getProviders();
  const meds = await getMedications();
  for (const p of providers) {
    push({ path: `/providers/${p.slug}`, kind: "provider", indexable: p.verified, lastModified: p.lastVerifiedAt ?? undefined, priority: 0.7, changeFrequency: "weekly" });
  }
  for (const { slug, med } of await getProviderMedicationParams()) {
    const p = providers.find((x) => x.slug === slug)!;
    const m = meds.find((x) => x.slug === med);
    push({
      path: `/providers/${slug}/${med}`,
      kind: "provider-medication",
      indexable: p.verified && !!m && !isMedicationUnverified(m),
      priority: 0.6,
      changeFrequency: "weekly",
    });
  }
  for (const { slug, med, dose } of await getProviderDoseParams()) {
    const p = providers.find((x) => x.slug === slug)!;
    push({ path: `/providers/${slug}/${med}/${dose}`, kind: "provider-dose", indexable: p.verified, priority: 0.5, changeFrequency: "weekly" });
  }
  for (const slug of await getDiscountCodeProviderSlugs()) {
    const p = providers.find((x) => x.slug === slug)!;
    push({ path: `/providers/${slug}/discount-codes`, kind: "provider-discounts", indexable: p.verified, priority: 0.4, changeFrequency: "daily" });
  }
  for (const pair of await getComparePairs()) {
    push({ path: `/compare/${pair.slug}`, kind: "compare", indexable: pair.a.verified && pair.b.verified, priority: 0.6, changeFrequency: "weekly" });
  }
  for (const m of meds) {
    push({ path: `/prices/${m.slug}`, kind: "prices", indexable: !isMedicationUnverified(m), priority: 0.7, changeFrequency: "daily" });
  }

  // Mounted articles (canonicalPath) are served at their programmatic URL, already listed above.
  for (const a of getGuideRouteArticles()) {
    push({
      path: `/guides/${a.frontmatter.slug}`,
      kind: "guide",
      indexable: isIndexableArticle(a.frontmatter),
      lastModified: a.frontmatter.updatedAt,
      priority: 0.7,
      changeFrequency: "monthly",
    });
  }
  for (const c of getActiveClusters()) {
    push({ path: `/guides/topic/${c}`, kind: "guide-cluster", indexable: true, priority: 0.5, changeFrequency: "weekly" });
  }
  for (const author of await getAuthors()) {
    push({ path: `/authors/${author.slug}`, kind: "author", indexable: !author.name.startsWith("["), priority: 0.3, changeFrequency: "monthly" });
  }

  return routes;
}

/** All cluster slugs (for static params; empty clusters render an empty state, noindexed). */
export function getAllClusterSlugs(): string[] {
  return [...CONTENT_CLUSTERS];
}
