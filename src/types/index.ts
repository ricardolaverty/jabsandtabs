export type MedicationSlug =
  | "mounjaro"
  | "wegovy"
  | "saxenda"
  | "oral-semaglutide"
  | "foundayo";

export type Route = "injection" | "tablet";

/** "verify" = status not confirmed by the editorial team; UI must say so. */
export type UkStatus = "licensed" | "licensed-diabetes-only" | "not-yet-licensed" | "verify";

export interface Dose {
  /** e.g. 2.5 */
  mg: number;
  /** URL segment e.g. "2-5mg" */
  slug: string;
  role: "starting" | "titration" | "maintenance" | "maximum";
  /** Optional restriction or clarification shown next to the dose. */
  note?: string;
}

export interface Medication {
  slug: MedicationSlug;
  name: string;
  genericName: string;
  drugClass: string;
  manufacturer: string;
  route: Route;
  frequency: "weekly" | "daily";
  device?: string;
  doses: Dose[];
  dosesVerified: boolean;
  ukStatus: UkStatus;
  /** Approval / NICE references. Leave null if unverified. */
  mhraApproval: string | null;
  niceGuidance: string | null;
  summary: string;
  /** Keys into SIDE_EFFECTS */
  commonSideEffects: string[];
  hub: "injections" | "oral";
  /**
   * Minimum weeks on each dose before stepping up, per the UK SmPC.
   * Optional; null/undefined when not verified.
   */
  titrationStepWeeks?: number | null;
  /** How the medicine must be taken (e.g. fasting rules for oral semaglutide). */
  administration?: string | null;
  /** Availability caveat (e.g. branded product discontinued). */
  availabilityNote?: string | null;
  /** Primary sources (gov.uk, SmPC) behind the regulatory fields. */
  sourceUrls?: string[];
}

export interface SideEffect {
  slug: string;
  name: string;
  /** Applies only to injectables, e.g. injection-site reactions */
  injectableOnly?: boolean;
  seriousness: "common" | "less-common" | "serious";
}

export interface Provider {
  slug: string;
  name: string;
  type: "online-pharmacy" | "online-doctor" | "high-street-pharmacy" | "telehealth-programme";
  website: string;
  /** Regulator registration numbers. Null = not yet verified by editorial. */
  gphcNumber: string | null;
  cqcRegistered: boolean | null;
  trustpilot: { score: number; reviews: number; checkedAt: string } | null;
  medications: MedicationSlug[];
  delivery: string | null;
  support: string[] | null;
  maintenancePolicy: string | null;
  consultationFee: number | null;
  pros: string[];
  cons: string[];
  /** All facts above must be re-verified before publication. */
  verified: boolean;
  lastVerifiedAt: string | null;
}

export interface PricePoint {
  providerSlug: string;
  medication: MedicationSlug;
  doseSlug: string;
  /** GBP, monthly supply (4 weeks) */
  retailPrice: number | null;
  discountPrice: number | null;
  deliveryCharge: number | null;
  consultationFee: number | null;
  checkedAt: string | null;
  sourceUrl: string | null;
}

export type ReviewStatus = "draft" | "pending-clinical-review" | "clinically-reviewed";

export interface ArticleFrontmatter {
  title: string;
  slug: string;
  description: string;
  cluster: ContentCluster;
  hub: "mounjaro" | "wegovy" | "oral-glp1" | "injections" | "general";
  primaryKeyword: string;
  secondaryKeywords: string[];
  author: string;
  medicalReviewer: string | null;
  reviewStatus: ReviewStatus;
  publishedAt: string | null;
  updatedAt: string;
  readingMinutes: number;
  faqs: { q: string; a: string }[];
  sources: { title: string; publisher: string; year: number; url?: string }[];
  related: string[];
  /**
   * Optional. When set (e.g. "/mounjaro-side-effects"), the article is mounted
   * as the long-form body of that programmatic URL, /guides/{slug} 301s to it,
   * and only the canonical URL is listed in the sitemap.
   */
  canonicalPath?: string;
}

export type ContentCluster =
  | "medications"
  | "pricing"
  | "side-effects"
  | "dosing"
  | "eligibility"
  | "comparisons"
  | "results"
  | "maintenance"
  | "switching"
  | "exercise"
  | "diet"
  | "plateau"
  | "long-term"
  | "providers"
  | "safety"
  | "special-populations"
  | "faqs";
