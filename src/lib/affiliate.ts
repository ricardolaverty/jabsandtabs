import "server-only";
import type { Provider } from "@/types";
import { flags } from "@/config/flags";

export interface ProviderCta {
  href: string;
  external: boolean;
  rel?: string;
  label: string;
  /** True when this is a tracked commercial link that needs a disclosure. */
  sponsored: boolean;
}

/**
 * Resolves where a provider CTA should point. Computed on the server so
 * client components (which cannot read FLAG_* env vars) get a plain value.
 *
 * - flags.affiliateLinks ON:  /go/{slug} (logs an anonymous click, 302s out)
 * - flags.affiliateLinks OFF: our own review page /providers/{slug}
 */
export function getProviderCta(provider: Pick<Provider, "slug" | "name">, fromPath?: string): ProviderCta {
  if (flags.affiliateLinks) {
    const qs = fromPath ? `?from=${encodeURIComponent(fromPath)}` : "";
    return {
      href: `/go/${provider.slug}${qs}`,
      external: true,
      rel: "sponsored nofollow noopener",
      label: `Visit ${provider.name}`,
      sponsored: true,
    };
  }
  return { href: `/providers/${provider.slug}`, external: false, label: `Read our ${provider.name} review`, sponsored: false };
}
