import Link from "next/link";
import { AlertOctagon, PhoneCall } from "lucide-react";
import type { Medication, SideEffect } from "@/types";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { JsonLd } from "@/components/seo/json-ld";
import { MedicationVerificationNotice } from "@/components/content/verification-notice";
import { FaqSection } from "@/components/content/faq-section";
import { RelatedGuides } from "@/components/content/related-guides";
import { LinkGrid } from "@/components/content/link-grid";
import { MedicalDisclaimer } from "@/components/content/medical-disclaimer";
import { getSideEffectGuidance } from "@/data/side-effect-guidance";
import { getSideEffectsForMedication } from "@/lib/repo";
import { getGuideLinks } from "@/lib/content";
import { hrefForSideEffect, hrefForTopic } from "@/lib/routes";
import { guideHubsFor, isUnverified, fullName } from "@/lib/medication-content";
import { medicalWebPageSchema } from "@/lib/schema";
import { YELLOW_CARD_URL } from "@/lib/labels";

export function sideEffectTitle(m: Medication, s: SideEffect) {
  return `${m.name} and ${s.name.toLowerCase()}: causes, tips and when to get help`;
}
export function sideEffectDescription(m: Medication, s: SideEffect) {
  return `${s.name} on ${fullName(m)}: why it happens, self-care measures and the warning signs that need medical help.`;
}

export async function SideEffectPageTemplate({ medication: m, sideEffect: s }: { medication: Medication; sideEffect: SideEffect }) {
  const g = getSideEffectGuidance(s.slug);
  const siblings = (await getSideEffectsForMedication(m)).filter((x) => x.slug !== s.slug);
  const path = hrefForSideEffect(m.slug, s.slug);
  const title = sideEffectTitle(m, s);
  const description = sideEffectDescription(m, s);
  const listedCommon = m.commonSideEffects.includes(s.slug);
  const guides = getGuideLinks({ hubs: [...guideHubsFor(m), "general"], clusters: ["side-effects", "diet", "safety"], limit: 6 });
  const faqs = [
    {
      q: `Is ${s.name.toLowerCase()} a common side effect of ${m.name}?`,
      a: listedCommon
        ? `${s.name} is among the side effects most often reported with ${m.name}. It tends to be most noticeable when starting treatment or after a dose increase, and often improves with time. The Patient Information Leaflet gives the official frequency.`
        : s.seriousness === "serious"
          ? `${s.name} is not common, but it is a recognised serious risk listed in the warnings for GLP-1 medicines. Knowing the warning signs matters more than how often it happens. Check the Patient Information Leaflet and speak to your prescriber if you have concerns.`
          : `Check the Patient Information Leaflet for whether and how often ${s.name.toLowerCase()} is reported with ${m.name}, and speak to your pharmacist or prescriber if it is affecting you.`,
    },
    {
      q: `Should I stop ${m.name} because of ${s.name.toLowerCase()}?`,
      a: `Do not stop or change your treatment without speaking to your prescriber, unless you have symptoms that need urgent care, such as severe persistent stomach pain. Your prescriber may suggest staying on your current dose for longer, adjusting your dose or other measures. You can also report suspected side effects to the MHRA Yellow Card scheme.`,
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
          { name: "Side effects", href: hrefForTopic(m.slug, "side-effects") },
          { name: s.name, href: path },
        ]}
      />
      <Container className="py-6">
        {isUnverified(m) && <MedicationVerificationNotice name={m.name} />}

        {g?.urgent.length ? (
          <div role="alert" className="my-6 rounded-xl border-2 border-destructive/40 bg-destructive/5 p-5">
            <p className="flex items-center gap-2 font-semibold">
              <AlertOctagon aria-hidden className="size-5 text-destructive" /> Get urgent medical help if:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-6 text-sm leading-relaxed">
              {g.urgent.map((u) => (
                <li key={u}>{u}</li>
              ))}
            </ul>
            <p className="mt-3 flex items-center gap-2 text-sm font-medium">
              <PhoneCall aria-hidden className="size-4" /> Call 999 or go to A&amp;E in an emergency. For urgent advice, call NHS 111.
            </p>
          </div>
        ) : null}

        <Section title={`About ${s.name.toLowerCase()} on ${m.name}`}>
          <p className="max-w-3xl leading-relaxed">
            {g?.overview ?? `${s.name} has been reported with GLP-1 medicines. Check the Patient Information Leaflet for details.`}
          </p>
          <p className="mt-3 max-w-3xl text-sm text-muted-foreground">
            {listedCommon
              ? `${s.name} is listed among the commonly reported side effects of ${m.name} in our reference data.`
              : s.seriousness === "serious"
                ? `This is a serious but uncommon risk that applies across GLP-1 medicines, including ${m.name}.`
                : `Check the leaflet for how often this is reported with ${m.name}.`}
          </p>
        </Section>

        {g && (
          <div className="grid gap-6 md:grid-cols-2">
            <Section title="Things that may help" className="py-4">
              <ul className="list-disc space-y-2 pl-5 leading-relaxed">
                {g.selfCare.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-muted-foreground">A pharmacist can advise on suitable over-the-counter options.</p>
            </Section>
            <Section title="Speak to your prescriber if" className="py-4">
              <ul className="list-disc space-y-2 pl-5 leading-relaxed">
                {g.contactPrescriber.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </Section>
          </div>
        )}

        <p className="mt-4 text-sm">
          Report suspected side effects through the{" "}
          <a href={YELLOW_CARD_URL} target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline">
            MHRA Yellow Card scheme
          </a>
          . Reports help the MHRA monitor the safety of medicines.
        </p>

        <FaqSection faqs={faqs} />

        <Section>
          <RelatedGuides guides={guides} />
        </Section>

        {siblings.length > 0 && (
          <Section title={`Other ${m.name} side effects`}>
            <LinkGrid links={siblings.map((x) => ({ href: hrefForSideEffect(m.slug, x.slug), label: x.name }))} columns={3} />
            <p className="mt-4 text-sm">
              <Link href={hrefForTopic(m.slug, "side-effects")} className="font-medium text-primary underline">
                All {m.name} side effects
              </Link>
            </p>
          </Section>
        )}
        <MedicalDisclaimer />
      </Container>
    </>
  );
}
