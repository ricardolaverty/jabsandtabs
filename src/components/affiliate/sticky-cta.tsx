import { flags } from "@/config/flags";
import { StickyCtaBar } from "@/components/affiliate/sticky-cta-bar";

/** Sticky mobile CTA (flags.stickyCta). Links to our own comparison, not out to a provider. */
export function StickyCta({ href = "/providers", label = "Compare providers", text }: { href?: string; label?: string; text?: string }) {
  if (!flags.stickyCta) return null;
  return <StickyCtaBar href={href} label={label} text={text ?? "Compare regulated UK providers side by side"} />;
}
