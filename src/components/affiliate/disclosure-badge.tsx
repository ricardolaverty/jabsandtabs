import Link from "next/link";
import { Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";

/** Small inline disclosure, used next to rankings, tables and CTAs. */
export function DisclosureBadge() {
  return (
    <Badge variant="outline" asChild>
      <Link href="/affiliate-disclosure" title="How we make money">
        <Info aria-hidden /> How we make money
      </Link>
    </Badge>
  );
}
