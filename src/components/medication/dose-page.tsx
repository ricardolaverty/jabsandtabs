import Link from "next/link";
import type { Dose, Medication } from "@/types";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { JsonLd } from "@/components/seo/json-ld";
import { TitrationTimeline } from "@/components/medication/titration-timeline";
import { DoseTable } from "@/components/medication/dose-table";
import { MedicationVerificationNotice } from "@/components/content/verification-notice";
import { Callout } from "@/components/content/callout";
import { Prose } from "@/components/content/prose";
import { FaqSection } from "@/components/content/faq-section";
import { RelatedGuides } from "@/components/content/related-guides";
import { MedicalDisclaimer } from "@/components/content/medical-disclaimer";
import { ProviderComparisonCTA } from "@/components/affiliate/provider-comparison-cta";
import { getGuideLinks } from "@/lib/content";
import { hrefForDose, hrefForTopic } from "@/lib/routes";
import { DOSE_ROLE_LABELS } from "@/lib/labels";
import { guideHubsFor, isUnverified, titrationTimeline, fullName } from "@/lib/medication-content";
import { medicalWebPageSchema } from "@/lib/schema";
import { formatMg } from "@/lib/utils";

export function doseTitle(m: Medication, d: Dose) {
  return `${m.name} ${formatMg(d.mg)}: ${DOSE_ROLE_LABELS[d.role].toLowerCase()} explained`;
}

export function doseDescription(m: Medication, d: Dose) {
  return `What the ${formatMg(d.mg)} dose of ${fullName(m)} is for, where it sits in the step-up schedule and what to discuss with your prescriber.`;
}

function roleExplanation(m: Medication, d: Dose, weeks: number | null): string {
  const wk = m.titrationStepWeeks;
  switch (d.role) {
    case "starting":
      return `${formatMg(d.mg)} is the starting dose of ${m.name}. It is used to help your body get used to the medicine and is not usually intended as a long-term treatment dose.${wk ? ` The product information says to stay on it for at least ${wk === 1 ? "one week" : `${wk} weeks`} before increasing.` : ""}`;
    case "titration":
      return `${formatMg(d.mg)} is a step-up dose. People usually move through it on the way to a maintenance dose${weeks ? `; the earliest it would normally start is week ${weeks}` : ""}. Some people stay on a step-up dose for longer if side effects need time to settle.`;
    case "maintenance":
      return `${formatMg(d.mg)} is one of the doses used for ongoing (maintenance) treatment. Your prescriber chooses a maintenance dose based on how well you tolerate the medicine and how you are responding.`;
    case "maximum":
      return `${formatMg(d.mg)} is the highest dose of ${m.name} listed in the UK product information. Not everyone needs or tolerates the maximum dose.${d.note ? ` ${d.note}` : ""}`;
  }
}

export function DosePageTemplate({ medication: m, dose: d }: { medication: Medication; dose: Dose }) {
  const steps = titrationTimeline(m);
  const idx = steps.findIndex((s) => s.slug === d.slug);
  const prev = idx > 0 ? m.doses.find((x) => x.slug === steps[idx - 1].slug) : undefined;
  const next = idx >= 0 && idx < steps.length - 1 ? m.doses.find((x) => x.slug === steps[idx + 1].slug) : undefined;
  const path = hrefForDose(m.slug, d);
  const title = doseTitle(m, d);
  const description = doseDescription(m, d);
  const guides = getGuideLinks({ hubs: guideHubsFor(m), clusters: ["dosing", "side-effects"], limit: 6 });
  const faqs = [
    {
      q: `When can I increase from ${m.name} ${formatMg(d.mg)}?`,
      a: next
        ? `The next step is ${formatMg(next.mg)}.${m.titrationStepWeeks ? ` The product information says to stay on each dose for at least ${m.titrationStepWeeks === 1 ? "one week" : `${m.titrationStepWeeks} weeks`} first.` : ""} Your prescriber decides if and when to increase, taking into account side effects and how you are responding. You do not have to increase if your current dose is working.`
        : `${formatMg(d.mg)} is the highest dose of ${m.name} in the UK product information, so there is no further step up. Your prescriber will review whether to continue, and may discuss a lower dose if side effects are a problem.`,
    },
    {
      q: `Are side effects worse on ${m.name} ${formatMg(d.mg)}?`,
      a: `Digestive side effects such as nausea are often most noticeable after starting a new dose and tend to ease over the following days or weeks. If side effects are severe or do not settle, speak to your prescriber, who may suggest staying on your current dose for longer. Seek urgent help for severe, persistent stomach pain.`,
    },
  ];

  return (
    <>
      <JsonLd data={medicalWebPageSchema({ path, title, description, about: [m] })} />
      <PageHeader
        title={title}
        lead={description}
        crumbs={[
          { name: m.name, href: `/${m.slug}` },
          { name: "Dosage", href: hrefForTopic(m.slug, "dosage") },
          { name: formatMg(d.mg), href: path },
        ]}
      />
      <Container className="py-6">
        {isUnverified(m) && <MedicationVerificationNotice name={m.name} />}
        <Section title={`Where ${formatMg(d.mg)} fits`}>
          <TitrationTimeline medication={m} current={d.slug} />
          <Prose className="mt-6">
            <p>{roleExplanation(m, d, steps[idx]?.fromWeek ?? null)}</p>
            <p>
              Always use the dose your prescriber has prescribed and follow the Patient Information Leaflet. Do not
              change your dose yourself, and never use a pen or tablet strength that was not prescribed for you.
            </p>
          </Prose>
          <nav aria-label="Adjacent doses" className="mt-6 flex flex-wrap gap-3 text-sm">
            {prev && (
              <Link href={hrefForDose(m.slug, prev)} className="rounded-md border px-3 py-2 hover:bg-muted">
                &larr; Previous dose: {formatMg(prev.mg)}
              </Link>
            )}
            {next && (
              <Link href={hrefForDose(m.slug, next)} className="rounded-md border px-3 py-2 hover:bg-muted">
                Next dose: {formatMg(next.mg)} &rarr;
              </Link>
            )}
          </nav>
        </Section>
        <Section title={`All ${m.name} doses`}>
          <DoseTable medication={m} />
        </Section>
        <Callout type="info" title="Cost by dose">
          Some providers charge different amounts for different doses. We explain{" "}
          <Link href={hrefForTopic(m.slug, "prices")}>what affects the cost of {m.name}</Link> and compare providers on{" "}
          <Link href={`/prices/${m.slug}`}>our comparison page</Link>.
        </Callout>
        <FaqSection faqs={faqs} />
        <ProviderComparisonCTA medication={m.slug} />
        <Section>
          <RelatedGuides guides={guides} />
        </Section>
        <MedicalDisclaimer />
      </Container>
    </>
  );
}
