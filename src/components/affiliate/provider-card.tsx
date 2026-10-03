import Link from "next/link";
import { BadgeCheck, CircleDashed } from "lucide-react";
import type { Provider } from "@/types";
import { Badge } from "@/components/ui/badge";
import { AffiliateButton } from "@/components/affiliate/affiliate-button";
import { RatingDisplay } from "@/components/affiliate/rating-display";
import { PROVIDER_TYPE_LABELS } from "@/lib/labels";
import { getMedication } from "@/data/medications";

export function ProviderCard({ provider, fromPath }: { provider: Provider; fromPath?: string }) {
  return (
    <article className="flex h-full flex-col rounded-xl border bg-card p-5 shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="secondary">{PROVIDER_TYPE_LABELS[provider.type]}</Badge>
        {provider.verified ? (
          <Badge variant="success">
            <BadgeCheck aria-hidden /> Verified
          </Badge>
        ) : (
          <Badge variant="outline">
            <CircleDashed aria-hidden /> Being verified
          </Badge>
        )}
      </div>
      <h3 className="mt-3 text-lg font-semibold">
        <Link href={`/providers/${provider.slug}`} className="hover:underline">
          {provider.name}
        </Link>
      </h3>
      <div className="mt-2">
        <RatingDisplay trustpilot={provider.trustpilot} compact />
      </div>
      <p className="mt-3 flex-1 text-sm text-muted-foreground">
        {provider.medications.length
          ? `Listed medicines: ${provider.medications.map((m) => getMedication(m)?.name ?? m).join(", ")} (to be verified).`
          : "Medicines offered: not yet verified."}
      </p>
      <div className="mt-4">
        <AffiliateButton provider={provider} fromPath={fromPath} size="sm" className="w-full" />
      </div>
    </article>
  );
}
