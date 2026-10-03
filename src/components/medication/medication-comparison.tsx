import Link from "next/link";
import type { Medication } from "@/types";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { JsonLd } from "@/components/seo/json-ld";
import { MedicationCompareTable } from "@/components/medication/medication-compare-table";
import { MedicationVerificationNotice } from "@/components/content/verification-notice";
import { Callout } from "@/components/content/callout";
import { Prose } from "@/components/content/prose";
import { FaqSection } from "@/components/content/faq-section";
import { RelatedGuides } from "@/components/content/related-guides";
import { MedicalDisclaimer } from "@/components/content/medical-disclaimer";
import { ProviderComparisonCTA } from "@/components/affiliate/provider-comparison-cta";
import { getSideEffects } from "@/lib/repo";
import { articleHref, getArticle, getGuideLinks, type Article } from "@/lib/content";
import { ArticleView } from "@/components/content/article-view";
import { isUnverified, frequencyLabel, fullName, classPhrase } from "@/lib/medication-content";
import { medicalWebPageSchema } from "@/lib/schema";

export function comparisonTitle(a: Medication, b: Medication) {
  return `${a.name} vs ${b.name}: how they compare`;
}
export function comparisonDescription(a: Medication, b: Medication) {
  return `${fullName(a)} and ${fullName(b)} compared side by side: how they work, dosing, side effects and UK status.`;
}

function differences(a: Medication, b: Medication): string[] {
  const out: string[] = [];
  if (a.genericName === b.genericName.replace(/ \(oral\)$/, "") || b.genericName === a.genericName.replace(/ \(oral\)$/, "")) {
    out.push(`${a.name} and ${b.name} contain the same active ingredient (${a.genericName.replace(/ \(oral\)$/, "")}) in different forms.`);
  }
  if (a.drugClass !== b.drugClass) {
    out.push(`${a.name} is a ${classPhrase(a)}, while ${b.name} is a ${classPhrase(b)}.`);
  } else {
    out.push(`Both are ${classPhrase(a)}s.`);
  }
  if (a.route !== b.route) {
    out.push(`${a.name} is ${a.route === "injection" ? "an injection" : "a tablet"}; ${b.name} is ${b.route === "injection" ? "an injection" : "a tablet"}.`);
  }
  if (a.frequency !== b.frequency) {
    out.push(`${a.name} is taken ${frequencyLabel(a)}, whereas ${b.name} is taken ${frequencyLabel(b)}.`);
  } else {
    out.push(`Both are taken ${frequencyLabel(a)}.`);
  }
  if (a.ukStatus !== b.ukStatus) {
    out.push(`Their UK licensing status differs; see the table below, and check the MHRA and SmPC for the latest position.`);
  }
  return out;
}

export async function MedicationComparisonTemplate({ a, b, article }: { a: Medication; b: Medication; article?: Article }) {
  const sideEffects = await getSideEffects();
  const path = `/${a.slug}-vs-${b.slug}`;
  const title = comparisonTitle(a, b);
  const description = comparisonDescription(a, b);
  const pillar = getArticle(`${a.slug}-vs-${b.slug}`);
  const guides = getGuideLinks({ clusters: ["comparisons", "switching"], limit: 8 });
  const faqs = [
    {
      q: `Is ${a.name} better than ${b.name}?`,
      a: `There is no single answer. The right medicine depends on your health, other medicines, preferences (such as injection or tablet) and how you respond. Clinical trials of each medicine used different designs, so comparing headline results needs care. A prescriber can help you weigh up the options.`,
    },
    {
      q: `Can I switch from ${a.name} to ${b.name}?`,
      a: `Switching between GLP-1 medicines is possible but should only be done under the supervision of a prescriber, who will decide the starting dose of the new medicine and the timing. Do not take both at the same time, and do not switch on your own.`,
    },
  ];
  const unverified = isUnverified(a) || isUnverified(b);

  const modules = (
    <>
        <Section title="Key differences">
          <Prose>
            <ul>
              {differences(a, b).map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </Prose>
        </Section>

        <Section title="Side-by-side">
          <MedicationCompareTable medications={[a, b]} sideEffects={sideEffects} />
        </Section>

    </>
  );

  if (article) {
    return (
      <ArticleView
        article={article}
        about={[a, b]}
        crumbs={[{ name: "Compare", href: "/compare" }, { name: `${a.name} vs ${b.name}`, href: path }]}
        notices={
          <>
            {isUnverified(a) && <MedicationVerificationNotice name={a.name} />}
            {isUnverified(b) && <MedicationVerificationNotice name={b.name} />}
          </>
        }
        modules={modules}
      />
    );
  }

  return (
    <>
      <JsonLd data={medicalWebPageSchema({ path, title, description, about: [a, b] })} />
      <PageHeader
        title={title}
        lead={description}
        crumbs={[
          { name: "Compare medicines", href: a.hub === "injections" && b.hub === "injections" ? "/weight-loss-injections" : "/oral-glp1" },
          { name: `${a.name} vs ${b.name}`, href: path },
        ]}
      />
      <Container className="py-6">
        {isUnverified(a) && <MedicationVerificationNotice name={a.name} />}
        {isUnverified(b) && <MedicationVerificationNotice name={b.name} />}

        {modules}

        {pillar && articleHref(pillar) !== path && (
          <Callout type="evidence" title="Read the evidence-based comparison">
            Our in-depth guide <Link href={articleHref(pillar)}>{pillar.frontmatter.title}</Link> covers
            the trial evidence in detail.
          </Callout>
        )}
        {unverified && (
          <Callout type="warning" title="Status at the time of writing">
            At least one of these medicines has a UK status our editors have not yet verified. Treat this comparison as
            provisional.
          </Callout>
        )}

        <FaqSection faqs={faqs} />
        <ProviderComparisonCTA />
        <Section>
          <RelatedGuides guides={guides} title="Comparison guides" />
        </Section>
        <MedicalDisclaimer />
      </Container>
    </>
  );
}
