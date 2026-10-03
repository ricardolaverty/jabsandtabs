import type { PricePoint } from "@/types";

/**
 * Static price fallback (used when DATABASE_URL is not set).
 *
 * Intentionally empty. Prices must be captured from the provider's own site
 * with a sourceUrl and checkedAt date, entered via the admin CMS, and are only
 * ever displayed when flags.pomPricing is on. Never add estimated figures here.
 */
export const prices: PricePoint[] = [];
