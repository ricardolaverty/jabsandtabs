import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { TitrationTimeline } from "@/components/medication/titration-timeline";
import { ProviderVerificationNotice } from "@/components/content/verification-notice";
import { MedicalDisclaimer } from "@/components/content/medical-disclaimer";
import { ProviderPrices } from "@/components/provider/provider-prices";
import { AffiliateButton } from "@/components/affiliate/affiliate-button";
import { getMedications, getProvider, getMedication } from "@/lib/repo";
import { getProviderDoseParams } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";
import { flags } from "@/config/flags";
import { formatMg } from "@/lib/utils";

/** GATED: flags.pomPricing. With the flag off no params are generated and every request 404s. */
export const dynamicParams = false;

type Props = { params: Promise<{ slug: string; med: string; dose: string }> };

export async function generateStaticParams() {
  return getProviderDoseParams();
}

async function load(slug: string, med: string, dose: string) {
  if (!flags.pomPricing) return null;
  const [p, m] = await Promise.all([getProvider(slug), getMedication(med)]);
  const d = m?.doses.find((x) => x.slug === dose);
  if (!p || !m || !d || !m.dosesVerified || !p.medications.includes(m.slug)) return null;
  return { p, m, d };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, med, dose } = await params;
  const data = await load(slug, med, dose);
  if (!data) return {};
  const { p, m, d } = data;
  return buildMetadata({
    title: `${m.name} ${formatMg(d.mg)} at ${p.name}`,
    description: `${m.name} ${formatMg(d.mg)} from ${p.name}: recorded price with date checked, delivery and service details.`,
    path: `/providers/${p.slug}/${m.slug}/${d.slug}`,
    index: p.verified,
  });
}

export default async function ProviderDosePage({ params }: Props) {
  const { slug, med, dose } = await params;
  const data = await load(slug, med, dose);
  if (!data) notFound();
  const { p, m, d } = data;
  const meds = await getMedications();
  const path = `/providers/${p.slug}/${m.slug}/${d.slug}`;
  return (
    <>
      <PageHeader
        title={`${m.name} ${formatMg(d.mg)} at ${p.name}`}
        crumbs={[
          { name: "Providers", href: "/providers" },
          { name: p.name, href: `/providers/${p.slug}` },
          { name: m.name, href: `/providers/${p.slug}/${m.slug}` },
          { name: formatMg(d.mg), href: path },
        ]}
      />
      <Container className="py-6">
        {!p.verified && <ProviderVerificationNotice name={p.name} />}
        <Section title="Recorded price">
          <ProviderPrices provider={p} medications={meds} medication={m.slug} />
        </Section>
        <Section title="Where this dose fits">
          <TitrationTimeline medication={m} current={d.slug} />
        </Section>
        <AffiliateButton provider={p} fromPath={path} />
        <MedicalDisclaimer />
      </Container>
    </>
  );
}
