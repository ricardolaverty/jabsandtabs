import type { Provider } from "@/types";
import { providerSeeds, providerComparisons } from "./provider-seeds";

/**
 * Provider seed data.
 *
 * IMPORTANT: Every factual field (GPhC number, Trustpilot, fees, delivery,
 * support, maintenance policy, medications stocked, pros/cons) is deliberately
 * null/empty and verified:false. The editorial team must complete these from
 * primary sources (GPhC register, CQC register, provider site, Trustpilot)
 * and set lastVerifiedAt. Never publish invented figures.
 *
 * In production this data lives in Postgres (see prisma/schema.prisma) and is
 * edited via the admin CMS; this file seeds the database and serves as the
 * fallback when DATABASE_URL is not set.
 */

const seeds = providerSeeds;

export { providerComparisons };

export const providers: Provider[] = seeds.map((s) => ({
  gphcNumber: null,
  cqcRegistered: null,
  trustpilot: null,
  medications: ["mounjaro", "wegovy"],
  delivery: null,
  support: null,
  maintenancePolicy: null,
  consultationFee: null,
  pros: [],
  cons: [],
  verified: false,
  lastVerifiedAt: null,
  ...s,
}));

export function getProvider(slug: string) {
  return providers.find((p) => p.slug === slug);
}
