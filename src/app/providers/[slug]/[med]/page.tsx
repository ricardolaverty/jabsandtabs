import type { Metadata } from "next";
import { fullName } from "@/lib/medication-content";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { JsonLd } from "@/components/seo/json-ld";
import { MedicationFacts } from "@/components/medication/medication-facts";
import { DoseTable } from "@/components/medication/dose-table";
import { ProviderVerificationNotice, MedicationVerificationNotice } from "@/components/content/verification-notice";
import { LinkGrid } from "@/components/content/link-grid";
import { MedicalDisclaimer } from "@/components/content/medical-disclaimer";
import { RegulatorChecks } from "@/components/provider/regulator-checks";
import { ProviderPrices } from "@/components/provider/provider-prices";
import { AffiliateButton } from "@/components/affiliate/affiliate-button";
import { ProviderComparisonCTA } from "@/components/affiliate/provider-comparison-cta";
import { getMedications, getProvider, getMedication } from "@/lib/repo";
import { getProviderMedicationParams, hrefForTopic, isMedicationUnverified } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";
import { medicalWebPageSchema } from "@/lib/schema";
import { flags } from "@/config/flags";
import { formatMg, NOT_VERIFIED } from "@/lib/utils";

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string; med: string }> };

export async function generateStaticParams() {
  return getProviderMedicationParams();
}

async function load(slug: string, med: string) {
  const [p, m] = await Promise.all([getProvider(slug), getMedication(med)]);
  if (!p || !m || !p.medications.includes(m.slug)) return null;
  return { p, m };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, med } = await params;
  const data = await load(slug, med);
  if (!data) return {};
  const { p, m } = data;
  return buildMetadata({
    title: `${m.name} at ${p.name}: service, support and regulation`,
    description: `How ${p.name} provides ${fullName(m)}: consultation, delivery, clinical support, maintenance policy and regulator checks.`,
    path: `/providers/${p.slug}/${m.slug}`,
    index: p.verified && !isMedicationUnverified(m),
  });
}

export default async function ProviderMedicationPage({ params }: Props) {
  const { slug, med } = await params;
  const data = await load(slug, med);
  if (!data) notFound();
  const { p, m } = data;
  const meds = await getMedications();
  const path = `/providers/${p.slug}/${m.slug}`;

  return (
    <>
      <JsonLd data={medicalWebPageSchema({ path, title: `${m.name} at ${p.name}`, description: m.summary, about: [m] })} />
      <PageHeader
        title={`${m.name} at ${p.name}`}
        lead={`What to know about getting ${fullName(m)} through ${p.name}: the service, support and how to check it is properly regulated.`}
        crumbs={[
          { name: "Providers", href: "/providers" },
          { name: p.name, href: `/providers/${p.slug}` },
          { name: m.name, href: path },
        ]}
      />
      <Container className="py-6">
        {!p.verified && <ProviderVerificationNotice name={p.name} />}
        {isMedicationUnverified(m) && <MedicationVerificationNotice name={m.name} />}

        <Section title={`${p.name}'s ${m.name} service`}>
          <dl className="grid gap-4 sm:grid-cols-2">
            {[
              ["Availability of " + m.name, p.verified ? "Listed by provider" : "Listed, not yet verified"],
              ["Delivery", p.delivery],
              ["Clinical support", p.support?.join(", ") ?? null],
              ["Maintenance policy", p.maintenancePolicy],
            ].map(([k, v]) => (
              <div key={k} className="border-b pb-3">
                <dt className="text-sm text-muted-foreground">{k}</dt>
                <dd className={v ? "font-medium" : "font-medium text-muted-foreground"}>{v ?? NOT_VERIFIED}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section title={flags.pomPricing ? `${m.name} prices at ${p.name}` : "Costs"}>
          <ProviderPrices provider={p} medications={meds} medication={m.slug} />
          {flags.pomPricing && m.dosesVerified && (
            <ul className="mt-4 flex flex-wrap gap-2 text-sm">
              {m.doses.map((d) => (
                <li key={d.slug}>
                  <Link href={`${path}/${d.slug}`} className="rounded-md border px-3 py-1.5 hover:bg-muted">
                    {formatMg(d.mg)}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Section>

        <Section title={`About ${m.name}`}>
          <MedicationFacts medication={m} />
          <div className="mt-6">
            <DoseTable medication={m} />
          </div>
        </Section>

        <Section title="Regulator checks">
          <RegulatorChecks provider={p} />
        </Section>

        <div className="my-6">
          <AffiliateButton provider={p} fromPath={path} />
        </div>

        <ProviderComparisonCTA medication={m.slug} />

        <Section title={`More about ${m.name}`}>
          <LinkGrid
            links={[
              { href: `/${m.slug}`, label: `${m.name} guide` },
              { href: hrefForTopic(m.slug, "side-effects"), label: `${m.name} side effects` },
              { href: hrefForTopic(m.slug, "eligibility"), label: `Who can take ${m.name}` },
              { href: `/prices/${m.slug}`, label: `Compare ${m.name} providers` },
            ]}
            columns={2}
          />
        </Section>
        <MedicalDisclaimer />
      </Container>
    </>
  );
}
