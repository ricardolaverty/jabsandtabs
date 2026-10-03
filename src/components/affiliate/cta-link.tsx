import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Serializable CTA (computed server-side by getProviderCta) for use in client components. */
export interface CtaData {
  href: string;
  external: boolean;
  rel?: string;
  label: string;
}

export function CtaLink({ cta, size = "sm", className }: { cta: CtaData; size?: "sm" | "default" | "lg"; className?: string }) {
  if (cta.external) {
    return (
      <Button asChild variant="cta" size={size} className={className}>
        <a href={cta.href} rel={cta.rel} target="_blank">
          {cta.label}
          <ExternalLink aria-hidden />
          <span className="sr-only">(opens in a new tab, affiliate link)</span>
        </a>
      </Button>
    );
  }
  return (
    <Button asChild size={size} className={className}>
      <Link href={cta.href}>
        {cta.label}
        <ArrowRight aria-hidden />
      </Link>
    </Button>
  );
}
