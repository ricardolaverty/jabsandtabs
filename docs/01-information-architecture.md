# Part 1: Information architecture

**Owner:** SEO lead · **Status:** Draft for team and legal review · **Last updated:** 3 October 2026
**Depends on:** `CONTRACTS.md` §2 (URL scheme), `src/lib/routes.ts` (route registry), `src/config/flags.ts`, `content/plan/pillars.json`

This document defines how JabsAndTabs is organised: what pages exist, how they relate, how users and crawlers move between them, and which URLs are indexable. Where this document and `CONTRACTS.md` differ, `CONTRACTS.md` wins until it is formally amended. Recommended amendments are listed in §9.

---

## 1. Competitive analysis: Monj-style sites

### 1.1 What we looked at

The UK "weight-loss jab price comparison" category is young (most sites appeared in 2024–25) and dominated by small affiliate publishers, plus the content hubs of the providers themselves. The reference site is **monj.co.uk**. Its home page refused automated fetches (HTTP 403) when this was written, so the observations below come from its indexed pages in public search results (for example its branded price-comparison URL, `/mounjaro-price-comparison-by-monj/`) and from patterns shared by comparable sites (weightcompare.co.uk, Medino's price-comparison articles, provider-run "Mounjaro price" pages). **Before launch, the SEO lead must run a proper crawl (Screaming Frog or Sitebulb) and an Ahrefs/Semrush organic-keyword export of monj.co.uk and the top five competitors to confirm or correct this analysis.**

### 1.2 Strengths of the category leaders (what to match)

| Strength | Why it works | What JabsAndTabs does |
|---|---|---|
| A single, frequently updated price table for the head term ("mounjaro price comparison") | Matches transactional intent exactly; earns repeat visits and natural links from forums such as Mumsnet and Reddit | `/prices/{med}` engine with dated price history. Drug-price columns are gated behind `flags.pomPricing`; with the flag off it is a service comparison (see §5) |
| Trust signals beside providers (Trustpilot scores, "GPhC registered" badges) | Users worry about fake jabs and rogue sellers | Regulator data is shown with a verification date and a link to the public register entry, never just a badge |
| Speed to publish news (price rises, stock shortages) | Captures spikes such as the September 2025 Mounjaro list-price rise | Newsroom-style updates go into existing pillars (for example `/guides/mounjaro-price-rise-2025`) with visible "updated" notes, not thin news posts |
| Discount-code pages | High commercial intent, high affiliate conversion | Built but **gated** (`flags.discountCodes`). Regulators have named promotional pricing and affiliate activity as high-risk (see `docs/compliance/README.md`) |
| Simple, flat WordPress structure | Fast to build | We keep URLs flat and short but add a real hierarchy (hub → topic → spoke) so authority flows |

### 1.3 Weaknesses (where we win)

| Weakness typically seen | Consequence | JabsAndTabs improvement |
|---|---|---|
| **No topical depth.** A handful of price/code pages and generic blog posts | Weak topical authority. Vulnerable in YMYL updates. Cannot rank for the long tail (side effects, dosing, switching) | 100 pillars, 300 supporting articles and around 650 data-driven URLs organised in 17 clusters with explicit hub-and-spoke linking (Part 5) |
| **Weak E-E-A-T.** Anonymous authors, no medical reviewer, no editorial policy, no corrections log | Health (YMYL) content without visible expertise tends to perform poorly in Google's systems | Named authors, a registered pharmacist reviewer (GPhC number shown and linked to the register), editorial, fact-checking and corrections pages, plus a `reviewStatus` gate in code |
| **Undisclosed or buried commercial relationships** | DMCC Act 2024 and CMA risk; ASA risk; erodes trust | A plain-English "how we make money" page, clearly labelled affiliate links if commercial flags are ever switched on, and a published methodology |
| **Promotional framing of prescription-only medicines** ("cheapest Mounjaro", "% off Wegovy", sticky "Get started" buttons) | Exposure to the joint CAP/MHRA/GPhC enforcement notices and ASA rulings | Education-first copy; commercial modules behind flags; with flags off, CTAs point only to our own comparison pages |
| **Branded, unstable slugs** (for example `-by-monj/`), trailing slashes, dated slugs | Link equity dilution, awkward redirects when content is refreshed | Lowercase, keyword-led, date-free slugs with no trailing slash, enforced by the route registry and 301 rules |
| **Duplicate and cannibalising pages** (a "Mounjaro price" post, a "Mounjaro cost" post and a price table competing) | Rankings split between URLs | A canonical keyword-ownership table (§4) maps every head term to exactly one URL |
| **Thin programmatic pages** (one template repeated across dozens of providers with empty fields) | Wasted crawl budget; site-wide quality signals drop | `noindex-until-verified` policy: a programmatic URL is indexable only when its data passes the quality thresholds in Part 5 §9 |
| **No price history or dates** | Users cannot judge freshness; misleading pricing risk under the DMCC Act | Every price has `checkedAt`, `sourceUrl` and `verifiedBy`. A history chart appears when pricing is enabled |
| **No tools** | Missed linkable assets | BMI calculator (with NICE ethnicity-adjusted thresholds) and eligibility checker, both informational and never a prescribing decision |

### 1.4 Positioning statement

> JabsAndTabs is the UK's evidence-led reference for GLP-1 weight-loss medicines and the regulated services that prescribe them. It explains the medicines first and compares the services second. It is transparent about how it makes money and who owns it, and its claims are checked by a registered pharmacist.

---

## 2. Content model

| Content type | Source of truth | Example URL | Count (at plan) |
|---|---|---|---|
| Homepage | Code and data | `/` | 1 |
| Class hub (jabs, tabs) | Data plus editorial intro | `/weight-loss-injections`, `/oral-glp1` | 2 |
| Medication hub | `medications` data plus MDX intro | `/mounjaro` | 5 |
| Medication topic | Data plus mounted pillar MDX (see §4) | `/mounjaro-side-effects` | 40 |
| Dose page | `medications[].doses` plus SmPC | `/mounjaro-2-5mg` | 16 (orals added once doses are verified) |
| Medication side-effect page | `sideEffects` plus `side-effect-guidance.ts` | `/mounjaro-side-effects/nausea` | 68 |
| Medication comparison | `medicationComparisons` | `/mounjaro-vs-wegovy` | 8 |
| Provider index and review | `providers` | `/providers`, `/providers/boots` | 1 + 20 |
| Provider + medication | `providerMedications` | `/providers/boots/mounjaro` | 40 |
| Provider + medication + dose | `pricePoints` | `/providers/boots/mounjaro/2-5mg` | 220 (**gated: pomPricing**) |
| Provider discount codes | `offers` | `/providers/boots/discount-codes` | 20 (**gated: discountCodes**) |
| Provider comparison | `providerComparisons` and the full matrix | `/compare/boots-vs-superdrug` | 12 curated, then 178 in Phase 4 |
| Price engine | `providers`, `pricePoints` | `/prices`, `/prices/mounjaro` | 1 + 5 |
| Guides (pillars and supporting) | `content/articles/*.mdx` | `/guides/protein-on-glp1` | 100 + 300 |
| Guide cluster hub | Article frontmatter `cluster` | `/guides/topic/side-effects` | 17 |
| Tools | Code | `/tools/bmi-calculator`, `/tools/eligibility-checker` | 2 (+ `/tools` index) |
| Authors | `authors` | `/authors/editorial-team` | n |
| Trust pages | MDX or code | `/editorial-policy` and others | 12 |
| Search | Code | `/search` | 1 (noindex) |

Full URL inventory for programmatic patterns: `content/plan/programmatic-urls.csv` (654 rows). Article inventory: `content/plan/pillars.json` (100) and `content/plan/supporting-articles.json` (300).

---

## 3. Hierarchical sitemap

Legend: **[G:pomPricing]**, **[G:discountCodes]**, **[G:affiliateLinks]** = route or module exists only when that flag is on. **[NI]** = `noindex` until data is verified (Part 5 §9). Everything else is indexable once its content is clinically reviewed.

```
/                                                Homepage
│
├── JABS ─ /weight-loss-injections               Class hub (injectables)
│   ├── /mounjaro                                Medication hub
│   │   ├── /mounjaro-how-it-works               Topic (mounts pillar: how-does-mounjaro-work)
│   │   ├── /mounjaro-side-effects               Topic (mounts pillar: mounjaro-side-effects-guide)
│   │   │   ├── /mounjaro-side-effects/nausea
│   │   │   ├── /mounjaro-side-effects/vomiting
│   │   │   ├── /mounjaro-side-effects/diarrhoea
│   │   │   ├── /mounjaro-side-effects/constipation
│   │   │   ├── /mounjaro-side-effects/indigestion
│   │   │   ├── /mounjaro-side-effects/injection-site-reactions
│   │   │   ├── /mounjaro-side-effects/gallbladder-problems
│   │   │   ├── /mounjaro-side-effects/pancreatitis
│   │   │   └── … burping, fatigue, headache, dizziness, hair-loss, low-blood-sugar   [NI until content passes thresholds]
│   │   ├── /mounjaro-dosage                     Topic (mounts pillar: mounjaro-dosing-schedule)
│   │   │   ├── /mounjaro-2-5mg   (starting)
│   │   │   ├── /mounjaro-5mg     (titration)
│   │   │   ├── /mounjaro-7-5mg   (titration)
│   │   │   ├── /mounjaro-10mg    (maintenance)
│   │   │   ├── /mounjaro-12-5mg  (maintenance)
│   │   │   └── /mounjaro-15mg    (maximum)
│   │   ├── /mounjaro-prices                     Topic (mounts pillar: mounjaro-price-uk-explained; no figures with flag off)
│   │   ├── /mounjaro-maintenance                Topic (mounts pillar: mounjaro-maintenance-guide)
│   │   ├── /mounjaro-eligibility                Topic
│   │   ├── /mounjaro-results                    Topic (mounts pillar: mounjaro-results-timeline)
│   │   └── /mounjaro-faqs                       Topic
│   ├── /wegovy                                  Medication hub (same topic set; doses 0-25mg, 0-5mg, 1mg, 1-7mg, 2-4mg)
│   └── /saxenda                                 Medication hub (same topic set; doses 0-6mg, 1-2mg, 1-8mg, 2-4mg, 3mg)
│
├── TABS ─ /oral-glp1                            Class hub (orals; mounts pillar: oral-glp1-uk-guide)
│   ├── /oral-semaglutide                        Medication hub [NI while ukStatus = "verify"]
│   │   └── topics, side effects; dose pages appear only when dosesVerified = true
│   └── /foundayo                                Medication hub [NI while ukStatus = "verify"]
│
├── MEDICATION COMPARISONS (top level, data order canonical; reverse order 301s)
│   ├── /mounjaro-vs-wegovy                      (mounts pillar: mounjaro-vs-wegovy)
│   ├── /mounjaro-vs-saxenda
│   ├── /wegovy-vs-saxenda
│   ├── /mounjaro-vs-oral-semaglutide            [NI until oral data verified]
│   ├── /mounjaro-vs-foundayo                    [NI until oral data verified]
│   ├── /wegovy-vs-oral-semaglutide              [NI until oral data verified]
│   ├── /wegovy-vs-foundayo                      [NI until oral data verified]
│   └── /oral-semaglutide-vs-foundayo            [NI until oral data verified]
│
├── PROVIDERS ─ /providers                       Provider index (filterable; filters noindex, see §8)
│   └── /providers/{p}                           Provider review ×20 [NI until provider.verified]
│       ├── /providers/{p}/mounjaro              Provider + medication [NI until verified]
│       │   └── /providers/{p}/mounjaro/{dose}   [G:pomPricing] [NI]
│       ├── /providers/{p}/wegovy
│       │   └── /providers/{p}/wegovy/{dose}     [G:pomPricing] [NI]
│       └── /providers/{p}/discount-codes        [G:discountCodes] [NI]
│
├── COMPARE ─ /compare                           Provider comparison index and builder
│   ├── /compare/{a}-vs-{b}                      12 curated pairs (Phase 1–2)
│   └── /compare/{a}-vs-{b}                      Full 190-pair matrix (Phase 4, demand-led) [NI until both verified]
│
├── PRICES ─ /prices                             Comparison engine (service comparison when pomPricing is off)
│   └── /prices/{med}                            ×5 [drug-price columns G:pomPricing]
│
├── GUIDES ─ /guides                             Guide index (latest, clusters, start-here)
│   ├── /guides/topic/{cluster}                  ×17 cluster hubs (medications, pricing, side-effects, dosing,
│   │                                            eligibility, comparisons, results, maintenance, switching, exercise,
│   │                                            diet, plateau, long-term, providers, safety, special-populations, faqs)
│   └── /guides/{slug}                           100 pillars + 300 supporting articles
│
├── TOOLS ─ /tools
│   ├── /tools/bmi-calculator
│   └── /tools/eligibility-checker
│
├── AUTHORS ─ /authors/{slug}
│
├── TRUST ─ /about  /editorial-policy  /fact-checking  /methodology
│           /affiliate-disclosure  /medical-disclaimer  /corrections
│           /privacy  /cookies  /terms  /contact
│
├── /search                                      noindex, follow
├── /go/{provider}                               Outbound redirect [G:affiliateLinks]; noindex, nofollow; disallowed in robots.txt
└── /admin                                       noindex, nofollow; auth-protected
```

### 3.1 Hub and spoke relationships

| Level | Hub | Spokes | Notes |
|---|---|---|---|
| L0 | `/` | Class hubs, `/providers`, `/compare`, `/prices`, `/guides`, `/tools` | Homepage passes authority to the six primary sections only |
| L1 | Class hub | Medication hubs in the class, class-level pillars (for example `weight-loss-injections-compared`, `oral-vs-injectable-glp1`) | |
| L2 | Medication hub | 8 topic pages, dose pages, comparisons containing the medication, medication-specific pillars (`hub` = med) | |
| L3 | Topic page | Side-effect pages (side-effects topic), dose pages (dosage topic), supporting articles whose `parentPillar` is the mounted pillar | |
| L3 | Cluster hub `/guides/topic/{cluster}` | All pillars and supporting articles in that cluster | Cross-medication clusters (diet, exercise, plateau, special populations) live here |
| L4 | Pillar `/guides/{slug}` | Supporting articles (`parentPillar` = this slug) | |
| L5 | Supporting article | Links up to the pillar and sideways to siblings | |

---

## 4. Canonical keyword ownership (anti-cannibalisation)

Several pillars in `pillars.json` target the same primary keyword as a programmatic topic or comparison URL (for example pillar `mounjaro-side-effects-guide` and the topic page `/mounjaro-side-effects` both target "mounjaro side effects"). Two URLs for one intent split rankings.

**Rule:** when a pillar's primary keyword equals the intent of a top-level programmatic URL, the pillar's MDX is **mounted** as the long-form body of that URL. `/guides/{pillar-slug}` then 301-redirects to the programmatic URL. The pillar file, slug and frontmatter stay unchanged in `content/articles`, so writers are unaffected. This needs a small addition to the route registry (a `PILLAR_MOUNTS` map) and a `CONTRACTS.md` amendment (§9).

| Pillar slug (pillars.json) | Primary keyword | Canonical URL | Treatment |
|---|---|---|---|
| `how-does-mounjaro-work` | how does mounjaro work | `/mounjaro-how-it-works` | Mount; 301 the guide URL |
| `mounjaro-side-effects-guide` | mounjaro side effects | `/mounjaro-side-effects` | Mount; 301 |
| `mounjaro-dosing-schedule` | mounjaro doses | `/mounjaro-dosage` | Mount; 301 |
| `mounjaro-results-timeline` | mounjaro results | `/mounjaro-results` | Mount; 301 |
| `mounjaro-price-uk-explained` | mounjaro price uk | `/mounjaro-prices` | Mount; 301 |
| `mounjaro-maintenance-guide` | mounjaro maintenance | `/mounjaro-maintenance` | Mount; 301 |
| `how-does-wegovy-work` | how does wegovy work | `/wegovy-how-it-works` | Mount; 301 |
| `wegovy-side-effects-guide` | wegovy side effects | `/wegovy-side-effects` | Mount; 301 |
| `wegovy-dosing-schedule` | wegovy doses | `/wegovy-dosage` | Mount; 301 |
| `wegovy-results-timeline` | wegovy results | `/wegovy-results` | Mount; 301 |
| `wegovy-price-uk-explained` | wegovy price | `/wegovy-prices` | Mount; 301 |
| `wegovy-maintenance-and-stopping` | wegovy maintenance | `/wegovy-maintenance` | Mount; 301 |
| `mounjaro-vs-wegovy` | mounjaro vs wegovy | `/mounjaro-vs-wegovy` | Mount; 301 |
| `oral-glp1-uk-guide` | oral glp1 | `/oral-glp1` | Mount as the class-hub body; 301 |
| `oral-semaglutide-guide` | oral semaglutide | `/oral-semaglutide` | Mount as the hub body once indexable; until then the guide stays canonical at `/guides/…` |
| `foundayo-orforglipron-guide` | foundayo | `/foundayo` | As above |
| `mounjaro-uk-complete-guide` | mounjaro uk | `/guides/mounjaro-uk-complete-guide` | **Keep separate.** The hub `/mounjaro` targets the navigational head term "mounjaro" (data, navigation, latest). The guide targets "mounjaro uk" long-form. Monitor in GSC; if both rank for the same queries for 8+ weeks, mount the guide into the hub |
| `wegovy-uk-complete-guide` | wegovy uk | `/guides/wegovy-uk-complete-guide` | As above |
| `weight-loss-injections-compared` | best weight loss injection uk | `/guides/weight-loss-injections-compared` | Keep separate. The class hub owns "weight loss injections uk"; the guide owns comparison intent. Title must not use "best" (see Part 5) |
| All other pillars | (own keyword) | `/guides/{slug}` | Standard |

Supporting articles were checked against both pillars and programmatic URLs: none uses a pillar's primary keyword, and none targets a `{med} {side effect}` or `{med} {topic}` keyword owned by a programmatic page (Part 6 §3).

---

## 5. Navigation model

### 5.1 Primary navigation (desktop)

Matches `mainNav` in `src/config/site.ts`:

| Item | Target | Mega-menu contents |
|---|---|---|
| **Jabs** | `/weight-loss-injections` | Mounjaro, Wegovy, Saxenda, "Compare injections"; column 2: Side effects, Dosing, Prices explained (topic links for the selected medication); column 3: "Start here" pillar links |
| **Tabs** | `/oral-glp1` | Oral GLP-1 hub, Wegovy tablets (oral semaglutide), Foundayo; a status note: "UK availability: check the latest" |
| **Providers** | `/providers` | Provider index, "How to choose a provider" pillar, "Who regulates online services" pillar, methodology |
| **Compare** | `/compare` | Medication comparisons (8), curated provider comparisons, `/prices` |
| **Guides** | `/guides` | The 17 cluster hubs grouped into four columns: Medicines, Living with treatment (diet, exercise, plateau, maintenance), Safety and eligibility, Special populations |
| **Tools** | `/tools` | BMI calculator, eligibility checker |

### 5.2 Mobile navigation

- Header: logo, search icon, menu button (Radix `Sheet`, full height).
- The sheet lists the same six sections as accordions; the first level is tappable to the hub, and a chevron expands children.
- Bottom of the sheet: trust links (Editorial policy, How we make money, Medical disclaimer).
- No sticky CTA unless `flags.stickyCta` is on, and then only on provider, compare and price templates (Part 3 §7).

### 5.3 Contextual navigation

| Template | Contextual nav |
|---|---|
| Medication hub and topic | Horizontal "topic tabs" (How it works · Side effects · Dosage · Prices · Results · Maintenance · Eligibility · FAQs); scrollable on mobile; the current tab has `aria-current="page"` |
| Side-effect page | "Other side effects of {med}" list; "Same side effect on other medicines" (sideways) |
| Dose page | Dose stepper (previous and next dose); "Back to dosage overview" |
| Guide | Table of contents (sticky on desktop ≥1024px; collapsible on mobile); "In this cluster" list; related (from frontmatter `related`) |
| Provider review | In-page section nav (Overview · Regulation · Medicines · Process · Aftercare · Pros and cons · Methodology) |

### 5.4 Footer

Four columns: Medicines (5 hubs and 2 class hubs) · Compare (comparisons, `/providers`, `/prices`) · Guides (top 8 cluster hubs) · About and trust (all 11 trust pages). Below: publisher legal details (from `site.publisher`) and the ICO registration number once obtained.

---

## 6. Breadcrumb rules

Breadcrumbs render on every page except the homepage, using `breadcrumbs.tsx`, and emit `BreadcrumbList` JSON-LD with exactly the same items.

| Template | Breadcrumb trail |
|---|---|
| Class hub | Home › Weight loss injections |
| Medication hub | Home › Weight loss injections › Mounjaro |
| Medication topic | Home › Weight loss injections › Mounjaro › Side effects |
| Side-effect page | Home › Weight loss injections › Mounjaro › Side effects › Nausea |
| Dose page | Home › Weight loss injections › Mounjaro › Dosage › 2.5mg |
| Medication comparison | Home › Compare › Mounjaro vs Wegovy |
| Provider review | Home › Providers › Boots Online Doctor |
| Provider + med | Home › Providers › Boots Online Doctor › Mounjaro |
| Provider + med + dose [G] | Home › Providers › Boots Online Doctor › Mounjaro › 2.5mg |
| Discount codes [G] | Home › Providers › Boots Online Doctor › Offers |
| Provider comparison | Home › Compare › Boots vs Superdrug |
| Prices | Home › Prices › Mounjaro |
| Pillar | Home › Guides › {Cluster label} › {Title} |
| Supporting | Home › Guides › {Cluster label} › {Parent pillar short title} › {Title} |
| Tool | Home › Tools › BMI calculator |
| Author | Home › About › Authors › {Name} |
| Trust page | Home › About › {Page} |

Rules:
1. The breadcrumb reflects the **canonical** hierarchy, not the user's click path.
2. The last item is plain text (not a link) and is the page's short name, not the full H1.
3. Oral medicines use "Oral GLP-1" as the class crumb (`/oral-glp1`).
4. A mounted pillar uses the programmatic trail (for example Home › Weight loss injections › Mounjaro › Side effects).
5. Labels are 1–4 words. Never put prices, "best" or promotional words in a breadcrumb.

---

## 7. URL conventions, canonicals and redirects

### 7.1 Conventions

- Lowercase ASCII, hyphen-separated, **no trailing slash**, no file extensions, no dates, no IDs.
- Decimal doses use a hyphen: `2.5mg` → `2-5mg`; `0.25mg` → `0-25mg`.
- British spelling in slugs: `diarrhoea`, `anaesthesia`, `oesophagus`, `apnoea`.
- Medication slugs are fixed: `mounjaro`, `wegovy`, `saxenda`, `oral-semaglutide`, `foundayo`. Generic names (`tirzepatide`, `semaglutide`) are **not** routes; they are served by pillars (`/guides/tirzepatide-uk-guide`, `/guides/semaglutide-uk-guide`).
- Maximum depth: 4 segments (`/providers/{p}/{med}/{dose}`).
- Slugs are permanent. Renaming requires a 301 and an entry in the redirect map.

### 7.2 Canonical rules

| Case | Canonical |
|---|---|
| Every indexable page | Self-referencing absolute canonical on `https://www.jabsandtabs.com` |
| Medication comparisons | Order in `medicationComparisons` (for example `/wegovy-vs-oral-semaglutide`); the reverse order 301s (implemented in `next.config.ts`) |
| Provider comparisons | Alphabetical (`/compare/boots-vs-superdrug`); the reverse order 301s |
| Mounted pillars | The programmatic URL; the `/guides/{slug}` version 301s (§4) |
| Query strings (`?sort=`, `?filter=`, `?utm_*`, `?ref=`) | Canonical to the clean path |
| Paginated listings | Self-canonical per page (`/guides?page=2` canonical to itself, not to page 1) |
| Gated route requested while its flag is off | 404 (not 302 to a parent), and excluded from the sitemap and internal links |
| `noindex-until-verified` pages | Still self-canonical; robots `noindex, follow` |

### 7.3 Redirect rules

| From | To | Type |
|---|---|---|
| `http://`, `jabsandtabs.com` (apex) | `https://www.jabsandtabs.com` | 301 (hosting level) |
| Trailing slash | No trailing slash | 308/301 (`trailingSlash: false`) |
| Uppercase | Lowercase | 301 (middleware) |
| `/{medB}-vs-{medA}`, `/compare/{b}-vs-{a}` | Canonical order | 301 |
| `/guides/{mounted-pillar}` | Programmatic URL | 301 |
| `/tirzepatide`, `/semaglutide`, `/liraglutide`, `/orforglipron` | `/guides/tirzepatide-uk-guide`, `/guides/semaglutide-uk-guide`, `/saxenda`, `/foundayo` | 301 (vanity) |
| `/wegovy-tablets`, `/wegovy-pill` | `/oral-semaglutide` | 301 (vanity) |
| `/mounjaro-price`, `/mounjaro-cost` | `/mounjaro-prices` | 301 (vanity; same pattern for each medication) |
| Retired provider (exits the market) | `/providers` with a notice | 301 after 90 days of a "no longer operating" banner |
| Retired article | Closest pillar | 301 and a log entry in `Correction`/`EditorialAudit` |

---

## 8. Pagination, faceting and indexation of filters

### 8.1 Pagination

- `/guides`, `/guides/topic/{cluster}`, `/providers` and `/authors/{slug}` paginate at 24 items using `?page=n`.
- Page 1 is the bare URL; `?page=1` 301s to the bare URL.
- Each page is self-canonical, indexable, with a unique `<title>` suffix ("– page 2").
- Paginated pages link to previous and next pages and to the first and last page with plain `<a href>` links (Google no longer uses `rel=prev/next`, but crawlable links still matter).
- Do not use infinite scroll without paginated fallback URLs.

### 8.2 Facets and filters

The provider index, `/compare` builder and `/prices` engine have filters (medication, provider type, delivery speed, maintenance policy, and price band when pricing is on).

| Rule | Detail |
|---|---|
| Filters are client-side state reflected in query parameters | `?med=mounjaro&type=online-pharmacy` |
| All filtered states | `noindex, follow` plus canonical to the unfiltered page |
| No filtered state is linked with plain `<a>` from crawlable navigation | Filters are `<button>` or form controls; links use `rel="nofollow"` if unavoidable |
| Sort orders | Never indexable; the default sort is alphabetical or "methodology score" (documented) and **never** commission |
| Promotion of a facet to a real page | Only when there is distinct search demand (for example "online doctor weight loss" → `/guides/online-doctor-weight-loss-uk`) and enough unique content; it gets a clean path, not a parameter |
| `robots.txt` | Do **not** block parameters in robots.txt (Google needs to crawl them to see `noindex`). Disallow `/go/`, `/admin/`, `/api/` only |

### 8.3 XML sitemaps

Generated by `app/sitemap.ts` from the route registry:
- Separate sitemap files per type: `sitemap-core.xml` (hubs, topics, comparisons, tools, trust), `sitemap-guides.xml`, `sitemap-providers.xml`, `sitemap-programmatic.xml`.
- **Only indexable URLs** are listed. `noindex-until-verified`, gated (flag off), filtered, paginated (page ≥2) and search URLs are excluded.
- `lastmod` is the real content or data change date (article `updatedAt`, provider `lastVerifiedAt`, latest `PricePoint.checkedAt`), never the build time.

---

## 9. Recommended amendments to CONTRACTS.md

These need agreement from the code owner before implementation:

1. **Pillar mounts (§4).** Add a `PILLAR_MOUNTS` map to `src/lib/routes.ts`. Mounted pillars render at the programmatic URL, and `/guides/{slug}` 301s to it.
2. **Vanity redirects (§7.3)** for generic names and "price/cost" variants.
3. **`/tools` index page** is referenced in `mainNav` but not listed in the `CONTRACTS.md` URL table. Add it.
4. **Oral medicine status.** Public reporting indicates MHRA authorisation of oral semaglutide (Wegovy tablets) for weight management in June 2026 and of Foundayo (orforglipron) in August 2026. `medications.ts` still marks both `ukStatus: "verify"` with empty doses. Once the editorial team has checked the MHRA notices and UK SmPCs, update the data. Dose pages and indexation for the oral hubs then switch on automatically.
