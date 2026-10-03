import Link from "next/link";
import type { ContentCluster, Medication } from "@/types";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { JsonLd } from "@/components/seo/json-ld";
import { DoseTable } from "@/components/medication/dose-table";
import { TitrationTimeline } from "@/components/medication/titration-timeline";
import { SideEffectList } from "@/components/medication/side-effect-list";
import { MedicationFacts } from "@/components/medication/medication-facts";
import { MedicationVerificationNotice } from "@/components/content/verification-notice";
import { Callout } from "@/components/content/callout";
import { RelatedGuides } from "@/components/content/related-guides";
import { LinkGrid } from "@/components/content/link-grid";
import { FaqSection } from "@/components/content/faq-section";
import { MedicalDisclaimer } from "@/components/content/medical-disclaimer";
import { Prose } from "@/components/content/prose";
import { ProviderComparisonCTA } from "@/components/affiliate/provider-comparison-cta";
import { StickyCta } from "@/components/affiliate/sticky-cta";
import { getSideEffects, getSideEffectsForMedication, getProvidersForMedication } from "@/lib/repo";
import { getGuideLinks, type Article } from "@/lib/content";
import { ArticleView } from "@/components/content/article-view";
import { MEDICATION_TOPICS, TOPIC_LABELS, hrefForTopic, type MedicationTopic } from "@/lib/routes";
import {
  guideHubsFor,
  isUnverified,
  licenceCriteria,
  medicationFaqs,
  statusSentence,
  TRIAL_PROGRAMMES,
  frequencyLabel, fullName } from "@/lib/medication-content";
import { medicalWebPageSchema } from "@/lib/schema";
import { flags } from "@/config/flags";
import { EMC_URL } from "@/lib/labels";

const TOPIC_CLUSTERS: Record<MedicationTopic, ContentCluster[]> = {
  prices: ["pricing"],
  "side-effects": ["side-effects"],
  dosage: ["dosing"],
  maintenance: ["maintenance", "long-term"],
  eligibility: ["eligibility"],
  results: ["results"],
  "how-it-works": ["medications"],
  faqs: ["faqs", "medications"],
};

export function topicTitle(m: Medication, topic: MedicationTopic): string {
  switch (topic) {
    case "prices":
      return `${m.name} costs in the UK: what affects the price`;
    case "side-effects":
      return `${m.name} side effects: common, serious and when to get help`;
    case "dosage":
      return `${m.name} dosage: doses and step-up schedule`;
    case "maintenance":
      return `${m.name} maintenance: long-term use and stopping`;
    case "eligibility":
      return `Who can take ${m.name}? Eligibility explained`;
    case "results":
      return `${m.name} results: what the evidence shows`;
    case "how-it-works":
      return `How ${m.name} works`;
    case "faqs":
      return `${m.name}: frequently asked questions`;
  }
}

export function topicDescription(m: Medication, topic: MedicationTopic): string {
  switch (topic) {
    case "prices":
      return `What affects the cost of ${fullName(m)} from UK providers: consultation fees, delivery and dose. Compare regulated providers.`;
    case "side-effects":
      return `Common and serious side effects of ${fullName(m)}, self-care tips and red-flag symptoms that need urgent help.`;
    case "dosage":
      return `${m.name} doses and step-up schedule from the UK product information, with guidance on dose increases.`;
    case "maintenance":
      return `Using ${m.name} long term: maintenance doses, stopping treatment and what the evidence says about weight regain.`;
    case "eligibility":
      return `Who ${m.name} is licensed for in the UK, BMI criteria, NHS access via NICE guidance, and who should not take it.`;
    case "results":
      return `What clinical trials of ${fullName(m)} show about weight loss, and how to set realistic expectations.`;
    case "how-it-works":
      return `How ${fullName(m)} works in the body, explained in plain English.`;
    case "faqs":
      return `Answers to common questions about ${fullName(m)} in the UK: doses, side effects, licensing and NHS access.`;
  }
}

function mechanism(m: Medication): string {
  if (m.slug === "mounjaro") {
    return "Tirzepatide acts on two hormone receptors: GIP (glucose-dependent insulinotropic polypeptide) and GLP-1 (glucagon-like peptide-1). These gut hormones are released after eating. Activating them helps reduce appetite and food cravings, makes you feel full sooner, slows how quickly the stomach empties and helps regulate blood sugar.";
  }
  if (m.slug === "foundayo") {
    return "Orforglipron activates the GLP-1 receptor, the same target as semaglutide, but it is a small-molecule (non-peptide) medicine rather than a modified hormone. That is why it can be taken as a tablet without the strict fasting rules needed for oral semaglutide. Like other GLP-1 medicines, it helps reduce appetite and slows stomach emptying.";
  }
  return `${m.genericName.replace(/ \(oral\)$/, "").replace(/^\w/, (c) => c.toUpperCase())} mimics GLP-1 (glucagon-like peptide-1), a hormone released by the gut after eating. Activating the GLP-1 receptor helps reduce appetite, makes you feel full sooner, slows how quickly the stomach empties and helps regulate blood sugar.${m.slug === "oral-semaglutide" ? ` Because semaglutide is a peptide, the tablet must be taken in a specific way to be absorbed. ${m.administration ?? "Follow the instructions in the leaflet."}` : ""}`;
}

export async function MedicationTopicTemplate({ medication: m, topic, article }: { medication: Medication; topic: MedicationTopic; article?: Article }) {
  const [allSideEffects, sideEffects, providers] = await Promise.all([
    getSideEffects(),
    getSideEffectsForMedication(m),
    topic === "prices" ? getProvidersForMedication(m.slug) : Promise.resolve([]),
  ]);
  const unverified = isUnverified(m);
  const path = hrefForTopic(m.slug, topic);
  const title = topicTitle(m, topic);
  const description = topicDescription(m, topic);
  const guides = getGuideLinks({ hubs: [...guideHubsFor(m), "general"], clusters: TOPIC_CLUSTERS[topic], limit: 8 });
  const allFaqs = medicationFaqs(m, allSideEffects);
  const faqs = topic === "faqs" ? allFaqs : allFaqs.slice(0, 3);
  const otherTopics = MEDICATION_TOPICS.filter((t) => t !== topic);

  const modules = (
    <>
        {topic === "prices" && (
          <>
            <Section title={`What affects the cost of ${m.name}?`}>
              <Prose>
                <p>
                  {m.name} is a prescription-only medicine. When you use a private online provider, the total you pay
                  is usually made up of several parts, and these vary between providers and over time:
                </p>
                <ul>
                  <li>
                    <strong>The dose.</strong> Many providers charge different amounts for different strengths
                    {m.route === "injection" ? " of pen" : ""}, so the cost can change as your dose is increased.
                  </li>
                  <li>
                    <strong>Consultation or programme fees.</strong> Some providers include the clinical assessment in
                    the medicine price; others charge separately or bundle coaching and support into a subscription.
                  </li>
                  <li>
                    <strong>Delivery.</strong>{" "}
                    {m.route === "injection"
                      ? "Injectable pens need cold-chain packaging, and delivery charges and speeds differ."
                      : "Delivery charges and speeds differ between providers."}
                  </li>
                  <li>
                    <strong>Subscription terms.</strong> Check minimum terms, cancellation rules and whether prices are
                    fixed when you change dose.
                  </li>
                </ul>
                <p>
                  On the NHS, prescription charges apply in England unless you are exempt, but access depends on NICE
                  criteria and local services. {m.niceGuidance ? `The relevant guidance is ${m.niceGuidance}.` : ""}
                </p>
              </Prose>
              {!flags.pomPricing && (
                <Callout type="info" title="Why we do not show prices here">
                  {m.name} is a prescription-only medicine. UK rules restrict promoting these medicines to the public, so
                  we compare providers on regulation, clinical support, delivery and transparency instead of publishing
                  drug price tables. See our{" "}
                  <Link href={`/prices/${m.slug}`}>service comparison for {m.name}</Link>.
                </Callout>
              )}
            </Section>
            <Section title="Providers that list this medicine" intro="Alphabetical. Details are being verified.">
              {providers.length ? (
                <LinkGrid
                  links={providers.map((p) => ({ href: `/providers/${p.slug}/${m.slug}`, label: p.name, description: `${m.name} at ${p.name}` }))}
                  columns={3}
                />
              ) : (
                <p className="text-sm text-muted-foreground">Not yet verified.</p>
              )}
            </Section>
          </>
        )}

        {topic === "side-effects" && (
          <Section title={`${m.name} side effects`} intro="Common side effects are usually digestive and often ease as your body adjusts. Know the serious warning signs.">
            <SideEffectList medication={m} sideEffects={sideEffects} />
          </Section>
        )}

        {topic === "dosage" && (
          <Section title={`${m.name} dosing schedule`}>
            <p className="mb-4 max-w-3xl leading-relaxed">
              {m.name} is taken {frequencyLabel(m)}. The dose is increased gradually to reduce side effects; your
              prescriber decides whether and when to increase it, and some people stay on a lower dose if it works well
              for them or if side effects are troublesome.
            </p>
            <DoseTable medication={m} />
            <div className="mt-6">
              <TitrationTimeline medication={m} />
            </div>
            <Callout type="warning" title="Missed doses and changes">
              Follow the missed-dose instructions in your Patient Information Leaflet, and do not change your dose or
              schedule without speaking to your prescriber. The{" "}
              <a href={EMC_URL} target="_blank" rel="noopener noreferrer">
                Electronic Medicines Compendium
              </a>{" "}
              has the current leaflet and SmPC.
            </Callout>
          </Section>
        )}

        {topic === "maintenance" && (
          <Section title={`Using ${m.name} long term`}>
            <Prose>
              <p>
                {m.name} is intended to be used alongside long-term changes to diet and physical activity. The
                &ldquo;maintenance&rdquo; phase usually means continuing on a dose that you tolerate and that is
                working, rather than increasing further.
              </p>
              <p>
                The UK product information and NICE guidance include points at which treatment should be reviewed, for
                example if you have not lost enough weight after a set period on the maintenance dose. Your prescriber
                will use these to decide whether continuing is appropriate.
              </p>
              <p>
                Studies in which participants stopped GLP-1-based treatment have generally found that weight tends to be
                regained over time. Stopping is a decision to make with your prescriber, who may suggest a plan for
                diet, activity and follow-up.
              </p>
            </Prose>
            <div className="mt-6">
              <DoseTable medication={m} />
            </div>
          </Section>
        )}

        {topic === "eligibility" && (
          <Section title={`Who can take ${m.name}?`}>
            <Prose>
              <p>{licenceCriteria(m) ?? statusSentence(m)}</p>
              <p>
                {m.niceGuidance
                  ? `For NHS treatment, NICE guidance (${m.niceGuidance}) sets the criteria, which are stricter than the licence and depend on local services. Your GP can explain what is available.`
                  : "NICE guidance for NHS use has not been verified by our editorial team."}{" "}
                NICE recommends lower BMI thresholds for people of South Asian, Chinese, other Asian, Middle Eastern,
                Black African or African-Caribbean family background.
              </p>
              <h3>Who should not take it, or needs extra care</h3>
              <ul>
                <li>People who are pregnant, planning a pregnancy or breastfeeding</li>
                <li>Anyone with a history of pancreatitis, or certain thyroid cancers in themselves or their family (check the SmPC)</li>
                <li>People with severe digestive conditions, such as gastroparesis</li>
                <li>People with type 1 diabetes, or who take insulin or a sulfonylurea (doses may need adjusting)</li>
                <li>Anyone with a current or past eating disorder</li>
              </ul>
              <p>
                This list is not exhaustive. A prescriber must review your full medical history before prescribing.
              </p>
            </Prose>
            <LinkGrid
              links={[
                { href: "/tools/bmi-calculator", label: "BMI calculator", description: "Work out your BMI, with NICE thresholds explained" },
                { href: "/tools/eligibility-checker", label: "Eligibility checker", description: "Informational questions to discuss with a prescriber" },
              ]}
              columns={2}
            />
          </Section>
        )}

        {topic === "results" && (
          <Section title={`What the evidence shows about ${m.name}`}>
            <Prose>
              {TRIAL_PROGRAMMES[m.slug] ? (
                <p>
                  The weight-management licence for {m.name} is based mainly on the {TRIAL_PROGRAMMES[m.slug]} programme
                  of randomised controlled trials, which compared {m.genericName} with placebo in people also following
                  diet and activity advice. Our in-depth guides summarise each trial and link to the published papers.
                </p>
              ) : (
                <p>
                  We have not yet verified the clinical trial evidence for {m.name} for weight management in the UK.
                  Check the SmPC and the published trials referenced in it.
                </p>
              )}
              <p>
                Trial averages do not predict what will happen to any individual. Results vary with dose, how long
                treatment continues, other health conditions and changes to diet and activity. Some people lose much
                less weight than average.
              </p>
            </Prose>
          </Section>
        )}

        {topic === "how-it-works" && (
          <Section title={`How ${m.name} works`}>
            <Prose>
              <p>{mechanism(m)}</p>
              <p>
                It is taken {frequencyLabel(m)}
                {m.route === "injection" ? " as an injection under the skin of the stomach, thigh or upper arm" : " as a tablet"}.
                These effects are why digestive side effects such as nausea are common, particularly after starting or
                increasing the dose.
              </p>
            </Prose>
            <div className="mt-6">
              <MedicationFacts medication={m} />
            </div>
          </Section>
        )}

    </>
  );

  if (article) {
    return (
      <ArticleView
        article={article}
        about={[m]}
        crumbs={[
          { name: m.name, href: `/${m.slug}` },
          { name: TOPIC_LABELS[topic], href: path },
        ]}
        notices={unverified ? <MedicationVerificationNotice name={m.name} /> : undefined}
        modules={modules}
      />
    );
  }

  return (
    <>
      <JsonLd data={medicalWebPageSchema({ path, title, description, about: [m] })} />
      <PageHeader
        title={title}
        lead={description}
        crumbs={[
          { name: m.name, href: `/${m.slug}` },
          { name: TOPIC_LABELS[topic], href: path },
        ]}
      />
      <Container className="py-6">
        {unverified && <MedicationVerificationNotice name={m.name} />}

        {modules}

        <FaqSection faqs={faqs} title={topic === "faqs" ? `${m.name} questions answered` : "Frequently asked questions"} />

        {topic !== "prices" && <ProviderComparisonCTA medication={m.slug} />}

        <Section>
          <RelatedGuides guides={guides} />
        </Section>

        <Section title={`More about ${m.name}`}>
          <LinkGrid
            links={[
              { href: `/${m.slug}`, label: `${m.name} hub`, description: "Overview, doses, side effects and providers" },
              ...otherTopics.map((t) => ({ href: hrefForTopic(m.slug, t), label: `${m.name} ${TOPIC_LABELS[t].toLowerCase()}` })),
            ]}
            columns={3}
          />
        </Section>
        <MedicalDisclaimer />
      </Container>
      <StickyCta />
    </>
  );
}
