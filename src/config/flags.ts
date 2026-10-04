/**
 * Compliance feature flags.
 *
 * Mounjaro, Wegovy and oral GLP-1s are prescription-only medicines (POMs).
 * Advertising POMs to the public is prohibited in the UK (Human Medicines
 * Regulations 2012 reg. 284; CAP Code rule 12.12). Because this site earns
 * affiliate commission, the ASA is likely to treat commercial modules as
 * advertising rather than editorial.
 *
 * Every flag below defaults to OFF. Do not switch one on without written
 * sign-off from a UK regulatory/legal adviser, and record the sign-off in
 * docs/compliance/SIGN-OFF.md.
 *
 * When a flag is off, components render a compliant alternative (editorial
 * service comparison, links to our own review pages) and the gated routes
 * are excluded from generateStaticParams, the sitemap and internal links.
 */

function flag(name: string): boolean {
  return process.env[name] === "true";
}

export const flags = {
  /** Drug-name price tables, "cheapest X today" modules, provider+dose price pages. */
  pomPricing: flag("FLAG_POM_PRICING"),
  /** Outbound affiliate links / tracked "Visit provider" buttons. */
  affiliateLinks: flag("FLAG_AFFILIATE_LINKS"),
  /** /providers/[slug]/discount-codes pages and discount modules. */
  discountCodes: flag("FLAG_DISCOUNT_CODES"),
  /** Sticky mobile CTA bar on commercial pages. */
  stickyCta: flag("FLAG_STICKY_CTA"),
  /**
   * Show AND index articles whose reviewStatus is not "clinically-reviewed".
   * Enabled on jabsandtabs.com for the SEO experiment; the "Pending clinical
   * review" badge and disclaimers remain visible on every such article.
   */
  showUnreviewedContent: flag("FLAG_SHOW_UNREVIEWED_CONTENT"),
} as const;

export type FlagName = keyof typeof flags;
