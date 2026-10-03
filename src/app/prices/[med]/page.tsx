import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { PriceComparison } from "@/components/comparison/price-comparison";
import { PricingNotice } from "@/components/comparison/pricing-notice";
import { DisclosureBadge } from "@/components/affiliate/disclosure-badge";
import { MedicationVerificationNotice } from "@/components/content/verification-notice";
import { LinkGrid } from "@/components/content/link-grid";
import { MedicalDisclaimer } from "@/components/content/medical-disclaimer";
import { getMedication, getMedications } from "@/lib/repo";
import { buildPriceRows, buildServiceRows, medicationOptions } from "@/lib/comparison-data";
import { hrefForTopic, isMedicationUnverified } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";
import { flags } from "@/config/flags";

export const dynamicParams = false;

type Props = { params: Promise<{ med: string }> };

export async function generateStaticParams() {
  return (await getMedications()).map((m) => ({ med: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { med } = await params;
  const m = await getMedication(med);
  if (!m) return {};
  return buildMetadata({
    title: flags.pomPricing ? `${m.name} prices compared: UK providers` : `${m.name} providers compared: services and support`,
    description: flags.pomPricing
      ? `Recorded ${m.name} prices from regulated UK providers by dose, with the date checked, delivery and consultation fees.`
      : `Compare UK providers that list ${m.name} on regulation, consultation model, clinical support, delivery and maintenance policy.`,
    path: `/prices/${m.slug}`,
    index: !isMedicationUnverified(m),
  });
}

export default async function MedicationPricesPage({ params }: Props) {
  const { med } = await params;
  const m = await getMedication(med);
  if (!m) notFound();
  const options = medicationOptions(await getMedications());
  const path = `/prices/${m.slug}`;
  return (
    <>
      <PageHeader
        title={flags.pomPricing ? `${m.name} prices compared` : `${m.name}: compare providers`}
        lead={flags.pomPricing ? `Recorded prices for ${m.name} by provider and dose.` : `UK providers that list ${m.name}, compared on service.`}
        crumbs={[
          { name: flags.pomPricing ? "Prices" : "Service comparison", href: "/prices" },
          { name: m.name, href: path },
        ]}
      >
        <DisclosureBadge />
      </PageHeader>
      <Container className="py-6">
        {isMedicationUnverified(m) && <MedicationVerificationNotice name={m.name} />}
        {!flags.pomPricing && <PricingNotice />}
        {flags.pomPricing ? (
          <PriceComparison mode="prices" rows={await buildPriceRows(path, m.slug)} medications={options} initialMedication={m.slug} />
        ) : (
          <PriceComparison mode="service" rows={await buildServiceRows(path, m.slug)} medications={options} initialMedication={m.slug} />
        )}
        <Section title={`More about ${m.name}`}>
          <LinkGrid
            links={[
              { href: hrefForTopic(m.slug, "prices"), label: `What affects the cost of ${m.name}` },
              { href: `/${m.slug}`, label: `${m.name} guide` },
              { href: hrefForTopic(m.slug, "dosage"), label: `${m.name} dosage` },
            ]}
            columns={3}
          />
          <p className="mt-4 text-sm text-muted-foreground">
            See also our <Link href="/providers" className="font-medium text-primary underline">full provider directory</Link>.
          </p>
        </Section>
        <MedicalDisclaimer />
      </Container>
    </>
  );
}
