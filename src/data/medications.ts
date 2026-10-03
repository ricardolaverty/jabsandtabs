import type { Medication, SideEffect } from "@/types";

/**
 * Medication reference data.
 * Anything marked dosesVerified:false or ukStatus:"verify" must be checked
 * against the current SmPC (medicines.org.uk) and MHRA before publication.
 */
export const medications: Medication[] = [
  {
    slug: "mounjaro",
    name: "Mounjaro",
    genericName: "tirzepatide",
    drugClass: "GIP/GLP-1 receptor agonist",
    manufacturer: "Eli Lilly",
    route: "injection",
    frequency: "weekly",
    device: "KwikPen (multi-dose pre-filled pen)",
    doses: [
      { mg: 2.5, slug: "2-5mg", role: "starting" },
      { mg: 5, slug: "5mg", role: "titration" },
      { mg: 7.5, slug: "7-5mg", role: "titration" },
      { mg: 10, slug: "10mg", role: "maintenance" },
      { mg: 12.5, slug: "12-5mg", role: "maintenance" },
      { mg: 15, slug: "15mg", role: "maximum" },
    ],
    dosesVerified: true,
    ukStatus: "licensed",
    mhraApproval: "MHRA authorised for weight management, November 2023",
    niceGuidance: "NICE TA1026 (December 2024)",
    summary:
      "A once-weekly injection that acts on both GIP and GLP-1 receptors. Licensed in the UK for weight management alongside diet and physical activity.",
    commonSideEffects: ["nausea", "diarrhoea", "constipation", "vomiting", "indigestion", "injection-site-reactions"],
    hub: "injections",
    // SmPC: at least 4 weeks on each dose before increasing by 2.5mg.
    titrationStepWeeks: 4,
  },
  {
    slug: "wegovy",
    name: "Wegovy",
    genericName: "semaglutide",
    drugClass: "GLP-1 receptor agonist",
    manufacturer: "Novo Nordisk",
    route: "injection",
    frequency: "weekly",
    device: "FlexTouch pen",
    doses: [
      { mg: 0.25, slug: "0-25mg", role: "starting" },
      { mg: 0.5, slug: "0-5mg", role: "titration" },
      { mg: 1, slug: "1mg", role: "titration" },
      { mg: 1.7, slug: "1-7mg", role: "titration" },
      { mg: 2.4, slug: "2-4mg", role: "maintenance" },
      {
        mg: 7.2,
        slug: "7-2mg",
        role: "maximum",
        note: "Authorised by the MHRA in January 2026 for adults with obesity (BMI of 30 or more) only. Not covered by NICE TA875.",
      },
    ],
    dosesVerified: true,
    ukStatus: "licensed",
    mhraApproval: "MHRA authorised for weight management, September 2021",
    niceGuidance: "NICE TA875 (March 2023)",
    summary:
      "A once-weekly semaglutide injection licensed in the UK for weight management and, in some patients, to reduce cardiovascular risk.",
    commonSideEffects: ["nausea", "diarrhoea", "constipation", "vomiting", "indigestion", "injection-site-reactions"],
    hub: "injections",
    // SmPC: 4-weekly dose escalation to 2.4mg maintenance.
    titrationStepWeeks: 4,
    sourceUrls: [
      "https://www.gov.uk/government/news/medicines-regulator-approves-up-to-72mg-dose-of-semaglutidewegovy-for-patients-with-obesity-only",
    ],
  },
  {
    slug: "saxenda",
    name: "Liraglutide (Saxenda / generic)",
    genericName: "liraglutide",
    drugClass: "GLP-1 receptor agonist",
    manufacturer: "Novo Nordisk (Saxenda); generic liraglutide from other manufacturers",
    route: "injection",
    frequency: "daily",
    device: "Pre-filled pen",
    doses: [
      { mg: 0.6, slug: "0-6mg", role: "starting" },
      { mg: 1.2, slug: "1-2mg", role: "titration" },
      { mg: 1.8, slug: "1-8mg", role: "titration" },
      { mg: 2.4, slug: "2-4mg", role: "titration" },
      { mg: 3, slug: "3mg", role: "maintenance" },
    ],
    dosesVerified: true,
    ukStatus: "licensed",
    mhraApproval: null,
    niceGuidance: "NICE TA664 (December 2020)",
    summary:
      "An older, once-daily GLP-1 injection for weight management. Branded Saxenda has reportedly been discontinued in the UK, with generic liraglutide available; check current branded availability with your pharmacist or prescriber.",
    availabilityNote:
      "Branded Saxenda has reportedly been discontinued in the UK. Generic liraglutide is available. Check current availability before relying on the brand name.",
    commonSideEffects: ["nausea", "diarrhoea", "constipation", "vomiting", "headache", "injection-site-reactions"],
    hub: "injections",
    // SmPC: increase by 0.6mg at intervals of at least one week.
    titrationStepWeeks: 1,
  },
  {
    slug: "oral-semaglutide",
    name: "Wegovy tablets (oral semaglutide)",
    genericName: "semaglutide (oral)",
    drugClass: "GLP-1 receptor agonist",
    manufacturer: "Novo Nordisk",
    route: "tablet",
    frequency: "daily",
    doses: [
      { mg: 1.5, slug: "1-5mg", role: "starting" },
      { mg: 4, slug: "4mg", role: "titration" },
      { mg: 9, slug: "9mg", role: "titration" },
      { mg: 25, slug: "25mg", role: "maintenance" },
    ],
    dosesVerified: true,
    ukStatus: "licensed",
    mhraApproval: "MHRA authorised for weight management, 11 June 2026",
    // NICE appraisal pending; not available on the NHS for weight management at the time of writing.
    niceGuidance: null,
    summary:
      "A once-daily semaglutide tablet, the first GLP-1 tablet authorised for weight management in the UK. It must be swallowed whole on an empty stomach. Rybelsus (also oral semaglutide) is licensed for type 2 diabetes only.",
    administration:
      "Swallow the tablet whole on an empty stomach, after at least 8 hours without food, with a sip of water. Then wait at least 30 minutes before eating, drinking or taking other oral medicines.",
    commonSideEffects: ["nausea", "diarrhoea", "constipation", "vomiting", "indigestion"],
    hub: "oral",
    // Minimum one month on each dose before increasing.
    titrationStepWeeks: 4,
    sourceUrls: ["https://www.gov.uk/government/news/first-glp-1-tablet-for-weight-loss-approved-in-the-uk"],
  },
  {
    slug: "foundayo",
    name: "Foundayo",
    genericName: "orforglipron",
    drugClass: "Non-peptide (small-molecule) GLP-1 receptor agonist",
    manufacturer: "Eli Lilly",
    route: "tablet",
    frequency: "daily",
    doses: [
      { mg: 0.8, slug: "0-8mg", role: "starting" },
      { mg: 2.5, slug: "2-5mg", role: "titration" },
      { mg: 5.5, slug: "5-5mg", role: "titration" },
      { mg: 9, slug: "9mg", role: "maintenance" },
      { mg: 14.5, slug: "14-5mg", role: "maintenance" },
      { mg: 17.2, slug: "17-2mg", role: "maximum" },
    ],
    dosesVerified: true,
    ukStatus: "licensed",
    mhraApproval: "MHRA authorised for weight management and type 2 diabetes, 10 August 2026",
    niceGuidance: null,
    summary:
      "A once-daily small-molecule GLP-1 tablet authorised in the UK for weight management and type 2 diabetes. Unlike oral semaglutide, it is not a peptide and can be taken at any time of day without food or water restrictions.",
    administration: "Take once a day at any time of day, with or without food. There are no food or water restrictions.",
    commonSideEffects: ["nausea", "diarrhoea", "constipation", "vomiting", "indigestion"],
    hub: "oral",
    titrationStepWeeks: 4,
    sourceUrls: [
      "https://www.gov.uk/government/news/uk-first-in-europe-to-authorise-orforglipron-for-weight-management-and-type-2-diabetes",
    ],
  },
];

export const sideEffects: SideEffect[] = [
  { slug: "nausea", name: "Nausea", seriousness: "common" },
  { slug: "vomiting", name: "Vomiting", seriousness: "common" },
  { slug: "diarrhoea", name: "Diarrhoea", seriousness: "common" },
  { slug: "constipation", name: "Constipation", seriousness: "common" },
  { slug: "indigestion", name: "Indigestion and reflux", seriousness: "common" },
  { slug: "burping", name: "Burping", seriousness: "common" },
  { slug: "fatigue", name: "Tiredness", seriousness: "common" },
  { slug: "headache", name: "Headache", seriousness: "common" },
  { slug: "dizziness", name: "Dizziness", seriousness: "less-common" },
  { slug: "hair-loss", name: "Hair loss", seriousness: "less-common" },
  { slug: "injection-site-reactions", name: "Injection site reactions", injectableOnly: true, seriousness: "common" },
  { slug: "gallbladder-problems", name: "Gallbladder problems", seriousness: "serious" },
  { slug: "pancreatitis", name: "Pancreatitis", seriousness: "serious" },
  { slug: "low-blood-sugar", name: "Low blood sugar", seriousness: "less-common" },
];

export const medicationComparisons: [string, string][] = [
  ["mounjaro", "wegovy"],
  ["mounjaro", "saxenda"],
  ["wegovy", "saxenda"],
  ["mounjaro", "oral-semaglutide"],
  ["mounjaro", "foundayo"],
  ["wegovy", "oral-semaglutide"],
  ["wegovy", "foundayo"],
  ["oral-semaglutide", "foundayo"],
];

export function getMedication(slug: string) {
  return medications.find((m) => m.slug === slug);
}
