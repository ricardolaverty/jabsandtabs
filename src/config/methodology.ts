/**
 * Provider scoring methodology (published at /methodology).
 *
 * Weights total 100. Price is only scored when flags.pomPricing is on; when it
 * is off its weight is redistributed proportionally across the other criteria.
 * No commercial relationship (such as affiliate terms) is an input to any score.
 */
export interface Criterion {
  key: "regulation" | "transparency" | "clinical" | "delivery" | "price" | "reviews";
  label: string;
  weight: number;
  description: string;
  evidence: string[];
}

export const criteria: Criterion[] = [
  {
    key: "regulation",
    label: "Regulation and safety",
    weight: 30,
    description:
      "Is the pharmacy registered with the GPhC and, where doctors prescribe, the service registered with the CQC (or the equivalent regulator in Scotland, Wales or Northern Ireland)? Are there any published enforcement actions or inspection concerns?",
    evidence: ["GPhC register entry", "CQC register and inspection reports", "Published enforcement notices"],
  },
  {
    key: "transparency",
    label: "Transparency",
    weight: 20,
    description:
      "Are prescriber details, full costs, subscription terms, cancellation and maintenance policies clearly published before you start a consultation?",
    evidence: ["Provider website terms and FAQs", "Mystery-shop of the consultation journey"],
  },
  {
    key: "clinical",
    label: "Clinical process and support",
    weight: 20,
    description:
      "How robust is the consultation (identity and weight verification, medical history, GP communication)? What ongoing clinical support is available, and how quickly?",
    evidence: ["Consultation walkthrough", "Published clinical governance information", "Support channel testing"],
  },
  {
    key: "delivery",
    label: "Delivery and dispensing",
    weight: 10,
    description: "Cold-chain packaging for injectables, delivery options, tracking and discreet packaging.",
    evidence: ["Provider delivery policy", "Test orders where possible"],
  },
  {
    key: "price",
    label: "Price",
    weight: 10,
    description:
      "Total cost of treatment including consultation and delivery fees, recorded with a date and source. Only scored when price comparison is enabled.",
    evidence: ["Price observations with source URL and date"],
  },
  {
    key: "reviews",
    label: "Customer reviews",
    weight: 10,
    description:
      "Independent customer review scores (such as Trustpilot), recorded with the date checked and number of reviews. Volume and recency are considered, not just the average.",
    evidence: ["Trustpilot profile (date checked)"],
  },
];

/** Effective weights given whether price is being scored. */
export function effectiveWeights(priceEnabled: boolean): (Criterion & { effectiveWeight: number })[] {
  if (priceEnabled) return criteria.map((c) => ({ ...c, effectiveWeight: c.weight }));
  const priceWeight = criteria.find((c) => c.key === "price")?.weight ?? 0;
  const rest = criteria.filter((c) => c.key !== "price");
  const restTotal = rest.reduce((s, c) => s + c.weight, 0);
  return criteria.map((c) => ({
    ...c,
    effectiveWeight: c.key === "price" ? 0 : Math.round((c.weight + (c.weight / restTotal) * priceWeight) * 10) / 10,
  }));
}
