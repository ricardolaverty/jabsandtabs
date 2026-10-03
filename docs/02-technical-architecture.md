# Part 2: Technical architecture

**Owner:** Tech lead · **Status:** Draft · **Last updated:** 3 October 2026
**Depends on:** `CONTRACTS.md` §1, `prisma/schema.prisma`, `src/lib/repo.ts`, `src/lib/routes.ts`, `src/config/flags.ts`

This document describes the target architecture and how it extends what is already in the repository. Where the code already implements something, the file is named. Anything marked *(planned)* is not built yet.

---

## 1. Architecture overview

```
                       ┌───────────────────────────── Vercel ─────────────────────────────┐
  Browser ──HTTPS──►   │  Edge: redirects (next.config.ts), security headers, middleware    │
                       │        (lowercase, flag-gated 404s)                                │
                       │                                                                    │
                       │  Next.js 15 App Router (React 19 Server Components)                │
                       │   ├─ Static (SSG) at build: trust pages, tools shell               │
                       │   ├─ ISR: hubs, topics, guides, providers, compare, prices         │
                       │   │        revalidate by tag on data change, plus a time fallback  │
                       │   ├─ Route handlers: /go/[provider] (302 + anonymous click log),   │
                       │   │        /api/revalidate (signed), /api/search-index              │
                       │   └─ /admin (planned): auth-protected editorial UI                  │
                       └───────────────┬───────────────────────────────┬───────────────────┘
                                       │                               │
                         src/lib/repo.ts (single data gateway)   content/articles/*.mdx
                           │ DATABASE_URL set?                   (git-based CMS; read by
                 yes ──────┤                                      src/lib/content.ts at build)
                           │                                              │
                 Prisma ► PostgreSQL (Neon / Vercel Postgres /            │
                          Supabase; UK or EU region)                      │
                           │                                              │
                 no ──────► src/data/*.ts static fallback        GitHub PR workflow
                                                                (draft → fact-check →
                                                                 clinical review → merge)
```

### 1.1 Key decisions

| Decision | Choice | Reason |
|---|---|---|
| Framework | Next.js 15 App Router, React Server Components, TypeScript strict | Server rendering for SEO, near-zero client JavaScript on content pages, ISR for data freshness |
| Rendering | SSG for static pages; ISR (`revalidate` plus `revalidateTag`) for data pages | Fast TTFB from the CDN. Data edits appear within seconds via on-demand revalidation |
| Data | PostgreSQL with Prisma 6, with a static fallback in `src/data` | The site builds and previews with no database (already implemented in `repo.ts`) |
| Content | MDX in git (`content/articles`), frontmatter validated with Zod | Full history and review trail in git; no CMS licence cost at MVP; easy for writers and agents |
| Styling | Tailwind CSS v4 with shadcn/ui (Radix primitives) | Accessible primitives, design tokens in CSS variables (`globals.css`) |
| Hosting | Vercel (Pro plan for commercial use) | Native ISR, preview deployments for every content PR |
| Search | Static JSON index with Fuse.js on the client *(index route planned)* | No third-party search service; no personal data |
| Feature flags | Environment variables read on the server (`flags.ts`) | Flags cannot be toggled from the client; each environment can differ; changing a flag needs a redeploy, which leaves an audit trail |

### 1.2 Upgrade path to a headless CMS

The MDX git CMS suits the first 12–18 months. Move to a headless CMS when any of these is true: more than 5 non-technical editors; more than about 600 articles; a need for scheduled publishing without a deploy; or a need for structured review sign-off inside the CMS rather than in GitHub.

| Option | Fit | Migration notes |
|---|---|---|
| **Payload CMS 3** (recommended) | Runs inside the same Next.js app; uses our Postgres; code-first schemas mirror Prisma; self-hosted, so no data leaves our infrastructure | Map `ArticleIndex` to a Payload `articles` collection; store the body as Lexical rich text or keep MDX in a code field; reuse `Author` and `ReviewerCredential`; use Payload access control for the review states |
| **Sanity** | Excellent editorial UX; hosted content lake; GROQ | Content held by a third party (check the DPA and data region); needs a portable-text renderer for our allowed components |

Migration steps: (1) freeze the MDX schema; (2) write a one-off importer from `content/articles` to the CMS; (3) switch `src/lib/content.ts` to read from the CMS API behind the same interface; (4) keep the URLs and frontmatter fields identical so there are no SEO changes; (5) archive the MDX directory read-only.

---

## 2. Folder structure

Current files are marked ✓. Everything else is the intended structure.

```
jabsandtabs/
├── CONTRACTS.md ✓                     Shared rules (URL scheme, compliance)
├── next.config.ts ✓                   Redirects (reverse comparisons, vanity), security headers
├── package.json ✓  tsconfig.json ✓  components.json ✓  postcss.config.mjs ✓
├── prisma/
│   ├── schema.prisma ✓                Data model (§3)
│   ├── seed.ts                        Seeds from src/data/*
│   └── migrations/                    Generated migrations (committed)
├── content/
│   ├── articles/*.mdx                 Pillars and supporting articles (writers only)
│   ├── pages/*.mdx                    Trust pages (editorial policy and others)
│   └── plan/
│       ├── pillars.json ✓             100 pillars
│       ├── supporting-articles.json ✓ 300 supporting articles
│       └── programmatic-urls.csv ✓    654 programmatic URLs
├── docs/                              This documentation set
│   └── compliance/  README.md, SIGN-OFF.md
├── public/                            Static assets (logos only with permission)
├── scripts/
│   ├── validate-content.ts            Frontmatter, link and banned-word checks (CI)
│   ├── check-links.ts                 Internal link budget and orphan detection
│   └── price-verification-report.ts   Lists prices older than SLA
└── src/
    ├── app/
    │   ├── layout.tsx ✓  globals.css ✓  icon.svg ✓
    │   ├── page.tsx                   Homepage
    │   ├── [slug]/page.tsx            Medication hubs, class hubs, topics, doses, med comparisons
    │   ├── [slug]/[sub]/page.tsx      Medication side-effect pages
    │   ├── providers/page.tsx
    │   ├── providers/[slug]/page.tsx
    │   ├── providers/[slug]/[med]/page.tsx
    │   ├── providers/[slug]/[med]/[dose]/page.tsx     GATED pomPricing
    │   ├── providers/[slug]/discount-codes/page.tsx   GATED discountCodes
    │   ├── compare/page.tsx  compare/[pair]/page.tsx
    │   ├── prices/page.tsx   prices/[med]/page.tsx
    │   ├── guides/page.tsx   guides/[slug]/page.tsx  guides/topic/[cluster]/page.tsx
    │   ├── tools/page.tsx    tools/bmi-calculator/page.tsx  tools/eligibility-checker/page.tsx
    │   ├── authors/[slug]/page.tsx
    │   ├── (trust)/about|editorial-policy|…/page.tsx
    │   ├── search/page.tsx
    │   ├── go/[provider]/route.ts     GATED affiliateLinks: anonymous click log + 302
    │   ├── api/revalidate/route.ts    HMAC-signed on-demand revalidation
    │   ├── admin/…                    (planned) editorial UI behind auth
    │   ├── sitemap.ts  robots.ts  not-found.tsx  opengraph-image.tsx
    ├── components/
    │   ├── ui/ ✓                      shadcn primitives
    │   ├── layout/ ✓                  header, footer, nav, breadcrumbs, cookie consent
    │   ├── seo/json-ld.tsx ✓
    │   ├── medication/                DoseLadder, SideEffectTable, StatusBadge, KeyFacts
    │   ├── provider/                  ProviderCard, RegulatorBadge, VerifiedStamp
    │   ├── compare/                   ComparisonTable (→ cards on mobile), CompareBuilder
    │   ├── prices/                    PriceTable [G], PriceHistoryChart [G], ServiceTable
    │   ├── mdx/                       KeyTakeaways, Callout, ProviderComparisonCTA, MedicalDisclaimer
    │   ├── tools/                     BmiForm, EligibilityForm (client components)
    │   └── commercial/                StickyCta [G], OfferCard [G], AffiliateButton [G]
    ├── config/ flags.ts ✓  site.ts ✓
    ├── data/ ✓                        Static fallback and seed data
    ├── lib/
    │   ├── repo.ts ✓                  The only data gateway (Prisma or static)
    │   ├── routes.ts ✓                Route registry (single source of URLs)
    │   ├── content.ts ✓               MDX loading, frontmatter validation, reviewStatus filter
    │   ├── seo.ts ✓  schema.ts ✓      Metadata and JSON-LD builders
    │   ├── affiliate.ts ✓             Flag-aware CTA resolution
    │   ├── prisma.ts ✓  utils.ts ✓
    │   └── bmi.ts                     Pure BMI and threshold logic (unit-tested)
    └── types/index.ts ✓
```

---

## 3. Database schema

Implemented in `prisma/schema.prisma`. Entities and relationships:

```
Medication 1─* Dose
Medication *─* SideEffect           (via MedicationSideEffect, with a `common` flag)
Medication *─* Provider             (via ProviderMedication, with `available`, `checkedAt`)
Provider   1─* PricePoint *─1 Medication, PricePoint *─0..1 Dose   (append-only history)
Provider   1─* Offer
Provider   1─* AffiliateLink 1─* ClickEvent (anonymous)
Author     1─0..1 ReviewerCredential
Author     1─* ArticleIndex (as author)   Author 1─* ArticleIndex (as reviewer)
ArticleIndex 1─* Correction       ArticleIndex 1─* EditorialAudit
```

| Entity | Purpose | Key fields and rules |
|---|---|---|
| **Medication** | One row per medicine | `slug` (unique, fixed set), `genericName`, `drugClass`, `route`, `frequency`, `ukStatus` (`licensed`, `licensed_diabetes_only`, `not_yet_licensed`, `verify`), `dosesVerified`, `mhraApproval`, `niceGuidance`, `titrationStepWeeks`. Pages for `verify` or unverified-dose medicines are `noindex` (`isMedicationUnverified`) |
| **Dose** | Licensed strengths | `mg`, `slug` (`2-5mg`), `role` (starting, titration, maintenance, maximum), `sortOrder`. Unique per medication |
| **SideEffect** | Shared side-effect vocabulary | `slug`, `name`, `injectableOnly`, `seriousness`. Frequency per medicine comes from the SmPC and is held in `side-effect-guidance.ts` (to move to `MedicationSideEffect` with `frequencyBand` and `smpcSection` *(planned)*) |
| **Provider** | A regulated online service | Regulator fields (`gphcNumber`, `cqcRegistered`), Trustpilot snapshot with `trustpilotChecked`, service facts, `verified`, `lastVerifiedAt`. A provider page is indexable only when `verified = true` and `lastVerifiedAt` is within 90 days |
| **ProviderMedication** | Which provider offers which medicine | `available`, `checkedAt` |
| **PricePoint** | Append-only price observations | `retailPrice`, `discountPrice`, `deliveryCharge`, `consultationFee`, `checkedAt`, `sourceUrl` (required), `verifiedBy` (required). The latest row per provider, medication and dose is current; older rows form the history. Never updated in place, never deleted (corrections are new rows plus a note) |
| **Offer** | Discounts and codes (gated) | `code`, `terms`, `sourceUrl`, `validFrom`/`validUntil`, `verifiedAt`/`verifiedBy`, `active` (default false). Expired offers are hidden automatically |
| **AffiliateLink** | Tracking URLs per network | `network`, `trackingUrl`, `active` (default false). Only used by `/go/[provider]` when `flags.affiliateLinks` is on |
| **ClickEvent** | Anonymous outbound click log | `linkId`, `page`, `createdAt` only. **No IP, user agent, cookie ID or personal data**, so it is outside PECR consent and the UK GDPR |
| **Author** | Writers, editors, reviewers | `slug`, `role`, `bio`, `image`, `sameAs` |
| **ReviewerCredential** | Professional registration | `body` (GPhC, GMC, NMC, HCPC), `registrationNumber`, `registerUrl`, `verifiedAt`, `verifiedBy`. An article cannot become `clinically_reviewed` unless its reviewer has a credential verified in the last 12 months |
| **ArticleIndex** | Database mirror of MDX frontmatter for workflow and reporting | `status`, `authorId`, `reviewerId`, `reviewedAt`, `publishedAt`. Synced from git on deploy |
| **Correction** | Public corrections log | `pagePath`, `summary`, `details`, `reportedAt`, `correctedAt`. Feeds `/corrections` |
| **EditorialAudit** | Immutable audit trail | `entity`, `entityId`, `action`, `actor`, `notes`. Written for every price entry, provider verification, review sign-off and flag-relevant change |

*(Planned)* additions:
- `PricePoint.supplyWeeks` (default 4) so that per-week cost comparisons are like for like.
- `Provider.regulatorChecks` JSON (register URL, checked date, checker) for GPhC premises, the superintendent pharmacist and CQC/HIS/HIW/RQIA as relevant.
- `ReviewSchedule` (articleId, dueAt, reason), or derive it from `reviewedAt` plus the cadence in Part 6.

---

## 4. Editorial workflow

### 4.1 States

```
 draft ──► fact-check ──► pending-clinical-review ──► clinically-reviewed ──► published
   ▲            │                    │                        │                    │
   └── changes ─┴──── changes ───────┘                        │          scheduled re-review
                                                              │          (6 or 12 months, or on trigger)
                                                              └──────────────◄─────┘
```

Frontmatter `reviewStatus` holds `draft`, `pending-clinical-review` or `clinically-reviewed`. The fact-check stage is tracked by a PR label and an `EditorialAudit` row.

| Stage | Who | Exit criteria | Tooling |
|---|---|---|---|
| Brief | SEO lead | Brief from `supporting-articles.json` or `pillars.json`; keyword ownership checked against Part 1 §4 | GitHub issue from template |
| Draft | Writer | Allowed components only; British English; `sources` complete; no prices in body copy; banned words absent | Branch plus PR; CI runs `validate-content` |
| Fact-check | Editor (not the author) | Every factual claim traced to a listed source; trial figures checked against the paper; regulatory statuses dated | PR review with a "fact-checked" label |
| Clinical review | Registered pharmacist or doctor | Clinical accuracy, safety messaging, red flags and prescriber signposting; sign-off recorded with name and registration | PR approval by a CODEOWNER from the reviewer group, then the reviewer is set in frontmatter |
| Publish | Managing editor | `reviewStatus: clinically-reviewed`, `medicalReviewer` set, `publishedAt` set | Merge to `main`; Vercel deploy |
| Re-review | Reviewer | Scheduled by cadence or triggered (new SmPC, MHRA Drug Safety Update, NICE TA, price change, correction) | Weekly job lists due items |

**Production gate in code:** `content.ts` excludes any article that is not `clinically-reviewed` unless `flags.showUnreviewedContent` is on, and that flag must never be on in production. Add a CI check that fails the production build if it is.

### 4.2 CI content checks (`scripts/validate-content.ts`)

- Zod-validate frontmatter against `ArticleFrontmatter`.
- Only allowed MDX components; at most two `<ProviderComparisonCTA>`; `<KeyTakeaways>` after the intro; `<MedicalDisclaimer />` at the end.
- Banned-phrase scan: "buy", "order now", "get yours", "best" (as a superlative about a medicine or provider), "miracle", "guaranteed", "cheapest" (outside the gated price components), "£" followed by digits in body copy, "% off", "discount code".
- American spelling scan (diarrhea, esophagus, anesthesia, program as a noun, center, color).
- Internal link rules: ≥1 up link, ≥3 sideways links, ≥1 conversion link; all targets resolve in the route registry.
- `sources` URLs return 200 (weekly job, not blocking).

---

## 5. Price-data pipeline

**Principle:** prices are facts about third parties. They are collected only from the provider's own public pages or a feed the provider has agreed to supply. They are **never scraped without written permission**, never estimated, and every value carries its source and date. Prices are **displayed only when `flags.pomPricing` is on**. Until then they are collected for internal accuracy testing only.

```
 Provider site / agreed feed / affiliate network product feed (with permission)
                │
   ┌────────────┴─────────────┐
   │ Manual capture (MVP)     │  Editor opens the provider page, records retail and discount price,
   │ via /admin price form    │  delivery and consultation fee, supply length, sourceUrl,
   └────────────┬─────────────┘  takes a screenshot (stored privately) → new PricePoint row
                │
   ┌────────────┴─────────────┐
   │ Second-person check      │  A different editor confirms within 24h → EditorialAudit "verified"
   └────────────┬─────────────┘
                │
   ┌────────────┴─────────────┐
   │ Scheduled verification   │  Weekly job flags prices older than the SLA (7 days for indexable
   │ (cron, Vercel)           │  price pages, 14 days otherwise) → "stale" badge, then auto-hide at 21 days
   └────────────┬─────────────┘
                │
   ┌────────────┴─────────────┐
   │ Optional permitted feeds │  Only with a signed data agreement: the feed is ingested to staging
   │ (Phase 3+)               │  tables, diffed, and human-approved before becoming PricePoints
   └────────────┬─────────────┘
                ▼
     revalidateTag("prices:{med}") → ISR pages refresh
```

Display rules (when the flag is on):
- Show "Price checked {date} at {provider site}" beside every price.
- Show the full cost: medication, consultation, delivery. Do not lead with a discount-only figure (CMA drip-pricing rules under the DMCC Act 2024).
- Default sort is alphabetical or methodology score, **not** price, until legal advice confirms that price-led ranking of POMs is acceptable.
- Stale prices (past the SLA) show a warning; prices older than 21 days are hidden.

---

## 6. Analytics and consent

| Item | Approach |
|---|---|
| Consent mechanism | `cookie-consent.tsx` (implemented): no non-essential cookies or scripts before consent; the choice is stored in a strictly necessary first-party cookie `jt_consent`; "Reject all" has equal prominence to "Accept all"; preferences can be reopened from the footer |
| Analytics | Privacy-first and cookieless where possible (for example Plausible or Fathom, EU-hosted). If GA4 is used, load it only after analytics consent, with Consent Mode v2 defaults set to denied |
| PECR status | Treat analytics cookies as needing consent. The Data (Use and Access) Act 2025 introduces an exemption for some analytics cookies; legal advice must confirm whether it has commenced and how it applies before relying on it |
| Health data | Never send health inputs (BMI tool values, eligibility answers, conditions) to analytics. Tools compute client-side and do not store or transmit inputs. Event names may say "bmi_calculated" but carry no values |
| Search Console | Domain property verified by DNS |
| Affiliate attribution | `/go/[provider]` logs an anonymous `ClickEvent` server-side; network sub-IDs contain only the page slug, never user identifiers |
| Tag manager | None at MVP. Every script is reviewed and added in code |

---

## 7. Performance budget

| Metric (p75, mobile, field data from CrUX or RUM) | Target | Hard limit |
|---|---|---|
| Largest Contentful Paint (LCP) | ≤ 2.0 s | 2.5 s |
| Interaction to Next Paint (INP) | ≤ 150 ms | 200 ms |
| Cumulative Layout Shift (CLS) | ≤ 0.05 | 0.1 |
| Time to First Byte (TTFB) | ≤ 400 ms | 800 ms |
| JavaScript transferred (content pages) | ≤ 90 KB gzip | 130 KB |
| JavaScript transferred (tools, compare builder) | ≤ 150 KB gzip | 200 KB |
| CSS | ≤ 30 KB gzip | 50 KB |
| Web fonts | 2 families, subset, `font-display: swap`, preloaded via `next/font` | 3 files |
| Images | AVIF or WebP via `next/image`, explicit dimensions, hero ≤ 80 KB | — |
| Third-party scripts before consent | 0 | 0 |
| Lighthouse (lab, mobile) | Performance ≥ 90, Accessibility 100, SEO 100 | Performance 85 |

Enforcement: a Lighthouse CI budget on preview deployments; a bundle-size check in CI; Vercel Speed Insights (consent-aware) for field data.

---

## 8. Security

| Area | Control |
|---|---|
| Headers (`next.config.ts`) | Strict CSP (no `unsafe-inline` scripts; nonces for JSON-LD if needed), HSTS (preload after 1 month stable), `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` denying camera, microphone and geolocation, `frame-ancestors 'none'` |
| Admin | `/admin` behind SSO (Auth.js with Google Workspace or Microsoft Entra), mandatory MFA, role-based access (editor, reviewer, admin), `noindex` header (implemented), rate-limited |
| Database | Least-privilege roles (the app is read-only except for the admin and click-log paths); TLS; UK or EU region; daily backups with 30-day point-in-time recovery |
| Secrets | Vercel encrypted environment variables; no secrets in git; flags are environment variables, so changing one is a deploy with an audit trail |
| Revalidation API | HMAC-signed requests with timestamp; reject replays older than 5 minutes |
| Outbound redirects | `/go/[provider]` only redirects to an `AffiliateLink.trackingUrl` stored in the database (no open redirect); `rel="sponsored nofollow noopener"` |
| Dependencies | Dependabot or Renovate; `npm audit` in CI; lockfile committed |
| Forms | Contact and corrections forms only; Turnstile or hCaptcha *(subject to the cookie review)*; no health data fields; retention of 12 months |
| Personal data | No accounts, no newsletter at MVP. If a newsletter is added: double opt-in, a separate consent record and a privacy notice update |
| Incident response | Documented runbook; the ICO must be notified of personal data breaches within 72 hours where required |
