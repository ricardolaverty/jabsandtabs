import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ProviderVerificationNotice } from "@/components/content/verification-notice";
import { Callout } from "@/components/content/callout";
import { MedicalDisclaimer } from "@/components/content/medical-disclaimer";
import { getOffers, getProvider } from "@/lib/repo";
import { getDiscountCodeProviderSlugs } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";
import { flags } from "@/config/flags";
import { formatDate } from "@/lib/utils";

/** GATED: flags.discountCodes. With the flag off no params are generated and every request 404s. */
export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getDiscountCodeProviderSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = flags.discountCodes ? await getProvider(slug) : undefined;
  if (!p) return {};
  return buildMetadata({
    title: `${p.name} offers: verified and dated`,
    description: `Current offers from ${p.name}, each checked by our editors with the date verified and the terms.`,
    path: `/providers/${p.slug}/discount-codes`,
    index: p.verified,
  });
}

export default async function DiscountCodesPage({ params }: Props) {
  const { slug } = await params;
  if (!flags.discountCodes) notFound();
  const p = await getProvider(slug);
  if (!p) notFound();
  const offers = await getOffers(p.slug);
  return (
    <>
      <PageHeader
        title={`${p.name} offers`}
        lead="Only offers our editors have verified on the provider's own site, with the date checked. Offers never affect our rankings."
        crumbs={[
          { name: "Providers", href: "/providers" },
          { name: p.name, href: `/providers/${p.slug}` },
          { name: "Offers", href: `/providers/${p.slug}/discount-codes` },
        ]}
      />
      <Container className="py-6">
        {!p.verified && <ProviderVerificationNotice name={p.name} />}
        <Callout type="warning" title="A clinical assessment always comes first">
          An offer should never be a reason to start a prescription-only medicine. A prescriber must decide whether
          treatment is suitable for you.
        </Callout>
        <Section title="Verified offers">
          {offers.length ? (
            <ul className="space-y-4">
              {offers.map((o) => (
                <li key={o.id} className="rounded-xl border bg-card p-5">
                  <p className="font-semibold">{o.title}</p>
                  {o.description && <p className="mt-1 text-sm text-muted-foreground">{o.description}</p>}
                  {o.code && (
                    <p className="mt-3 text-sm">
                      Code: <code className="rounded bg-muted px-2 py-1 font-mono">{o.code}</code>
                    </p>
                  )}
                  <p className="mt-3 text-xs text-muted-foreground">
                    Verified {formatDate(o.verifiedAt)}
                    {o.validUntil ? ` · Valid until ${formatDate(o.validUntil)}` : ""}
                    {o.terms ? ` · Terms: ${o.terms}` : ""}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">We have no verified offers from {p.name} at the moment.</p>
          )}
        </Section>
        <MedicalDisclaimer />
      </Container>
    </>
  );
}
