# JabsAndTabs: shared contracts

Every contributor (human or agent) works to these contracts. Source of truth for types: `src/types/index.ts`. Data: `src/data/*`. Flags: `src/config/flags.ts`. Site config: `src/config/site.ts`.

## 1. Stack
Next.js (App Router, RSC) · TypeScript strict · Tailwind CSS v4 · shadcn/ui (Radix) · PostgreSQL + Prisma · MDX articles in `content/articles` (git-based CMS, editable via the admin or a headless CMS later) · Vercel. Path alias `@/*` → `src/*`.

Data access goes through `src/lib/repo.ts`. If `DATABASE_URL` is set it uses Prisma; otherwise it falls back to `src/data/*`, so the site builds with no DB.

## 2. URL scheme (canonical, lowercase, no trailing slash)

| Pattern | Example | Notes |
|---|---|---|
| `/` | | Homepage |
| `/{med}` | `/mounjaro` | Medication hub. med ∈ mounjaro, wegovy, saxenda, oral-semaglutide, foundayo |
| `/weight-loss-injections`, `/oral-glp1` | | Class hubs (jabs / tabs) |
| `/{med}-{topic}` | `/mounjaro-side-effects` | topic ∈ prices, side-effects, dosage, maintenance, eligibility, results, how-it-works, faqs |
| `/{med}-{dose}` | `/mounjaro-2-5mg` | Dose pages from `medications[].doses` |
| `/{med}-side-effects/{effect}` | `/mounjaro-side-effects/nausea` | From `sideEffects` |
| `/{medA}-vs-{medB}` | `/mounjaro-vs-wegovy` | From `medicationComparisons` |
| `/providers` · `/providers/{p}` | `/providers/boots` | Provider index / review |
| `/providers/{p}/{med}` | `/providers/boots/mounjaro` | Provider + medication |
| `/providers/{p}/{med}/{dose}` | | **Gated: flags.pomPricing** |
| `/providers/{p}/discount-codes` | | **Gated: flags.discountCodes** |
| `/compare` · `/compare/{p1}-vs-{p2}` | `/compare/boots-vs-superdrug` | p1/p2 in alphabetical order for canonical; redirect reverse order |
| `/prices` · `/prices/{med}` | | Comparison engine. Drug-price columns gated by flags.pomPricing; otherwise a service comparison |
| `/guides` · `/guides/{slug}` · `/guides/topic/{cluster}` | | Pillar + supporting articles |
| `/tools` · `/tools/bmi-calculator` · `/tools/eligibility-checker` | | Informational only: never a prescribing decision |
| `/authors/{slug}` | | E-E-A-T |
| `/about` `/editorial-policy` `/fact-checking` `/methodology` `/affiliate-disclosure` `/medical-disclaimer` `/corrections` `/privacy` `/cookies` `/terms` `/contact` | | Trust pages |
| `/search` | | Site search |

**Mounted pillars (anti-cannibalisation).** When a pillar article sets `canonicalPath` in its frontmatter (see §3), it is rendered as the long-form body of that programmatic URL (topic, `{medA}-vs-{medB}` or class-hub page), with the page's data-driven modules (dose table, side-effect list, comparison table) inserted above the article body. `/guides/{slug}` then 301-redirects to `canonicalPath` (generated in `next.config.ts` from the content folder), and only the canonical URL appears in the sitemap and in internal links. Mounted at launch: the 12 Mounjaro/Wegovy topic pillars, `mounjaro-vs-wegovy` and `oral-glp1-uk-guide` (see `docs/01-information-architecture.md` §4).

Top-level dynamic slugs are resolved by a single route registry (`src/lib/routes.ts`) used by `app/[slug]/page.tsx`, `app/[slug]/[sub]/page.tsx` and `app/sitemap.ts`.

## 3. Article file format: `content/articles/{slug}.mdx`

```yaml
---
title: "Mounjaro vs Wegovy: An Evidence-Based Comparison"
slug: "mounjaro-vs-wegovy"
description: "≤155 chars, factual, no promotional claims."
cluster: "comparisons"            # ContentCluster
hub: "mounjaro"                   # mounjaro | wegovy | oral-glp1 | injections | general
primaryKeyword: "mounjaro vs wegovy"
secondaryKeywords: ["tirzepatide vs semaglutide", "..."]
author: "editorial-team"
medicalReviewer: null
reviewStatus: "pending-clinical-review"
publishedAt: null
updatedAt: "2026-10-03"
readingMinutes: 14
faqs:
  - q: "Question?"
    a: "Answer in 40–80 words."
sources:
  - title: "Tirzepatide Once Weekly for the Treatment of Obesity (SURMOUNT-1)"
    publisher: "New England Journal of Medicine"
    year: 2022
    url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2206038"
related: ["slug-a", "slug-b", "slug-c"]
canonicalPath: "/mounjaro-vs-wegovy"  # OPTIONAL: only for pillars mounted at a programmatic URL (§2)
---
```

`canonicalPath` is optional. Omit it for normal articles (served at `/guides/{slug}`). It must be a lowercase site-relative path that the route registry resolves to a topic, comparison or class-hub page; otherwise the article is only reachable through the redirect target's data page. Do not set it without updating the anti-cannibalisation table in `docs/01-information-architecture.md` §4.

### Allowed MDX components (and nothing else)
- `<KeyTakeaways>` with a markdown bullet list inside: required, directly after the intro.
- `<Callout type="info|warning|evidence">…</Callout>`
- `<ProviderComparisonCTA medication="mounjaro" />`: flag-aware. With the flags off it links to our own `/providers` comparison, never out to a provider. Use at most twice per article.
- `<MedicalDisclaimer />`: required at the end of the article.
- Standard GFM markdown: `##`/`###` headings (no `#`, since the title renders as H1), tables, lists, links.

### Internal links
Use relative links only: hubs (`/mounjaro`, `/wegovy`, `/oral-glp1`, `/weight-loss-injections`), topic pages (`/mounjaro-side-effects`), comparisons (`/mounjaro-vs-wegovy`), `/providers`, `/prices`, `/tools/bmi-calculator`, `/tools/eligibility-checker`, and other pillars at `/guides/{slug}` (slugs in `content/plan/pillars.json`). Every article: ≥1 link up to its hub, ≥3 sideways links to other pillars, ≥1 link to a conversion page (`/providers`, `/prices` or `/compare`).

## 4. Editorial and compliance rules (non-negotiable)
1. **British English** throughout (oesophagus, diarrhoea, haemoglobin, programme, licence (noun), centre).
2. **No promotion of prescription-only medicines.** Content is balanced and educational. Never: "buy", "order now", "get yours", "best", "miracle", "guaranteed", discount codes, urgency, or before-and-after claims. Brand names may be used factually.
3. **No prices in article body copy.** Prices change and are gated. Explain what affects cost and link to `/prices`.
4. **Evidence-based.** Cite trials, SmPCs, NICE, MHRA and NHS by name in the text and list them in `sources`. Only cite sources you are confident exist. Never invent statistics, quotes, studies, URLs, experts or patient stories. If unsure of a figure, describe it qualitatively or verify it.
5. **Uncertain regulatory status** (oral semaglutide for weight loss in the UK, Foundayo/orforglipron UK licensing, Wegovy 7.2mg) must be stated as uncertain or "at the time of writing", with advice to check the MHRA/SmPC, unless verified.
6. **Prescribing decisions belong to the prescriber.** Repeatedly point readers to a GP, pharmacist or prescriber. Include red-flag symptoms (e.g. severe persistent abdominal pain → seek urgent care / NHS 111 / 999).
7. **No real patient data,** no testimonials, no named individuals' health details.
8. Every article stays `reviewStatus: pending-clinical-review` until a named, registered clinician signs it off.
