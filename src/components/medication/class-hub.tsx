import type { Medication } from "@/types";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { JsonLd } from "@/components/seo/json-ld";
import { MedicationCard } from "@/components/medication/medication-card";
import { MedicationCompareTable } from "@/components/medication/medication-compare-table";
import { Callout } from "@/components/content/callout";
import { RelatedGuides } from "@/components/content/related-guides";
import { LinkGrid } from "@/components/content/link-grid";
import { FaqSection } from "@/components/content/faq-section";
import { MedicalDisclaimer } from "@/components/content/medical-disclaimer";
import { ProviderComparisonCTA } from "@/components/affiliate/provider-comparison-cta";
import { getMedications, getSideEffects, getMedicationComparisons } from "@/lib/repo";
import { getGuideLinks, type Article } from "@/lib/content";
import { ArticleView } from "@/components/content/article-view";
import { CLASS_HUBS, type ClassHubSlug } from "@/lib/routes";
import { medicalWebPageSchema } from "@/lib/schema";

const copy = {
  injections: {
    lead: "Weight loss injections (sometimes called jabs) are prescription-only GLP-1-based medicines injected under the skin, either weekly or daily. Compare how they work, how they are dosed and what the evidence says.",
    intro:
      "The injectable medicines used for weight management in the UK all act on the GLP-1 receptor, which helps regulate appetite and slows how quickly the stomach empties. Mounjaro (tirzepatide) also acts on the GIP receptor. They are used alongside a reduced-calorie diet and increased physical activity, not instead of them.",
    faqs: [
      {
        q: "Which weight loss injections are available in the UK?",
        a: "The injectable medicines licensed for weight management in the UK include Mounjaro (tirzepatide), Wegovy (semaglutide) and Saxenda (liraglutide). Mounjaro and Wegovy are injected once a week; Saxenda is injected once a day. All are prescription-only, so a registered prescriber must decide whether one is suitable for you.",
      },
      {
        q: "Are weight loss injections safe?",
        a: "These medicines have been assessed by the MHRA, but like all medicines they have side effects and are not suitable for everyone. Digestive side effects such as nausea are common, and there are rarer serious risks such as pancreatitis and gallbladder problems. A prescriber will check your medical history before prescribing and should monitor you during treatment.",
      },
      {
        q: "Do I have to stay on a weight loss injection forever?",
        a: "These medicines are designed to be used alongside long-term changes to diet and activity. Studies in which people stopped treatment have generally found that weight tends to return over time. How long you stay on treatment is a decision to make with your prescriber, based on your progress, side effects and goals.",
      },
    ],
  },
  oral: {
    lead: "Oral GLP-1 medicines (tablets, or tabs) are a newer option for weight management in the UK. Compare Wegovy tablets (oral semaglutide) and Foundayo (orforglipron): how they are taken, how they are dosed and how they differ from injections.",
    intro:
      "GLP-1 tablets work on the same hormone pathway as the injections. Wegovy tablets contain semaglutide, a peptide that must be taken on an empty stomach with strict timing to be absorbed. Foundayo (orforglipron) is a small-molecule medicine that can be taken at any time of day without food or water restrictions. Both were authorised by the MHRA for weight management in 2026; NICE guidance for NHS use had not been published at the time of writing.",
    faqs: [
      {
        q: "Is there a weight loss tablet like Wegovy in the UK?",
        a: "Yes. The MHRA authorised Wegovy tablets (oral semaglutide) for weight management in June 2026 and Foundayo (orforglipron) for weight management and type 2 diabetes in August 2026. Rybelsus, a lower-dose oral semaglutide, is licensed for type 2 diabetes only. Both are prescription-only, so a prescriber must decide whether either is suitable for you.",
      },
      {
        q: "Are GLP-1 tablets as effective as injections?",
        a: "Tablets and injections have been studied in different trials with different doses and populations, so direct comparisons should be made carefully. Our comparison pages summarise what has been published and point you to the original trials. A prescriber can help you weigh up the options for your circumstances.",
      },
      {
        q: "Do GLP-1 tablets have the same side effects as injections?",
        a: "The commonly reported side effects are similar because the medicines act on the same pathway: nausea, diarrhoea, constipation, vomiting and indigestion. Tablets do not cause injection-site reactions. The Patient Information Leaflet for any medicine you are prescribed lists its known side effects.",
      },
    ],
  },
} as const;

export async function ClassHubTemplate({ slug, hub, medications, article }: { slug: ClassHubSlug; hub: "injections" | "oral"; medications: Medication[]; article?: Article }) {
  const [sideEffects, allMeds] = await Promise.all([getSideEffects(), getMedications()]);
  const info = CLASS_HUBS[slug];
  const c = copy[hub];
  const slugs = new Set(medications.map((m) => m.slug as string));
  const comparisons = getMedicationComparisons()
    .filter(([a, b]) => slugs.has(a) || slugs.has(b))
    .map(([a, b]) => ({
      href: `/${a}-vs-${b}`,
      label: `${allMeds.find((m) => m.slug === a)?.name ?? a} vs ${allMeds.find((m) => m.slug === b)?.name ?? b}`,
    }));
  const guides = getGuideLinks({ hubs: hub === "injections" ? ["injections", "mounjaro", "wegovy"] : ["oral-glp1"], limit: 10 });
  const path = `/${slug}`;

  const modules = (
    <>
        <Section title="The medicines">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {medications.map((m) => (
              <li key={m.slug}>
                <MedicationCard medication={m} />
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Side-by-side comparison" intro="Facts from the UK product information where verified. Unverified fields are marked.">
          <MedicationCompareTable medications={medications} sideEffects={sideEffects} />
        </Section>

    </>
  );

  if (article) {
    return <ArticleView article={article} about={medications} crumbs={[{ name: info.title, href: path }]} modules={modules} />;
  }

  return (
    <>
      <JsonLd data={medicalWebPageSchema({ path, title: info.title, description: c.lead, about: medications })} />
      <PageHeader eyebrow={info.short} title={`${info.title}: UK comparison and guide`} lead={c.lead} crumbs={[{ name: info.title, href: path }]} />
      <Container className="py-6">
        <Section title="How they work">
          <p className="max-w-3xl leading-relaxed">{c.intro}</p>
          {hub === "oral" && (
            <Callout type="info" title="NHS access at the time of writing">
              Wegovy tablets and Foundayo are authorised by the MHRA, but NICE had not published guidance on their use
              for weight management at the time of writing, so they are not generally available on the NHS for this
              use. Always check the current SmPC and ask a prescriber.
            </Callout>
          )}
        </Section>

        {modules}

        {comparisons.length > 0 && (
          <Section title="Head-to-head comparisons">
            <LinkGrid links={comparisons} columns={3} />
          </Section>
        )}

        <ProviderComparisonCTA />

        <Section>
          <RelatedGuides guides={guides} />
        </Section>

        <FaqSection faqs={[...c.faqs]} />
        <MedicalDisclaimer />
      </Container>
    </>
  );
}
