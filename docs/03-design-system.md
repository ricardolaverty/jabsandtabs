# Part 3: Design system

**Owner:** Design lead · **Status:** Draft · **Last updated:** 3 October 2026
**Source of truth for tokens:** `src/app/globals.css` (OKLCH). The hex values below are computed from those OKLCH values for design tools (Figma) and documentation; if they ever disagree, `globals.css` wins.

Design principles:
1. **Clinical calm, not hype.** The site should feel like a trustworthy reference (NHS-adjacent clarity and NerdWallet-style comparison polish), never like a slimming advert.
2. **Facts first, actions second.** Information has visual priority over calls to action. CTAs never dominate the first screen of an educational page.
3. **Show the evidence.** Dates, sources, reviewer names and verification status are visible design elements, not footnotes.
4. **Accessible by default.** WCAG 2.2 AA is the floor. Body-text pairs already exceed AAA.

---

## 1. Colour tokens

### 1.1 Light theme

| Token | Hex | OKLCH | Use |
|---|---|---|---|
| `--background` | `#FCFEFE` | 0.995 0.002 200 | Page background |
| `--foreground` | `#0D1C27` | 0.22 0.03 240 | Body text |
| `--card` | `#FFFFFF` | 1 0 0 | Cards, tables |
| `--primary` | `#004B5C` | 0.38 0.07 220 | Deep teal-navy: links, primary buttons, active states |
| `--primary-foreground` | `#F8FDFD` | 0.99 0.005 200 | Text on primary |
| `--secondary` | `#E9F4F5` | 0.96 0.012 200 | Secondary buttons, subtle panels |
| `--secondary-foreground` | `#042E3B` | 0.28 0.05 225 | Text on secondary |
| `--muted` | `#EEF5F7` | 0.965 0.008 220 | Table stripes, inactive tabs |
| `--muted-foreground` | `#495762` | 0.45 0.025 240 | Metadata, captions |
| `--accent` | `#FAAB3F` | 0.8 0.15 70 | Warm amber, **reserved for commercial CTAs** (flag-gated) and key highlights |
| `--accent-foreground` | `#291508` | 0.22 0.04 50 | Text on amber |
| `--success` | `#187C49` | 0.52 0.12 155 | "Verified", positive status |
| `--warning` | `#FEE5B3` | 0.93 0.07 85 | Warning callout background |
| `--warning-foreground` | `#4F2B08` | 0.33 0.07 60 | Warning callout text |
| `--info` | `#DAF3FE` | 0.95 0.03 225 | Info and evidence callouts |
| `--info-foreground` | `#00324C` | 0.3 0.07 235 | Text on info |
| `--destructive` | `#CC2827` | 0.55 0.2 27 | Red-flag symptoms, errors |
| `--border` | `#D6E0E3` | 0.9 0.012 220 | Decorative dividers and card outlines |
| `--input` | `#CDDADE` | 0.88 0.015 220 | Input borders (**see the contrast issue in §1.3**) |
| `--ring` | `#008192` | 0.55 0.1 210 | Focus ring |
| `--hero` | `#003444` | 0.3 0.06 225 | Homepage and hub hero band |
| `--hero-foreground` | `#F1FBFB` | 0.98 0.01 200 | Text on hero |

### 1.2 Dark theme (follows `prefers-color-scheme`)

| Token | Hex | Token | Hex |
|---|---|---|---|
| `--background` | `#071117` | `--foreground` | `#E9F0F2` |
| `--card` | `#0D1A23` | `--primary` | `#6AC9CE` |
| `--primary-foreground` | `#03141C` | `--secondary` | `#172933` |
| `--muted` | `#16232C` | `--muted-foreground` | `#A2B1B8` |
| `--accent` | `#FCB452` | `--accent-foreground` | `#241005` |
| `--success` | `#51B67A` | `--warning` | `#492F0E` |
| `--warning-foreground` | `#FAE6BB` | `--info` | `#0D3242` |
| `--destructive` | `#F3625D` | `--border` | `#26353E` |
| `--input` | `#303F49` | `--ring` | `#48B7BD` |
| `--hero` | `#031E29` | `--hero-foreground` | `#EEF7F8` |

### 1.3 Contrast audit (computed from the tokens)

| Pair | Light | Dark | WCAG result |
|---|---|---|---|
| foreground on background | 17.03:1 | 16.54:1 | AAA |
| primary-foreground on primary | 9.51:1 | 9.70:1 | AAA |
| primary (link text) on background | 9.64:1 | 9.88:1 | AAA |
| secondary-foreground on secondary | 12.90:1 | 12.24:1 | AAA |
| muted-foreground on background | 7.30:1 | 8.62:1 | AAA |
| muted-foreground on muted | 6.70:1 | 7.20:1 | AA (AAA for large text) |
| accent-foreground on accent | 9.10:1 | 10.23:1 | AAA |
| success-foreground on success | 5.05:1 | 7.52:1 | AA |
| warning-foreground on warning | 10.12:1 | 10.04:1 | AAA |
| info-foreground on info | 11.67:1 | 10.74:1 | AAA |
| destructive-foreground on destructive | 5.22:1 | 6.31:1 | AA |
| destructive (text) on background | 5.30:1 | 6.11:1 | AA |
| hero-foreground on hero | 12.69:1 | 15.84:1 | AAA |
| ring on background (focus indicator) | 4.56:1 | 8.02:1 | Meets the 3:1 non-text minimum |
| **input border on background** | **1.41:1** | **1.77:1** | **Fails WCAG 1.4.11 (3:1)** |
| border on background | 1.33:1 | 1.51:1 | Decorative only; acceptable if never the sole identifier of a control |
| **accent as text on background** | **1.89:1** | n/a | **Never use amber as text or an icon colour on light backgrounds** |

**Actions:**
1. Add `--input-strong` for form-control borders: light `oklch(0.62 0.02 230)` ≈ `#7A8990` (3.57:1); dark `oklch(0.55 0.025 230)` ≈ `#63757E` (3.96:1). Use it on text inputs, selects, checkboxes and radio buttons. Keep `--input` for disabled states.
2. If an amber text colour is needed (for example a "stale price" label), use `oklch(0.45 0.11 65)` ≈ `#7E4500` (7.55:1 on background).
3. Never convey status by colour alone. Every badge has an icon and a text label.

### 1.4 Colour semantics

| Meaning | Colour | Never use for |
|---|---|---|
| Trust and navigation | Primary teal | Commercial CTAs when flags are off (use secondary instead) |
| Commercial action (flag on) | Amber accent | Educational links, medication names, "best" highlights |
| Verified | Success green with a check icon | Unverified data |
| Unverified, stale, "check the SmPC" | Warning amber panel | Promotional emphasis |
| Red flags, seek urgent care | Destructive red with an alert icon | Price drops or offers |
| Evidence and sources | Info blue | Advertising |

---

## 2. Typography

Fonts (loaded via `next/font`, self-hosted, `display: swap`):
- **Inter** (variable): UI and body (`--font-sans`).
- **Source Serif 4**, weights 600 and 700: H1 and H2 on editorial pages only (`--font-serif`), for an authoritative, editorial feel.

Scale (rem, based on 16px; fluid between 360px and 1280px viewports):

| Token | Mobile | Desktop | Line height | Weight | Use |
|---|---|---|---|---|---|
| `display` | 2.25 (36px) | 3.25 (52px) | 1.1 | Serif 700 | Homepage hero only |
| `h1` | 1.875 (30px) | 2.5 (40px) | 1.15 | Serif 700 | Page titles |
| `h2` | 1.5 (24px) | 1.875 (30px) | 1.25 | Serif 600 | Section headings |
| `h3` | 1.25 (20px) | 1.375 (22px) | 1.3 | Inter 600 | Subsections, card titles |
| `h4` | 1.125 (18px) | 1.125 (18px) | 1.4 | Inter 600 | Table group headings |
| `body-lg` | 1.125 (18px) | 1.1875 (19px) | 1.65 | Inter 400 | Article body |
| `body` | 1 (16px) | 1 (16px) | 1.6 | Inter 400 | UI copy, tables |
| `small` | 0.875 (14px) | 0.875 (14px) | 1.5 | Inter 400/500 | Metadata, captions, disclosure badges |
| `micro` | 0.8125 (13px) | 0.8125 (13px) | 1.45 | Inter 500 | Badges only; never body copy |

Rules: article measure 60–75 characters (`max-w-[68ch]`); minimum body size 16px; numbers in tables use `font-variant-numeric: tabular-nums`; no text in all capitals beyond 3 words; underline links in body copy (do not rely on colour alone).

---

## 3. Spacing, radii and elevation

**Spacing scale** (4px base, Tailwind defaults): 1 = 4px, 2 = 8px, 3 = 12px, 4 = 16px, 6 = 24px, 8 = 32px, 12 = 48px, 16 = 64px, 24 = 96px.
- Section vertical rhythm: 48px on mobile, 80px on desktop.
- Card padding: 16px on mobile, 24px on desktop.
- Gutter: 16px on mobile, 24px on tablet, 32px on desktop. Container maximum 1200px; article column maximum 720px.

**Radii:** `--radius` = 10px. `sm` 6px (badges, inputs), `md` 8px (buttons), `lg` 10px (cards), `xl` 14px (hero panels, modals). Avatars and status dots are fully round.

**Elevation:**

| Level | Shadow | Use |
|---|---|---|
| 0 | none, 1px `--border` | Default cards and tables |
| 1 | `0 1px 2px rgb(13 28 39 / 0.06), 0 1px 3px rgb(13 28 39 / 0.08)` | Hover on interactive cards |
| 2 | `0 4px 12px rgb(13 28 39 / 0.10)` | Dropdowns, popovers, sticky table headers |
| 3 | `0 12px 32px rgb(13 28 39 / 0.18)` | Modals, mobile sheet, sticky CTA bar |

In dark mode, use a lighter surface (`--card`) instead of a stronger shadow.

---

## 4. Component inventory

States key: D = default, H = hover, F = focus-visible (2px `--ring` outline, 2px offset), A = active or pressed, Dis = disabled, L = loading, E = error, Emp = empty.

### 4.1 Global and layout

| Component | Purpose | States and variants | Notes |
|---|---|---|---|
| `Header` / `DesktopNav` / `MobileNav` | Primary navigation | D, H, F, open; current section | Radix NavigationMenu and Sheet; Esc closes; focus is trapped in the sheet |
| `Breadcrumbs` | Hierarchy | D; truncation on mobile (first and last two items) | Emits BreadcrumbList |
| `PageHeader` | H1, standfirst, meta row | Variants: hub, article, provider, tool | Meta row: author, reviewer, "Last reviewed", "Updated" |
| `Footer` | Links and legal text | D | Includes publisher details |
| `CookieConsent` | PECR consent | Banner and preferences dialog | "Reject all" equal in prominence to "Accept all"; no pre-ticked boxes |

### 4.2 Editorial

| Component | Purpose | States and variants |
|---|---|---|
| `KeyTakeaways` | Summary list after the intro | D |
| `Callout` | info, warning, evidence | Three variants with icon and label |
| `RedFlagBox` | Urgent symptoms and actions (NHS 111, 999) | D only; destructive styling; always expanded |
| `MedicalDisclaimer` | End-of-article disclaimer | D |
| `ReviewerStamp` | "Medically reviewed by {name}, {credential}, GPhC {number}" plus date | D; pending state ("Awaiting clinical review") is never shown in production because unreviewed content is excluded |
| `SourcesList` | Numbered references with publisher and year | D; collapsible on mobile |
| `TableOfContents` | In-page nav | D, active section; sticky on desktop; accordion on mobile |
| `FaqAccordion` | Visible FAQs (matches any FAQ markup) | Collapsed, expanded, F |
| `RelatedArticles` | Sideways links | 3 or 6 cards |
| `UpdatedNote` | "What changed" for significant updates | D |

### 4.3 Medication

| Component | Purpose | States and variants |
|---|---|---|
| `KeyFactsCard` | Generic name, class, route, frequency, licence, NICE TA | D; `StatusBadge` inside |
| `StatusBadge` | UK status: Licensed · Diabetes only · Not yet licensed · **Check current status** | Four variants; the "verify" variant uses warning styling and links to the MHRA or SmPC |
| `DoseLadder` | Titration steps as a vertical stepper | Current dose highlighted on dose pages; roles labelled; "minimum 4 weeks per step" note from the SmPC |
| `SideEffectTable` | Side effects by SmPC frequency band | Sortable by frequency; a "serious" row style; Emp state ("No data verified yet") |
| `TopicTabs` | Medication topic navigation | D, current, H, F; horizontal scroll with fade edges on mobile |

### 4.4 Provider and comparison

| Component | Purpose | States and variants |
|---|---|---|
| `ProviderCard` | Summary in lists | D, H; unverified variant shows "Details being verified" and hides fields |
| `RegulatorBadge` | GPhC or CQC registration with register link and checked date | Verified, Unverified (neutral grey, "Not yet checked") |
| `VerifiedStamp` | "Details checked {date}" | Fresh (≤ 90 days), stale (warning) |
| `ComparisonTable` | Side-by-side attributes | Desktop table with sticky header and first column; mobile cards (§6); Emp cell = "Not verified" (never blank, never a guess) |
| `CompareBuilder` | Choose two or three providers | D, selection, max reached, E |
| `ServiceTable` | Flag-off comparison of services (consultation model, prescriber type, delivery, aftercare, maintenance policy, regulator) | Default for `/prices` with the flag off |
| `PriceTable` **[G:pomPricing]** | Drug price by dose | Fresh, stale (warning label), hidden (> 21 days); "checked {date}" per row |
| `PriceHistoryChart` **[G:pomPricing]** | Price over time per provider and dose | Accessible data table alternative is required |
| `OfferCard` **[G:discountCodes]** | Offer terms and expiry | Active, expiring soon (neutral text, no countdown timers), expired (hidden) |
| `ProviderComparisonCTA` | MDX component | Flag off: secondary button "Compare providers" → `/providers`. Flag on: may point to `/compare` or `/prices`; still internal |
| `AffiliateButton` **[G:affiliateLinks]** | Outbound "Visit {provider}" | D, H, F; `rel="sponsored nofollow noopener"`; adjacent "Ad / commission" label |
| `StickyCta` **[G:stickyCta]** | Mobile bottom bar | See §6.2 |

### 4.5 Tools and forms

| Component | Purpose | States |
|---|---|---|
| `BmiForm` | Height and weight in metric or imperial; optional ethnicity for NICE thresholds | D, F, E (inline, linked with `aria-describedby`), result |
| `BmiResult` | BMI value, category, NICE context | Always includes "This is not a prescribing decision" and a link to speak to a GP |
| `EligibilityForm` | Informational multi-step check | Step n of N; Back; E; result with signposting only |
| `Button` | Primary, secondary, outline, ghost, link, accent [G] | D, H, F, A, Dis, L (spinner plus `aria-busy`) |
| `Input` / `Select` | Form controls | D, F, E, Dis; uses `--input-strong` border |

---

## 5. Layout patterns

| Pattern | Desktop (≥1024px) | Mobile (<768px) |
|---|---|---|
| Hub | Hero band (H1, standfirst, KeyFacts at right), TopicTabs, a 2-column grid of topic cards, comparisons strip, guides strip, FAQs | Single column; KeyFacts below the H1; TopicTabs scroll |
| Article | 3 columns: TOC (240px, sticky) · article (720px) · rail (280px: reviewer, related, flag-aware CTA) | Single column; TOC accordion under the H1; rail content moves after the article |
| Provider review | 2 columns: content (760px) · sticky summary card (regulator, verified date) | Summary card at top, collapsible |
| Comparison | Full-width table, max 3 columns of entities | Cards with a "jump to attribute" select |
| Tool | Centred form (560px), then result, then explanation | Same, full width |
| Listing (guides, providers) | 3-column card grid plus filter sidebar | 1 column; filters in a bottom sheet |

---

## 6. Mobile patterns

### 6.1 Collapsible comparison tables → cards

- Below 768px, `ComparisonTable` renders each entity as a card with attributes as a definition list (`<dl>`), in the same order as the desktop rows.
- Two-entity comparisons can use a "side-by-side mini" view: two narrow columns with attribute labels as full-width row headers. This works when there are 6 or fewer attributes per group.
- Attribute groups (Regulation, Medicines, Process, Aftercare, Cost structure) are accordions; the first group is open.
- A "Differences only" toggle hides identical rows.
- The real `<table>` markup stays in the DOM for screen readers at all sizes (cards are a visual re-layout using CSS grid, not a separate data copy), or `aria-hidden` is applied correctly to whichever copy is not shown.

### 6.2 Sticky CTA behaviour ([G:stickyCta])

Only when `flags.stickyCta` is on and only on `/providers/{p}`, `/providers/{p}/{med}`, `/compare/*` and `/prices/*`. **Never** on guides, medication hubs, topic, dose or side-effect pages, or tools.

| Rule | Detail |
|---|---|
| Appears | After the user scrolls past the primary summary card (IntersectionObserver), not on load |
| Height | 64px plus safe-area inset; content gets equal bottom padding so nothing is hidden |
| Content | Provider name, "Compare providers" (internal) or, if `affiliateLinks` is also on, "Visit {provider}" with an "Ad" label |
| Dismiss | Close button (44×44px); dismissal remembered for the session |
| Hides | When the on-screen keyboard is open, when the footer is in view, when a modal is open |
| Copy | No urgency, no prices, no discount language, no medication names in the button |
| Accessibility | `role="region"`, `aria-label="Provider actions"`; it is not a focus trap; reachable in tab order after the main content |

### 6.3 Other mobile rules

- Tap targets of at least 44×44px (WCAG 2.5.8 sets a 24px minimum; we use 44px).
- No horizontal page scroll; tables outside the comparison component scroll inside a labelled region with a visible scroll hint.

---

## 7. Accessibility rules (WCAG 2.2 AA)

1. Semantic landmarks: `header`, `nav` (labelled), `main`, `aside`, `footer`. One H1 per page; no skipped heading levels.
2. "Skip to content" link as the first focusable element.
3. Visible focus on every interactive element (`--ring`, 2px, offset 2px). Focus is never obscured by sticky elements (WCAG 2.4.11).
4. Keyboard access to everything: menus, accordions, tabs (arrow keys per the Radix patterns), the comparison builder and tools.
5. Forms: visible labels, error text linked with `aria-describedby`, errors announced via `aria-live="polite"`, no time limits.
6. Tables: `<caption>`, `scope` on headers; charts have a data-table alternative.
7. Motion: respect `prefers-reduced-motion`; no autoplaying carousels; no parallax.
8. Images: meaningful `alt`; decorative images use `alt=""`. No images of text.
9. Language: `lang="en-GB"`. Abbreviations expanded on first use (GLP-1, GIP, SmPC, NICE).
10. Reading level: aim for UK reading age 12–14 on hubs and FAQs; clinical terms are explained inline.
11. Testing: axe in CI, plus a manual screen-reader pass (VoiceOver on iOS, NVDA on Windows) on every template before launch.

---

## 8. Tone of voice

**We sound like** a knowledgeable pharmacist friend who reads the trials: calm, clear, precise and kind.

| Do | Don't |
|---|---|
| "In the SURMOUNT-1 trial, people on the highest dose lost on average…" | "Melt the pounds away" |
| "Speak to your prescriber before changing your dose." | "Up your dose to break a plateau" |
| "Prices vary by dose and provider. See our price comparison." | "From just £…!" in article copy |
| "Mounjaro (tirzepatide) is licensed in the UK for weight management alongside a reduced-calorie diet and increased physical activity." | "The best weight-loss jab" |
| "Some people notice…" / "The leaflet lists…" | Testimonials, before-and-after stories, named patients |
| "At the time of writing, the UK status of … is …; check the MHRA or SmPC." | Stating unverified regulatory status as fact |
| People-first language: "people living with obesity" | "Obese people", "fat", blame-laden framing |
| British English: diarrhoea, oesophagus, programme, licence (noun), anaesthesia | American spellings |

Banned words and phrases in editorial copy: buy, order now, get yours, best (as a superlative for a medicine or provider), cheapest (outside gated price components), miracle, guaranteed, quick fix, skinny jab, fat jab, discount code (outside gated pages), limited time, hurry.

Headline style: sentence case; questions are allowed ("Can you drink coffee on Mounjaro?"); maximum 65 characters for `<title>`.
