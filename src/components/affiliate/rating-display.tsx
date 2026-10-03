import { Star } from "lucide-react";
import type { Provider } from "@/types";
import { formatDate } from "@/lib/utils";

/** Trustpilot score as checked by our editors, or "Not yet rated". Never estimated. */
export function RatingDisplay({ trustpilot, compact = false }: { trustpilot: Provider["trustpilot"]; compact?: boolean }) {
  if (!trustpilot) {
    return <span className="text-sm text-muted-foreground">Not yet rated</span>;
  }
  return (
    <span className="inline-flex flex-wrap items-center gap-1 text-sm">
      <Star aria-hidden className="size-4 fill-accent-text text-accent-text" />
      <span className="font-semibold">{trustpilot.score.toFixed(1)}</span>
      <span className="text-muted-foreground">/ 5 Trustpilot</span>
      {!compact && (
        <span className="text-xs text-muted-foreground">
          ({trustpilot.reviews.toLocaleString("en-GB")} reviews, checked {formatDate(trustpilot.checkedAt)})
        </span>
      )}
    </span>
  );
}
