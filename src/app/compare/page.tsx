import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { LinkGrid } from "@/components/content/link-grid";
import { DisclosureBadge } from "@/components/affiliate/disclosure-badge";
import { TrustSignals } from "@/components/affiliate/trust-signals";
import { getComparePairs } from "@/lib/routes";
import { getMedicationComparisons, getMedications } from "@/lib/repo";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Compare UK weight loss providers and medicines side by side",
  description: "Side-by-side comparisons of UK weight loss providers and medicines: regulation, consultation, support, delivery, doses and side effects.",
  path: "/compare",
});

export default async function ComparePage() {
  const [pairs, meds] = await Promise.all([getComparePairs(), getMedications()]);
  const name = (s: string) => meds.find((m) => m.slug === s)?.name ?? s;
  return (
    <>
      <PageHeader
        title="Compare providers and medicines"
        lead="Choose a comparison to see two providers or two medicines next to each other. Provider comparisons cover service facts only: regulation, clinical support, delivery and policies."
        crumbs={[{ name: "Compare", href: "/compare" }]}
      >
        <DisclosureBadge />
      </PageHeader>
      <Container className="py-6">
        <Section title="Provider comparisons">
          <LinkGrid links={pairs.map((p) => ({ href: `/compare/${p.slug}`, label: `${p.a.name} vs ${p.b.name}` }))} columns={3} />
        </Section>
        <Section title="Medicine comparisons">
          <LinkGrid links={getMedicationComparisons().map(([a, b]) => ({ href: `/${a}-vs-${b}`, label: `${name(a)} vs ${name(b)}` }))} columns={3} />
        </Section>
        <TrustSignals className="mt-8" />
      </Container>
    </>
  );
}
