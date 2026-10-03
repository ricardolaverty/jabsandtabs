import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { JsonLd } from "@/components/seo/json-ld";
import { ProviderDirectory, type DirectoryProvider } from "@/components/provider/provider-directory";
import { DisclosureBadge } from "@/components/affiliate/disclosure-badge";
import { TrustSignals } from "@/components/affiliate/trust-signals";
import { Callout } from "@/components/content/callout";
import { getMedications, getProviders } from "@/lib/repo";
import { getProviderCta } from "@/lib/affiliate";
import { buildMetadata } from "@/lib/seo";
import { providerItemListSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "UK weight loss providers directory: compare regulated services",
  description: "Compare regulated UK online pharmacies and doctor services that prescribe weight loss medicines, with regulator checks and independent methodology.",
  path: "/providers",
});

export default async function ProvidersPage() {
  const [providers, meds] = await Promise.all([getProviders(), getMedications()]);
  const medName = (s: string) => meds.find((m) => m.slug === s)?.name ?? s;
  const rows: DirectoryProvider[] = providers.map((p) => ({
    slug: p.slug,
    name: p.name,
    type: p.type,
    medications: p.medications.map((m) => ({ slug: m, name: medName(m) })),
    verified: p.verified,
    trustpilot: p.trustpilot,
    gphcNumber: p.gphcNumber,
    cta: getProviderCta(p, "/providers"),
  }));
  const verifiedCount = providers.filter((p) => p.verified).length;

  return (
    <>
      <JsonLd data={providerItemListSchema(providers, "/providers", "UK weight loss providers")} />
      <PageHeader
        title="UK weight loss providers"
        lead="Regulated online pharmacies, online doctors and telehealth programmes that prescribe weight loss medicines in the UK. Listed alphabetically: no provider can pay for a better position."
        crumbs={[{ name: "Providers", href: "/providers" }]}
      >
        <div className="flex flex-wrap gap-2">
          <DisclosureBadge />
        </div>
      </PageHeader>
      <Container className="py-6">
        {verifiedCount === 0 && (
          <Callout type="warning" title="Verification in progress">
            Our editorial team is verifying every provider against the GPhC and CQC registers and their own published
            information. Until that is complete, fields show &ldquo;Not yet verified&rdquo; and providers are not scored. See{" "}
            <Link href="/methodology">how we compare providers</Link>.
          </Callout>
        )}
        <ProviderDirectory providers={rows} medications={meds.map((m) => ({ slug: m.slug, name: m.name }))} />
        <Section title="Comparing providers side by side">
          <p className="max-w-3xl text-muted-foreground">
            Use our <Link href="/compare" className="font-medium text-primary underline">provider comparisons</Link> or the{" "}
            <Link href="/prices" className="font-medium text-primary underline">service comparison table</Link> to see
            providers next to each other.
          </p>
        </Section>
        <TrustSignals />
      </Container>
    </>
  );
}
