# Compliance framework

**Owner:** Project lead, with the retained regulatory/legal adviser · **Status:** Draft for legal review · **Last updated:** 3 October 2026

> **This document is not legal advice.** It is the team's working summary of the rules that apply to JabsAndTabs and how the site is designed to comply. Every commercial feature flag needs written sign-off from a qualified UK regulatory or legal adviser, recorded in [`SIGN-OFF.md`](./SIGN-OFF.md), before it is switched on in production. Items marked **(verify)** have been checked against secondary sources only and must be confirmed against the primary source by the adviser.

---

## 1. Why this site is high risk

1. **The products are prescription-only medicines (POMs).** Mounjaro (tirzepatide), Wegovy (semaglutide, injection and tablet), Saxenda (liraglutide) and Foundayo (orforglipron) are POMs. Advertising POMs to the public is a criminal offence in the UK.
2. **The site could earn money from providers.** It is currently non-commercial, but once affiliate links, codes or commercial placements are involved, the ASA and the MHRA are likely to treat related content as advertising, not editorial, because the publisher benefits commercially. Regulators have named affiliates and influencers in their weight-loss enforcement work.
3. **It is health (YMYL) content.** Inaccurate information can harm people. Misleading health claims also breach the CAP Code.

The design answer: **education first; commercial modules behind flags, off by default; full disclosure always.**

---

## 2. The regulations

### 2.1 Human Medicines Regulations 2012 (HMR), Part 14: advertising

- **Regulation 284** prohibits publishing an advertisement that is likely to lead to the use of a prescription-only medicine (with limited exceptions, such as approved vaccination campaigns, that do not apply here).
- "Advertisement" is defined broadly. It includes anything designed to promote the prescription, supply, sale or use of a medicinal product, and it is not limited to paid media. Content on a website that benefits commercially from supply can fall within it.
- Other Part 14 duties (for example that advertising must encourage rational use and must not be misleading) apply where advertising is permitted, which for POMs to the public it is not.
- **Enforcement:** the MHRA. Breach is a criminal offence. The MHRA can require amendments or withdrawal and can refer cases for prosecution.

**MHRA Blue Guide** (*Advertising and promotion of medicines in the UK*): the MHRA's guidance on applying Part 14. It explains how the MHRA judges whether material is promotional: context, the publisher's commercial relationship, the prominence of a brand name and links to purchase. Disease-awareness and balanced information can be acceptable; brand-led material that encourages people to request a specific POM is not.

### 2.2 CAP Code (non-broadcast advertising code), enforced by the ASA

- **Rule 12.12:** prescription-only medicines may not be advertised to the public.
- **Section 12** generally: medicinal claims must be substantiated; marketing must not discourage people from seeking essential treatment or offer diagnosis or treatment at a distance in a way that bypasses proper care.
- **Section 13 (weight control and slimming):** marketing for weight-control products and services must not be directed at under-18s and must not suggest that being underweight is acceptable or desirable. In weight-loss POM rulings the ASA has also considered whether ads exploited body-image insecurities.
- **Section 2 (recognisability):** marketing communications must be obviously identifiable as such. **Affiliate marketing** falls within the ASA's remit where the affiliate is paid (for example on commission) for content about a product or service; such content must be labelled as advertising.
- **Section 3 (misleading advertising)** including price statements, comparisons and "from" prices.

### 2.3 Enforcement activity on weight-loss POMs

| Date | Action | Relevance to JabsAndTabs |
|---|---|---|
| April 2025 | **Joint Enforcement Notice from CAP, the MHRA and the GPhC** on advertising named weight-loss POMs. It confirms that ads for weight-loss POMs are prohibited in all media, including paid social, organic social, paid search, **influencer marketing and affiliate ads**, and names "promotional pricing" as a grey area under investigation | Our commercial modules (prices, codes, outbound links) are the exact activities covered |
| July 2025 | **ASA rulings against nine online pharmacy and provider ads** (reported by UCL and trade press). They set out that providers may mention weight-loss injections on their sites but not on homepages or landing pages reached from ads; that ads must not use phrases such as "weight loss injections", "weight loss pen", "obesity treatment jab", "GLP-1" (for an injectable) or "weight-loss medication", or abbreviations of POM names; and that ads must not show branded or unbranded injection pens or vials. Treatments may be marketed only as part of a wider consultation-led service | Our sitewide wording ("Compare UK weight loss injections & tablets") is editorial, but because the site earns commission the adviser should confirm whether any template could be judged an ad. Imagery policy: no pens or vials anywhere |
| September 2025 | **Updated CAP Enforcement Notice** on POMs used for weight management (verify the exact changes against the ASA's published PDF) | Re-check the Gate 1–3 criteria against this version |
| December 2025 | **ASA rulings against weight-loss medicine ads** including from WLO Ltd t/a SkinnyJab, Chequp Health Ltd and **MedExpress Enterprises Ltd**. The ASA found they advertised POMs to the public and exploited body-image insecurities | MedExpress is one of our listed providers. Its review must report this accurately and neutrally. We must not reproduce any of the ruled-against ad copy or imagery |

The adviser should also check the ASA rulings database for any decisions issued since December 2025 before signing any gate.

### 2.4 GPhC guidance for online pharmacies (context for providers)

- The GPhC's **guidance for registered pharmacies providing pharmacy services at a distance, including on the internet** was strengthened in **February 2025**. Weight-loss medicines were added to the categories needing extra safeguards. Prescribers must not rely on an online questionnaire alone; they must **independently verify** a person's weight, height and/or BMI (for example through two-way communication such as video, access to clinical records, or contact with the person's GP or regular prescriber).
- The GPhC was co-signatory to the April 2025 enforcement notice and can take action against registered pharmacies for unlawful promotion.
- **How we use this:** as a neutral assessment criterion in provider reviews (Do they describe independent verification? Do they share information with GPs?), and as a safety education topic. We report what providers publish; we do not assert compliance or non-compliance without evidence.
- Related regulators to reference in reviews: **CQC** (online doctor services in England), **Healthcare Improvement Scotland**, **Healthcare Inspectorate Wales**, **RQIA** (Northern Ireland), the **GMC** (doctors) and the **NMC** (nurse prescribers).

### 2.5 Consumer law: CMA and the DMCC Act 2024

- **Digital Markets, Competition and Consumers Act 2024**, Part 4: the unfair commercial practices regime came into force on **6 April 2025** and replaced the Consumer Protection from Unfair Trading Regulations 2008.
- **Banned practices (Schedule 20)** include fake consumer reviews and concealed incentivised reviews. Publishers of reviews must take reasonable and proportionate steps to prevent and remove fake reviews. **Drip pricing** (not showing mandatory fees up front) is also prohibited.
- **Hidden connections / misleading omissions:** failing to disclose a material connection (such as commission from providers) where it would affect a consumer's decision can be a misleading omission.
- **Enforcement:** the CMA can now impose fines directly of up to 10% of global turnover (or £300,000 if higher, for businesses).
- **Our controls:** no user reviews hosted at MVP; no review schema built from third-party ratings; Trustpilot scores shown only as dated, attributed facts; commercial relationships (if any) disclosed and labelled; total-cost presentation for any price; methodology published.
- Subscription contract rules in the DMCC Act are due to commence later (verify commencement date). Relevant to how we explain provider subscriptions.

### 2.6 Data protection: UK GDPR, DPA 2018, PECR

| Requirement | How we comply |
|---|---|
| ICO registration (data protection fee) | Paid before launch; number shown in footer and privacy notice |
| Lawful basis and transparency | Privacy notice covering contact and corrections forms and consented analytics |
| **PECR consent for non-essential cookies** | Consent banner (`cookie-consent.tsx`); nothing non-essential before opt-in; "Reject all" as prominent as "Accept all" |
| Data (Use and Access) Act 2025 | Introduces some cookie exemptions (for example certain analytics). Do not rely on them until the adviser confirms commencement and scope (verify) |
| Special category (health) data | Tools run in the browser; inputs are never sent, stored or logged. No health questions in forms |
| Click tracking | `ClickEvent` stores only link ID, page and time: no personal data |
| International transfers | Hosting and analytics providers with a UK adequacy basis or IDTA/addendum; prefer UK or EU regions |

### 2.7 Other relevant rules

- **Medical information accuracy:** CAP Code substantiation rules apply to any marketing claim. Editorial accuracy is a trust and safety issue regardless.
- **Equality and accessibility:** WCAG 2.2 AA as a design requirement (Part 3).
- **Patient data:** the site must never contain real patient data, prescriptions or health details of identifiable people.

---

## 3. What each flag controls, and the risks

Flags live in `src/config/flags.ts`, are read on the server only, and default to `false`. Turning a flag on requires a deploy (an audit trail) **and** a signed record in `SIGN-OFF.md`.

| Flag (env var) | Controls when ON | Behaviour when OFF (default) | Main legal risk if ON | Risk level | Key mitigations required |
|---|---|---|---|---|---|
| `pomPricing` (`FLAG_POM_PRICING`) | Drug-name price tables on `/prices/{med}`; price mini-tables on hubs, dose pages and comparisons; `/providers/{p}/{med}/{dose}` routes; "lowest price" style modules | `/prices` is a **service** comparison (regulation, prescriber, verification, aftercare, cost *structure*); dose-price routes 404 and are absent from the sitemap | Named POM + price + commercial benefit = an advertisement likely to lead to the use of a POM (HMR reg. 284; CAP 12.12). Promotional pricing is named as a grey area in the enforcement notice. Also misleading pricing (DMCC drip pricing, stale prices) | **High** | Gate 1 in Part 7: adviser opinion on the exact format; no "cheapest/save/deal" language; total cost; dates and sources; neutral default sort; `noindex` on dose-price pages unless approved |
| `affiliateLinks` (`FLAG_AFFILIATE_LINKS`) | `/go/{provider}` outbound redirects with anonymous click logging; "Visit {provider}" buttons | All CTAs link to our own review pages (`getProviderCta()` in `affiliate.ts`) | Commission makes surrounding content "advertising" in the ASA's eyes; affiliate ads are named in the enforcement notice. Recognisability failures (CAP section 2) | **High** | Gate 2: adviser opinion; "Ad" labels; `rel="sponsored"`; links to service pages only; none from guides, hubs, tools or the homepage; agreements with no editorial control by providers |
| `discountCodes` (`FLAG_DISCOUNT_CODES`) | `/providers/{p}/discount-codes` routes; offer cards and modules | Routes 404; no offer content anywhere | Discounts on POM-related services are among the most clearly promotional activities; urgency and reference-price risks under the DMCC Act | **Very high** | Gate 3: adviser opinion specific to offers; service-level offers only; no countdowns; verified terms; requires Gates 1 and 2 |
| `stickyCta` (`FLAG_STICKY_CTA`) | Sticky mobile action bar on provider, compare and price templates | No sticky bar | Heightens the promotional character of a page; accessibility (obscured focus) | **Medium** | Gate 4: commercial templates only; no medicine names; dismissible; WCAG 2.4.11 |
| `showUnreviewedContent` (`FLAG_SHOW_UNREVIEWED_CONTENT`) | Shows articles not yet clinically reviewed | Only `clinically-reviewed` articles render | Publishing unchecked health information; E-E-A-T damage | **Critical (never in production)** | CI blocks it in production builds; preview environments only |

**Always on, regardless of flags:** the methodology page, the `/affiliate-disclosure` page and the medical disclaimer.

---

## 4. Editorial compliance rules (summary)

These restate `CONTRACTS.md` §4 for the legal reviewer:

1. No promotion of POMs. Balanced, educational content. Never "buy", "order now", "get yours", "best", "miracle", "guaranteed", discount codes, urgency, or before-and-after claims. Brand names used factually.
2. No prices in article body copy. Explain what affects cost and link to `/prices`.
3. Evidence-based. Cite SmPCs, MHRA, NICE, NHS and peer-reviewed trials by name. Never invent statistics, quotes, studies or experts.
4. Uncertain regulatory status is stated as uncertain or "at the time of writing" (for example the oral GLP-1s, which public reporting indicates were MHRA-authorised in June and August 2026 (verify), and any new Wegovy doses).
5. Prescribing decisions belong to the prescriber. Red-flag symptoms and urgent-care signposting (NHS 111, 999) are included where relevant.
6. No real patient data, testimonials or identifiable people's health details.
7. Every article stays `pending-clinical-review` until a named, registered clinician signs it off.
8. No images of injection pens, vials or tablets that could act as product promotion; no body-image imagery (before-and-after photos, tape measures around waists).
9. Content is not targeted at under-18s; no placement on media aimed at under-18s.

---

## 5. Provider data compliance

- Facts come only from primary sources: the GPhC and CQC (or devolved) registers, the provider's own published pages, and Trustpilot (dated and attributed).
- `verified = false` until checked; unverified fields are labelled "Not yet verified", never estimated.
- Regulatory actions (ASA rulings, GPhC or CQC actions) are reported factually with a link to the source and the date, and given right-of-reply where practicable.
- Providers are listed alphabetically by default; no provider is ranked first for commercial reasons.
- Prices (when enabled) are never scraped without written permission.

---

## 6. Incident and complaint handling

| Event | Response |
|---|---|
| ASA or MHRA contact or complaint | Acknowledge within 2 working days; switch off any implicated flag immediately; notify the adviser; record in `SIGN-OFF.md` under "Incidents" |
| New ASA ruling or CAP/MHRA guidance on weight-loss POMs | Adviser review within 10 working days; re-open the affected gates |
| Factual error reported | Correct within 5 working days; log in `/corrections` |
| Provider dispute about a review | Verify against primary sources; correct or explain; log in `EditorialAudit` |
| Data breach | Follow the incident runbook; notify the ICO within 72 hours where required |

---

## 7. Sign-off

Use [`SIGN-OFF.md`](./SIGN-OFF.md). One record per flag per environment. The template is reproduced below for convenience; the file is the authoritative record.

```markdown
## Sign-off record: <FLAG_NAME> (<environment>)

- **Flag / env var:** <pomPricing / FLAG_POM_PRICING>
- **Environment:** <production / preview>
- **Requested by:** <name, role>  **Date requested:** <YYYY-MM-DD>
- **Scope:** <templates and routes covered; screenshots or preview URLs attached>
- **Gate checklist (Part 7 §6):** all items ticked? <yes/no>; evidence links: <…>
- **Adviser:** <name, firm, qualification>
- **Opinion reference:** <document reference and date>
- **Conditions or limitations:** <e.g. "service-landing links only", "noindex dose-price pages">
- **Decision:** <APPROVED / APPROVED WITH CONDITIONS / REJECTED>
- **Signed (adviser):** <name, date>
- **Signed (project lead):** <name, date>
- **Review date:** <YYYY-MM-DD, at most 12 months>
- **Rollback owner:** <name>; **rollback tested:** <date>
```
