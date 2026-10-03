import type { ArticleFrontmatter, Medication, Provider } from "@/types";
import type { Author } from "@/data/authors";
import { site } from "@/config/site";
import { absoluteUrl } from "@/lib/utils";

/**
 * JSON-LD builders. Rules:
 *  - Never emit Review / AggregateRating with invented or unverified data.
 *  - MedicalWebPage gets reviewedBy / lastReviewed only when an article is
 *    genuinely clinically reviewed by a registered clinician.
 */

export type JsonLd = Record<string, unknown>;

const ORG_ID = `${absoluteUrl("/")}#organization`;
const SITE_ID = `${absoluteUrl("/")}#website`;

export function organizationSchema(): JsonLd {
  const sameAs = Object.values(site.social).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.name,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/icon.svg"),
    email: site.contactEmail,
    description: site.description,
    ...(sameAs.length ? { sameAs } : {}),
    publishingPrinciples: absoluteUrl("/editorial-policy"),
    correctionsPolicy: absoluteUrl("/corrections"),
    ownershipFundingInfo: absoluteUrl("/affiliate-disclosure"),
    actionableFeedbackPolicy: absoluteUrl("/contact"),
  };
}

export function websiteSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    name: site.name,
    url: absoluteUrl("/"),
    inLanguage: "en-GB",
    publisher: { "@id": ORG_ID },
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${absoluteUrl("/search")}?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };
}

export interface Crumb {
  name: string;
  href: string;
}

export function breadcrumbSchema(items: Crumb[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.href),
    })),
  };
}

function personSchema(a: Author): JsonLd {
  return {
    "@type": a.role === "editor" && a.slug === "editorial-team" ? "Organization" : "Person",
    name: a.name,
    url: absoluteUrl(`/authors/${a.slug}`),
    ...(a.sameAs.length ? { sameAs: a.sameAs } : {}),
  };
}

/** True only when the article is reviewed AND the reviewer has a verifiable registration. */
export function isGenuinelyReviewed(fm: ArticleFrontmatter, reviewer: Author | undefined): reviewer is Author {
  return fm.reviewStatus === "clinically-reviewed" && !!reviewer && reviewer.registration !== null;
}

export function articleSchema(fm: ArticleFrontmatter, author: Author | undefined): JsonLd {
  const url = absoluteUrl(fm.canonicalPath ?? `/guides/${fm.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: fm.title,
    description: fm.description,
    url,
    inLanguage: "en-GB",
    mainEntityOfPage: url,
    ...(fm.publishedAt ? { datePublished: fm.publishedAt } : {}),
    dateModified: fm.updatedAt,
    author: author ? personSchema(author) : { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    keywords: [fm.primaryKeyword, ...fm.secondaryKeywords].join(", "),
    ...(fm.sources.length
      ? {
          citation: fm.sources.map((s) => ({
            "@type": "CreativeWork",
            name: s.title,
            publisher: s.publisher,
            datePublished: String(s.year),
            ...(s.url ? { url: s.url } : {}),
          })),
        }
      : {}),
  };
}

export function medicalWebPageSchema(opts: {
  path: string;
  title: string;
  description: string;
  updatedAt?: string | null;
  frontmatter?: ArticleFrontmatter;
  reviewer?: Author;
  about?: Medication[];
}): JsonLd {
  const reviewed = opts.frontmatter ? isGenuinelyReviewed(opts.frontmatter, opts.reviewer) : false;
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: opts.title,
    description: opts.description,
    url: absoluteUrl(opts.path),
    inLanguage: "en-GB",
    isPartOf: { "@id": SITE_ID },
    publisher: { "@id": ORG_ID },
    medicalAudience: { "@type": "MedicalAudience", audienceType: "Patient" },
    ...(opts.updatedAt ? { dateModified: opts.updatedAt } : {}),
    ...(opts.about?.length
      ? {
          about: opts.about.map((m) => ({
            "@type": "Drug",
            name: m.name,
            nonProprietaryName: m.genericName,
            ...(m.manufacturer ? { manufacturer: { "@type": "Organization", name: m.manufacturer } } : {}),
            prescriptionStatus: "https://schema.org/PrescriptionOnly",
          })),
        }
      : {}),
    ...(reviewed && opts.reviewer && opts.frontmatter
      ? {
          reviewedBy: { "@type": "Person", name: opts.reviewer.name, url: absoluteUrl(`/authors/${opts.reviewer.slug}`) },
          lastReviewed: opts.frontmatter.updatedAt,
        }
      : {}),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]): JsonLd | null {
  if (!faqs.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Provider list. Deliberately contains no ratings. */
export function providerItemListSchema(providers: Provider[], path: string, name: string): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    url: absoluteUrl(path),
    numberOfItems: providers.length,
    itemListElement: providers.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absoluteUrl(`/providers/${p.slug}`),
      name: p.name,
    })),
  };
}

/**
 * Editorial Review of a provider. Returns null unless the provider is verified
 * AND a real methodology score exists. We never emit AggregateRating built from
 * third-party scores or invented values.
 */
export function providerReviewSchema(provider: Provider, editorialScore: number | null, author?: Author): JsonLd | null {
  if (!provider.verified || editorialScore === null) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: { "@type": "Organization", name: provider.name, url: provider.website },
    reviewRating: { "@type": "Rating", ratingValue: editorialScore, bestRating: 10, worstRating: 0 },
    author: author ? personSchema(author) : { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    url: absoluteUrl(`/providers/${provider.slug}`),
  };
}
