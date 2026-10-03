# Part 5: SEO strategy

**Owner:** SEO lead · **Status:** Draft for team and legal review · **Last updated:** 3 October 2026
**Depends on:** Part 1 (IA and keyword ownership), `content/plan/*`, `docs/compliance/README.md`

---

## 1. Strategy in one page

**Goal:** become the UK's most trusted organic destination for GLP-1 weight-loss medicine questions, and the default neutral comparison of the regulated services that prescribe them.

**The constraint shapes the strategy.** Mounjaro, Wegovy, Saxenda and the oral GLP-1s are prescription-only medicines. Advertising them to the public is prohibited (Human Medicines Regulations 2012, reg. 284; CAP Code rule 12.12). In 2025 the CAP, the MHRA and the GPhC issued joint enforcement notices that name affiliate and influencer activity, and the ASA ruled against several weight-loss medicine advertisers, including online pharmacies. Because JabsAndTabs earns affiliate commission, the ASA may treat its commercial modules as advertising. So:

| Phase | What we rank with | What stays off |
|---|---|---|
| **Now (flags off)** | Educational medicine content (side effects, dosing, results, eligibility, safety, diet, exercise, switching, maintenance); neutral **service** comparisons of regulated providers (regulation, prescriber type, verification, aftercare, cost *structure*); tools; trust content | Drug-name price tables, "cheapest" modules, discount codes, outbound affiliate buttons, sticky CTAs |
| **After written legal sign-off, flag by flag** | The same pages gain the gated modules defined in `flags.ts` and the gated URLs (provider × dose prices, discount pages) | Anything the sign-off does not explicitly cover |

**Why this can still win.** Most search demand in this category is informational or problem-solving ("mounjaro side effects", "mounjaro and alcohol", "missed dose", "plateau", "what to eat"). Competitors are thin there. Strong rankings on that long tail build the topical authority that also lifts the commercial pages once they are allowed, and they carry far less regulatory risk.

**Search volumes.** This document does **not** state search volumes. Priorities (High, Med, Low) are editorial judgements based on commercial value, topical importance and observed SERP competition. **Before Phase 1 content is scheduled, the SEO lead must pull UK volumes, keyword difficulty and SERP features from Ahrefs or Semrush, and after launch must re-rank priorities using Google Search Console impressions.** Record volumes in a keyword sheet with the date pulled; never paste them into published copy.

---

## 2. Intent definitions

| Intent | Meaning | Typical template |
|---|---|---|
| Informational | Wants to understand something | Pillar, topic page, supporting article |
| Problem-solution | Has a specific problem on treatment | Supporting article, side-effect page |
| Commercial | Researching options before choosing a service | Provider index, provider review, pricing explainer |
| Comparison | Wants X vs Y | Medication comparison, provider comparison, price engine |
| Review | Wants an assessment of a named provider | Provider review |
| Transactional | Wants to act now (buy, code, cheapest) | **Mostly gated.** Served with a compliant educational angle until sign-off |
| Navigational | Looking for a brand or page | Medication hub, tool |

---

## 3. Gated keywords and compliant angles

These keywords have inherently promotional intent. Until the relevant flag is signed off, we target them only with the compliant angle shown. Titles, H1s and meta descriptions must not contain "buy", "cheap", "cheapest", "discount", "code", "deal", "offer" or "best" for these pages.

| Keyword | Intent | Target URL | Compliant angle |
|---|---|---|---|
| cheap mounjaro | Transactional | `/mounjaro-prices` | Explain what drives cost and the risks of unusually low prices (fakes, unregulated sellers) → /guides/fake-weight-loss-jabs; no 'cheap' in titles |
| mounjaro discount code | Transactional | `/providers/{p}/discount-codes [G:discountCodes]` | Flag off: no code pages. Target with 'How pricing and offers work, and what to check before you sign up' (/guides/how-weight-loss-injection-pricing-works) |
| best weight loss injection | Commercial | `/guides/weight-loss-injections-compared` | No 'best' claims about POMs. Angle: 'Every UK weight loss injection compared' with neutral evidence tables |
| buy mounjaro online | Transactional | `/guides/getting-weight-loss-injections-online-safely` | How to get treatment online safely: regulator checks (GPhC/CQC registers), what a legitimate consultation involves, spotting illegal sellers |
| cheapest mounjaro uk | Transactional | `/guides/how-weight-loss-injection-pricing-works` | Explain pricing structure, total cost and why the lowest headline price may not be the lowest total cost; price table only if pomPricing is signed off |
| mounjaro comparison | Comparison | `/prices/mounjaro (service comparison while flag off)` | Service comparison (regulation, prescriber, aftercare) until pomPricing sign-off |
| wegovy comparison | Comparison | `/prices/wegovy (service comparison while flag off)` | As above |
| fat jab | Informational | `/weight-loss-injections` | Use only as a recognised search term; people-first language |
| skinny jab | Informational | `/guides/what-are-glp1-medications` | Use only as a recognised search term in copy; never as our framing |
| weight loss pills that work uk | Commercial | `/guides/weight-loss-tablets-uk` | No efficacy superlatives; licensed options and evidence only |
| mounjaro price comparison | Comparison | `/prices/mounjaro` | Service comparison while flag off; drug prices only after sign-off |
| wegovy price comparison | Comparison | `/prices/wegovy` | As above |
| mounjaro 2.5mg price | Transactional | `/providers/{p}/mounjaro/2-5mg [G:pomPricing]; /mounjaro-2-5mg` | Dose page explains the dose; price only in gated engine |
| mounjaro 5mg price | Transactional | `/mounjaro-5mg` | As above |
| mounjaro 15mg price | Transactional | `/mounjaro-15mg` | As above |
| cheapest wegovy uk | Transactional | `/guides/how-weight-loss-injection-pricing-works` | Explain pricing structure and total cost; no 'cheapest' claims |
| wegovy discount code | Transactional | `/providers/{p}/discount-codes [G:discountCodes]` | No code pages while flag off; explain how offers work and what to check |
| mounjaro voucher code | Transactional | `/providers/{p}/discount-codes [G:discountCodes]` | As above |
| mounjaro offers | Transactional | `/guides/how-weight-loss-injection-pricing-works` | Consumer-protection angle: conditions, auto-renewals, continuity of care |
| mounjaro first month discount | Transactional | `/guides/weight-loss-treatment-hidden-costs` | Explain introductory pricing and long-term total cost; no offers listed |
| mounjaro next day delivery | Transactional | `/guides/cold-chain-delivery-explained` | Educational: how cold-chain delivery works and what to check on arrival |
| mounjaro free consultation | Transactional | `/guides/consultation-fees-explained` | Explain what consultation fees cover; no promotion |
| best online pharmacy for mounjaro | Commercial | `/providers` | No 'best' superlative; transparent methodology, alphabetical default sort |
| mounjaro before and after | Informational | `/mounjaro-results` | No before-and-after imagery or testimonials; show trial averages only |
| mounjaro without prescription | Transactional | `/guides/can-you-get-glp1-without-prescription` | Safety angle: POM law and dangers of illegal supply |
| retatrutide buy uk | Transactional | `/guides/research-peptide-risks` | Safety-only: unlicensed, illegal 'research peptides'; never sourcing information |
| best weight loss injection uk | Comparison | `/guides/weight-loss-injections-compared` | Neutral 'every injection compared'; no 'best' in title |
| buy mounjaro online safely | Informational | `/guides/getting-weight-loss-injections-online-safely` | Regulator checks and safe-access guide; no 'buy' in title or CTAs |
| boots mounjaro discount code | Transactional | `/providers/boots/discount-codes [G:discountCodes]` | No code pages while flag off; provider review covers cost structure |
| superdrug mounjaro discount code | Transactional | `/providers/superdrug/discount-codes [G:discountCodes]` | No code pages while flag off; provider review covers cost structure |
| asda mounjaro discount code | Transactional | `/providers/asda/discount-codes [G:discountCodes]` | No code pages while flag off; provider review covers cost structure |
| lloydspharmacy mounjaro discount code | Transactional | `/providers/lloyds/discount-codes [G:discountCodes]` | No code pages while flag off; provider review covers cost structure |
| chemist4u mounjaro discount code | Transactional | `/providers/chemist4u/discount-codes [G:discountCodes]` | No code pages while flag off; provider review covers cost structure |
| mybmi mounjaro discount code | Transactional | `/providers/mybmi/discount-codes [G:discountCodes]` | No code pages while flag off; provider review covers cost structure |
| retatrutide uk buy | Problem-solution | `/guides/research-peptide-risks` | Safety-only; never sourcing |
| mounjaro price match | Commercial | `/guides/price-match-offers-what-to-check` | Consumer-protection angle only |

---

## 4. Keyword universe

Grouped by topical cluster. ★ marks the seed keywords from the brief. "Clear: verify licence status" means the page can be written now but must state the UK regulatory status "at the time of writing" until verified against the MHRA and the SmPC. Target URLs follow the canonical keyword-ownership rules in Part 1 §4; `{p}` means one URL per provider.

**Total keywords: 412** · Seed keywords from the brief: 21 of 21 (marked ★) · Gated / compliance review: 36


#### Medicines and hubs (35)

| Keyword | Intent | Priority | Target URL | Compliance status | Compliant angle (if gated) |
|---|---|---|---|---|---|
| ★ mounjaro uk | Navigational | High | `/guides/mounjaro-uk-complete-guide (hub /mounjaro for 'mounjaro')` | Clear |  |
| ★ wegovy uk | Navigational | High | `/guides/wegovy-uk-complete-guide (hub /wegovy)` | Clear |  |
| ★ weight loss tablets uk | Informational | High | `/guides/weight-loss-tablets-uk` | Clear: verify licence status |  |
| ★ oral glp1 | Informational | High | `/oral-glp1` | Clear: verify licence status |  |
| ★ tirzepatide uk | Informational | High | `/guides/tirzepatide-uk-guide` | Clear |  |
| ★ semaglutide uk | Informational | High | `/guides/semaglutide-uk-guide` | Clear |  |
| ★ weight loss medication uk | Informational | High | `/guides/weight-loss-medication-uk-overview` | Clear |  |
| mounjaro | Navigational | High | `/mounjaro` | Clear |  |
| wegovy | Navigational | High | `/wegovy` | Clear |  |
| weight loss injections uk | Commercial | High | `/weight-loss-injections` | Clear |  |
| weight loss jabs | Informational | High | `/weight-loss-injections` | Clear |  |
| wegovy pill | Informational | High | `/oral-semaglutide` | Clear: verify licence status |  |
| wegovy tablets | Informational | High | `/oral-semaglutide` | Clear: verify licence status |  |
| how does mounjaro work | Informational | High | `/mounjaro-how-it-works` | Clear |  |
| how does wegovy work | Informational | High | `/wegovy-how-it-works` | Clear |  |
| saxenda | Navigational | Med | `/saxenda` | Clear |  |
| fat jab | Informational | Med | `/weight-loss-injections` | Gated / compliance review | Use only as a recognised search term; people-first language |
| orforglipron uk | Informational | Med | `/foundayo` | Clear: verify licence status |  |
| saxenda uk | Navigational | Med | `/saxenda` | Clear |  |
| glp1 injections | Informational | Med | `/weight-loss-injections` | Clear |  |
| weight loss pills that work uk | Commercial | Med | `/guides/weight-loss-tablets-uk` | Gated / compliance review | No efficacy superlatives; licensed options and evidence only |
| oral semaglutide | Informational | Med | `/guides/oral-semaglutide-guide` | Clear: verify licence status |  |
| foundayo | Informational | Med | `/guides/foundayo-orforglipron-guide` | Clear: verify licence status |  |
| rybelsus weight loss | Informational | Med | `/guides/rybelsus-and-weight-loss` | Clear |  |
| new weight loss drugs | Informational | Med | `/guides/glp1-pipeline-future-treatments` | Clear |  |
| what is glp1 | Informational | Med | `/guides/what-are-glp1-medications` | Clear |  |
| history of glp1 | Informational | Med | `/guides/history-of-glp1-medicines` | Clear |  |
| retatrutide uk | Informational | Med | `/guides/retatrutide-explained` | Clear |  |
| skinny jab | Informational | Low | `/guides/what-are-glp1-medications` | Gated / compliance review | Use only as a recognised search term in copy; never as our framing |
| liraglutide uk | Informational | Low | `/saxenda` | Clear |  |
| saxenda how does it work | Informational | Low | `/saxenda-how-it-works` | Clear |  |
| mounjaro faqs | Informational | Low | `/mounjaro-faqs` | Clear |  |
| wegovy faqs | Informational | Low | `/wegovy-faqs` | Clear |  |
| foundayo uk | Informational | Low | `/guides/foundayo-uk-availability` | Clear |  |
| zepbound uk | Informational | Low | `/guides/zepbound-vs-mounjaro-names` | Clear |  |

#### Pricing (46)

| Keyword | Intent | Priority | Target URL | Compliance status | Compliant angle (if gated) |
|---|---|---|---|---|---|
| ★ cheap mounjaro | Transactional | High | `/mounjaro-prices` | Gated / compliance review | Explain what drives cost and the risks of unusually low prices (fakes, unregulated sellers) → /guides/fake-weight-loss-jabs; no 'cheap' in titles |
| ★ mounjaro discount code | Transactional | High | `/providers/{p}/discount-codes [G:discountCodes]` | Gated / compliance review | Flag off: no code pages. Target with 'How pricing and offers work, and what to check before you sign up' (/guides/how-weight-loss-injection-pricing-works) |
| ★ wegovy price | Commercial | High | `/wegovy-prices` | Clear (no prices in copy; figures only via gated engine) |  |
| ★ cheapest mounjaro uk | Transactional | High | `/guides/how-weight-loss-injection-pricing-works` | Gated / compliance review | Explain pricing structure, total cost and why the lowest headline price may not be the lowest total cost; price table only if pomPricing is signed off |
| mounjaro price | Commercial | High | `/mounjaro-prices` | Clear |  |
| mounjaro cost uk | Commercial | High | `/mounjaro-prices` | Clear |  |
| how much is mounjaro per month | Commercial | High | `/mounjaro-prices` | Clear |  |
| wegovy price uk | Commercial | High | `/wegovy-prices` | Clear |  |
| wegovy cost per month uk | Commercial | High | `/wegovy-prices` | Clear |  |
| weight loss injection prices uk | Commercial | High | `/prices` | Clear |  |
| mounjaro price comparison | Comparison | High | `/prices/mounjaro` | Gated / compliance review | Service comparison while flag off; drug prices only after sign-off |
| mounjaro 2.5mg price | Transactional | High | `/providers/{p}/mounjaro/2-5mg [G:pomPricing]; /mounjaro-2-5mg` | Gated / compliance review | Dose page explains the dose; price only in gated engine |
| mounjaro price uk | Commercial | High | `/mounjaro-prices` | Clear (no prices in copy) |  |
| weight loss injection cost | Commercial | High | `/guides/weight-loss-treatment-hidden-costs` | Clear (no prices in copy) |  |
| mounjaro price increase | Commercial | High | `/guides/mounjaro-price-rise-2025` | Clear (no prices in copy) |  |
| private weight loss injections | Commercial | High | `/guides/private-vs-nhs-weight-loss-treatment` | Clear (no prices in copy) |  |
| glp1 cost uk | Commercial | High | `/guides/long-term-cost-of-glp1-treatment` | Clear (no prices in copy) |  |
| wegovy pill price uk | Commercial | Med | `/oral-semaglutide-prices` | Clear: verify licence status |  |
| foundayo price uk | Commercial | Med | `/foundayo-prices` | Clear: verify licence status |  |
| wegovy price comparison | Comparison | Med | `/prices/wegovy` | Gated / compliance review | As above |
| mounjaro 5mg price | Transactional | Med | `/mounjaro-5mg` | Gated / compliance review | As above |
| mounjaro 15mg price | Transactional | Med | `/mounjaro-15mg` | Gated / compliance review | As above |
| cheapest wegovy uk | Transactional | Med | `/guides/how-weight-loss-injection-pricing-works` | Gated / compliance review | Explain pricing structure and total cost; no 'cheapest' claims |
| wegovy discount code | Transactional | Med | `/providers/{p}/discount-codes [G:discountCodes]` | Gated / compliance review | No code pages while flag off; explain how offers work and what to check |
| mounjaro voucher code | Transactional | Med | `/providers/{p}/discount-codes [G:discountCodes]` | Gated / compliance review | As above |
| mounjaro offers | Transactional | Med | `/guides/how-weight-loss-injection-pricing-works` | Gated / compliance review | Consumer-protection angle: conditions, auto-renewals, continuity of care |
| mounjaro first month discount | Transactional | Med | `/guides/weight-loss-treatment-hidden-costs` | Gated / compliance review | Explain introductory pricing and long-term total cost; no offers listed |
| mounjaro price increase uk | Informational | Med | `/guides/mounjaro-price-rise-2025` | Clear |  |
| is mounjaro free on the nhs | Informational | Med | `/guides/mounjaro-on-the-nhs` | Clear |  |
| why do mounjaro prices vary | Informational | Med | `/guides/why-prices-differ-between-pharmacies` | Clear |  |
| weight loss injection subscription | Comparison | Med | `/guides/subscriptions-vs-pay-as-you-go` | Clear |  |
| saxenda price uk | Commercial | Low | `/saxenda-prices` | Clear |  |
| mounjaro next day delivery | Transactional | Low | `/guides/cold-chain-delivery-explained` | Gated / compliance review | Educational: how cold-chain delivery works and what to check on arrival |
| mounjaro free consultation | Transactional | Low | `/guides/consultation-fees-explained` | Gated / compliance review | Explain what consultation fees cover; no promotion |
| boots mounjaro discount code | Transactional | Low | `/providers/boots/discount-codes [G:discountCodes]` | Gated / compliance review | No code pages while flag off; provider review covers cost structure |
| superdrug mounjaro discount code | Transactional | Low | `/providers/superdrug/discount-codes [G:discountCodes]` | Gated / compliance review | No code pages while flag off; provider review covers cost structure |
| asda mounjaro discount code | Transactional | Low | `/providers/asda/discount-codes [G:discountCodes]` | Gated / compliance review | No code pages while flag off; provider review covers cost structure |
| lloydspharmacy mounjaro discount code | Transactional | Low | `/providers/lloyds/discount-codes [G:discountCodes]` | Gated / compliance review | No code pages while flag off; provider review covers cost structure |
| chemist4u mounjaro discount code | Transactional | Low | `/providers/chemist4u/discount-codes [G:discountCodes]` | Gated / compliance review | No code pages while flag off; provider review covers cost structure |
| mybmi mounjaro discount code | Transactional | Low | `/providers/mybmi/discount-codes [G:discountCodes]` | Gated / compliance review | No code pages while flag off; provider review covers cost structure |
| mounjaro price match | Commercial | Low | `/guides/price-match-offers-what-to-check` | Gated / compliance review | Consumer-protection angle only |
| does health insurance cover mounjaro | Informational | Low | `/guides/health-insurance-cover-weight-loss` | Clear |  |
| mounjaro delivery cost | Informational | Low | `/guides/delivery-charges-explained` | Clear |  |
| cancel weight loss subscription | Problem-solution | Low | `/guides/subscription-cancellation-rights` | Clear |  |
| weight loss injection hidden fees | Informational | Low | `/guides/price-transparency-checklist` | Clear |  |
| return mounjaro pen | Problem-solution | Low | `/guides/returning-unused-pens` | Clear |  |

#### Providers and reviews (54)

| Keyword | Intent | Priority | Target URL | Compliance status | Compliant angle (if gated) |
|---|---|---|---|---|---|
| ★ online pharmacy weight loss | Commercial | High | `/guides/how-to-choose-online-pharmacy-weight-loss` | Clear |  |
| ★ online doctor weight loss | Commercial | High | `/guides/online-doctor-weight-loss-uk` | Clear |  |
| ★ weight loss clinic uk | Commercial | Med | `/guides/weight-loss-clinics-vs-online-providers` | Clear |  |
| online weight loss providers uk | Commercial | High | `/providers` | Clear |  |
| is it safe to buy weight loss injections online | Problem-solution | High | `/guides/getting-weight-loss-injections-online-safely` | Clear |  |
| best online pharmacy for mounjaro | Commercial | High | `/providers` | Gated / compliance review | No 'best' superlative; transparent methodology, alphabetical default sort |
| online pharmacy regulation uk | Commercial | High | `/guides/who-regulates-online-weight-loss-services` | Clear |  |
| compare weight loss providers | Comparison | Med | `/compare` | Clear |  |
| gphc registered online pharmacy | Informational | Med | `/guides/check-pharmacy-gphc-register` | Clear |  |
| mounjaro provider reviews | Review | Med | `/providers` | Clear |  |
| boots online doctor review | Review | Med | `/providers/boots` | Clear |  |
| superdrug online doctor review | Review | Med | `/providers/superdrug` | Clear |  |
| asda online doctor review | Review | Med | `/providers/asda` | Clear |  |
| lloydspharmacy online doctor review | Review | Med | `/providers/lloyds` | Clear |  |
| chemist4u review | Review | Med | `/providers/chemist4u` | Clear |  |
| mybmi review | Review | Med | `/providers/mybmi` | Clear |  |
| myweightloss review | Review | Med | `/providers/myweightloss` | Clear |  |
| zava review | Review | Med | `/providers/zava` | Clear |  |
| numan review | Review | Med | `/providers/numan` | Clear |  |
| manual review | Review | Med | `/providers/manual` | Clear |  |
| juniper review | Review | Med | `/providers/juniper` | Clear |  |
| voy review | Review | Med | `/providers/voy` | Clear |  |
| pharmacy2u review | Review | Med | `/providers/pharmacy2u` | Clear |  |
| medexpress review | Review | Med | `/providers/medexpress` | Clear |  |
| simple online pharmacy review | Review | Med | `/providers/simple-online-pharmacy` | Clear |  |
| oxford online pharmacy review | Review | Med | `/providers/oxford-online-pharmacy` | Clear |  |
| click pharmacy review | Review | Med | `/providers/click-pharmacy` | Clear |  |
| phlo review | Review | Med | `/providers/phlo` | Clear |  |
| uk meds review | Review | Med | `/providers/uk-meds` | Clear |  |
| well pharmacy online doctor review | Review | Med | `/providers/well` | Clear |  |
| boots mounjaro | Commercial | Med | `/providers/boots/mounjaro` | Clear |  |
| superdrug mounjaro | Commercial | Med | `/providers/superdrug/mounjaro` | Clear |  |
| asda mounjaro | Commercial | Med | `/providers/asda/mounjaro` | Clear |  |
| lloydspharmacy mounjaro | Commercial | Med | `/providers/lloyds/mounjaro` | Clear |  |
| chemist4u mounjaro | Commercial | Med | `/providers/chemist4u/mounjaro` | Clear |  |
| mybmi mounjaro | Commercial | Med | `/providers/mybmi/mounjaro` | Clear |  |
| myweightloss mounjaro | Commercial | Med | `/providers/myweightloss/mounjaro` | Clear |  |
| zava mounjaro | Commercial | Med | `/providers/zava/mounjaro` | Clear |  |
| questions to ask online pharmacy | Informational | Med | `/guides/questions-to-ask-a-weight-loss-provider` | Clear |  |
| weight loss programme vs pharmacy | Comparison | Med | `/guides/programmes-vs-pharmacies` | Clear |  |
| boots vs online pharmacy weight loss | Comparison | Med | `/guides/high-street-vs-online-only` | Clear |  |
| boots vs superdrug weight loss | Comparison | Low | `/compare/boots-vs-superdrug` | Clear |  |
| asda vs boots weight loss | Comparison | Low | `/compare/asda-vs-boots` | Clear |  |
| chemist4u vs boots weight loss | Comparison | Low | `/compare/chemist4u-vs-boots` | Clear |  |
| juniper vs numan weight loss | Comparison | Low | `/compare/juniper-vs-numan` | Clear |  |
| juniper vs voy weight loss | Comparison | Low | `/compare/juniper-vs-voy` | Clear |  |
| gphc register check | Informational | Low | `/guides/check-pharmacy-gphc-register` | Clear |  |
| mounjaro out of stock | Problem-solution | Low | `/guides/provider-stock-shortages` | Clear |  |
| mounjaro delivery cold | Informational | Low | `/guides/cold-chain-delivery-explained` | Clear |  |
| mounjaro arrived warm | Problem-solution | Low | `/guides/pens-arrived-warm` | Clear |  |
| complain about online pharmacy | Problem-solution | Low | `/guides/complaining-about-an-online-pharmacy` | Clear |  |
| weight loss injections in pharmacy | Informational | Low | `/guides/in-pharmacy-weight-loss-services` | Clear |  |
| private prescription uk | Informational | Low | `/guides/what-is-a-private-prescription` | Clear |  |
| online pharmacy vs online doctor | Comparison | Low | `/guides/online-pharmacy-vs-online-doctor` | Clear |  |

#### Comparisons (36)

| Keyword | Intent | Priority | Target URL | Compliance status | Compliant angle (if gated) |
|---|---|---|---|---|---|
| ★ best weight loss injection | Commercial | High | `/guides/weight-loss-injections-compared` | Gated / compliance review | No 'best' claims about POMs. Angle: 'Every UK weight loss injection compared' with neutral evidence tables |
| ★ mounjaro comparison | Comparison | High | `/prices/mounjaro (service comparison while flag off)` | Gated / compliance review | Service comparison (regulation, prescriber, aftercare) until pomPricing sign-off |
| ★ wegovy comparison | Comparison | Med | `/prices/wegovy (service comparison while flag off)` | Gated / compliance review | As above |
| ozempic vs wegovy | Comparison | High | `/guides/ozempic-vs-wegovy` | Clear |  |
| oral vs injectable glp1 | Comparison | High | `/guides/oral-vs-injectable-glp1` | Clear |  |
| orlistat vs mounjaro | Comparison | High | `/guides/orlistat-vs-glp1` | Clear |  |
| mounjaro vs wegovy | Comparison | High | `/mounjaro-vs-wegovy` | Clear |  |
| mounjaro vs tablets | Comparison | High | `/guides/mounjaro-vs-oral-glp1` | Clear |  |
| wegovy injection vs tablet | Comparison | High | `/guides/wegovy-vs-oral-glp1` | Clear |  |
| tirzepatide vs semaglutide | Comparison | High | `/guides/surmount-5-tirzepatide-vs-semaglutide` | Clear |  |
| saxenda vs wegovy | Comparison | High | `/guides/saxenda-vs-newer-glp1s` | Clear |  |
| best weight loss injection uk | Comparison | High | `/guides/weight-loss-injections-compared` | Gated / compliance review | Neutral 'every injection compared'; no 'best' in title |
| weight loss injections vs surgery | Comparison | High | `/guides/glp1-vs-bariatric-surgery` | Clear |  |
| tirzepatide vs semaglutide uk | Comparison | Med | `/guides/surmount-5-tirzepatide-vs-semaglutide` | Clear |  |
| wegovy vs saxenda | Comparison | Med | `/wegovy-vs-saxenda` | Clear |  |
| mounjaro vs wegovy pill | Comparison | Med | `/mounjaro-vs-oral-semaglutide` | Clear: verify licence status |  |
| mounjaro vs foundayo | Comparison | Med | `/mounjaro-vs-foundayo` | Clear: verify licence status |  |
| wegovy vs foundayo | Comparison | Med | `/wegovy-vs-foundayo` | Clear: verify licence status |  |
| wegovy injection vs wegovy pill | Comparison | Med | `/wegovy-vs-oral-semaglutide` | Clear: verify licence status |  |
| mounjaro vs wegovy side effects | Comparison | Med | `/guides/mounjaro-vs-wegovy-side-effects` | Clear |  |
| mounjaro vs ozempic | Comparison | Med | `/guides/mounjaro-vs-ozempic` | Clear |  |
| glp1 vs meal replacement | Comparison | Med | `/guides/glp1-vs-total-diet-replacement` | Clear |  |
| retatrutide vs tirzepatide | Comparison | Med | `/guides/tirzepatide-vs-retatrutide` | Clear |  |
| cagrisema vs wegovy | Comparison | Med | `/guides/semaglutide-vs-cagrisema` | Clear |  |
| mounjaro vs saxenda | Comparison | Low | `/mounjaro-vs-saxenda` | Clear |  |
| orforglipron vs oral semaglutide | Comparison | Low | `/oral-semaglutide-vs-foundayo` | Clear: verify licence status |  |
| mounjaro pen vs wegovy pen | Comparison | Low | `/guides/kwikpen-vs-flextouch` | Clear |  |
| mounjaro vs wegovy dose | Comparison | Low | `/guides/mounjaro-vs-wegovy-dosing` | Clear |  |
| rybelsus vs wegovy pill | Comparison | Low | `/guides/rybelsus-vs-wegovy-tablet` | Clear |  |
| generic liraglutide uk | Comparison | Low | `/guides/generic-liraglutide-vs-saxenda` | Clear |  |
| mysimba vs mounjaro | Comparison | Low | `/guides/mysimba-vs-glp1` | Clear |  |
| alli vs xenical | Comparison | Low | `/guides/alli-vs-xenical` | Clear |  |
| gastric balloon vs mounjaro | Comparison | Low | `/guides/glp1-vs-gastric-balloon` | Clear |  |
| weekly vs daily weight loss injection | Comparison | Low | `/guides/weekly-vs-daily-glp1` | Clear |  |
| weight watchers vs mounjaro | Comparison | Low | `/guides/glp1-vs-slimming-clubs` | Clear |  |
| mounjaro vs metformin | Comparison | Low | `/guides/mounjaro-vs-metformin` | Clear |  |

#### Side effects (59)

| Keyword | Intent | Priority | Target URL | Compliance status | Compliant angle (if gated) |
|---|---|---|---|---|---|
| ★ mounjaro side effects | Informational | High | `/mounjaro-side-effects` | Clear |  |
| mounjaro hair loss | Informational | High | `/guides/mounjaro-hair-loss` | Clear |  |
| wegovy side effects | Informational | High | `/wegovy-side-effects` | Clear |  |
| oral glp1 side effects | Informational | Med | `/guides/oral-glp1-side-effects` | Clear: verify licence status |  |
| mounjaro nausea | Informational | Med | `/guides/nausea-on-glp1` | Clear |  |
| mounjaro constipation | Informational | Med | `/guides/constipation-on-glp1` | Clear |  |
| mounjaro diarrhoea | Informational | Med | `/guides/diarrhoea-on-glp1` | Clear |  |
| mounjaro pancreatitis | Informational | Med | `/guides/glp1-pancreatitis-risk` | Clear |  |
| mounjaro gallbladder | Informational | Med | `/guides/glp1-gallbladder-problems` | Clear |  |
| ozempic face | Informational | Med | `/guides/facial-changes-and-loose-skin` | Clear |  |
| mounjaro sulphur burps | Informational | Med | `/guides/reflux-burping-and-indigestion-on-glp1` | Clear |  |
| mounjaro vomiting | Problem-solution | Med | `/mounjaro-side-effects/vomiting` | Clear |  |
| mounjaro headache | Problem-solution | Med | `/mounjaro-side-effects/headache` | Clear |  |
| mounjaro tiredness | Problem-solution | Med | `/mounjaro-side-effects/fatigue` | Clear |  |
| mounjaro dizziness | Problem-solution | Med | `/mounjaro-side-effects/dizziness` | Clear |  |
| mounjaro injection site reaction | Problem-solution | Med | `/mounjaro-side-effects/injection-site-reactions` | Clear |  |
| mounjaro low blood sugar | Problem-solution | Med | `/mounjaro-side-effects/low-blood-sugar` | Clear |  |
| mounjaro indigestion | Problem-solution | Med | `/mounjaro-side-effects/indigestion` | Clear |  |
| wegovy vomiting | Problem-solution | Med | `/wegovy-side-effects/vomiting` | Clear |  |
| wegovy headache | Problem-solution | Med | `/wegovy-side-effects/headache` | Clear |  |
| wegovy tiredness | Problem-solution | Med | `/wegovy-side-effects/fatigue` | Clear |  |
| wegovy dizziness | Problem-solution | Med | `/wegovy-side-effects/dizziness` | Clear |  |
| wegovy injection site reaction | Problem-solution | Med | `/wegovy-side-effects/injection-site-reactions` | Clear |  |
| wegovy gallbladder | Problem-solution | Med | `/wegovy-side-effects/gallbladder-problems` | Clear |  |
| wegovy low blood sugar | Problem-solution | Med | `/wegovy-side-effects/low-blood-sugar` | Clear |  |
| wegovy indigestion | Problem-solution | Med | `/wegovy-side-effects/indigestion` | Clear |  |
| wegovy nausea | Problem-solution | Med | `/wegovy-side-effects/nausea` | Clear |  |
| wegovy diarrhoea | Problem-solution | Med | `/wegovy-side-effects/diarrhoea` | Clear |  |
| wegovy constipation | Problem-solution | Med | `/wegovy-side-effects/constipation` | Clear |  |
| wegovy hair loss | Problem-solution | Med | `/wegovy-side-effects/hair-loss` | Clear |  |
| wegovy pancreatitis | Problem-solution | Med | `/wegovy-side-effects/pancreatitis` | Clear |  |
| wegovy pill side effects | Informational | Med | `/oral-semaglutide-side-effects` | Clear: verify licence status |  |
| foundayo side effects | Informational | Med | `/foundayo-side-effects` | Clear: verify licence status |  |
| mounjaro side effects after dose increase | Problem-solution | Med | `/guides/mounjaro-side-effects-after-dose-increase` | Clear |  |
| mounjaro heart palpitations | Problem-solution | Med | `/guides/mounjaro-heart-rate-palpitations` | Clear |  |
| reflux at night mounjaro | Problem-solution | Med | `/guides/night-time-reflux-glp1` | Clear |  |
| mounjaro stomach pain | Problem-solution | Med | `/guides/stomach-pain-on-mounjaro-when-to-worry` | Clear |  |
| mounjaro gastroparesis | Informational | Med | `/guides/glp1-gastroparesis` | Clear |  |
| loose skin after weight loss | Informational | Med | `/guides/loose-skin-after-weight-loss-options` | Clear |  |
| wegovy tablet side effects | Comparison | Med | `/guides/wegovy-tablet-side-effects-vs-injection` | Clear |  |
| ginger for mounjaro nausea | Problem-solution | Med | `/guides/nausea-remedies-evidence-check` | Clear |  |
| laxatives on mounjaro | Problem-solution | Med | `/guides/laxatives-on-glp1` | Clear |  |
| gallstones weight loss injections | Problem-solution | Med | `/guides/gallstone-symptoms-rapid-weight-loss` | Clear |  |
| saxenda side effects | Informational | Low | `/saxenda-side-effects` | Clear |  |
| wegovy side effects first week | Informational | Low | `/guides/wegovy-side-effects-first-week` | Clear |  |
| wegovy sulphur burps | Problem-solution | Low | `/guides/wegovy-sulphur-burps` | Clear |  |
| mounjaro taste changes | Informational | Low | `/guides/mounjaro-taste-changes` | Clear |  |
| mounjaro bad breath | Problem-solution | Low | `/guides/glp1-bad-breath` | Clear |  |
| mounjaro insomnia | Problem-solution | Low | `/guides/mounjaro-sleep-problems` | Clear |  |
| mounjaro bloating | Problem-solution | Low | `/guides/mounjaro-bloating-and-wind` | Clear |  |
| food aversion mounjaro | Problem-solution | Low | `/guides/food-aversion-on-glp1` | Clear |  |
| mounjaro allergic reaction | Problem-solution | Low | `/guides/glp1-allergic-reactions` | Clear |  |
| mounjaro body aches | Problem-solution | Low | `/guides/glp1-muscle-aches` | Clear |  |
| side effects day after mounjaro injection | Informational | Low | `/guides/side-effects-worse-after-injection-day` | Clear |  |
| wegovy vomiting help | Problem-solution | Low | `/guides/cant-keep-fluids-down-glp1` | Clear |  |
| weight loss injection side effects work | Problem-solution | Low | `/guides/managing-glp1-side-effects-at-work` | Clear |  |
| anti sickness tablets mounjaro | Problem-solution | Low | `/guides/anti-sickness-medication-on-glp1` | Clear |  |
| imodium on mounjaro | Problem-solution | Low | `/guides/loperamide-on-glp1` | Clear |  |
| pancreatitis symptoms wegovy | Problem-solution | Low | `/guides/pancreatitis-symptoms-what-to-do` | Clear |  |

#### Dosing (35)

| Keyword | Intent | Priority | Target URL | Compliance status | Compliant angle (if gated) |
|---|---|---|---|---|---|
| mounjaro dosage | Informational | High | `/mounjaro-dosage` | Clear |  |
| mounjaro doses | Informational | High | `/mounjaro-dosage` | Clear |  |
| mounjaro kwikpen | Informational | High | `/guides/mounjaro-kwikpen-how-to-inject` | Clear |  |
| mounjaro missed dose | Informational | High | `/guides/mounjaro-missed-dose` | Clear |  |
| wegovy doses | Informational | High | `/wegovy-dosage` | Clear |  |
| wegovy pen | Informational | High | `/guides/wegovy-pen-how-to-inject` | Clear |  |
| mounjaro dose schedule | Informational | Med | `/mounjaro-dosage` | Clear |  |
| wegovy dosage | Informational | Med | `/wegovy-dosage` | Clear |  |
| mounjaro 2.5mg | Informational | Med | `/mounjaro-2-5mg` | Clear |  |
| mounjaro 5mg | Informational | Med | `/mounjaro-5mg` | Clear |  |
| mounjaro 7.5mg | Informational | Med | `/mounjaro-7-5mg` | Clear |  |
| mounjaro 10mg | Informational | Med | `/mounjaro-10mg` | Clear |  |
| mounjaro 12.5mg | Informational | Med | `/mounjaro-12-5mg` | Clear |  |
| mounjaro 15mg | Informational | Med | `/mounjaro-15mg` | Clear |  |
| wegovy 0.25mg | Informational | Med | `/wegovy-0-25mg` | Clear |  |
| wegovy 0.5mg | Informational | Med | `/wegovy-0-5mg` | Clear |  |
| wegovy 1mg | Informational | Med | `/wegovy-1mg` | Clear |  |
| wegovy 1.7mg | Informational | Med | `/wegovy-1-7mg` | Clear |  |
| wegovy 2.4mg | Informational | Med | `/wegovy-2-4mg` | Clear |  |
| mounjaro injection sites | Informational | Med | `/guides/mounjaro-injection-sites-rotation` | Clear |  |
| how to take wegovy tablets | Informational | Med | `/guides/how-to-take-wegovy-tablets` | Clear |  |
| saxenda dosage | Informational | Low | `/saxenda-dosage` | Clear |  |
| saxenda 0.6mg | Informational | Low | `/saxenda-0-6mg` | Clear |  |
| saxenda 3mg | Informational | Low | `/saxenda-3mg` | Clear |  |
| change mounjaro injection day | Problem-solution | Low | `/guides/change-mounjaro-injection-day` | Clear |  |
| best time of day to inject mounjaro | Informational | Low | `/guides/time-of-day-to-inject-mounjaro` | Clear |  |
| extra dose mounjaro pen | Problem-solution | Low | `/guides/leftover-liquid-in-mounjaro-pen` | Clear |  |
| delay wegovy dose increase | Informational | Low | `/guides/delaying-wegovy-dose-increase` | Clear |  |
| wegovy missed dose | Problem-solution | Low | `/guides/wegovy-missed-dose` | Clear |  |
| missed 2 weeks mounjaro | Problem-solution | Low | `/guides/missed-two-weeks-of-mounjaro` | Clear |  |
| took mounjaro twice | Problem-solution | Low | `/guides/injected-twice-by-mistake` | Clear |  |
| do mounjaro injections hurt | Problem-solution | Low | `/guides/less-uncomfortable-injections` | Clear |  |
| how to dispose of mounjaro pens | Informational | Low | `/guides/sharps-disposal-uk` | Clear |  |
| weight loss injection mistakes | Problem-solution | Low | `/guides/injection-technique-mistakes` | Clear |  |
| mounjaro pen colours | Informational | Low | `/guides/mounjaro-kwikpen-colours-and-doses` | Clear |  |

#### Eligibility (21)

| Keyword | Intent | Priority | Target URL | Compliance status | Compliant angle (if gated) |
|---|---|---|---|---|---|
| mounjaro eligibility | Informational | High | `/mounjaro-eligibility` | Clear |  |
| bmi calculator | Informational | High | `/tools/bmi-calculator` | Clear |  |
| bmi calculator uk | Informational | High | `/tools/bmi-calculator` | Clear |  |
| am i eligible for weight loss injections | Informational | High | `/tools/eligibility-checker` | Clear |  |
| mounjaro nhs | Informational | High | `/guides/mounjaro-on-the-nhs` | Clear |  |
| wegovy nhs | Informational | High | `/guides/wegovy-on-the-nhs` | Clear |  |
| wegovy eligibility | Informational | Med | `/wegovy-eligibility` | Clear |  |
| can i get mounjaro | Informational | Med | `/mounjaro-eligibility` | Clear |  |
| bmi calculator nhs | Navigational | Med | `/tools/bmi-calculator` | Clear |  |
| weight loss injections eligibility | Informational | Med | `/guides/who-can-get-weight-loss-injections` | Clear |  |
| bmi for weight loss injections | Informational | Med | `/guides/bmi-and-treatment-eligibility` | Clear |  |
| bmi ethnicity weight loss injections | Informational | Med | `/guides/bmi-thresholds-ethnicity` | Clear |  |
| online weight loss consultation | Informational | Med | `/guides/online-weight-loss-consultation` | Clear |  |
| weight verification online pharmacy | Informational | Med | `/guides/id-and-weight-verification` | Clear |  |
| how to get mounjaro on nhs | Problem-solution | Med | `/guides/how-to-ask-gp-about-mounjaro` | Clear |  |
| mounjaro nhs eligibility | Informational | Med | `/guides/nhs-mounjaro-rollout-cohorts` | Clear |  |
| weight loss injections gp | Comparison | Med | `/guides/gp-or-online-provider` | Clear |  |
| weight related comorbidities | Informational | Low | `/guides/weight-related-comorbidities` | Clear |  |
| waist to height ratio | Informational | Low | `/guides/waist-to-height-ratio` | Clear |  |
| weight loss injection refused | Problem-solution | Low | `/guides/refused-a-prescription-online` | Clear |  |
| weight loss video consultation | Informational | Low | `/guides/why-video-consultations` | Clear |  |

#### Results (12)

| Keyword | Intent | Priority | Target URL | Compliance status | Compliant angle (if gated) |
|---|---|---|---|---|---|
| mounjaro results | Informational | High | `/mounjaro-results` | Clear |  |
| wegovy results | Informational | High | `/wegovy-results` | Clear |  |
| wegovy heart | Informational | High | `/guides/wegovy-heart-health-select-trial` | Clear |  |
| wegovy results uk | Informational | Med | `/wegovy-results` | Clear |  |
| mounjaro before and after | Informational | Med | `/mounjaro-results` | Gated / compliance review | No before-and-after imagery or testimonials; show trial averages only |
| how much weight can you lose on mounjaro | Informational | Med | `/guides/realistic-weight-loss-expectations` | Clear |  |
| measuring weight loss progress | Informational | Med | `/guides/measuring-progress-beyond-the-scales` | Clear |  |
| saxenda results | Informational | Low | `/saxenda-results` | Clear |  |
| percentage weight loss calculator | Informational | Low | `/guides/percentage-weight-loss-explained` | Clear |  |
| wegovy knee pain | Informational | Low | `/guides/semaglutide-knee-osteoarthritis` | Clear |  |
| mounjaro results women | Informational | Low | `/guides/glp1-results-women-and-men` | Clear |  |
| losing weight too fast mounjaro | Problem-solution | Low | `/guides/losing-weight-too-fast` | Clear |  |

#### Maintenance (7)

| Keyword | Intent | Priority | Target URL | Compliance status | Compliant angle (if gated) |
|---|---|---|---|---|---|
| ★ mounjaro maintenance | Informational | High | `/mounjaro-maintenance` | Clear |  |
| wegovy maintenance | Informational | High | `/wegovy-maintenance` | Clear |  |
| mounjaro maintenance dose | Informational | Med | `/guides/finding-a-maintenance-dose` | Clear |  |
| what happens when you stop mounjaro | Informational | Med | `/guides/what-happens-when-you-stop-mounjaro` | Clear |  |
| surmount 4 | Informational | Med | `/guides/surmount-4-explained` | Clear |  |
| saxenda maintenance | Informational | Low | `/saxenda-maintenance` | Clear |  |
| restarting mounjaro | Problem-solution | Low | `/guides/restarting-mounjaro-after-a-break` | Clear |  |

#### Switching (9)

| Keyword | Intent | Priority | Target URL | Compliance status | Compliant angle (if gated) |
|---|---|---|---|---|---|
| switching wegovy to mounjaro | Informational | Med | `/guides/switching-wegovy-to-mounjaro` | Clear |  |
| switching mounjaro to wegovy | Informational | Med | `/guides/switching-mounjaro-to-wegovy` | Clear |  |
| switch mounjaro provider | Informational | Med | `/guides/switching-providers-mid-treatment` | Clear |  |
| switch from injection to tablet | Informational | Med | `/guides/switching-injection-to-tablet` | Clear: verify licence status |  |
| wegovy to mounjaro dose conversion | Informational | Med | `/guides/wegovy-to-mounjaro-starting-dose` | Clear |  |
| switching ozempic to wegovy | Informational | Low | `/guides/ozempic-to-wegovy` | Clear |  |
| switch nhs to private mounjaro | Informational | Low | `/guides/nhs-to-private-and-back` | Clear |  |
| switch medication side effects mounjaro | Problem-solution | Low | `/guides/switching-because-of-side-effects` | Clear |  |
| switch wegovy to mounjaro plateau | Problem-solution | Low | `/guides/switching-because-of-a-plateau` | Clear |  |

#### Plateau management (9)

| Keyword | Intent | Priority | Target URL | Compliance status | Compliant angle (if gated) |
|---|---|---|---|---|---|
| mounjaro plateau | Problem-solution | Med | `/guides/weight-loss-plateau-glp1` | Clear |  |
| mounjaro not working | Problem-solution | Med | `/guides/glp1-non-responders` | Clear |  |
| wegovy stopped working | Problem-solution | Med | `/guides/weight-loss-slowed-on-wegovy` | Clear |  |
| mounjaro stopped working | Problem-solution | Med | `/guides/mounjaro-stopped-working-after-months` | Clear |  |
| how to break mounjaro plateau | Problem-solution | Med | `/guides/plateau-strategies-by-evidence` | Clear |  |
| no weight loss on mounjaro first week | Problem-solution | Low | `/guides/no-weight-loss-first-weeks` | Clear |  |
| mounjaro wearing off | Problem-solution | Low | `/guides/hunger-before-next-dose` | Clear |  |
| sleep and weight loss | Informational | Low | `/guides/sleep-stress-and-weight-loss` | Clear |  |
| weight gain on mounjaro | Problem-solution | Low | `/guides/weight-gain-on-mounjaro` | Clear |  |

#### Long-term weight management (7)

| Keyword | Intent | Priority | Target URL | Compliance status | Compliant angle (if gated) |
|---|---|---|---|---|---|
| weight regain after mounjaro | Informational | Med | `/guides/weight-regain-after-stopping-glp1` | Clear |  |
| long term mounjaro use | Informational | Med | `/guides/long-term-glp1-use` | Clear |  |
| obesity treatment uk | Informational | Med | `/guides/obesity-as-a-chronic-disease` | Clear |  |
| do you have to take mounjaro forever | Informational | Med | `/guides/glp1-for-life` | Clear |  |
| weight stigma | Informational | Med | `/guides/weight-stigma-in-healthcare` | Clear |  |
| clinical obesity definition | Informational | Med | `/guides/clinical-vs-preclinical-obesity` | Clear |  |
| mounjaro bone density | Informational | Low | `/guides/glp1-bone-density` | Clear |  |

#### Diet (20)

| Keyword | Intent | Priority | Target URL | Compliance status | Compliant angle (if gated) |
|---|---|---|---|---|---|
| diet on mounjaro | Informational | Med | `/guides/what-to-eat-on-glp1` | Clear |  |
| protein on mounjaro | Informational | Med | `/guides/protein-on-glp1` | Clear |  |
| foods to avoid on mounjaro | Informational | Med | `/guides/foods-that-worsen-glp1-side-effects` | Clear |  |
| mounjaro meal plan | Informational | Med | `/guides/glp1-meal-plan` | Clear |  |
| mounjaro dehydration | Informational | Med | `/guides/hydration-on-glp1` | Clear |  |
| vitamins on mounjaro | Informational | Med | `/guides/vitamins-and-supplements-on-glp1` | Clear |  |
| not hungry on mounjaro | Problem-solution | Med | `/guides/eating-enough-on-glp1` | Clear |  |
| keto on mounjaro | Informational | Med | `/guides/low-carb-diets-on-glp1` | Clear |  |
| food noise | Informational | Med | `/guides/what-is-food-noise` | Clear |  |
| b12 deficiency mounjaro | Informational | Med | `/guides/iron-b12-folate-on-glp1` | Clear |  |
| protein shakes on mounjaro | Informational | Low | `/guides/protein-shakes-on-glp1` | Clear |  |
| forgetting to eat on mounjaro | Problem-solution | Low | `/guides/forgetting-to-eat-on-mounjaro` | Clear |  |
| fizzy drinks on mounjaro | Informational | Low | `/guides/fizzy-drinks-on-glp1` | Clear |  |
| electrolytes mounjaro | Problem-solution | Low | `/guides/electrolytes-on-glp1` | Clear |  |
| eating out on mounjaro | Problem-solution | Low | `/guides/eating-out-on-glp1` | Clear |  |
| christmas on mounjaro | Problem-solution | Low | `/guides/festive-eating-on-glp1` | Clear |  |
| collagen on mounjaro | Informational | Low | `/guides/collagen-supplements-evidence` | Clear |  |
| family meals mounjaro | Problem-solution | Low | `/guides/cooking-for-a-family-on-glp1` | Clear |  |
| eating too fast mounjaro | Problem-solution | Low | `/guides/eating-slowly-on-glp1` | Clear |  |
| dietitian weight loss injections | Informational | Low | `/guides/dietitian-support-on-glp1` | Clear |  |

#### Exercise (10)

| Keyword | Intent | Priority | Target URL | Compliance status | Compliant angle (if gated) |
|---|---|---|---|---|---|
| exercise on mounjaro | Informational | Med | `/guides/exercise-on-glp1` | Clear |  |
| muscle loss mounjaro | Informational | Med | `/guides/preserving-muscle-on-glp1` | Clear |  |
| strength training weight loss injections | Informational | Med | `/guides/strength-training-for-beginners-on-glp1` | Clear |  |
| gym plan weight loss injections | Informational | Med | `/guides/beginner-gym-plan-on-glp1` | Clear |  |
| running on wegovy | Problem-solution | Med | `/guides/running-on-glp1` | Clear |  |
| exercise knee pain overweight | Problem-solution | Med | `/guides/exercise-with-joint-pain` | Clear |  |
| exercise over 60 weight loss | Informational | Med | `/guides/strength-and-balance-over-60s` | Clear |  |
| tired exercise mounjaro | Problem-solution | Low | `/guides/exercising-with-low-energy` | Clear |  |
| pilates weight loss injections | Informational | Low | `/guides/yoga-and-pilates-on-glp1` | Clear |  |
| exercise nausea mounjaro | Problem-solution | Low | `/guides/exercise-and-nausea` | Clear |  |

#### Safety and regulation (31)

| Keyword | Intent | Priority | Target URL | Compliance status | Compliant angle (if gated) |
|---|---|---|---|---|---|
| ★ buy mounjaro online | Transactional | High | `/guides/getting-weight-loss-injections-online-safely` | Gated / compliance review | How to get treatment online safely: regulator checks (GPhC/CQC registers), what a legitimate consultation involves, spotting illegal sellers |
| mounjaro and alcohol | Informational | High | `/guides/mounjaro-and-alcohol` | Clear |  |
| mounjaro storage | Informational | High | `/guides/mounjaro-storage-and-travel` | Clear |  |
| mhra weight loss injections warning | Informational | Med | `/guides/fake-weight-loss-jabs` | Clear |  |
| mounjaro without prescription | Transactional | Med | `/guides/can-you-get-glp1-without-prescription` | Gated / compliance review | Safety angle: POM law and dangers of illegal supply |
| retatrutide buy uk | Transactional | Med | `/guides/research-peptide-risks` | Gated / compliance review | Safety-only: unlicensed, illegal 'research peptides'; never sourcing information |
| who cannot take mounjaro | Informational | Med | `/guides/who-should-not-take-glp1s` | Clear |  |
| buy mounjaro online safely | Informational | Med | `/guides/getting-weight-loss-injections-online-safely` | Gated / compliance review | Regulator checks and safe-access guide; no 'buy' in title or CTAs |
| fake mounjaro | Informational | Med | `/guides/fake-weight-loss-jabs` | Clear |  |
| mounjaro mental health | Informational | Med | `/guides/glp1-and-mental-health` | Clear |  |
| mounjaro before surgery | Informational | Med | `/guides/glp1-surgery-and-anaesthesia` | Clear |  |
| mounjaro interactions | Informational | Med | `/guides/glp1-medication-interactions` | Clear |  |
| wegovy and antidepressants | Informational | Med | `/guides/wegovy-and-antidepressants` | Clear |  |
| mounjaro and metformin | Informational | Med | `/guides/glp1-and-metformin` | Clear |  |
| mounjaro and gliclazide | Problem-solution | Med | `/guides/glp1-insulin-sulfonylurea-hypos` | Clear |  |
| mounjaro before colonoscopy | Problem-solution | Med | `/guides/glp1-before-colonoscopy-endoscopy` | Clear |  |
| mounjaro when to seek help | Problem-solution | Med | `/guides/red-flag-symptoms-on-glp1` | Clear |  |
| weight loss jabs beauty salon | Problem-solution | Med | `/guides/weight-loss-jabs-from-salons-and-social-media` | Clear |  |
| retatrutide uk buy | Problem-solution | Med | `/guides/research-peptide-risks` | Gated / compliance review | Safety-only; never sourcing |
| weight loss injections eating disorder | Informational | Med | `/guides/glp1-and-eating-disorders` | Clear |  |
| asa weight loss injection ads | Informational | Low | `/guides/who-regulates-online-weight-loss-services` | Clear |  |
| wegovy out of fridge | Informational | Low | `/guides/wegovy-out-of-the-fridge` | Clear |  |
| mounjaro pen frozen | Problem-solution | Low | `/guides/frozen-weight-loss-pen` | Clear |  |
| mounjaro and ibuprofen | Problem-solution | Low | `/guides/mounjaro-and-ibuprofen` | Clear |  |
| mounjaro and antibiotics | Informational | Low | `/guides/glp1-and-antibiotics` | Clear |  |
| mounjaro hangover | Problem-solution | Low | `/guides/hangovers-on-glp1` | Clear |  |
| mounjaro time zone travel | Problem-solution | Low | `/guides/injection-day-across-time-zones` | Clear |  |
| mounjaro hot weather | Problem-solution | Low | `/guides/pens-in-hot-weather` | Clear |  |
| can you give blood on mounjaro | Informational | Low | `/guides/glp1-and-blood-donation` | Clear |  |
| mounjaro overdose | Problem-solution | Low | `/guides/taken-too-much-mounjaro` | Clear |  |
| fake mounjaro pen signs | Problem-solution | Low | `/guides/counterfeit-pen-signs` | Clear |  |

#### Special populations (16)

| Keyword | Intent | Priority | Target URL | Compliance status | Compliant angle (if gated) |
|---|---|---|---|---|---|
| mounjaro contraceptive pill | Informational | Med | `/guides/glp1-and-contraception` | Clear |  |
| mounjaro pregnancy | Informational | Med | `/guides/glp1-pregnancy-and-fertility` | Clear |  |
| glp1 type 2 diabetes | Informational | Med | `/guides/glp1-and-type-2-diabetes` | Clear |  |
| mounjaro pcos | Informational | Med | `/guides/glp1-and-pcos` | Clear |  |
| weight loss injections over 65 | Informational | Med | `/guides/glp1-over-65` | Clear |  |
| mounjaro sleep apnoea | Informational | Med | `/guides/tirzepatide-and-sleep-apnoea` | Clear |  |
| mounjaro menopause | Informational | Med | `/guides/glp1-and-menopause` | Clear |  |
| mounjaro after gastric sleeve | Informational | Med | `/guides/glp1-after-bariatric-surgery` | Clear |  |
| mounjaro ramadan | Problem-solution | Med | `/guides/ramadan-fasting-on-glp1` | Clear |  |
| wegovy and the pill | Informational | Low | `/guides/wegovy-and-the-pill` | Clear |  |
| ozempic babies | Informational | Low | `/guides/ozempic-babies-claims` | Clear |  |
| mounjaro type 1 diabetes | Informational | Low | `/guides/glp1-and-type-1-diabetes` | Clear |  |
| mounjaro ibs | Informational | Low | `/guides/glp1-ibs-and-ibd` | Clear |  |
| mounjaro testosterone | Informational | Low | `/guides/weight-loss-and-testosterone` | Clear |  |
| mounjaro night shifts | Problem-solution | Low | `/guides/glp1-and-shift-work` | Clear |  |
| mounjaro lipoedema | Informational | Low | `/guides/glp1-and-lipoedema` | Clear |  |

#### FAQs (5)

| Keyword | Intent | Priority | Target URL | Compliance status | Compliant angle (if gated) |
|---|---|---|---|---|---|
| ★ glp1 uk | Informational | High | `/guides/glp1-questions-answered` | Clear |  |
| glp1 myths | Informational | Med | `/guides/glp1-myths-and-facts` | Clear |  |
| does mounjaro cause cancer | Informational | Med | `/guides/does-mounjaro-cause-cancer` | Clear |  |
| do weight loss injections hurt | Informational | Low | `/guides/do-weight-loss-injections-hurt` | Clear |  |
| mounjaro without exercise | Informational | Low | `/guides/weight-loss-without-exercise-on-mounjaro` | Clear |  |


The full long tail continues in `content/plan/supporting-articles.json` (300 primary keywords) and `content/plan/programmatic-urls.csv` (654 URL-level keywords). The tables above include a representative selection of both.

---

## 5. Topical authority map

Each cluster has a home (a cluster hub or medication topic page), pillars that define it, supporting articles that cover its long tail, and programmatic pages that cover data-driven variants. Counts come from the plan files.

| Cluster | Cluster home | Defining pillars (examples) | Supporting | Programmatic | Authority goal |
|---|---|---|---|---|---|
| **Pricing** | `/guides/topic/pricing`, `/prices` | `mounjaro-price-uk-explained`, `how-weight-loss-injection-pricing-works`, `weight-loss-treatment-hidden-costs`, `long-term-cost-of-glp1-treatment` (7 pillars) | 15 | `/{med}-prices` ×5, `/prices/{med}` ×5, 220 gated dose-price pages | Be the reference for *what treatment really costs* and why, ready to switch on live prices |
| **Side effects** | `/guides/topic/side-effects`, `/{med}-side-effects` | `mounjaro-side-effects-guide`, `nausea-on-glp1`, `glp1-pancreatitis-risk`, `mounjaro-hair-loss` (11 pillars) | 38 | 68 med × side-effect pages | Own every "{medicine} + {symptom}" query with SmPC-grounded, red-flag-led answers |
| **Dosing** | `/guides/topic/dosing`, `/{med}-dosage` | `mounjaro-dosing-schedule`, `mounjaro-kwikpen-how-to-inject`, `mounjaro-missed-dose` (5) | 22 | 16 dose pages (orals to follow) | The practical "how to take it" authority |
| **Eligibility** | `/guides/topic/eligibility`, `/tools/eligibility-checker` | `who-can-get-weight-loss-injections`, `bmi-and-treatment-eligibility`, `mounjaro-on-the-nhs` (7) | 16 | `/{med}-eligibility` ×5 | NHS and private eligibility explained neutrally |
| **Reviews** (providers) | `/providers`, `/guides/topic/providers` | `how-to-choose-online-pharmacy-weight-loss`, `who-regulates-online-weight-loss-services` (4) | 18 | 20 reviews, 40 provider × med, 12 + 178 comparisons | The most transparent provider reviews in the UK |
| **Comparisons** | `/compare`, `/guides/topic/comparisons` | `mounjaro-vs-wegovy`, `oral-vs-injectable-glp1`, `surmount-5-tirzepatide-vs-semaglutide` (10) | 15 | 8 medication comparisons | Evidence-based X-vs-Y on every medicine pair |
| **Results** | `/guides/topic/results`, `/{med}-results` | `mounjaro-results-timeline`, `realistic-weight-loss-expectations`, `wegovy-heart-health-select-trial` (5) | 13 | `/{med}-results` ×5 | Trial evidence explained honestly, no hype |
| **Maintenance** | `/guides/topic/maintenance`, `/{med}-maintenance` | `mounjaro-maintenance-guide`, `wegovy-maintenance-and-stopping` (2) | 13 | `/{med}-maintenance` ×5 | Staying on, stepping down and stopping |
| **Switching** | `/guides/topic/switching` | `switching-wegovy-to-mounjaro`, `switching-providers-mid-treatment` (4) | 11 | — | The safe-switching reference |
| **Exercise** | `/guides/topic/exercise` | `exercise-on-glp1`, `preserving-muscle-on-glp1` (3) | 15 | — | Muscle preservation and activity on treatment |
| **Diet** | `/guides/topic/diet` | `what-to-eat-on-glp1`, `protein-on-glp1`, `hydration-on-glp1` (6) | 30 | — | Practical UK nutrition on GLP-1s |
| **Plateau management** | `/guides/topic/plateau` | `weight-loss-plateau-glp1`, `glp1-non-responders` (2) | 11 | — | Evidence-ranked plateau guidance |
| **Long-term weight management** | `/guides/topic/long-term` | `long-term-glp1-use`, `weight-regain-after-stopping-glp1`, `obesity-as-a-chronic-disease` (3) | 10 | — | Obesity as a chronic disease; life after treatment |
| **FAQs** | `/guides/topic/faqs`, `/{med}-faqs` | `glp1-questions-answered`, `glp1-myths-and-facts` (2) | 7 | `/{med}-faqs` ×5 | Quick, accurate answers that win featured snippets and AI overviews |
| **Safety and regulation** | `/guides/topic/safety` | `getting-weight-loss-injections-online-safely`, `fake-weight-loss-jabs`, `glp1-medication-interactions` (8) | 30 | — | The UK's go-to safety resource; a natural link magnet |
| **Special populations** | `/guides/topic/special-populations` | `glp1-and-contraception`, `glp1-pregnancy-and-fertility`, `glp1-and-pcos`, `glp1-over-65` (7) | 22 | — | Depth that generic competitors cannot match |
| *Medicines (hubs)* | Class and medication hubs | `what-are-glp1-medications`, `tirzepatide-uk-guide`, `oral-glp1-uk-guide` (14) | 14 | 5 hubs, 2 class hubs, 40 topics | Entity authority for each medicine |

---

## 6. Hub-and-spoke internal linking model

### 6.1 Link types

| Type | Definition | Example |
|---|---|---|
| **Up** | To the parent in the hierarchy (pillar → hub; supporting → pillar; side effect → topic) | `/guides/laxatives-on-glp1` → `/guides/constipation-on-glp1` |
| **Sideways** | To siblings in the same cluster or the same entity in another cluster | `/mounjaro-side-effects/nausea` → `/wegovy-side-effects/nausea` |
| **Down** | From hub or pillar to children | `/mounjaro-dosage` → `/mounjaro-2-5mg` |
| **Conversion** | To `/providers`, `/compare` or `/prices` (internal only while flags are off) | `<ProviderComparisonCTA medication="mounjaro" />` |
| **Trust** | To methodology, editorial policy, how we make money, reviewer profile | Byline → `/authors/{reviewer}` |

### 6.2 Rules

1. Every article: ≥1 up link (to its hub or parent pillar), ≥3 sideways links to other pillars, ≥1 conversion link (`CONTRACTS.md` §3). Supporting articles must also link to their `parentPillar` in the first 30% of the body.
2. Every pillar links down to **all** its supporting articles (via an "In this guide series" block generated from `parentPillar`, so the links never go stale).
3. Programmatic pages link up to their topic or hub, sideways to the same pattern for the other medicines (side effects, doses) and to the most relevant pillar.
4. No orphans: every indexable URL must have ≥3 internal links in from indexable pages. `scripts/check-links.ts` fails CI for orphans.
5. Links to `noindex` or gated URLs are not rendered while those URLs are not live. The route registry decides.
6. Use `rel="nofollow"` only for user-generated or untrusted links, and `rel="sponsored"` for every affiliate link. Internal links are always followed.
7. Never link from editorial content directly to an outbound provider page. Outbound links only exist in gated commercial components via `/go/{p}`.

### 6.3 Anchor-text policy

| Rule | Example |
|---|---|
| Descriptive, natural anchors that match the target's topic | "how to manage nausea on GLP-1 medication" |
| Exact-match keyword anchors at most once per target per page, and on at most 30% of all links to a given target sitewide | "mounjaro side effects" |
| Vary with partial-match and question anchors | "side effects to expect when starting tirzepatide" |
| No "click here" or "read more" alone | |
| **No promotional anchors**: never "buy", "cheapest", "best", "discount", "deal" | Not "cheapest Mounjaro" → use "Mounjaro price comparison" or "what Mounjaro costs" |
| Provider anchors are the provider name or "our {provider} review" | "our Boots Online Doctor review" |

### 6.4 Link budgets per template (in-content links, excluding nav and footer)

| Template | Up | Down | Sideways | Conversion | Trust | Total in-content |
|---|---|---|---|---|---|---|
| Homepage | — | 15–25 | — | 2 | 2 | 20–30 |
| Class hub | 1 | All meds in class plus 6–10 pillars | 2–4 | 1–2 | 1 | 15–25 |
| Medication hub | 1 | 8 topics, all doses, 6–9 pillars | 4 comparisons | 1–2 | 1 | 25–40 |
| Medication topic (with mounted pillar) | 1 | All children (side effects or doses) plus supporting articles | 3–6 | ≤2 | 1 | 15–40 |
| Dose page | 1 | — | 2 (previous and next) plus 2–3 guides | 1 | 1 | 6–10 |
| Side-effect page | 1 | — | 4–6 (other effects, same effect on other medicines) plus 1–2 guides | 1 | 1 | 8–12 |
| Medication comparison | 2 (both hubs) | — | 3–6 | ≤2 | 1 | 8–15 |
| Pillar | 1 | All its supporting articles (auto block) | 3–8 | ≤2 | 1 | 10–30 |
| Supporting article | 1–2 | — | 3–5 | 1–2 | 1 | 6–12 |
| Provider review | 1 | 2 (provider × med) | 3–5 (comparisons) | 1 | 2 (methodology, how we make money) | 8–12 |
| Provider comparison | 2 (both reviews) | — | 3 | 1 | 1 | 6–10 |
| Price engine | 1 | — | 4–6 explainers | — | 2 | 8–12 |
| Tool | — | — | 3–5 guides | 0 | 1 | 4–6 |

---

## 7. Schema strategy

Implemented through `src/lib/schema.ts` and `components/seo/json-ld.tsx`. Markup must describe only what is visible on the page.

| Template | Schema types | Key properties and notes |
|---|---|---|
| All pages | `Organization` (sitewide, in layout), `WebSite` with `SearchAction` (homepage only) | Organization: legal name, logo, `sameAs`, contact point, `publishingPrinciples` → `/editorial-policy`, `ethicsPolicy`, `correctionsPolicy` → `/corrections`, `ownershipFundingInfo` → `/affiliate-disclosure` |
| All except home | `BreadcrumbList` | Same items as the visible breadcrumb |
| Medication hub and topic | `MedicalWebPage` with `about` → `Drug` (`name`, `nonProprietaryName`, `drugClass`, `administrationRoute`, `legalStatus: PrescriptionOnly`, `manufacturer`) | `reviewedBy` (Person with credential), `lastReviewed`, `medicalAudience: Patient`. **No `offers` on `Drug`** |
| Dose and side-effect pages | `MedicalWebPage` (`about` → `Drug`; side-effect pages may add `MedicalSignOrSymptom` for the effect) | Same as above |
| Pillar and supporting article | `Article` (or `MedicalWebPage` for clinical topics) | `author` (Person or Organization with URL), `reviewedBy`, `datePublished`, `dateModified`, `citation` from `sources`, `isPartOf` → cluster hub |
| FAQ sections | `FAQPage` **only where the FAQs are visible on the page** | Since August 2023, Google shows FAQ rich results only for well-known, authoritative government and health websites, so we should not expect rich results. We keep the markup because it is cheap, it describes the page and other consumers (Bing, AI assistants) use it. Never duplicate the same FAQ markup across many pages |
| Provider index, guide hubs, comparison tables | `ItemList` of `ListItem` → URL | Order matches the visible order (alphabetical or methodology score, never commission) |
| Provider review | `Article` plus `about` → `Organization` (the provider); **`Review` only with genuine data** | A `Review` with a `reviewRating` is allowed only when (a) the rating comes from our published methodology and (b) the provider is verified. **Never** publish `AggregateRating` from Trustpilot or any third-party source as our own |
| Provider comparison | `Article` plus `ItemList` | No ratings markup |
| Price engine [G] | `Article` plus `ItemList` | **No `Product` or `Offer` markup for prescription-only medicines**, even after sign-off, unless legal advice explicitly approves it |
| Tools | `WebApplication` (`applicationCategory: HealthApplication`, `isAccessibleForFree`) | No ratings |
| Author pages | `ProfilePage` with `mainEntity` → `Person` (`jobTitle`, `hasCredential`, `memberOf` the regulator, `sameAs` → register entry and LinkedIn) | Only verified credentials |

**YMYL implications.** Health and money topics are "Your Money or Your Life" content in Google's quality rater guidelines and need the strongest E-E-A-T signals. Schema does not create trust on its own; it must reflect real, visible expertise (named reviewer, citations, dates). Misleading markup (fake reviews, invented credentials) risks a manual action and breaches the CMA's fake-review rules.

---

## 8. E-E-A-T strategy

| Element | What we publish | Owner | When |
|---|---|---|---|
| **Author profiles** `/authors/{slug}` | Real name, photo, role, relevant experience, qualifications, LinkedIn; every article they wrote | Managing editor | Launch |
| **Medical reviewer profiles** | Name, registration body and number with a link to the public register (GPhC, GMC), areas of practice, conflicts of interest, review date per article | Clinical lead | Before any article is published |
| **Editorial policy** `/editorial-policy` | Independence, how topics are chosen, sourcing hierarchy (SmPC, MHRA, NICE, peer-reviewed trials, NHS), use of AI tools (disclosed and human-checked), separation of commercial and editorial teams | Managing editor | Launch |
| **Fact-checking policy** `/fact-checking` | Two-person rule, how figures are verified against the primary source, how regulatory status is dated | Managing editor | Launch |
| **Affiliate disclosure framework** `/affiliate-disclosure` | Which providers pay us (named, once flags are on), how payment does and does not affect content, link labelling ("Ad", `rel="sponsored"`); states plainly while flags are off that the site earns no commission and carries no affiliate links | Commercial lead plus legal | Launch (updated when flags change) |
| **Methodology** `/methodology` | Provider assessment criteria and weightings, data sources, verification cadence, how prices are collected (when on), what we do not assess | SEO lead plus clinical lead | Launch |
| **Medical disclaimer** | Information only; not medical advice; prescribing decisions belong to the prescriber; urgent-care signposting | Clinical lead | Launch |
| **Transparency signals** | "Last reviewed by …" and "Updated …" on every page; a "What changed" note on material updates; sources listed | Editorial | Ongoing |
| **Corrections** `/corrections` | Public log from the `Correction` table (date, page, what changed); a "Report an error" link on every article | Managing editor | Launch |
| **Experience** | Pharmacist reviewer commentary boxes ("What I tell patients…", clearly labelled as general information), process walkthroughs of public consultation flows (no patient data), first-hand testing of public provider sign-up journeys documented with screenshots of non-personal steps | Editorial | Phase 2 |

---

## 9. Programmatic SEO quality controls

Programmatic pages (654 planned) are the biggest quality risk. A URL is generated by the route registry, but it is **indexable** only when it passes every check below. Otherwise it renders with `noindex, follow` and is left out of the sitemap (`index_policy = noindex-until-verified` in the CSV).

### 9.1 Thresholds by pattern

| Pattern | Minimum unique content | Data requirements | Other checks |
|---|---|---|---|
| Medication topic | Mounted pillar or ≥ 800 words of unique MDX | Medication `ukStatus = licensed`, `dosesVerified = true` | Clinically reviewed |
| Dose page | ≥ 250 words of dose-specific copy (not shared with sibling doses) plus the data block | Dose verified against the UK SmPC | Trial data labelled by dose arm |
| Med × side effect | ≥ 300 words specific to that medicine and effect | SmPC frequency band recorded with section reference | Red-flag box where the effect is serious; listed in `commonSideEffects` or `seriousness = serious` to be indexed at launch |
| Medication comparison | Mounted pillar or ≥ 1,200 words | Both medicines verified | — |
| Provider review | ≥ 600 words of editorial assessment | `verified = true`, `lastVerifiedAt` ≤ 90 days, regulator register checked | — |
| Provider × medication | ≥ 300 unique words on how that provider handles that medicine | `ProviderMedication.available` checked ≤ 30 days ago | — |
| Provider × medication × dose [G] | Price row plus ≥ 150 unique words | Current `PricePoint` ≤ 7 days old with `sourceUrl` | Flag on **and** legal sign-off for indexing; otherwise `noindex` even when the flag is on |
| Discount codes [G] | Offer terms in full | Active, verified, unexpired `Offer` | Flag on; `noindex` when no active offer exists (do not show an empty "no codes" page) |
| Provider comparison | ≥ 400 words of editorial summary | Both providers verified | Curated list first; matrix pairs only when demand exists (GSC or keyword-tool evidence) |
| Price engine `/prices/{med}` | ≥ 500 words of explainer | ≥ 8 verified providers for that medicine | — |
| Guide cluster hub | Intro ≥ 150 words | ≥ 5 published articles in the cluster | — |

### 9.2 Uniqueness requirements

- No two indexable pages may share more than **40%** of their body text (measured by shingle similarity in CI; boilerplate such as nav, disclaimers and data tables is excluded).
- Template sentences with swapped names ("{Provider} offers {medication}…") do not count towards the unique-word minimum.
- Every programmatic page needs its own `<title>`, meta description and H1, with no repeated formula across more than 20% of a pattern's pages.

### 9.3 Noindex and pruning rules

| Trigger | Action |
|---|---|
| Data verification lapses (provider > 90 days, price > 7 days) | Page drops to `noindex` automatically; stale banner shown |
| A page gets < 10 impressions in GSC over 6 months after indexing | Review: improve, merge into a parent or `noindex` |
| Medication status changes to not available or withdrawn | Banner, then 301 to the hub after review |
| Provider exits the market | 90-day banner, then 301 to `/providers` |
| Flag switched off again | Gated routes 404 and drop out of the sitemap; internal links disappear |

### 9.4 Rollout

Index in waves: (1) hubs, topics, comparisons and dose pages; (2) 20–30 side-effect pages; (3) verified provider reviews; (4) curated provider comparisons; (5) everything else, only when the data is ready. Watch "Crawled – currently not indexed" in GSC: if more than 20% of a wave lands there, pause the next wave and improve the content.

---

## 10. Link-building and digital PR plan

All outreach must follow the same compliance rules as the site: we never promote a medicine, and we never pay for links (Google's spam policies; CAP rules on disguised advertising).

| Tactic | Asset | Targets | Phase |
|---|---|---|---|
| **Data-led PR** | "UK online weight-loss services: how they verify patients" (public-domain review of published processes for 20 providers); a twice-yearly "State of UK private GLP-1 provision" report (only from published provider information and official statistics) | Health and consumer journalists (national and trade: Pharmaceutical Journal, Chemist+Druggist, P3 Pharmacy) | 2–3 |
| **Safety campaigns** | "How to spot a fake weight-loss jab" checklist and printable PDF; explainer on MHRA seizures | Consumer charities, local news, Healthwatch, university press offices, NHS trust patient-information teams | 1–2 |
| **Linkable tools** | BMI calculator with NICE ethnicity thresholds; waist-to-height calculator | Health bloggers, GP practice websites, fitness sites, resource pages | 1 |
| **Expert commentary** | Pharmacist reviewer available for quotes (via a journalist-request service) on regulatory news | Journalists responding to MHRA, NICE and ASA news | 1+ |
| **Explainer partnerships** | Co-authored guides with dietitians (diet cluster) and physiotherapists or exercise professionals (exercise cluster), with credited authorship | Professional association blogs, university departments | 2–3 |
| **Resource-page outreach** | Special-populations guides (contraception, PCOS, menopause, over-65s) | PCOS and menopause charities, women's health sites | 2 |
| **Unlinked mentions and broken links** | Monitor brand mentions; replace broken links to retired NHS or MHRA pages with our up-to-date explainers | Any site citing outdated material | 2+ |
| **Digital PR newsjacking** | Rapid, factual updates when the MHRA, NICE or the ASA publish something (for example a new NICE appraisal for an oral GLP-1) | News and trade press | Ongoing |

KPIs: referring domains (quality-weighted, DR/DA ≥ 30), links from `.ac.uk`, `.nhs.uk`, `.gov.uk` and charities, and branded search growth. Avoid: guest-post networks, paid links, private blog networks, link exchanges with providers (a CMA hidden-connection risk).

---

## 11. Measurement

| KPI | Source | Phase 1 target (by month 6) |
|---|---|---|
| Indexed pages vs indexable pages | GSC Pages report | ≥ 90% |
| Non-branded clicks | GSC | Baseline then +20% month on month after month 3 |
| Top-10 rankings for High-priority informational keywords | Rank tracker (Ahrefs or Semrush) | 30% of the list |
| Featured snippets and AI-overview citations | Rank tracker, manual checks | Track |
| Core Web Vitals pass rate | CrUX, Search Console | 100% of URLs "Good" |
| Referring domains | Ahrefs | 50 quality domains |
| Conversion-page reach (internal) | Analytics (consented) | % of sessions reaching `/providers`, `/compare` or `/prices` |
| Outbound clicks [G] | `ClickEvent` | Only after the affiliateLinks flag is on |
