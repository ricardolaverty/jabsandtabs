import { ExternalLink, ShieldCheck } from "lucide-react";
import type { Provider } from "@/types";
import { CQC_SEARCH_URL, GPHC_REGISTER_URL, PROVIDER_TYPE_REGULATOR } from "@/lib/labels";
import { NOT_VERIFIED } from "@/lib/utils";

export function RegulatorChecks({ provider: p }: { provider: Provider }) {
  return (
    <div className="rounded-xl border bg-card p-5">
      <p className="flex items-center gap-2 font-semibold">
        <ShieldCheck aria-hidden className="size-5 text-primary" /> Check the registers yourself
      </p>
      <p className="mt-2 text-sm text-muted-foreground">Usual regulators for this type of service: {PROVIDER_TYPE_REGULATOR[p.type]}.</p>
      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-muted-foreground">GPhC registration number</dt>
          <dd className="font-medium">{p.gphcNumber ?? NOT_VERIFIED}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">CQC registered</dt>
          <dd className="font-medium">{p.cqcRegistered === null ? NOT_VERIFIED : p.cqcRegistered ? "Yes" : "No"}</dd>
        </div>
      </dl>
      <ul className="mt-4 space-y-2 text-sm">
        <li>
          <a href={GPHC_REGISTER_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-medium text-primary underline">
            Search the GPhC register of pharmacies <ExternalLink aria-hidden className="size-3" />
          </a>
        </li>
        <li>
          <a href={CQC_SEARCH_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-medium text-primary underline">
            Search the CQC register (England) <ExternalLink aria-hidden className="size-3" />
          </a>
        </li>
      </ul>
      <p className="mt-3 text-xs text-muted-foreground">
        In Scotland, Wales and Northern Ireland, doctor-led services are regulated by Healthcare Improvement Scotland,
        Healthcare Inspectorate Wales and RQIA respectively.
      </p>
    </div>
  );
}
