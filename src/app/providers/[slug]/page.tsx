import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, MinusCircle } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { AffiliateButton } from "@/components/affiliate/affiliate-button";
import { RatingDisplay } from "@/components/affiliate/rating-display";
import { DisclosureBadge } from "@/components/affiliate/disclosure-badge";
import { StickyCta } from "@/components/affiliate/sticky-cta";
import { ProviderVerificationNotice } from "@/components/content/verification-notice";
import { Callout } from "@/components/content/callout";
import { LinkGrid } from "@/components/content/link-grid";
import { MedicalDisclaimer } from "@/components/content/medical-disclaimer";
import { RegulatorChecks } from "@/components/provider/regulator-checks";
import { ProviderPrices } from "@/components/provider/provider-prices";
import { getMedications, getProvider } from "@/lib/repo";
import { getComparePairs, getProviderSlugs } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";
import { providerReviewSchema } from "@/lib/schema";
import { PROVIDER_TYPE_LABELS } from "@/lib/labels";
import { flags } from "@/config/flags";
import { formatDate, formatPrice, NOT_VERIFIED } from "@/lib/utils";

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getProviderSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProvider(slug);
  if (!p) return {};
  return buildMetadata({
    title: `${p.name} review: weight loss service, regulation and support`,
    description: `Independent review of ${p.name} for weight loss treatment: regulator checks, consultation, delivery, support and maintenance policy.`,
    path: `/providers/${p.slug}`,
    index: p.verified,
  });
}

function Field({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div className="border-b pb-3">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className={value ? "mt-0.5 font-medium" : "mt-0.5 font-medium text-muted-foreground"}>{value || NOT_VERIFIED}</dd>
    </div>
  );
}

export default async function ProviderPage({ params }: Props) {
  const { slug } = await params;
  const p = await getProvider(slug);
  if (!p) notFound();
  const [meds, pairs] = await Promise.all([getMedications(), getComparePairs()]);
  const path = `/providers/${p.slug}`;
  const comparisons = pairs.filter((x) => x.a.slug === p.slug || x.b.slug === p.slug);

  return (
    <>
      <JsonLd data={providerReviewSchema(p, null)} />
      <PageHeader
        eyebrow={PROVIDER_TYPE_LABELS[p.type]}
        title={`${p.name} review`}
        lead={`Our assessment of ${p.name} as a UK provider of weight management treatment: how it is regulated, how the service works and what support is offered.`}
        crumbs={[
          { name: "Providers", href: "/providers" },
          { name: p.name, href: path },
        ]}
      >
        <div className="flex flex-wrap items-center gap-3">
          {p.verified ? <Badge variant="success">Verified {formatDate(p.lastVerifiedAt)}</Badge> : <Badge variant="warning">Information being verified</Badge>}
          <DisclosureBadge />
        </div>
      </PageHeader>
      <Container className="py-6">
        {!p.verified && <ProviderVerificationNotice name={p.name} />}

        <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
          <div className="min-w-0">
            <Section id="overview" title="Overview">
              <dl className="grid gap-4 sm:grid-cols-2">
                <Field label="Type of service" value={PROVIDER_TYPE_LABELS[p.type]} />
                <Field
                  label="Medicines listed"
                  value={p.medications.length ? p.medications.map((m) => meds.find((x) => x.slug === m)?.name ?? m).join(", ") : null}
                />
                <Field label="Delivery" value={p.delivery} />
                <Field label="Clinical support" value={p.support?.join(", ")} />
                <Field label="Maintenance policy" value={p.maintenancePolicy} />
                {flags.pomPricing && <Field label="Consultation fee" value={p.consultationFee !== null ? formatPrice(p.consultationFee) : null} />}
              </dl>
            </Section>

            <Section id="pros-cons" title="Pros and cons">
              {p.pros.length || p.cons.length ? (
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-xl border bg-card p-5">
                    <h3 className="font-semibold">Pros</h3>
                    <ul className="mt-3 space-y-2 text-sm">
                      {p.pros.map((x) => (
                        <li key={x} className="flex gap-2">
                          <CheckCircle2 aria-hidden className="mt-0.5 size-4 shrink-0 text-success" />
                          {x}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-xl border bg-card p-5">
                    <h3 className="font-semibold">Cons</h3>
                    <ul className="mt-3 space-y-2 text-sm">
                      {p.cons.map((x) => (
                        <li key={x} className="flex gap-2">
                          <MinusCircle aria-hidden className="mt-0.5 size-4 shrink-0 text-destructive" />
                          {x}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">Our editorial assessment of {p.name} has not been completed yet.</p>
              )}
            </Section>

            <Section id="reviews" title="Customer reviews">
              <RatingDisplay trustpilot={p.trustpilot} />
              {!p.trustpilot && <p className="mt-2 text-sm text-muted-foreground">We have not yet verified {p.name}&apos;s Trustpilot score. We record the score, number of reviews and date checked, and never estimate.</p>}
            </Section>

            <Section id="eligibility" title="Eligibility and consultation">
              <p className="max-w-3xl leading-relaxed">
                Regulated UK providers must carry out a clinical assessment before prescribing. Expect questions about
                your medical history and current medicines, and checks of your identity and weight (for example a photo
                or video). A prescriber decides whether treatment is appropriate; you should never be offered a
                prescription-only medicine without that assessment. Our{" "}
                <Link href="/tools/eligibility-checker" className="font-medium text-primary underline">eligibility checker</Link>{" "}
                explains the questions prescribers usually consider.
              </p>
            </Section>

            <Section id="prices" title={flags.pomPricing ? `${p.name} prices` : "Costs"}>
              <ProviderPrices provider={p} medications={meds} />
            </Section>

            <Section id="regulation" title="Regulator checks">
              <RegulatorChecks provider={p} />
            </Section>

            {p.medications.length > 0 && (
              <Section title={`Medicines at ${p.name}`}>
                <LinkGrid
                  links={p.medications.map((m) => ({ href: `${path}/${m}`, label: `${meds.find((x) => x.slug === m)?.name ?? m} at ${p.name}` }))}
                  columns={2}
                />
              </Section>
            )}
            {comparisons.length > 0 && (
              <Section title={`Compare ${p.name}`}>
                <LinkGrid links={comparisons.map((c) => ({ href: `/compare/${c.slug}`, label: `${c.a.name} vs ${c.b.name}` }))} columns={2} />
              </Section>
            )}
            {flags.discountCodes && (
              <p className="text-sm">
                <Link href={`${path}/discount-codes`} className="font-medium text-primary underline">
                  Verified offers from {p.name}
                </Link>
              </p>
            )}
            <MedicalDisclaimer />
          </div>

          <aside aria-label={`${p.name} summary`}>
            <div className="sticky top-24 space-y-4 rounded-xl border bg-card p-5">
              <p className="font-semibold">{p.name}</p>
              <RatingDisplay trustpilot={p.trustpilot} compact />
              <p className="text-sm text-muted-foreground">Last verified: {formatDate(p.lastVerifiedAt)}</p>
              {flags.affiliateLinks ? (
                <AffiliateButton provider={p} fromPath={path} className="w-full" />
              ) : (
                <Callout type="info" title="Visiting this provider">
                  We do not link out to providers from review pages at present. Check registration on the{" "}
                  <a href="https://www.pharmacyregulation.org/registers" target="_blank" rel="noopener noreferrer">GPhC register</a>{" "}
                  before using any service.
                </Callout>
              )}
              <p className="text-xs text-muted-foreground">
                Website: <span className="font-medium">{new URL(p.website).hostname.replace(/^www\./, "")}</span>
              </p>
            </div>
          </aside>
        </div>
      </Container>
      <StickyCta href="/compare" label="Compare" text={`Compare ${p.name} with other providers`} />
    </>
  );
}
