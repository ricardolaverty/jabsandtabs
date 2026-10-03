# Part 7: Implementation plan

**Owner:** Project lead (site owner) · **Status:** Draft · **Last updated:** 3 October 2026
**Financial year:** October to September (FY27 = October 2026 to September 2027)

Four phases. Each commercial feature flag has its own **compliance gate** that must be passed and recorded in `docs/compliance/SIGN-OFF.md` before the flag is set to `true` in production. Phase dates are targets; gates are not. A phase may finish without its flag being enabled.

---

## 1. Team and roles

| Role | Responsibility | Commitment | Phase needed |
|---|---|---|---|
| **Project lead / owner** | Strategy, budget, sign-off owner | Part-time | 1 |
| **Managing editor** | Editorial standards, calendar, final publish, corrections | 0.5–1 FTE | 1 |
| **Registered pharmacist reviewer** (GPhC-registered, independent prescriber preferred) | Clinical review of every article and data page; reviewer profile; quotes for PR. Must declare conflicts of interest and must **not** work for a listed provider | 8–12 hrs a week (contract) | **1 (before any publication)** |
| Second clinical reviewer (GMC doctor or pharmacist) | Cover, peer review of high-risk topics (pregnancy, mental health, eating disorders) | Ad hoc | 2 |
| **SEO lead** | Keyword research (Ahrefs/Semrush), briefs, IA, internal linking, GSC, programmatic QC | 0.5 FTE | 1 |
| Writers (2–4) | Drafting pillars and supporting articles | Freelance | 1 |
| Fact-checker / sub-editor | Two-person rule; British English; source checks | 0.5 FTE | 1 |
| **Data editor** | Provider verification (registers, service facts), price capture when enabled, 90-day re-verification | 0.5 FTE | 1 (providers), 3 (prices) |
| Tech lead / developer | Next.js, Prisma, CI checks, performance, security | 0.5–1 FTE | 1 |
| Designer | Design system, templates, accessibility | Contract | 1 |
| **Regulatory / legal adviser** (UK advertising and medicines law) | Flag sign-offs, disclosure wording, review of commercial templates | Retained, ad hoc | **1 (pre-launch review)** |
| Data protection lead | ICO registration, privacy notice, cookie audit, DPIA if needed | Part-time (can be the owner, advised) | 1 |
| Digital PR lead | Campaigns, outreach | Contract | 2 |
| Commercial / partnerships lead | Affiliate agreements (only after gates), network relations | Part-time | 3 |

**Separation of duties:** the commercial lead has no edit rights on editorial content or provider assessments, and the clinical reviewer has no commercial incentive (fixed fee, not linked to traffic or revenue).

---

## 2. Phase 1: MVP (months 1–3, Oct–Dec 2026, Q1 FY27)

**Scope:** an education-first site with all flags off.

| Deliverable | Detail | Owner |
|---|---|---|
| Core platform | Next.js app per `CONTRACTS.md`; route registry; static fallback; Prisma schema; CI content checks; Lighthouse budget | Tech lead |
| Design system v1 | Tokens (including the `--input-strong` fix), components in Part 3, all templates in Part 4 (flag-off variants) | Designer and tech lead |
| Trust layer | All 11 trust pages; disclosure wording approved by the adviser; author and reviewer profiles | Managing editor and owner |
| Content | 34 pillars, 45 supporting articles (calendar months 1–3); mounted topic pages for Mounjaro and Wegovy | Editorial |
| Programmatic | Hubs, class hubs, topics, 16 dose pages, 8 medication comparisons, first 20 side-effect pages (only those meeting thresholds are indexed) | Tech and editorial |
| Providers | Verify at least 8 providers (registers, service facts) → reviews indexable; others `noindex` | Data editor |
| Tools | BMI calculator, eligibility checker (informational only; no data stored) | Tech lead and reviewer |
| Analytics and consent | Consent banner live; privacy-first analytics after consent; GSC verified | Tech lead and DP lead |

**KPIs (end of month 3):** ≥ 90% of indexable URLs indexed; CWV "Good" on 100% of URLs; 0 unreviewed articles live; ≥ 8 verified provider reviews; first non-branded clicks recorded in GSC (no traffic target is set until baselines exist).

**Dependencies:** pharmacist reviewer contracted; legal pre-launch review; ICO fee paid; domain and email set up.

---

## 3. Phase 2: Growth (months 4–6, Jan–Mar 2027, Q2 FY27)

**Scope:** content scale-up, all 20 providers verified, provider comparisons, first digital PR, and preparation for (not activation of) the first commercial flag.

| Deliverable | Detail |
|---|---|
| Content | Pillars to 70; supporting to 135 (calendar months 4–6) |
| Providers | All 20 verified; 12 curated comparisons live; `/prices` service comparison indexable |
| Programmatic | Remaining side-effect pages meeting thresholds; oral hubs if MHRA status and SmPC are verified |
| Digital PR | "How to spot a fake weight-loss jab" campaign; BMI tool outreach; expert-commentary set-up |
| Admin v1 | Auth-protected admin for provider data and corrections; `EditorialAudit` logging |
| Compliance | Commission a written legal opinion on the commercial modules (Gate 1 and Gate 2 evidence pack) |

**KPIs (end of month 6):** 30% of High-priority informational keywords in the top 10 (rank tracker); ≥ 50 quality referring domains; 0 open corrections older than 5 working days; quarterly content audit completed.

**Dependencies:** a second reviewer for high-risk topics; PR lead; legal budget for the opinion.

---

## 4. Phase 3: Authority (months 7–12, Apr–Sep 2027, Q3–Q4 FY27)

**Scope:** complete the 100 pillars and 300 supporting articles; enable commercial flags **only** if their gates are passed.

| Deliverable | Detail | Flag |
|---|---|---|
| Content complete | All 100 pillars and 300 supporting articles; Phase 3 gap analysis from GSC | — |
| Experience content | Reviewer commentary boxes; documented walkthroughs of public provider journeys | — |
| Affiliate links | `/go/{p}` live; "Visit provider" buttons with "Ad" labels; network agreements signed | `affiliateLinks` (Gate 2) |
| Price data | Manual capture with second-person verification; price history; gated price tables and provider × dose pages | `pomPricing` (Gate 1) |
| Data report | "State of UK private GLP-1 provision" report (published information only) | — |
| Possible headless CMS | Payload evaluation if the editor count or volume justifies it | — |

**KPIs (end of month 12):** topical coverage of 17 clusters complete; top-3 positions for at least 10 pillar keywords; branded search growth; if flags are on, outbound click-through recorded through anonymous `ClickEvent` with no compliance complaints upheld.

---

## 5. Phase 4: Scale (FY28 onwards)

**Scope:** demand-led expansion.

| Deliverable | Detail | Flag |
|---|---|---|
| Provider pair matrix | Build non-curated pairs (178) only when both providers are verified; index only where demand exists | — |
| Discount pages | Only if Gate 3 is passed | `discountCodes` |
| Sticky CTA | Only if Gate 4 is passed; only on commercial templates | `stickyCta` |
| Permitted price feeds | Signed data agreements with providers; staged ingestion with human approval | `pomPricing` |
| New patterns | Medication × special population pages (with `CONTRACTS.md` amendment); new medicines as licensed | — |
| Internationalisation | Not planned. Ireland (MyBMI operates there) would need separate regulatory analysis (HPRA rules) | — |

---

## 6. Compliance gates

A gate is passed only when **every** item is ticked and the signed record is added to `docs/compliance/SIGN-OFF.md` (one record per flag per environment). Gates are re-opened if the law, CAP or MHRA guidance changes, an ASA ruling affects the model, or the template changes materially.

### Gate 0: Launch (all flags off)
See the launch checklist in §7.

### Gate 1: `pomPricing` (drug-name price tables, "cheapest" modules, provider × dose pages)
- [ ] Written opinion from a UK regulatory adviser that displaying named POM prices in the proposed format is not an advertisement likely to lead to the use of a POM (HMR 2012 reg. 284) and complies with CAP Code rule 12.12, considering the joint CAP/MHRA/GPhC enforcement notices and ASA rulings to date.
- [ ] Final templates (screenshots) reviewed: no "cheapest", "deal" or "save" language; total-cost presentation; checked dates; default sort approved by the adviser.
- [ ] Price data pipeline live: `sourceUrl`, `checkedAt` and `verifiedBy` on every price; second-person verification; 7-day SLA; auto-hide at 21 days.
- [ ] No scraping without written permission (permissions on file for any automated collection).
- [ ] Indexing policy for provider × dose pages agreed (default `noindex` unless the adviser approves indexing).
- [ ] Rollback plan: the flag can be turned off within 1 hour; routes 404 and the sitemap updates.

### Gate 2: `affiliateLinks` (outbound tracked links)
- [ ] Adviser opinion on affiliate links on provider, compare and price pages (CAP Code rule 12.12; recognisability rules in CAP Code section 2; the ASA's position that affiliate content can be advertising).
- [ ] Affiliate agreements reviewed: no requirement to promote named medicines; no control by the provider over editorial content; no payment linked to rankings.
- [ ] "Ad" or "commission" labels beside every outbound button; `rel="sponsored nofollow noopener"`; `/affiliate-disclosure` wording updated and approved.
- [ ] Outbound links only to the provider's service landing page, **not** to a medicine product page (subject to the adviser's view).
- [ ] No outbound links from guides, medication hubs, dose or side-effect pages, tools or the homepage.
- [ ] `ClickEvent` confirmed anonymous (no IP, user agent or cookie IDs) and documented in the privacy notice.
- [ ] `/affiliate-disclosure` lists the paying providers.

### Gate 3: `discountCodes`
- [ ] Adviser opinion specific to discount and offer content for POM-related services (high-risk area named in enforcement notices).
- [ ] Offers presented as **service** offers (for example consultation fees), never "% off Mounjaro", unless the adviser explicitly approves otherwise.
- [ ] Each offer verified, with terms, source URL, start and end dates; expired offers auto-hidden; no countdown timers or urgency.
- [ ] DMCC Act checks: no fake urgency, no drip pricing, accurate reference prices.
- [ ] Gates 1 and 2 already passed.

### Gate 4: `stickyCta`
- [ ] Gate 2 passed.
- [ ] Adviser and design review of the sticky bar: commercial templates only; no medicine names; no urgency; dismissible; accessible (does not obscure focus, WCAG 2.4.11).

### `showUnreviewedContent`
- [ ] **Never enabled in production.** CI fails the production build if it is set. Allowed only in local and preview environments.

---

## 7. Launch checklist (Gate 0)

### Legal and regulatory
- [ ] Pre-launch legal review of the whole site with flags off (copy, templates, disclosures), recorded in `SIGN-OFF.md`.
- [ ] Review of sitewide wording such as the tagline "Compare UK weight loss injections & tablets" and nav labels against the ASA's 2025 rulings on phrases like "weight loss injections" in advertising. Editorial use is likely fine, but the adviser should confirm because the site could earn commission once commercial flags are switched on.
- [ ] Terms of use, medical disclaimer, privacy notice and cookie policy published.
- [ ] Publisher details completed in `site.publisher` (legal name, address, company number if incorporated).

### Data protection
- [ ] **ICO registration** (data protection fee paid); registration number shown in the footer and privacy notice.
- [ ] **Cookie consent** live and tested: nothing non-essential before consent; "Reject all" equally prominent; preferences reopenable.
- [ ] Analytics confirmed not to receive health inputs from tools.
- [ ] Records of processing (contact and corrections forms); retention schedule.

### Clinical and editorial
- [ ] **Medical reviewer appointed**, with registration verified on the GPhC (or GMC) register and recorded in `ReviewerCredential`; conflicts declared; profile live.
- [ ] Every live article is `clinically-reviewed` with `medicalReviewer` set; `FLAG_SHOW_UNREVIEWED_CONTENT` is unset in production.
- [ ] Editorial policy, fact-checking policy, methodology and corrections pages live.
- [ ] Red-flag and signposting wording approved by the reviewer and reused consistently.

### Data
- [ ] **Verified provider data**: at least 8 providers with GPhC and CQC (or devolved equivalents) checked on the public registers, service facts from the provider's own published pages, `verified = true`, `lastVerifiedAt` set. Unverified providers `noindex`.
- [ ] Medication data checked against current SmPCs; oral medicines' `ukStatus` updated (or kept as "verify") based on MHRA notices.
- [ ] No prices in the database are displayed (flag off); the static `prices.ts` stays empty.

### Technical and SEO
- [ ] All flags `false` in production; verified by a build-time log line.
- [ ] Sitemaps list only indexable URLs; robots.txt disallows `/go/`, `/admin/`, `/api/`.
- [ ] Canonical, redirect and breadcrumb rules from Part 1 implemented and tested.
- [ ] Structured data validated (Rich Results Test, Schema.org validator); no `Product`, `Offer` or third-party `AggregateRating` markup.
- [ ] Core Web Vitals and Lighthouse budgets met on all templates; axe accessibility tests pass; manual screen-reader pass done.
- [ ] Security headers, HSTS, admin authentication and MFA, backups verified.
- [ ] GSC and Bing Webmaster Tools verified; sitemaps submitted.
