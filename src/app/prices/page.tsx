import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { PriceComparison } from "@/components/comparison/price-comparison";
import { PricingNotice } from "@/components/comparison/pricing-notice";
import { DisclosureBadge } from "@/components/affiliate/disclosure-badge";
import { LinkGrid } from "@/components/content/link-grid";
import { MedicalDisclaimer } from "@/components/content/medical-disclaimer";
import { getMedications } from "@/lib/repo";
import { buildPriceRows, buildServiceRows, medicationOptions } from "@/lib/comparison-data";
import { buildMetadata } from "@/lib/seo";
import { flags } from "@/config/flags";

export const metadata: Metadata = flags.pomPricing
  ? buildMetadata({
      title: "Compare UK weight loss treatment prices by provider and dose",
      description: "Recorded prices for weight loss treatment from regulated UK providers, with the date each price was checked, delivery and consultation fees.",
      path: "/prices",
    })
  : buildMetadata({
      title: "Compare UK weight loss services: regulation, support and delivery",
      description: "Compare regulated UK weight loss providers on consultation model, clinical support, delivery, regulator status and maintenance policy.",
      path: "/prices",
    });

export default async function PricesPage() {
  const meds = await getMedications();
  const options = medicationOptions(meds);
  return (
    <>
      <PageHeader
        title={flags.pomPricing ? "Compare treatment costs" : "Compare weight loss services"}
        lead={
          flags.pomPricing
            ? "Filter by medicine, dose and provider type, and sort by any column. Every price shows the date it was checked."
            : "Filter and sort regulated UK providers by the things that matter for safe treatment."
        }
        crumbs={[{ name: flags.pomPricing ? "Prices" : "Service comparison", href: "/prices" }]}
      >
        <DisclosureBadge />
      </PageHeader>
      <Container className="py-6">
        {!flags.pomPricing && <PricingNotice />}
        {flags.pomPricing ? (
          <PriceComparison mode="prices" rows={await buildPriceRows("/prices")} medications={options} />
        ) : (
          <PriceComparison mode="service" rows={await buildServiceRows("/prices")} medications={options} />
        )}
        <Section title="Compare by medicine">
          <LinkGrid links={meds.map((m) => ({ href: `/prices/${m.slug}`, label: m.name }))} columns={3} />
        </Section>
        <MedicalDisclaimer />
      </Container>
    </>
  );
}
