import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { JsonLd } from "@/components/seo/json-ld";
import { ComparisonTable } from "@/components/affiliate/comparison-table";
import { DisclosureBadge } from "@/components/affiliate/disclosure-badge";
import { ProviderVerificationNotice } from "@/components/content/verification-notice";
import { Callout } from "@/components/content/callout";
import { FaqSection } from "@/components/content/faq-section";
import { MedicalDisclaimer } from "@/components/content/medical-disclaimer";
import { getComparePairs, resolveComparePair } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";
import { providerItemListSchema } from "@/lib/schema";
import { flags } from "@/config/flags";

export const dynamicParams = false;

type Props = { params: Promise<{ pair: string }> };

export async function generateStaticParams() {
  return (await getComparePairs()).map((p) => ({ pair: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pair } = await params;
  const c = await resolveComparePair(pair);
  if (!c) return {};
  return buildMetadata({
    title: `${c.a.name} vs ${c.b.name}: weight loss services compared`,
    description: `${c.a.name} and ${c.b.name} compared side by side: regulation, consultation, clinical support, delivery and maintenance policy.`,
    path: `/compare/${c.slug}`,
    index: c.a.verified && c.b.verified,
  });
}

export default async function ComparePairPage({ params }: Props) {
  const { pair } = await params;
  const c = await resolveComparePair(pair);
  if (!c) notFound();
  const path = `/compare/${c.slug}`;
  const both = [c.a, c.b];
  const faqs = [
    {
      q: `Are ${c.a.name} and ${c.b.name} regulated?`,
      a: `UK online pharmacies must be registered with the General Pharmaceutical Council (GPhC), and doctor-led services in England with the Care Quality Commission (CQC). We link to both registers on each provider's review page so you can check the current registration yourself before using any service.`,
    },
    {
      q: `Which is cheaper, ${c.a.name} or ${c.b.name}?`,
      a: flags.pomPricing
        ? `Prices change frequently and depend on dose, delivery and consultation fees. See our price comparison for recorded prices with the date each was checked, and confirm the current price with the provider.`
        : `We do not publish medicine prices because weight loss medicines are prescription-only and UK rules restrict promoting them. Compare total costs directly with each provider, including consultation fees, delivery and subscription terms.`,
    },
  ];
  return (
    <>
      <JsonLd data={providerItemListSchema(both, path, `${c.a.name} vs ${c.b.name}`)} />
      <PageHeader
        title={`${c.a.name} vs ${c.b.name}`}
        lead="A side-by-side comparison of service facts. Fields our editors have not yet verified are marked, never estimated."
        crumbs={[
          { name: "Compare", href: "/compare" },
          { name: `${c.a.name} vs ${c.b.name}`, href: path },
        ]}
      >
        <DisclosureBadge />
      </PageHeader>
      <Container className="py-6">
        {both.some((p) => !p.verified) && (
          <ProviderVerificationNotice name={both.filter((p) => !p.verified).map((p) => p.name).join(" and ")} />
        )}
        <Section title="Side-by-side comparison">
          <ComparisonTable providers={both} fromPath={path} showConsultationFee={flags.pomPricing} />
        </Section>
        <Callout type="info" title="How we compare">
          We assess every provider with the same <Link href="/methodology">published methodology</Link>. Commercial
          relationships are never inputs to our assessments.
        </Callout>
        <Section title="Full reviews">
          <ul className="flex flex-wrap gap-3">
            {both.map((p) => (
              <li key={p.slug}>
                <Link href={`/providers/${p.slug}`} className="inline-flex rounded-md border px-4 py-2 font-medium hover:bg-muted">
                  {p.name} review
                </Link>
              </li>
            ))}
          </ul>
        </Section>
        <FaqSection faqs={faqs} />
        <MedicalDisclaimer />
      </Container>
    </>
  );
}
