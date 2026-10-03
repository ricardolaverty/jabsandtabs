# Part 6: Content plan

**Owner:** Managing editor · **Status:** Draft · **Last updated:** 3 October 2026
**Plan files:** `content/plan/pillars.json` (100), `content/plan/supporting-articles.json` (300), `content/plan/programmatic-urls.csv` (654)

---

## 1. Overview

| Layer | Count | Word range | Total words (planned) | Purpose |
|---|---|---|---|---|
| Pillars | 100 | 2,500–4,500 | ≈ 330,000 | Define each topic cluster; earn links; anchor hub-and-spoke |
| Supporting articles | 300 | 1,200–2,000 | ≈ 394,000 | Long-tail questions; feed authority up to pillars |
| Programmatic pages | 654 URLs (92 indexable at launch) | Template plus 150–1,200 unique words by pattern | Data-led | Cover data-driven variants (doses, side effects, providers, comparisons) |
| Trust pages | 12 | 500–2,000 | ≈ 12,000 | E-E-A-T and compliance |

All copy follows `CONTRACTS.md` §4: British English, no promotion of prescription-only medicines, no prices in body copy, evidence cited by name, uncertain regulatory status dated, prescriber signposting and red flags, no patient stories, and `reviewStatus: pending-clinical-review` until a registered clinician signs off.

---

## 2. The 100 pillars

"Mounted" pillars render at their programmatic URL (Part 1 §4). Word targets: 4,500 for complete guides and the main overviews; 4,000 for comparisons and the core cluster definers; 3,200 for clinical and commercial explainers; 2,800 for lifestyle topics. The up link goes to the medication or class hub where `hub` is set, otherwise to the cluster hub. Sideways links are suggestions from the same cluster; writers may substitute closer matches as long as there are at least 3. "Supporting" is the number of supporting articles whose `parentPillar` is this pillar.

| # | Pillar (slug) | Cluster | Primary keyword | Words | Up link | Sideways (≥3 pillars) | Conversion | Supporting |
|---|---|---|---|---|---|---|---|---|
| 1 | `mounjaro-uk-complete-guide` | medications | mounjaro uk | 4,500 | `/mounjaro` | how-does-mounjaro-work, tirzepatide-uk-guide, wegovy-uk-complete-guide | `/providers` | 0 |
| 2 | `how-does-mounjaro-work` (mounted) | medications | how does mounjaro work | 3,200 | `/mounjaro` | tirzepatide-uk-guide, wegovy-uk-complete-guide, how-does-wegovy-work | `/providers` | 2 |
| 3 | `mounjaro-side-effects-guide` (mounted) | side-effects | mounjaro side effects | 4,000 | `/mounjaro` | mounjaro-hair-loss, wegovy-side-effects-guide, oral-glp1-side-effects | `/providers` | 13 |
| 4 | `mounjaro-dosing-schedule` (mounted) | dosing | mounjaro doses | 3,200 | `/mounjaro` | mounjaro-kwikpen-how-to-inject, mounjaro-missed-dose, wegovy-dosing-schedule | `/providers` | 5 |
| 5 | `mounjaro-results-timeline` (mounted) | results | mounjaro results | 3,200 | `/mounjaro` | wegovy-results-timeline, wegovy-heart-health-select-trial, realistic-weight-loss-expectations | `/providers` | 3 |
| 6 | `mounjaro-price-uk-explained` (mounted) | pricing | mounjaro price uk | 3,200 | `/mounjaro` | wegovy-price-uk-explained, how-weight-loss-injection-pricing-works, weight-loss-treatment-hidden-costs | `/prices` | 1 |
| 7 | `mounjaro-maintenance-guide` (mounted) | maintenance | mounjaro maintenance | 2,800 | `/mounjaro` | wegovy-maintenance-and-stopping, mounjaro-uk-complete-guide, how-does-mounjaro-work | `/providers` | 8 |
| 8 | `mounjaro-on-the-nhs` | eligibility | mounjaro nhs | 3,200 | `/mounjaro` | wegovy-on-the-nhs, who-can-get-weight-loss-injections, bmi-and-treatment-eligibility | `/tools/eligibility-checker + /providers` | 3 |
| 9 | `mounjaro-kwikpen-how-to-inject` | dosing | mounjaro kwikpen | 3,200 | `/mounjaro` | mounjaro-missed-dose, wegovy-dosing-schedule, wegovy-pen-how-to-inject | `/providers` | 8 |
| 10 | `mounjaro-missed-dose` | dosing | mounjaro missed dose | 3,200 | `/mounjaro` | wegovy-dosing-schedule, wegovy-pen-how-to-inject, mounjaro-dosing-schedule | `/providers` | 4 |
| 11 | `mounjaro-and-alcohol` | safety | mounjaro and alcohol | 3,200 | `/mounjaro` | mounjaro-storage-and-travel, who-should-not-take-glp1s, getting-weight-loss-injections-online-safely | `/providers` | 3 |
| 12 | `mounjaro-hair-loss` | side-effects | mounjaro hair loss | 3,200 | `/mounjaro` | wegovy-side-effects-guide, oral-glp1-side-effects, nausea-on-glp1 | `/providers` | 1 |
| 13 | `mounjaro-storage-and-travel` | safety | mounjaro storage | 3,200 | `/mounjaro` | who-should-not-take-glp1s, getting-weight-loss-injections-online-safely, fake-weight-loss-jabs | `/providers` | 6 |
| 14 | `tirzepatide-uk-guide` | medications | tirzepatide uk | 4,000 | `/mounjaro` | wegovy-uk-complete-guide, how-does-wegovy-work, semaglutide-uk-guide | `/providers` | 2 |
| 15 | `wegovy-uk-complete-guide` | medications | wegovy uk | 4,500 | `/wegovy` | how-does-wegovy-work, semaglutide-uk-guide, oral-glp1-uk-guide | `/providers` | 0 |
| 16 | `how-does-wegovy-work` (mounted) | medications | how does wegovy work | 3,200 | `/wegovy` | semaglutide-uk-guide, oral-glp1-uk-guide, weight-loss-tablets-uk | `/providers` | 0 |
| 17 | `wegovy-side-effects-guide` (mounted) | side-effects | wegovy side effects | 4,000 | `/wegovy` | oral-glp1-side-effects, nausea-on-glp1, constipation-on-glp1 | `/providers` | 3 |
| 18 | `wegovy-dosing-schedule` (mounted) | dosing | wegovy doses | 3,200 | `/wegovy` | wegovy-pen-how-to-inject, mounjaro-dosing-schedule, mounjaro-kwikpen-how-to-inject | `/providers` | 2 |
| 19 | `wegovy-results-timeline` (mounted) | results | wegovy results | 3,200 | `/wegovy` | wegovy-heart-health-select-trial, realistic-weight-loss-expectations, measuring-progress-beyond-the-scales | `/providers` | 3 |
| 20 | `wegovy-price-uk-explained` (mounted) | pricing | wegovy price | 3,200 | `/wegovy` | how-weight-loss-injection-pricing-works, weight-loss-treatment-hidden-costs, mounjaro-price-rise-2025 | `/prices` | 0 |
| 21 | `wegovy-maintenance-and-stopping` (mounted) | maintenance | wegovy maintenance | 2,800 | `/wegovy` | mounjaro-maintenance-guide, wegovy-uk-complete-guide, how-does-wegovy-work | `/providers` | 2 |
| 22 | `wegovy-on-the-nhs` | eligibility | wegovy nhs | 3,200 | `/wegovy` | who-can-get-weight-loss-injections, bmi-and-treatment-eligibility, bmi-thresholds-ethnicity | `/tools/eligibility-checker + /providers` | 1 |
| 23 | `wegovy-pen-how-to-inject` | dosing | wegovy pen | 3,200 | `/wegovy` | mounjaro-dosing-schedule, mounjaro-kwikpen-how-to-inject, mounjaro-missed-dose | `/providers` | 2 |
| 24 | `wegovy-heart-health-select-trial` | results | wegovy heart | 3,200 | `/wegovy` | realistic-weight-loss-expectations, measuring-progress-beyond-the-scales, mounjaro-results-timeline | `/providers` | 2 |
| 25 | `semaglutide-uk-guide` | medications | semaglutide uk | 4,000 | `/wegovy` | oral-glp1-uk-guide, weight-loss-tablets-uk, oral-semaglutide-guide | `/providers` | 0 |
| 26 | `ozempic-vs-wegovy` | comparisons | ozempic vs wegovy | 4,000 | `/wegovy` | oral-vs-injectable-glp1, orlistat-vs-glp1, mounjaro-vs-wegovy | `/compare` | 2 |
| 27 | `oral-glp1-uk-guide` (mounted) | medications | oral glp1 | 4,500 | `/oral-glp1` | weight-loss-tablets-uk, oral-semaglutide-guide, foundayo-orforglipron-guide | `/providers` | 0 |
| 28 | `weight-loss-tablets-uk` | medications | weight loss tablets uk | 3,200 | `/oral-glp1` | oral-semaglutide-guide, foundayo-orforglipron-guide, rybelsus-and-weight-loss | `/providers` | 0 |
| 29 | `oral-semaglutide-guide` | medications | oral semaglutide | 3,200 | `/oral-glp1` | foundayo-orforglipron-guide, rybelsus-and-weight-loss, glp1-pipeline-future-treatments | `/providers` | 3 |
| 30 | `foundayo-orforglipron-guide` | medications | foundayo | 3,200 | `/oral-glp1` | rybelsus-and-weight-loss, glp1-pipeline-future-treatments, what-are-glp1-medications | `/providers` | 3 |
| 31 | `oral-vs-injectable-glp1` | comparisons | oral vs injectable glp1 | 4,000 | `/oral-glp1` | orlistat-vs-glp1, mounjaro-vs-wegovy, mounjaro-vs-oral-glp1 | `/compare` | 0 |
| 32 | `rybelsus-and-weight-loss` | medications | rybelsus weight loss | 3,200 | `/oral-glp1` | glp1-pipeline-future-treatments, what-are-glp1-medications, weight-loss-medication-uk-overview | `/providers` | 1 |
| 33 | `orlistat-vs-glp1` | comparisons | orlistat vs mounjaro | 4,000 | `/oral-glp1` | mounjaro-vs-wegovy, mounjaro-vs-oral-glp1, wegovy-vs-oral-glp1 | `/compare` | 1 |
| 34 | `oral-glp1-side-effects` | side-effects | oral glp1 side effects | 3,200 | `/oral-glp1` | nausea-on-glp1, constipation-on-glp1, diarrhoea-on-glp1 | `/providers` | 2 |
| 35 | `glp1-pipeline-future-treatments` | medications | new weight loss drugs | 3,200 | `/guides/topic/medications` | what-are-glp1-medications, weight-loss-medication-uk-overview, mounjaro-uk-complete-guide | `/providers` | 5 |
| 36 | `mounjaro-vs-wegovy` (mounted) | comparisons | mounjaro vs wegovy | 4,000 | `/mounjaro` | mounjaro-vs-oral-glp1, wegovy-vs-oral-glp1, surmount-5-tirzepatide-vs-semaglutide | `/compare` | 3 |
| 37 | `mounjaro-vs-oral-glp1` | comparisons | mounjaro vs tablets | 4,000 | `/mounjaro` | wegovy-vs-oral-glp1, surmount-5-tirzepatide-vs-semaglutide, saxenda-vs-newer-glp1s | `/compare` | 0 |
| 38 | `wegovy-vs-oral-glp1` | comparisons | wegovy injection vs tablet | 4,000 | `/wegovy` | surmount-5-tirzepatide-vs-semaglutide, saxenda-vs-newer-glp1s, weight-loss-injections-compared | `/compare` | 0 |
| 39 | `surmount-5-tirzepatide-vs-semaglutide` | comparisons | tirzepatide vs semaglutide | 4,000 | `/guides/topic/comparisons` | saxenda-vs-newer-glp1s, weight-loss-injections-compared, glp1-vs-bariatric-surgery | `/compare` | 0 |
| 40 | `saxenda-vs-newer-glp1s` | comparisons | saxenda vs wegovy | 4,000 | `/weight-loss-injections` | weight-loss-injections-compared, glp1-vs-bariatric-surgery, ozempic-vs-wegovy | `/compare` | 2 |
| 41 | `weight-loss-injections-compared` | comparisons | best weight loss injection uk | 4,500 | `/weight-loss-injections` | glp1-vs-bariatric-surgery, ozempic-vs-wegovy, oral-vs-injectable-glp1 | `/compare` | 1 |
| 42 | `glp1-vs-bariatric-surgery` | comparisons | weight loss injections vs surgery | 4,000 | `/guides/topic/comparisons` | ozempic-vs-wegovy, oral-vs-injectable-glp1, orlistat-vs-glp1 | `/compare` | 2 |
| 43 | `how-weight-loss-injection-pricing-works` | pricing | cheapest mounjaro uk | 3,200 | `/weight-loss-injections` | weight-loss-treatment-hidden-costs, mounjaro-price-rise-2025, private-vs-nhs-weight-loss-treatment | `/prices` | 3 |
| 44 | `weight-loss-treatment-hidden-costs` | pricing | weight loss injection cost | 3,200 | `/guides/topic/pricing` | mounjaro-price-rise-2025, private-vs-nhs-weight-loss-treatment, long-term-cost-of-glp1-treatment | `/prices` | 6 |
| 45 | `mounjaro-price-rise-2025` | pricing | mounjaro price increase | 3,200 | `/mounjaro` | private-vs-nhs-weight-loss-treatment, long-term-cost-of-glp1-treatment, mounjaro-price-uk-explained | `/prices` | 1 |
| 46 | `private-vs-nhs-weight-loss-treatment` | pricing | private weight loss injections | 3,200 | `/guides/topic/pricing` | long-term-cost-of-glp1-treatment, mounjaro-price-uk-explained, wegovy-price-uk-explained | `/prices` | 8 |
| 47 | `long-term-cost-of-glp1-treatment` | pricing | glp1 cost uk | 3,200 | `/guides/topic/pricing` | mounjaro-price-uk-explained, wegovy-price-uk-explained, how-weight-loss-injection-pricing-works | `/prices` | 1 |
| 48 | `who-can-get-weight-loss-injections` | eligibility | weight loss injections eligibility | 4,000 | `/guides/topic/eligibility` | bmi-and-treatment-eligibility, bmi-thresholds-ethnicity, online-weight-loss-consultation | `/tools/eligibility-checker + /providers` | 3 |
| 49 | `bmi-and-treatment-eligibility` | eligibility | bmi for weight loss injections | 3,200 | `/guides/topic/eligibility` | bmi-thresholds-ethnicity, online-weight-loss-consultation, id-and-weight-verification | `/tools/eligibility-checker + /providers` | 3 |
| 50 | `bmi-thresholds-ethnicity` | eligibility | bmi ethnicity weight loss injections | 3,200 | `/guides/topic/eligibility` | online-weight-loss-consultation, id-and-weight-verification, mounjaro-on-the-nhs | `/tools/eligibility-checker + /providers` | 0 |
| 51 | `who-should-not-take-glp1s` | safety | who cannot take mounjaro | 3,200 | `/guides/topic/safety` | getting-weight-loss-injections-online-safely, fake-weight-loss-jabs, glp1-and-mental-health | `/providers` | 4 |
| 52 | `online-weight-loss-consultation` | eligibility | online weight loss consultation | 3,200 | `/guides/topic/eligibility` | id-and-weight-verification, mounjaro-on-the-nhs, wegovy-on-the-nhs | `/tools/eligibility-checker + /providers` | 5 |
| 53 | `id-and-weight-verification` | eligibility | weight verification online pharmacy | 3,200 | `/guides/topic/eligibility` | mounjaro-on-the-nhs, wegovy-on-the-nhs, who-can-get-weight-loss-injections | `/tools/eligibility-checker + /providers` | 0 |
| 54 | `how-to-choose-online-pharmacy-weight-loss` | providers | online pharmacy weight loss | 4,000 | `/guides/topic/providers` | online-doctor-weight-loss-uk, weight-loss-clinics-vs-online-providers, who-regulates-online-weight-loss-services | `/providers` | 6 |
| 55 | `getting-weight-loss-injections-online-safely` | safety | buy mounjaro online safely | 4,000 | `/guides/topic/safety` | fake-weight-loss-jabs, glp1-and-mental-health, glp1-surgery-and-anaesthesia | `/providers` | 3 |
| 56 | `fake-weight-loss-jabs` | safety | fake mounjaro | 3,200 | `/guides/topic/safety` | glp1-and-mental-health, glp1-surgery-and-anaesthesia, glp1-medication-interactions | `/providers` | 4 |
| 57 | `online-doctor-weight-loss-uk` | providers | online doctor weight loss | 3,200 | `/guides/topic/providers` | weight-loss-clinics-vs-online-providers, who-regulates-online-weight-loss-services, how-to-choose-online-pharmacy-weight-loss | `/providers` | 4 |
| 58 | `weight-loss-clinics-vs-online-providers` | providers | weight loss clinic uk | 3,200 | `/guides/topic/providers` | who-regulates-online-weight-loss-services, how-to-choose-online-pharmacy-weight-loss, online-doctor-weight-loss-uk | `/providers` | 1 |
| 59 | `who-regulates-online-weight-loss-services` | providers | online pharmacy regulation uk | 3,200 | `/guides/topic/providers` | how-to-choose-online-pharmacy-weight-loss, online-doctor-weight-loss-uk, weight-loss-clinics-vs-online-providers | `/providers` | 5 |
| 60 | `switching-wegovy-to-mounjaro` | switching | switching wegovy to mounjaro | 2,800 | `/mounjaro` | switching-mounjaro-to-wegovy, switching-providers-mid-treatment, switching-injection-to-tablet | `/providers` | 4 |
| 61 | `switching-mounjaro-to-wegovy` | switching | switching mounjaro to wegovy | 2,800 | `/wegovy` | switching-providers-mid-treatment, switching-injection-to-tablet, switching-wegovy-to-mounjaro | `/providers` | 2 |
| 62 | `switching-providers-mid-treatment` | switching | switch mounjaro provider | 2,800 | `/guides/topic/switching` | switching-injection-to-tablet, switching-wegovy-to-mounjaro, switching-mounjaro-to-wegovy | `/providers` | 3 |
| 63 | `switching-injection-to-tablet` | switching | switch from injection to tablet | 2,800 | `/oral-glp1` | switching-wegovy-to-mounjaro, switching-mounjaro-to-wegovy, switching-providers-mid-treatment | `/providers` | 2 |
| 64 | `weight-loss-plateau-glp1` | plateau | mounjaro plateau | 2,800 | `/guides/topic/plateau` | glp1-non-responders, glp1-pipeline-future-treatments, surmount-5-tirzepatide-vs-semaglutide | `/providers` | 8 |
| 65 | `glp1-non-responders` | plateau | mounjaro not working | 2,800 | `/guides/topic/plateau` | weight-loss-plateau-glp1, glp1-pipeline-future-treatments, surmount-5-tirzepatide-vs-semaglutide | `/providers` | 3 |
| 66 | `weight-regain-after-stopping-glp1` | long-term | weight regain after mounjaro | 2,800 | `/guides/topic/long-term` | long-term-glp1-use, obesity-as-a-chronic-disease, glp1-pipeline-future-treatments | `/providers` | 3 |
| 67 | `long-term-glp1-use` | long-term | long term mounjaro use | 2,800 | `/guides/topic/long-term` | obesity-as-a-chronic-disease, weight-regain-after-stopping-glp1, glp1-pipeline-future-treatments | `/providers` | 6 |
| 68 | `realistic-weight-loss-expectations` | results | how much weight can you lose on mounjaro | 3,200 | `/guides/topic/results` | measuring-progress-beyond-the-scales, mounjaro-results-timeline, wegovy-results-timeline | `/providers` | 3 |
| 69 | `measuring-progress-beyond-the-scales` | results | measuring weight loss progress | 3,200 | `/guides/topic/results` | mounjaro-results-timeline, wegovy-results-timeline, wegovy-heart-health-select-trial | `/providers` | 1 |
| 70 | `what-to-eat-on-glp1` | diet | diet on mounjaro | 2,800 | `/guides/topic/diet` | protein-on-glp1, foods-that-worsen-glp1-side-effects, glp1-meal-plan | `/providers` | 9 |
| 71 | `protein-on-glp1` | diet | protein on mounjaro | 2,800 | `/guides/topic/diet` | foods-that-worsen-glp1-side-effects, glp1-meal-plan, hydration-on-glp1 | `/providers` | 5 |
| 72 | `foods-that-worsen-glp1-side-effects` | diet | foods to avoid on mounjaro | 2,800 | `/guides/topic/diet` | glp1-meal-plan, hydration-on-glp1, vitamins-and-supplements-on-glp1 | `/providers` | 4 |
| 73 | `glp1-meal-plan` | diet | mounjaro meal plan | 2,800 | `/guides/topic/diet` | hydration-on-glp1, vitamins-and-supplements-on-glp1, what-to-eat-on-glp1 | `/providers` | 4 |
| 74 | `hydration-on-glp1` | diet | mounjaro dehydration | 2,800 | `/guides/topic/diet` | vitamins-and-supplements-on-glp1, what-to-eat-on-glp1, protein-on-glp1 | `/providers` | 3 |
| 75 | `vitamins-and-supplements-on-glp1` | diet | vitamins on mounjaro | 2,800 | `/guides/topic/diet` | what-to-eat-on-glp1, protein-on-glp1, foods-that-worsen-glp1-side-effects | `/providers` | 4 |
| 76 | `exercise-on-glp1` | exercise | exercise on mounjaro | 2,800 | `/guides/topic/exercise` | preserving-muscle-on-glp1, strength-training-for-beginners-on-glp1, glp1-pipeline-future-treatments | `/providers` | 8 |
| 77 | `preserving-muscle-on-glp1` | exercise | muscle loss mounjaro | 2,800 | `/guides/topic/exercise` | strength-training-for-beginners-on-glp1, exercise-on-glp1, glp1-pipeline-future-treatments | `/providers` | 5 |
| 78 | `strength-training-for-beginners-on-glp1` | exercise | strength training weight loss injections | 2,800 | `/guides/topic/exercise` | exercise-on-glp1, preserving-muscle-on-glp1, glp1-pipeline-future-treatments | `/providers` | 4 |
| 79 | `nausea-on-glp1` | side-effects | mounjaro nausea | 3,200 | `/guides/topic/side-effects` | constipation-on-glp1, diarrhoea-on-glp1, glp1-pancreatitis-risk | `/providers` | 6 |
| 80 | `constipation-on-glp1` | side-effects | mounjaro constipation | 3,200 | `/guides/topic/side-effects` | diarrhoea-on-glp1, glp1-pancreatitis-risk, glp1-gallbladder-problems | `/providers` | 3 |
| 81 | `diarrhoea-on-glp1` | side-effects | mounjaro diarrhoea | 3,200 | `/guides/topic/side-effects` | glp1-pancreatitis-risk, glp1-gallbladder-problems, facial-changes-and-loose-skin | `/providers` | 1 |
| 82 | `glp1-pancreatitis-risk` | side-effects | mounjaro pancreatitis | 3,200 | `/guides/topic/side-effects` | glp1-gallbladder-problems, facial-changes-and-loose-skin, reflux-burping-and-indigestion-on-glp1 | `/providers` | 1 |
| 83 | `glp1-gallbladder-problems` | side-effects | mounjaro gallbladder | 3,200 | `/guides/topic/side-effects` | facial-changes-and-loose-skin, reflux-burping-and-indigestion-on-glp1, mounjaro-side-effects-guide | `/providers` | 1 |
| 84 | `glp1-and-mental-health` | safety | mounjaro mental health | 3,200 | `/guides/topic/safety` | glp1-surgery-and-anaesthesia, glp1-medication-interactions, mounjaro-and-alcohol | `/providers` | 1 |
| 85 | `facial-changes-and-loose-skin` | side-effects | ozempic face | 3,200 | `/guides/topic/side-effects` | reflux-burping-and-indigestion-on-glp1, mounjaro-side-effects-guide, mounjaro-hair-loss | `/providers` | 1 |
| 86 | `reflux-burping-and-indigestion-on-glp1` | side-effects | mounjaro sulphur burps | 3,200 | `/guides/topic/side-effects` | mounjaro-side-effects-guide, mounjaro-hair-loss, wegovy-side-effects-guide | `/providers` | 4 |
| 87 | `glp1-and-contraception` | special-populations | mounjaro contraceptive pill | 2,800 | `/mounjaro` | glp1-pregnancy-and-fertility, glp1-and-type-2-diabetes, glp1-and-pcos | `/providers` | 3 |
| 88 | `glp1-pregnancy-and-fertility` | special-populations | mounjaro pregnancy | 2,800 | `/guides/topic/special-populations` | glp1-and-type-2-diabetes, glp1-and-pcos, glp1-over-65 | `/providers` | 4 |
| 89 | `glp1-and-type-2-diabetes` | special-populations | glp1 type 2 diabetes | 2,800 | `/guides/topic/special-populations` | glp1-and-pcos, glp1-over-65, tirzepatide-and-sleep-apnoea | `/providers` | 9 |
| 90 | `glp1-and-pcos` | special-populations | mounjaro pcos | 2,800 | `/guides/topic/special-populations` | glp1-over-65, tirzepatide-and-sleep-apnoea, glp1-and-menopause | `/providers` | 1 |
| 91 | `glp1-over-65` | special-populations | weight loss injections over 65 | 2,800 | `/guides/topic/special-populations` | tirzepatide-and-sleep-apnoea, glp1-and-menopause, glp1-and-contraception | `/providers` | 1 |
| 92 | `glp1-surgery-and-anaesthesia` | safety | mounjaro before surgery | 3,200 | `/guides/topic/safety` | glp1-medication-interactions, mounjaro-and-alcohol, mounjaro-storage-and-travel | `/providers` | 1 |
| 93 | `glp1-medication-interactions` | safety | mounjaro interactions | 3,200 | `/guides/topic/safety` | mounjaro-and-alcohol, mounjaro-storage-and-travel, who-should-not-take-glp1s | `/providers` | 10 |
| 94 | `tirzepatide-and-sleep-apnoea` | special-populations | mounjaro sleep apnoea | 2,800 | `/mounjaro` | glp1-and-menopause, glp1-and-contraception, glp1-pregnancy-and-fertility | `/providers` | 0 |
| 95 | `glp1-and-menopause` | special-populations | mounjaro menopause | 2,800 | `/guides/topic/special-populations` | glp1-and-contraception, glp1-pregnancy-and-fertility, glp1-and-type-2-diabetes | `/providers` | 2 |
| 96 | `obesity-as-a-chronic-disease` | long-term | obesity treatment uk | 2,800 | `/guides/topic/long-term` | weight-regain-after-stopping-glp1, long-term-glp1-use, glp1-pipeline-future-treatments | `/providers` | 4 |
| 97 | `what-are-glp1-medications` | medications | what is glp1 | 4,000 | `/guides/topic/medications` | weight-loss-medication-uk-overview, mounjaro-uk-complete-guide, how-does-mounjaro-work | `/providers` | 3 |
| 98 | `weight-loss-medication-uk-overview` | medications | weight loss medication uk | 4,500 | `/guides/topic/medications` | mounjaro-uk-complete-guide, how-does-mounjaro-work, tirzepatide-uk-guide | `/providers` | 3 |
| 99 | `glp1-myths-and-facts` | faqs | glp1 myths | 2,800 | `/guides/topic/faqs` | glp1-questions-answered, glp1-pipeline-future-treatments, surmount-5-tirzepatide-vs-semaglutide | `/providers` | 2 |
| 100 | `glp1-questions-answered` | faqs | glp1 uk | 4,500 | `/guides/topic/faqs` | glp1-myths-and-facts, glp1-pipeline-future-treatments, surmount-5-tirzepatide-vs-semaglutide | `/providers` | 2 |


Fourteen pillars have no supporting articles assigned. They are broad overviews (the two complete guides, `semaglutide-uk-guide`, `oral-glp1-uk-guide` and others) whose long tail is served by programmatic pages and by other pillars, or newer topics (`tirzepatide-and-sleep-apnoea`, `bmi-thresholds-ethnicity`) where supporting articles will be added in the Phase 3 gap analysis.

---

## 3. The 300 supporting articles

Full briefs, keywords and parents are in `content/plan/supporting-articles.json`. Each object has `n`, `slug`, `title`, `primaryKeyword`, `intent`, `cluster`, `parentPillar`, `brief` (angle, must-cover points and sources) and `targetWords`.

Intent mix: 209 Informational, 68 Problem-solution, 21 Comparison, 2 Commercial (both pricing explainers with a compliance-review angle).

| Cluster | Articles | Words (total) | Main parent pillars | Example titles |
|---|---|---|---|---|
| side-effects | 38 | 52,000 | `mounjaro-side-effects-guide` (13), `nausea-on-glp1` (6), `reflux-burping-and-indigestion-on-glp1` (4) | Why Side Effects Can Return After a Mounjaro Dose Increase; How Long Do Mounjaro Side Effects Last?; Wegovy Side Effects in the First Week: What Is Common |
| safety | 30 | 39,200 | `glp1-medication-interactions` (10), `mounjaro-storage-and-travel` (6), `fake-weight-loss-jabs` (4) | How Long Can Mounjaro Be Out of the Fridge?; How Long Can Wegovy Stay Out of the Fridge?; My Weight Loss Pen Froze: Can I Still Use It? |
| diet | 30 | 38,200 | `what-to-eat-on-glp1` (9), `protein-on-glp1` (5), `foods-that-worsen-glp1-side-effects` (4) | Can You Drink Coffee on Mounjaro?; High-Protein Breakfast Ideas for Small Appetites; Protein Shakes on GLP-1 Medication: Useful or Unnecessary? |
| dosing | 22 | 27,800 | `mounjaro-kwikpen-how-to-inject` (8), `mounjaro-dosing-schedule` (4), `mounjaro-missed-dose` (3) | Mounjaro Injection Sites: Stomach, Thigh or Upper Arm, and How to Rotate; Wegovy Injection Site Rotation Explained; Can You Change Your Mounjaro Injection Day? |
| special-populations | 22 | 29,000 | `glp1-and-type-2-diabetes` (5), `glp1-pregnancy-and-fertility` (4), `glp1-and-contraception` (3) | Weight Loss Medication for Under-18s in the UK; Can You Take GLP-1 Medication After Bariatric Surgery?; GLP-1 Medication and Fatty Liver Disease (MASLD) |
| providers | 18 | 23,100 | `how-to-choose-online-pharmacy-weight-loss` (6), `who-regulates-online-weight-loss-services` (5), `online-doctor-weight-loss-uk` (4) | How to Check a Pharmacy on the GPhC Register; What CQC Registration Means for Online Doctors; The GPhC's 2025 Rules for Online Weight Loss Prescribing Explained |
| eligibility | 16 | 20,900 | `private-vs-nhs-weight-loss-treatment` (4), `online-weight-loss-consultation` (4), `mounjaro-on-the-nhs` (3) | How to Talk to Your GP About Mounjaro on the NHS; The NHS Mounjaro Rollout: Who Is Eligible in Each Phase; Mounjaro on the NHS in Scotland, Wales and Northern Ireland |
| exercise | 15 | 19,900 | `exercise-on-glp1` (7), `strength-training-for-beginners-on-glp1` (4), `preserving-muscle-on-glp1` (3) | Creatine and GLP-1 Medication: What the Evidence Says; Walking for Weight Loss on GLP-1 Medication: How Much Is Enough?; A 12-Week Beginner Gym Plan Alongside GLP-1 Treatment |
| pricing | 15 | 18,800 | `weight-loss-treatment-hidden-costs` (6), `how-weight-loss-injection-pricing-works` (3), `private-vs-nhs-weight-loss-treatment` (3) | Why Mounjaro Costs More at Higher Doses; Why Weight Loss Treatment Prices Differ Between Pharmacies; Consultation Fees for Online Weight Loss Treatment Explained |
| comparisons | 15 | 20,100 | `mounjaro-vs-wegovy` (3), `weight-loss-medication-uk-overview` (3), `glp1-pipeline-future-treatments` (2) | Mounjaro vs Wegovy: Side Effects Compared; KwikPen vs FlexTouch: Comparing the Weight Loss Pens; Mounjaro vs Wegovy Dosing Schedules Side by Side |
| medications | 14 | 18,500 | `what-are-glp1-medications` (3), `glp1-pipeline-future-treatments` (3), `oral-semaglutide-guide` (2) | Ozempic for Weight Loss in the UK: Why It Is Not Licensed for It; What Is GIP? The Second Hormone in Mounjaro; From Gila Monsters to Weekly Injections: A Short History of GLP-1 Medicines |
| results | 13 | 17,900 | `mounjaro-results-timeline` (3), `wegovy-results-timeline` (3), `realistic-weight-loss-expectations` (3) | DEXA and Body Composition Scans: Measuring Muscle on GLP-1s; The First Month on Mounjaro: What the Trials Suggest; The First Month on Wegovy: What to Expect |
| maintenance | 13 | 17,700 | `mounjaro-maintenance-guide` (8), `wegovy-maintenance-and-stopping` (2), `weight-regain-after-stopping-glp1` (2) | Staying on Treatment Once Your BMI Falls Below the Starting Threshold; Finding a Maintenance Dose on Mounjaro; How to Come Off Mounjaro: Tapering vs Stopping |
| plateau | 11 | 14,400 | `weight-loss-plateau-glp1` (7), `glp1-non-responders` (3), `glp1-and-menopause` (1) | Not Losing Weight in the First Weeks? What It May Mean; Why Has My Weight Loss Slowed on Wegovy?; Mounjaro Stopped Working After Months: Possible Reasons |
| switching | 11 | 14,300 | `switching-wegovy-to-mounjaro` (4), `switching-mounjaro-to-wegovy` (2), `switching-injection-to-tablet` (2) | Wegovy to Mounjaro: Which Starting Dose?; Switching from Saxenda to Wegovy; Switching from Saxenda to Mounjaro |
| long-term | 10 | 14,000 | `long-term-glp1-use` (4), `obesity-as-a-chronic-disease` (3), `weight-regain-after-stopping-glp1` (1) | Will You Need GLP-1 Medication for Life?; Long-Term Safety of Semaglutide: What We Know; Long-Term Safety of Tirzepatide: What We Know So Far |
| faqs | 7 | 8,600 | `glp1-questions-answered` (2), `glp1-myths-and-facts` (2), `getting-weight-loss-injections-online-safely` (1) | Do Weight Loss Injections Hurt?; Do You Have to Diet on GLP-1 Medication?; Is Mounjaro a Stimulant? Common Misconceptions |


**Uniqueness checks (done when the file was generated):**
- 300 unique slugs; none matches a pillar slug.
- 300 unique titles and 300 unique primary keywords; none equals a pillar's primary keyword.
- Every `parentPillar` exists in `pillars.json`.
- Supporting keywords avoid the `{medicine} {side effect}` and `{medicine} {topic}` patterns owned by programmatic URLs (for example there is no "mounjaro nausea" supporting article, because `/mounjaro-side-effects/nausea` owns it; instead there are angles such as "food aversion on GLP-1s" and "anti-sickness medication on Mounjaro").
- Three articles are flagged for compliance review in Part 5 §3 (`price-match-offers-what-to-check`, `buy-now-pay-later-weight-loss`, `research-peptide-risks`). Each has a safety or consumer-protection angle written into its brief.

---

## 4. Programmatic opportunities (654 URLs)

Generated by a script from `src/data/medications.ts`, `src/data/provider-seeds.ts` and `src/data/providers.ts` (5 medications, 16 verified doses, 14 side effects, 8 medication comparisons, 20 providers, 12 curated provider pairs). Columns: `url`, `pattern`, `template`, `primary_keyword`, `data_dependencies`, `flag_gate`, `index_policy`.

| Pattern | Count | Template | Gate | Indexable at launch | Examples |
|---|---|---|---|---|---|
| medication-hub | 5 | MedicationHub | none | 3 | `/mounjaro`, `/foundayo` |
| class-hub | 2 | ClassHub | none | 2 | `/weight-loss-injections`, `/oral-glp1` |
| medication-topic | 40 | MedicationTopic | none | 24 | `/mounjaro-prices`, `/foundayo-faqs` |
| medication-dose | 16 | DosePage | none | 16 | `/mounjaro-2-5mg`, `/saxenda-3mg` |
| medication-side-effect | 68 | SideEffectPage | none | 24 | `/mounjaro-side-effects/nausea`, `/foundayo-side-effects/low-blood-sugar` |
| medication-comparison | 8 | MedicationComparison | none | 3 | `/mounjaro-vs-wegovy`, `/oral-semaglutide-vs-foundayo` |
| price-engine-index | 1 | PriceEngine | none | 1 | `/prices` |
| price-engine-medication | 5 | PriceEngine | none | 0 | `/prices/mounjaro`, `/prices/foundayo` |
| provider-index | 1 | ProviderIndex | none | 1 | `/providers` |
| provider-review | 20 | ProviderReview | none | 0 | `/providers/chemist4u`, `/providers/uk-meds` |
| provider-medication | 40 | ProviderMedication | none | 0 | `/providers/chemist4u/mounjaro`, `/providers/uk-meds/wegovy` |
| provider-medication-dose | 220 | ProviderDosePrice | pomPricing | 0 | `/providers/chemist4u/mounjaro/2-5mg`, `/providers/uk-meds/wegovy/2-4mg` |
| provider-discount-codes | 20 | ProviderDiscounts | discountCodes | 0 | `/providers/chemist4u/discount-codes`, `/providers/uk-meds/discount-codes` |
| provider-compare-index | 1 | CompareIndex | none | 1 | `/compare` |
| provider-comparison-curated | 12 | ProviderComparison | none | 0 | `/compare/boots-vs-superdrug`, `/compare/chemist4u-vs-superdrug` |
| provider-comparison-matrix-phase4 | 178 | ProviderComparison | none | 0 | `/compare/asda-vs-chemist4u`, `/compare/well-vs-zava` |
| guide-cluster-hub | 17 | ClusterHub | none | 17 | `/guides/topic/medications`, `/guides/topic/faqs` |
| **Total** | **654** | | | **92** | |


Notes:
- **Oral medicines.** `oral-semaglutide` and `foundayo` have no doses in the data yet (`dosesVerified: false`), so there are no oral dose pages. Once the UK SmPCs are confirmed and the data updated, the registry adds their dose pages automatically (around 8 more URLs).
- **Provider × medication** uses the seed default (Mounjaro and Wegovy for every provider). When verified `ProviderMedication` data adds Saxenda or oral products, the count grows accordingly.
- **Gated patterns:** 220 provider × medication × dose pages (`pomPricing`) and 20 discount-code pages (`discountCodes`). They do not exist as routes while the flags are off.
- **Phase 4 matrix:** the 178 non-curated provider pairs are only built once both providers are verified, and indexed only where there is evidence of demand.
- **Future patterns** (not in the CSV until the data exists): medication × special population (for example `/mounjaro-pregnancy`, with `CONTRACTS.md` approval), oral dose pages, and provider × oral medicine.

---

## 5. Production workflow

```
Brief (SEO) ─► Draft (writer) ─► Fact-check (editor) ─► Clinical review (pharmacist) ─► Publish (managing editor)
   1 day          3–5 days            1–2 days                 2–5 days                        same day
```

| Step | Owner | Inputs | Outputs | Quality gate |
|---|---|---|---|---|
| 1. Brief | SEO lead | Plan JSON, Ahrefs/Semrush data, SERP review | GitHub issue with keyword, angle, outline, sources, links, word target | Keyword ownership checked (Part 1 §4) |
| 2. Draft | Writer (or AI-assisted draft by an agent, then human-edited) | Brief, primary sources | MDX in `content/articles` on a branch | CI: frontmatter, components, banned words, spelling, link rules |
| 3. Fact-check | Editor (not the author) | Draft, sources | Tracked comments; "fact-checked" label | Every figure traced; regulatory status dated |
| 4. Clinical review | Registered pharmacist (GPhC) or doctor (GMC) | Fact-checked draft | Approval; `medicalReviewer` set; `reviewStatus: clinically-reviewed` | Safety messaging, red flags, prescriber signposting |
| 5. Publish | Managing editor | Approved PR | Merge, deploy, `publishedAt` | Final read; links resolve; schema validates |
| 6. Distribution | SEO and PR | Published URL | Internal links added from 3+ existing pages; GSC URL inspection; outreach where relevant | Not an orphan |

**AI use.** AI drafting is allowed, but every article is human-edited, fact-checked and clinically reviewed, and the editorial policy discloses that AI tools are used. AI must never invent sources, statistics, quotes or experts.

**Capacity assumptions.** One clinical reviewer at about 10 hours a week can review roughly 12–15 pillars or 25–30 supporting articles a month. Review capacity, not writing, is the bottleneck: plan the calendar around it.

---

## 6. Editorial calendar: first six months

FY27 runs October 2026 to September 2027, so months 1–3 are Q1 FY27 and months 4–6 are Q2 FY27. "Ready" means fact-checked and in clinical review; "Live" means published.

| Month | Pillars | Supporting | Programmatic / data | Trust and other | Theme |
|---|---|---|---|---|---|
| **M1: Oct 2026** | 10: the core medicine pillars (#1–4, #15–18, #97, #98) | 0 | Hubs, class hubs and 16 topic pages for Mounjaro and Wegovy (with mounted pillars as they clear review) | All 11 trust pages; reviewer appointed; methodology | Foundations and E-E-A-T |
| **M2: Nov 2026** | 12: side effects, safety and eligibility (#48, #51, #54, #55, #56, #59, #79–83, #8) | 20: red flags, interactions, Yellow Card, side-effect management | 16 dose pages; first 20 side-effect pages (common and serious) | BMI tool and eligibility checker live | Safety first |
| **M3: Dec 2026** | 12: comparisons and pricing explainers (#26, #31, #36, #39, #41, #43, #44, #46, #47, #22, #27, #28) | 25: festive eating, travel, storage, alcohol, dosing practicalities | 8 medication comparisons; `/prices` service comparison (flag off) once ≥ 8 providers are verified | First provider reviews (aim for 8 verified) | Comparisons and costs |
| **M4: Jan 2027** | 12: diet, exercise and plateau (#64, #65, #70–78) and #68 | 30: diet and exercise long tail (January demand peak) | Remaining side-effect pages that meet thresholds | Digital PR: "spot a fake jab" campaign | New-year intent |
| **M5: Feb 2027** | 12: switching, maintenance and long term (#7, #21, #60–63, #66, #67, #96, #5, #19, #69) | 30: maintenance, switching and results | 12 curated provider comparisons; remaining provider reviews | First quarterly content audit | Long-term success |
| **M6: Mar 2027** | 12: special populations and oral GLP-1s (#29, #30, #32, #34, #87–91, #94, #95, #35) | 30: contraception, fertility, menopause, PCOS, oral medicines | Oral hubs indexable if status is verified | Compliance review of flag readiness (Part 7 gate 1) | Depth and orals |
| **Total by M6** | **70** | **135** | ~**140** indexable programmatic URLs | | |

The remaining 30 pillars and 165 supporting articles follow in months 7–12 (Phase 2 to Phase 3), prioritised by GSC data.

**Seasonal and event hooks:** January (new year), pre-summer (April to June), the festive period (December), Ramadan (dates vary; publish 4 weeks before), NICE or MHRA decisions on oral GLP-1s, and any announced list-price changes.

---

## 7. Refresh cadence

| Content | Scheduled re-review | Triggered re-review (within 5 working days) |
|---|---|---|
| Medication hubs, topic and dose pages | Every 6 months | New SmPC version, MHRA Drug Safety Update, new NICE TA, licence change |
| Side-effect pages and side-effect pillars | Every 6 months | SmPC section 4.8 change, MHRA safety communication |
| Pricing pillars | Every 3 months | List-price change, new market entrant |
| Price data [G] | Weekly verification (7-day SLA for indexed pages) | Provider notifies a change |
| Provider reviews | Every 90 days (data); every 12 months (full editorial) | Regulatory action, ASA ruling, ownership change, service change |
| Comparisons | Every 6 months | New head-to-head trial data |
| Lifestyle pillars and supporting (diet, exercise) | Every 12 months | New guidance (SACN, CMO, BDA) |
| Regulatory and safety guides | Every 6 months | New CAP, MHRA or GPhC guidance; new ASA rulings |
| Trust pages | Every 12 months | Flag change, ownership change, new revenue source |

Each refresh updates `updatedAt` only when the content materially changes, adds a "What changed" note for significant updates and records an `EditorialAudit` row. Cosmetic edits do not change `updatedAt`.

**Quarterly content audit:** pull GSC data per URL; classify as keep, improve, merge or prune; check cannibalisation (two URLs ranking for the same query); and re-score supporting-article priorities.
