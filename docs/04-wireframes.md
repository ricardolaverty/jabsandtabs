# Part 4: Wireframes

**Owner:** Design lead · **Status:** Draft · **Last updated:** 3 October 2026

Low-fidelity wireframes for each core template. Each block has a number; the annotation table under each wireframe gives its **purpose**, **data source** and **flag gating**.

Conventions:
- `[G:pomPricing]`, `[G:affiliateLinks]`, `[G:discountCodes]`, `[G:stickyCta]` = rendered only when that flag is on. Where a gated block has a flag-off alternative, both are shown.
- `(i)` = info tooltip. `▸` = expandable. `→` = internal link. `↗` = outbound link (only with `affiliateLinks` on).
- Data sources refer to `src/lib/repo.ts` functions or MDX frontmatter.

Every page has the same shell: **S1** header and nav, **S2** breadcrumbs (except home), **S3** footer. These are omitted below after the homepage.

---

## 1. Homepage `/`

### Desktop

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ S1  JabsAndTabs   Jabs ▾   Tabs ▾   Providers   Compare   Guides ▾   Tools   [🔍 Search]│
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 1  HERO (hero band)                                                                    │
│    UK weight loss injections and tablets, explained and compared                       │
│    Independent, evidence-based guides to Mounjaro, Wegovy and oral GLP-1s, and the     │
│    regulated services that prescribe them. Reviewed by a registered pharmacist.        │
│    [ Compare providers → ]  [ Check your BMI → ]                                       │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 2  CHOOSE A MEDICINE                                                                   │
│   ┌─JABS──────────────────────────────────────┐ ┌─TABS──────────────────────────────┐  │
│   │ Mounjaro      tirzepatide · weekly  [Licensed]│ Wegovy tablets  oral semaglutide  │  │
│   │ Wegovy        semaglutide · weekly  [Licensed]│                 [Check status]    │  │
│   │ Saxenda       liraglutide · daily   [Licensed]│ Foundayo        orforglipron      │  │
│   │ Compare all injections →                   │ │                 [Check status]    │  │
│   └────────────────────────────────────────────┘ │ Oral GLP-1 guide →                │  │
│                                                   └───────────────────────────────────┘  │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 3  POPULAR COMPARISONS   [Mounjaro vs Wegovy] [Tablets vs injections] [Ozempic vs Wegovy]│
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 4  COMPARE REGULATED PROVIDERS                                                         │
│    ┌ProviderCard┐ ┌ProviderCard┐ ┌ProviderCard┐ ┌ProviderCard┐   See all 20 providers →  │
│    │GPhC ✓ date │ │GPhC ✓ date │ │GPhC ✓ date │ │Details being│                         │
│    │Review →    │ │Review →    │ │Review →    │ │verified     │                         │
│    └────────────┘ └────────────┘ └────────────┘ └────────────┘                          │
│    Order: alphabetical. How we compare providers →                                     │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 5  START HERE: ESSENTIAL GUIDES  (6 pillar cards)                                      │
│    What are GLP-1s? · Who can get injections? · Side effects · Getting treatment       │
│    online safely · Fake jabs · Private vs NHS                                          │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 6  TOOLS   [BMI calculator]  [Eligibility checker]  "Informational only"               │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 7  WHY TRUST US  Pharmacist-reviewed · Sources cited · Corrections log · Funding       │
│    explained · No paid rankings    [Editorial policy →] [Meet the reviewer →]          │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 8  LATEST UPDATES  (3 most recently updated guides with "Updated {date}")             │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ S3 FOOTER  Medicines | Compare | Guides | About & trust · legal                        │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### Mobile

```
┌──────────────────────────────┐
│S1 JabsAndTabs        🔍  ☰   │
├──────────────────────────────┤
│1 H1 (3 lines)                │
│  Standfirst (2 lines)        │
│  [ Compare providers → ]     │
│  [ Check your BMI → ]        │
├──────────────────────────────┤
│2 [ Jabs | Tabs ] segmented   │
│  Mounjaro    [Licensed]   >  │
│  Wegovy      [Licensed]   >  │
│  Saxenda     [Licensed]   >  │
├──────────────────────────────┤
│3 Comparisons (h-scroll chips)│
├──────────────────────────────┤
│4 Providers (h-scroll cards)  │
│  See all →                   │
├──────────────────────────────┤
│5 Start here (stacked list)   │
│6 Tools (2 tiles)             │
│7 Why trust us (icon list)    │
│8 Latest updates              │
│S3 Footer (accordions)        │
└──────────────────────────────┘
```

| # | Purpose | Data source | Gating |
|---|---|---|---|
| 1 | Positioning; routes to comparison and tools. **No medicine names in CTAs** | Static copy | Always; no prices or offers |
| 2 | Route into medication hubs | `getMedications()`: name, generic name, frequency, `ukStatus` → `StatusBadge` | Always |
| 3 | Comparison discovery | `getMedicationComparisons()` plus pillar `ozempic-vs-wegovy` | Always |
| 4 | Provider discovery, sorted alphabetically (never by commission) | `getProviders()`; regulator and verified fields | CTAs → `/providers/{p}` (flag off). With `affiliateLinks` on, the cards **still** link to our reviews from the homepage (no outbound links on the homepage, given the ASA's position on landing pages) |
| 5 | Pillar entry points for topical authority | `pillars.json` (curated six) | Only `clinically-reviewed` articles render |
| 6 | Tool discovery | Static | Always |
| 7 | E-E-A-T trust strip | `getAuthors()` (reviewer), trust page links | Always |
| 8 | Freshness signal | Articles sorted by `updatedAt` | Always |

---

## 2. Medication hub `/mounjaro`

### Desktop

```
│ S2 Home › Weight loss injections › Mounjaro                                            │
├──────────────────────────────────────────────────────┬─────────────────────────────────┤
│ 1 H1 Mounjaro (tirzepatide)                          │ 2 KEY FACTS                     │
│   Standfirst: what it is, licence, who it is for     │   Class   GIP/GLP-1 RA          │
│   Reviewed by {name}, MPharm, GPhC {no.} · {date}    │   Route   Injection, weekly     │
│                                                      │   Device  KwikPen               │
│                                                      │   UK      [Licensed] MHRA 2023  │
│                                                      │   NHS     NICE TA1026           │
│                                                      │   Maker   Eli Lilly             │
├──────────────────────────────────────────────────────┴─────────────────────────────────┤
│ 3 TOPIC TABS  How it works | Side effects | Dosage | Prices | Results | Maintenance |   │
│               Eligibility | FAQs                                                       │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 4 OVERVIEW (MDX intro, 300–500 words; KeyTakeaways)                                    │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 5 DOSE LADDER  2.5 → 5 → 7.5 → 10 → 12.5 → 15mg  (each step → dose page)              │
│   "Minimum 4 weeks per step. Your prescriber decides." Source: SmPC                    │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 6 COMMON SIDE EFFECTS (top 6 from SideEffectTable → side-effect pages)                │
│   RED FLAG BOX: severe persistent abdominal pain → stop, seek urgent care (111/999)    │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 7 HOW IT COMPARES  [vs Wegovy] [vs Saxenda] [vs Wegovy tablets] [vs Foundayo]          │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 8 WHERE TO GET IT                                                                      │
│   NHS route (NICE TA1026 summary → /mounjaro-on-the-nhs guide)                         │
│   Private route: regulated online providers → [Compare providers →]                    │
│   [G:pomPricing] "Typical price range by dose" mini table → /prices/mounjaro           │
│   flag off: "What affects the cost" bullets → /mounjaro-prices                         │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 9 GUIDES FOR MOUNJARO (pillars with hub = mounjaro; 6–9 cards)                         │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 10 FAQs (5–8, accordion)          11 SOURCES (SmPC, NICE TA1026, SURMOUNT-1, MHRA)     │
│ 12 MedicalDisclaimer                                                                   │
```

### Mobile

```
┌──────────────────────────────┐
│S2 … › Mounjaro               │
│1 H1 + standfirst             │
│  Reviewer line               │
│2 Key facts (2-col grid)      │
│3 Topic tabs (h-scroll) ◂ ▸   │
│4 Overview + KeyTakeaways     │
│5 Dose ladder (vertical)      │
│6 Side effects list + RedFlag │
│7 Compare chips               │
│8 Where to get it             │
│  [ Compare providers → ]     │
│9 Guides (list)               │
│10 FAQs ▸ 11 Sources ▸        │
│12 Disclaimer                 │
└──────────────────────────────┘
```

| # | Purpose | Data source | Gating |
|---|---|---|---|
| 1 | Topic identity; E-E-A-T | `Medication`; reviewer from the mounted MDX or the hub MDX frontmatter | Hub `noindex` if `isMedicationUnverified` |
| 2 | Scannable facts | `Medication` fields | "verify" status → warning badge plus "Check MHRA/SmPC" link |
| 3 | Navigation to topic URLs | `MEDICATION_TOPICS` | Always |
| 4 | Unique editorial copy (prevents a thin template) | MDX `content/articles/{med}-hub.mdx` *(to create)* | Always |
| 5 | Dosing overview | `Medication.doses` | Hidden if `dosesVerified = false` |
| 6 | Safety first | `getSideEffectsForMedication()`, `side-effect-guidance.ts` | Always |
| 7 | Sideways links | `getMedicationComparisons()` | Always |
| 8 | Conversion path | `PricePoint` aggregate (min/max per dose) | Price mini-table **[G:pomPricing]**; flag off → cost-factors copy |
| 9 | Hub-and-spoke | Articles with `hub = mounjaro` | Reviewed only |
| 10–12 | Answers, evidence, disclaimer | MDX `faqs`, `sources` | Always |

---

## 3. Dose page `/mounjaro-5mg`

### Desktop

```
│ S2 Home › Weight loss injections › Mounjaro › Dosage › 5mg                             │
├──────────────────────────────────────────────────────┬─────────────────────────────────┤
│ 1 H1 Mounjaro 5mg: what to expect at this dose        │ 2 DOSE LADDER (vertical)        │
│   Role badge: [Titration step 2 of 6]                 │   2.5mg  ○                      │
│   Reviewed by … · Updated …                           │   5mg    ● you are here         │
│                                                      │   7.5mg  ○                      │
│                                                      │   10mg   ○ …                    │
├──────────────────────────────────────────────────────┴─────────────────────────────────┤
│ 3 ABOUT THIS DOSE (data-driven plus unique MDX snippet ≥ 250 words)                    │
│   When it is used · minimum time at dose (SmPC) · what the trials report at 5mg        │
│   (SURMOUNT-1 5mg arm), clearly labelled as trial averages                              │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 4 SIDE EFFECTS AT DOSE INCREASES (link → supporting article on dose increases)         │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 5 MISSED DOSE AND CHANGING DAY (SmPC rules summarised → mounjaro-missed-dose guide)    │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 6 [G:pomPricing] PRICE AT THIS DOSE: table of providers (checked dates) → /prices      │
│   flag off: "Why higher doses cost more" → supporting article; [Compare providers →]   │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 7 ‹ Previous: 2.5mg            Next: 7.5mg ›                                           │
│ 8 FAQs · Sources · MedicalDisclaimer                                                   │
```

### Mobile

```
┌──────────────────────────────┐
│1 H1 + role badge             │
│2 Dose ladder (horizontal     │
│  stepper, scrollable)        │
│3 About this dose             │
│4 Side effects link card      │
│5 Missed dose card            │
│6 Price block (G) / cost info │
│7 ‹ Prev | Next ›             │
│8 FAQs ▸ Sources ▸ Disclaimer │
└──────────────────────────────┘
```

| # | Purpose | Data source | Gating |
|---|---|---|---|
| 1–2 | Orientation | `Dose` (`mg`, `role`), siblings | Route exists only if `dosesVerified` |
| 3 | Unique value (avoids thin programmatic content) | `Dose` plus `content/snippets/doses/{med}-{dose}.mdx` *(planned)*; trial data from the editorial team | `noindex` until the snippet exists and is reviewed |
| 4–5 | Safety and practical guidance | SmPC summary in data; links to supporting articles | Always |
| 6 | Conversion | `PricePoint` by dose | **[G:pomPricing]**; flag-off alternative shown |
| 7 | Navigation | Dose order | Always |

---

## 4. Provider page `/providers/boots`

### Desktop

```
│ S2 Home › Providers › Boots Online Doctor                                              │
├──────────────────────────────────────────────────────┬─────────────────────────────────┤
│ 1 H1 Boots Online Doctor review: weight loss service  │ 2 SUMMARY CARD (sticky)         │
│   Standfirst (who it suits, neutral)                  │  Type: High-street pharmacy     │
│   Reviewed by … · Details checked {lastVerifiedAt}    │  GPhC ✓ {number} ↗register      │
│                                                      │  CQC  ✓ / n/a                   │
│                                                      │  Medicines: Mounjaro, Wegovy    │
│                                                      │  Trustpilot {score} ({n}) {date}│
│                                                      │  flag off: [Compare providers→] │
│                                                      │  [G:affiliateLinks]             │
│                                                      │  [Visit Boots ↗] Ad · commission│
├──────────────────────────────────────────────────────┴─────────────────────────────────┤
│ 3 SECTION NAV  Overview | Regulation | Medicines | Process | Aftercare | Pros & cons |  │
│                Methodology                                                             │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 4 OVERVIEW (editorial; ≥ 600 unique words before the page can be indexed)              │
│ 5 REGULATION: register entries with links and checked dates; superintendent pharmacist │
│ 6 MEDICINES OFFERED → /providers/boots/mounjaro, /providers/boots/wegovy               │
│ 7 HOW THE PROCESS WORKS: consultation type, ID/weight verification, prescriber type,   │
│   delivery (cold chain), typical timelines (as published by the provider)              │
│ 8 AFTERCARE & MAINTENANCE POLICY                                                       │
│ 9 PROS AND CONS (editorial, evidence-based, dated)                                     │
│ 10 COST STRUCTURE: consultation fee, delivery, subscription terms (no drug prices)     │
│    [G:pomPricing] drug price table by dose → /providers/boots/mounjaro/{dose}          │
│    [G:discountCodes] "Current offers" card → /providers/boots/discount-codes           │
│ 11 HOW WE ASSESSED THIS PROVIDER (methodology summary; criteria; not paid placement)   │
│ 12 COMPARE WITH: curated pairs → /compare/boots-vs-superdrug …                         │
│ 13 Sources · Corrections link · Last checked                                           │
```

### Mobile

```
┌──────────────────────────────┐
│1 H1 + checked date           │
│2 Summary card (collapsible)  │
│  [ Compare providers → ]     │
│3 Section nav (select menu)   │
│4–11 sections stacked         │
│12 Compare chips              │
│13 Sources                    │
│[G:stickyCta] bottom bar      │
│  after summary leaves view   │
└──────────────────────────────┘
```

| # | Purpose | Data source | Gating |
|---|---|---|---|
| 1 | Identity, freshness | `Provider.name`, `lastVerifiedAt` | Page `noindex` until `verified` and checked ≤ 90 days ago |
| 2 | At-a-glance trust | `gphcNumber`, `cqcRegistered`, `trustpilot*`, `medications` | Outbound button **[G:affiliateLinks]** via `getProviderCta()`; flag off → internal link |
| 4–9 | Editorial review | MDX `content/providers/{slug}.mdx` *(planned)* plus `pros`/`cons` | Unverified fields show "Not yet verified", never blank or estimated |
| 10 | Costs | `consultationFee`, `delivery`; `PricePoint`; `Offer` | Drug prices **[G:pomPricing]**; offers **[G:discountCodes]** |
| 11 | Transparency (DMCC Act, CAP) | `/methodology` summary | Always |
| 12 | Sideways links | `getProviderComparisonPairs()` | Always |
| Sticky bar | Mobile conversion | Provider | **[G:stickyCta]** |

---

## 5. Provider vs provider `/compare/boots-vs-superdrug`

### Desktop

```
│ S2 Home › Compare › Boots vs Superdrug                                                 │
│ 1 H1 Boots Online Doctor vs Superdrug Online Doctor: weight loss services compared     │
│   Checked {date} · How we make money →                                                 │
├──────────────────────────────┬──────────────────────────────┬──────────────────────────┤
│ 2 ATTRIBUTE                  │ Boots Online Doctor          │ Superdrug Online Doctor  │
├──────────────────────────────┼──────────────────────────────┼──────────────────────────┤
│ ▾ Regulation                 │                              │                          │
│   GPhC registration          │ ✓ {no.} ↗                    │ ✓ {no.} ↗                │
│   CQC                        │ …                            │ …                        │
│ ▾ Medicines                  │ Mounjaro ✓ Wegovy ✓          │ …                        │
│ ▾ Process                    │ Consultation type…           │ …                        │
│ ▾ Aftercare & maintenance    │ …                            │ …                        │
│ ▾ Cost structure             │ Consultation fee, delivery   │ …                        │
│   [G:pomPricing] Price by dose rows (checked dates)                                    │
│ ▾ Ratings                    │ Trustpilot {score} ({n}) date│ …                        │
├──────────────────────────────┴──────────────────────────────┴──────────────────────────┤
│ 3 [ ] Show differences only                                                           │
│ 4 OUR SUMMARY (editorial: "suits people who…", not "winner"; ≥ 400 unique words)      │
│ 5 CTA row: [Read Boots review →] [Read Superdrug review →]                            │
│   [G:affiliateLinks] [Visit Boots ↗ Ad] [Visit Superdrug ↗ Ad]                        │
│ 6 Other comparisons · Methodology · Sources                                           │
```

### Mobile

```
┌──────────────────────────────┐
│1 H1, checked, disclosure     │
│2 [Boots] [Superdrug] header  │
│  ▾ Regulation (open)         │
│   GPhC     ✓ | ✓             │
│   CQC      … | …             │
│  ▸ Medicines                 │
│  ▸ Process  ▸ Aftercare      │
│  ▸ Cost structure            │
│3 Differences only toggle     │
│4 Summary                     │
│5 Review links (stacked)      │
└──────────────────────────────┘
```

| # | Purpose | Data source | Gating |
|---|---|---|---|
| 1 | Identity and disclosure | Both `Provider` rows | Canonical alphabetical; `noindex` until both are verified |
| 2 | Comparison | `Provider` fields; `ProviderMedication` | Price rows **[G:pomPricing]** |
| 4 | Unique editorial value | MDX `content/compare/{a}-vs-{b}.mdx` *(planned)* | Required before indexing |
| 5 | Conversion | `getProviderCta()` | Outbound **[G:affiliateLinks]** |

---

## 6. Medication comparison `/mounjaro-vs-wegovy`

### Desktop

```
│ S2 Home › Compare › Mounjaro vs Wegovy                                                 │
│ 1 H1 Mounjaro vs Wegovy: an evidence-based comparison                                  │
│   Reviewed by … · Updated …                                                            │
│ 2 KEY TAKEAWAYS (MDX)                                                                  │
├──────────────────────────────┬──────────────────────────────┬──────────────────────────┤
│ 3 AT A GLANCE                │ Mounjaro (tirzepatide)       │ Wegovy (semaglutide)     │
│   Class                      │ GIP/GLP-1 RA                 │ GLP-1 RA                 │
│   Frequency · device         │ Weekly · KwikPen             │ Weekly · FlexTouch       │
│   Dose range                 │ 2.5–15mg (6 steps)           │ 0.25–2.4mg (5 steps)     │
│   UK licence / NICE          │ MHRA 2023 · TA1026           │ MHRA 2021 · TA875        │
│   Key trial                  │ SURMOUNT-1                   │ STEP 1                   │
│   Head-to-head               │ SURMOUNT-5 (link to pillar)  │                          │
│   Common side effects        │ from SmPC                    │ from SmPC                │
├──────────────────────────────┴──────────────────────────────┴──────────────────────────┤
│ 4 FULL ARTICLE (mounted pillar MDX: efficacy, side effects, dosing, cost factors,     │
│   who might suit which, switching)                                                     │
│ 5 SWITCHING → switching-wegovy-to-mounjaro, switching-mounjaro-to-wegovy               │
│ 6 [G:pomPricing] price comparison by equivalent stage → /prices                        │
│   flag off: "Cost factors" + [Compare providers →]  (ProviderComparisonCTA ≤ 2)        │
│ 7 FAQs · Sources · MedicalDisclaimer                                                   │
```

Mobile: the at-a-glance table becomes two stacked cards with a "swap" toggle for side-by-side mini view; otherwise single column.

| # | Purpose | Data source | Gating |
|---|---|---|---|
| 1–2 | Identity, E-E-A-T | Mounted pillar frontmatter | Reviewed only |
| 3 | Structured comparison | Both `Medication` rows, `doses`, `niceGuidance` | Oral comparisons `noindex` while status is "verify" |
| 4–5 | Depth | Pillar MDX | Always |
| 6 | Conversion | `PricePoint` | **[G:pomPricing]** |

---

## 7. Price comparison engine `/prices/mounjaro`

### 7a. Flag ON (`pomPricing` = true; after legal sign-off)

```
│ S2 Home › Prices › Mounjaro                                                            │
│ 1 H1 Mounjaro price comparison: UK regulated providers                                 │
│   Prices checked between {min date} and {max date}. Prices change often; check with    │
│   the provider before you decide. How we collect prices →                              │
│   How we make money →                                                                  │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 2 FILTERS  Dose [2.5mg ▾]  Provider type [All ▾]  [ ] Include consultation & delivery  │
│            Sort: [Alphabetical ▾]  (price sort only if legal sign-off permits)         │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 3 TABLE                                                                                │
│ Provider        Type     Med price  Consult  Delivery  Total 4 wks  Checked   Details  │
│ Asda OD         HS pharm £…         £…       £…        £…          12 Oct    Review → │
│ Boots OD        HS pharm £…         £…       £…        £…          11 Oct    Review → │
│ Chemist4U       Online   £…         £…       £…        £…          12 Oct    Review → │
│ …               [stale ⚠ 9 days]                                                       │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 4 PRICE HISTORY chart (per selected dose; median and range) + data table alternative   │
│ 5 WHAT AFFECTS THE PRICE (editorial → mounjaro-prices, hidden-costs pillar)            │
│ 6 [G:affiliateLinks] per-row "Visit ↗ Ad" buttons; else "Review →" only                │
│ 7 [G:discountCodes] "Providers with current offers" → discount pages                   │
│ 8 Methodology · Sources · Corrections                                                  │
```

### 7b. Flag OFF (default): service comparison

```
│ S2 Home › Prices › Mounjaro                                                            │
│ 1 H1 What Mounjaro costs privately in the UK and how providers compare                 │
│   We do not currently show medicine prices. Here is what affects the cost and how      │
│   regulated services differ.                                                           │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 2 WHAT AFFECTS THE COST (cards): dose · supply length · consultation model ·          │
│   delivery and cold chain · subscription vs one-off · maintenance support             │
│   → mounjaro-price-uk-explained, how-weight-loss-injection-pricing-works              │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 3 SERVICE COMPARISON TABLE                                                            │
│ Provider     Type     Regulator   Prescriber    Verification   Aftercare   Details    │
│ Asda OD      HS pharm GPhC ✓      Pharmacist IP Photo + ID     Messaging   Review →   │
│ Boots OD     HS pharm GPhC ✓ CQC  Doctor        Video          …           Review →   │
│ Chemist4U(i) Online   GPhC ✓      …             …              …           Review →   │
│ Unverified providers show "Details being verified"                                     │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 4 QUESTIONS TO ASK ABOUT COST (checklist) → price-transparency supporting article     │
│ 5 NHS ROUTE (TA1026 summary) → mounjaro-on-the-nhs                                     │
│ 6 Methodology · Sources                                                                │
```

Mobile (both variants): the filter bar becomes a "Filters" button opening a bottom sheet; table rows become provider cards (name, type, labels, key fields, "Review →"); the sticky CTA appears only if `stickyCta` is on.

| # | Purpose | Data source | Gating |
|---|---|---|---|
| 7a-1 | Context, freshness, disclosure | Min/max `PricePoint.checkedAt` | **[G:pomPricing]** |
| 7a-2/3 | Price comparison | Latest `PricePoint` per provider × dose; `supplyWeeks` | **[G:pomPricing]**; rows older than 21 days hidden; filters `noindex` |
| 7a-4 | Trend transparency | `PricePoint` history | **[G:pomPricing]** |
| 7a-6 | Outbound | `AffiliateLink` via `/go/{p}` | **[G:affiliateLinks]** |
| 7a-7 | Offers | `Offer` (active, verified, unexpired) | **[G:discountCodes]** |
| 7b-2 | Education | Static copy and pillar links | Flag off (default) |
| 7b-3 | Service comparison | `Provider` service fields | Flag off (default); page `noindex` until ≥ 8 providers are verified |

---

## 8. Article page `/guides/protein-on-glp1`

### Desktop

```
│ S2 Home › Guides › Diet › Protein intake on weight loss injections                     │
├───────────────┬──────────────────────────────────────────────┬─────────────────────────┤
│ 1 TOC (sticky)│ 2 H1 Protein Intake on Weight Loss Injections │ 6 RAIL                  │
│  Intro        │   Standfirst                                  │  Reviewer card          │
│  Why protein  │   By {author} · Reviewed by {reviewer},       │  (photo, GPhC ↗)        │
│  How much     │   MPharm, GPhC {no.} · Updated {date} ·       │  Related (3)            │
│  Food sources │   14 min read                                 │  ProviderComparisonCTA  │
│  …            │ 3 KEY TAKEAWAYS                               │  (flag-aware, internal) │
│  FAQs         │ 4 BODY (H2/H3, tables, Callouts, RedFlagBox)  │                         │
│  Sources      │   inline links: up to pillar/hub, sideways    │                         │
│               │   to ≥3 pillars, ≥1 conversion page           │                         │
│               │ 5 FAQs (visible accordion)                    │                         │
│               │   SOURCES (numbered)                          │                         │
│               │   MedicalDisclaimer                           │                         │
│               │   "Spotted an error? Report it" → /corrections│                         │
├───────────────┴──────────────────────────────────────────────┴─────────────────────────┤
│ 7 MORE IN THIS CLUSTER (6 cards) · back to /guides/topic/diet                          │
```

### Mobile

```
┌──────────────────────────────┐
│S2 … › Diet › (truncated)     │
│2 H1, byline, reviewer line   │
│1 Contents ▸ (accordion)      │
│3 Key takeaways               │
│4 Body                        │
│5 FAQs ▸ Sources ▸ Disclaimer │
│6 Reviewer card, related      │
│7 More in cluster             │
└──────────────────────────────┘
```

| # | Purpose | Data source | Gating |
|---|---|---|---|
| 1 | Navigation, skimmability | Headings via `rehype-slug` | Always |
| 2 | Identity and E-E-A-T | Frontmatter `author`, `medicalReviewer`, `updatedAt`, `readingMinutes` | Not rendered unless `clinically-reviewed` (production) |
| 3–5 | Content | MDX body, `faqs`, `sources` | Allowed components only |
| 6 | Trust and next step | `getAuthor()`, `related`; `ProviderComparisonCTA` | CTA internal-only with flags off |
| 7 | Cluster authority | Articles by `cluster` | Always |

---

## 9. BMI tool `/tools/bmi-calculator`

### Desktop

```
│ S2 Home › Tools › BMI calculator                                                       │
│ 1 H1 BMI calculator                                                                    │
│   Work out your body mass index and see how BMI is used in UK weight management        │
│   guidance. This is information only, not a prescribing decision.                     │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 2 FORM (560px centred)                                                                 │
│   Units: (•) Metric ( ) Imperial                                                       │
│   Height [___] cm     Weight [___] kg                                                  │
│   Ethnic background (optional, used for NICE thresholds) [Prefer not to say ▾]  (i)    │
│   [ Calculate ]                                                                        │
│   Your answers stay on your device and are not stored or sent.                         │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 3 RESULT (aria-live)                                                                   │
│   Your BMI: 31.4 · Category (NICE): Obesity class 1                                    │
│   Scale bar with category bands (adjusted bands if ethnicity selected)                 │
│   "BMI has limits (muscle mass, age, pregnancy). Waist-to-height ratio helps too."     │
│   What this may mean: licence thresholds and NHS criteria explained neutrally          │
│   → who-can-get-weight-loss-injections, bmi-thresholds-ethnicity                       │
│   [ Check eligibility information → ]  [ Talk to your GP: NHS options → ]              │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 4 HOW BMI IS CALCULATED (formula, worked example)                                      │
│ 5 WAIST-TO-HEIGHT RATIO mini calculator                                                │
│ 6 FAQs · Sources (NICE NG246, NHS) · MedicalDisclaimer                                 │
```

### Mobile

```
┌──────────────────────────────┐
│1 H1 + one-line disclaimer    │
│2 Units toggle                │
│  Height [ft][in] / [cm]      │
│  Weight [st][lb] / [kg]      │
│  Ethnicity (optional) ▾      │
│  [ Calculate ] (full width)  │
│3 Result card                 │
│  scale bar                   │
│  links (stacked)             │
│4 How it's calculated ▸       │
│5 WHtR ▸                      │
│6 FAQs ▸ Sources ▸            │
└──────────────────────────────┘
```

| # | Purpose | Data source | Gating |
|---|---|---|---|
| 1 | Expectation setting | Static | Always |
| 2 | Input | Client component; `src/lib/bmi.ts` (pure, unit-tested) | No analytics on values; nothing stored |
| 3 | Result and signposting | NICE thresholds, including lower thresholds for South Asian, Chinese, other Asian, Middle Eastern, Black African or African-Caribbean backgrounds (verify the current NICE wording) | **No provider CTAs or outbound links regardless of flags.** Links go to guides, the eligibility information and NHS routes |
| 4–6 | Education, linkable asset | Static, MDX | Always |
