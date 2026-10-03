import { AlertTriangle } from "lucide-react";
import * as React from "react";

/** Prominent banner shown when facts on a page have not yet been verified. */
export function VerificationNotice({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div role="status" className="my-6 flex gap-3 rounded-lg border border-warning-foreground/25 bg-warning p-4 text-warning-foreground">
      <AlertTriangle aria-hidden className="mt-0.5 size-5 shrink-0" />
      <div className="text-sm leading-relaxed [&_a]:font-semibold [&_a]:underline">
        <p className="font-semibold">{title}</p>
        <div className="mt-1">{children}</div>
      </div>
    </div>
  );
}

export function MedicationVerificationNotice({ name }: { name: string }) {
  return (
    <VerificationNotice title={`UK status of ${name} is being verified`}>
      Our editorial team has not yet confirmed the UK licensing status and dose schedule for {name}. Details may change
      or may not apply in the UK. Check the current{" "}
      <a href="https://www.medicines.org.uk/emc" target="_blank" rel="noopener noreferrer">
        Summary of Product Characteristics (SmPC)
      </a>{" "}
      and the{" "}
      <a href="https://www.gov.uk/government/organisations/medicines-and-healthcare-products-regulatory-agency" target="_blank" rel="noopener noreferrer">
        MHRA
      </a>
      , and speak to a prescriber.
    </VerificationNotice>
  );
}

export function ProviderVerificationNotice({ name }: { name: string }) {
  return (
    <VerificationNotice title="Information being verified">
      We have not yet verified the details on this page against primary sources (the GPhC and CQC registers and{" "}
      {name}&apos;s own website). Fields marked &ldquo;Not yet verified&rdquo; are deliberately left blank rather than
      estimated. Check the provider&apos;s registration yourself before using any service.
    </VerificationNotice>
  );
}
