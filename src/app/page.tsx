import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Hero } from "@/components/home/hero";
import { JabsVsTabs } from "@/components/home/jabs-vs-tabs";
import { HowWeCompare } from "@/components/home/how-we-compare";
import { CheapestToday, LatestDiscounts } from "@/components/home/price-modules";
import { ToolTeaser } from "@/components/home/tool-teaser";
import { MedicationCard } from "@/components/medication/medication-card";
import { ProviderCard } from "@/components/affiliate/provider-card";
import { TrustSignals } from "@/components/affiliate/trust-signals";
import { DisclosureBadge } from "@/components/affiliate/disclosure-badge";
import { ArticleGrid } from "@/components/content/article-card";
import { LinkGrid } from "@/components/content/link-grid";
import { MedicalDisclaimer } from "@/components/content/medical-disclaimer";
import { getMedications, getProviders, getMedicationComparisons } from "@/lib/repo";
import { getAllArticles, getArticlesByCluster } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/config/site";
import { flags } from "@/config/flags";

export const metadata: Metadata = buildMetadata({
  title: `Compare UK Weight Loss Injections & Tablets | ${site.name}`,
  description: site.description,
  path: "/",
  absoluteTitle: true,
});

export default async function HomePage() {
  const [meds, providers] = await Promise.all([getMedications(), getProviders()]);
  const name = (s: string) => meds.find((m) => m.slug === s)?.name ?? s;
  const latest = getAllArticles().slice(0, 6);
  const sideEffectGuides = getArticlesByCluster("side-effects").slice(0, 3);
  const doseGuides = getArticlesByCluster("dosing").slice(0, 3);
  // Preview: providers are listed in alphabetical order; none is featured ahead of others.
  const preview = providers.slice(0, 6);

  return (
    <>
      <Hero />
      <Container>
        <Section title="Jabs or tabs?" intro="GLP-1 medicines now come as weekly or daily injections and as daily tablets. Here is how they differ.">
          <JabsVsTabs />
        </Section>

        <Section title="The medicines" intro="Each guide covers UK licensing, doses, side effects and what the evidence shows.">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {meds.map((m) => (
              <li key={m.slug}>
                <MedicationCard medication={m} />
              </li>
            ))}
          </ul>
        </Section>

        {flags.pomPricing ? (
          <Section title="Lowest recorded prices" intro="Recorded from providers' own websites, with the date checked. Always confirm the current price.">
            <CheapestToday />
          </Section>
        ) : (
          <Section title="Comparing providers fairly">
            <div className="grid gap-6 lg:grid-cols-2">
              <HowWeCompare />
              <div className="rounded-xl border bg-card p-6">
                <h3 className="text-xl font-semibold">Compare services side by side</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  We compare regulated providers on consultation model, clinical support, delivery, regulator status and
                  maintenance policy, rather than medicine prices.
                </p>
                <ul className="mt-4 space-y-2 text-sm">
                  <li>
                    <Link href="/prices" className="font-medium text-primary underline">Service comparison table</Link>
                  </li>
                  <li>
                    <Link href="/compare" className="font-medium text-primary underline">Provider vs provider comparisons</Link>
                  </li>
                  <li>
                    <Link href="/fact-checking" className="font-medium text-primary underline">How we verify provider information</Link>
                  </li>
                </ul>
              </div>
            </div>
          </Section>
        )}

        {flags.discountCodes && (
          <Section title="Latest verified offers" intro="Offers never affect our rankings, and a clinical assessment always comes first.">
            <LatestDiscounts />
          </Section>
        )}

        <Section
          title="UK providers"
          intro={
            <span className="inline-flex flex-wrap items-center gap-2">
              Listed alphabetically while verification is in progress. <DisclosureBadge />
            </span>
          }
        >
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {preview.map((p) => (
              <li key={p.slug}>
                <ProviderCard provider={p} fromPath="/" />
              </li>
            ))}
          </ul>
          <p className="mt-4">
            <Link href="/providers" className="font-semibold text-primary underline">
              See all {providers.length} providers
            </Link>
          </p>
        </Section>

        <Section title="Compare medicines">
          <LinkGrid links={getMedicationComparisons().map(([a, b]) => ({ href: `/${a}-vs-${b}`, label: `${name(a)} vs ${name(b)}` }))} columns={4} />
        </Section>

        <Section title="Latest guides">
          <ArticleGrid articles={latest} />
        </Section>

        {sideEffectGuides.length > 0 && (
          <Section title="Side effect guides">
            <ArticleGrid articles={sideEffectGuides} />
          </Section>
        )}
        <Section title="Dose guides">
          {doseGuides.length > 0 ? (
            <ArticleGrid articles={doseGuides} />
          ) : (
            <LinkGrid
              links={meds
                .filter((m) => m.dosesVerified && m.doses.length)
                .map((m) => ({ href: `/${m.slug}-dosage`, label: `${m.name} dosage`, description: "Doses and step-up schedule" }))}
              columns={3}
            />
          )}
        </Section>

        <Section title="Tools">
          <ToolTeaser />
        </Section>

        <Section title="Why trust JabsAndTabs">
          <TrustSignals />
        </Section>

        <MedicalDisclaimer />
      </Container>
    </>
  );
}
