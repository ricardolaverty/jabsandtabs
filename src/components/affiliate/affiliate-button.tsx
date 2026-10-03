import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import type { Provider } from "@/types";
import { Button } from "@/components/ui/button";
import { getProviderCta } from "@/lib/affiliate";
import { cn } from "@/lib/utils";

interface AffiliateButtonProps {
  provider: Pick<Provider, "slug" | "name">;
  /** Path of the page the click came from (logged anonymously when affiliate links are on). */
  fromPath?: string;
  label?: string;
  size?: "sm" | "default" | "lg";
  className?: string;
}

/**
 * Flag-aware provider CTA.
 * flags.affiliateLinks ON  → /go/{slug}, rel="sponsored nofollow", new tab.
 * flags.affiliateLinks OFF → internal link to our /providers/{slug} review.
 */
export function AffiliateButton({ provider, fromPath, label, size = "default", className }: AffiliateButtonProps) {
  const cta = getProviderCta(provider, fromPath);
  if (cta.external) {
    return (
      <Button asChild variant="cta" size={size} className={cn(className)}>
        <a href={cta.href} rel={cta.rel} target="_blank">
          {label ?? cta.label}
          <ExternalLink aria-hidden />
          <span className="sr-only">(opens in a new tab, affiliate link)</span>
        </a>
      </Button>
    );
  }
  return (
    <Button asChild variant="default" size={size} className={cn(className)}>
      <Link href={cta.href}>
        {label ?? cta.label}
        <ArrowRight aria-hidden />
      </Link>
    </Button>
  );
}
