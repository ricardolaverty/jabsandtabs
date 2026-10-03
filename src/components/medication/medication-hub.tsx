import Link from "next/link";
import type { Medication } from "@/types";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { JsonLd } from "@/components/seo/json-ld";
import { MedicationFacts } from "@/components/medication/medication-facts";
import { DoseTable } from "@/components/medication/dose-table";
import { TitrationTimeline } from "@/components/medication/titration-timeline";
import { SideEffectList } from "@/components/medication/side-effect-list";
import { MedicationVerificationNotice } from "@/components/content/verification-notice";
import { RelatedGuides } from "@/components/content/related-guides";
import { LinkGrid } from "@/components/content/link-grid";
import { FaqSection } from "@/components/content/faq-section";
import { MedicalDisclaimer } from "@/components/content/medical-disclaimer";
import { ProviderCard } from "@/components/affiliate/provider-card";
import { ProviderComparisonCTA } from "@/components/affiliate/provider-comparison-cta";
import { getMedications, getProvidersForMedication, getSideEffects, getSideEffectsForMedication, getMedicationComparisons } from "@/lib/repo";
import { getGuideLinks } from "@/lib/content";
import { MEDICATION_TOPICS, TOPIC_LABELS, CLASS_HUBS, hrefForTopic } from "@/lib/routes";
import { guideHubsFor, isUnverified, medicationFaqs, statusSentence, TRIAL_PROGRAMMES, fullName } from "@/lib/medication-content";
import { medicalWebPageSchema } from "@/lib/schema";

export async function MedicationHubTemplate({ medication: m }: { medication: Medication }) {
  const [allSideEffects, sideEffects, providers, meds] = await Promise.all([
    getSideEffects(),
    getSideEffectsForMedication(m),
    getProvidersForMedication(m.slug),
    getMedications(),
  ]);
  const classHubSlug = m.hub === "injections" ? "weight-loss-injections" : "oral-glp1";
  const unverified = isUnverified(m);
  const comparisons = getMedicationComparisons()
    .filter(([a, b]) => a === m.slug || b === m.slug)
    .map(([a, b]) => {
      const other = meds.find((x) => x.slug === (a === m.slug ? b : a));
      return { href: `/${a}-vs-${b}`, label: `${m.name} vs ${other?.name ?? b}` };
    });
  const guides = getGuideLinks({ hubs: guideHubsFor(m), limit: 10 });
  const faqs = medicationFaqs(m, allSideEffects);
  const path = `/${m.slug}`;

  return (
    <>
      <JsonLd data={medicalWebPageSchema({ path, title: `${fullName(m)} UK guide`, description: m.summary, about: [m] })} />
      <PageHeader
        eyebrow={`${CLASS_HUBS[classHubSlug].title} · ${m.genericName}`}
        title={`${fullName(m)}: UK guide`}
        lead={m.summary}
        crumbs={[
          { name: CLASS_HUBS[classHubSlug].title, href: `/${classHubSlug}` },
          { name: m.name, href: path },
        ]}
      />
      <Container className="py-6">
        {unverified && <MedicationVerificationNotice name={m.name} />}

        <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
          <div className="min-w-0">
            <Section id="overview" title={`${m.name} at a glance`}>
              <MedicationFacts medication={m} />
              <p className="mt-4 leading-relaxed">{statusSentence(m)}</p>
              {TRIAL_PROGRAMMES[m.slug] && (
                <p className="mt-3 leading-relaxed">
                  The main clinical evidence for {m.name} in weight management comes from the {TRIAL_PROGRAMMES[m.slug]} trial
                  programme. Read{" "}
                  <Link href={hrefForTopic(m.slug, "results")} className="font-medium text-primary underline">
                    what the trials show
                  </Link>{" "}
                  for context on realistic expectations.
                </p>
              )}
            </Section>

            <Section id="doses" title={`${m.name} doses`} intro="Treatment starts low and steps up gradually to help your body adjust.">
              <DoseTable medication={m} />
              <div className="mt-6">
                <TitrationTimeline medication={m} />
              </div>
            </Section>

            <Section id="side-effects" title={`${m.name} side effects`} intro="Select a side effect for self-care tips and guidance on when to seek help.">
              <SideEffectList medication={m} sideEffects={sideEffects} />
            </Section>

            <Section id="topics" title={`Everything about ${m.name}`}>
              <LinkGrid
                links={MEDICATION_TOPICS.map((t) => ({ href: hrefForTopic(m.slug, t), label: `${m.name} ${TOPIC_LABELS[t].toLowerCase()}` }))}
                columns={2}
              />
            </Section>

            {comparisons.length > 0 && (
              <Section id="compare" title={`How ${m.name} compares`}>
                <LinkGrid links={comparisons} columns={2} />
              </Section>
            )}

            <Section id="providers" title={`UK providers listing ${m.name}`} intro="Listed alphabetically. Provider details are being verified; we never rank by commission.">
              {providers.length ? (
                <ul className="grid gap-4 sm:grid-cols-2">
                  {providers.slice(0, 6).map((p) => (
                    <li key={p.slug}>
                      <ProviderCard provider={p} fromPath={path} />
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">We have not yet verified which providers offer {m.name}.</p>
              )}
              <ProviderComparisonCTA medication={m.slug} />
            </Section>

            <Section id="guides">
              <RelatedGuides guides={guides} title={`${m.name} guides`} />
            </Section>

            <FaqSection faqs={faqs} title={`${m.name}: frequently asked questions`} />
            <MedicalDisclaimer />
          </div>

          <aside className="hidden lg:block" aria-label="On this page">
            <nav className="sticky top-24 rounded-xl border bg-card p-5 text-sm">
              <p className="font-semibold">On this page</p>
              <ul className="mt-3 space-y-2 text-muted-foreground">
                {[
                  ["overview", "At a glance"],
                  ["doses", "Doses"],
                  ["side-effects", "Side effects"],
                  ["topics", "All topics"],
                  ["providers", "Providers"],
                  ["faqs", "FAQs"],
                ].map(([id, label]) => (
                  <li key={id}>
                    <a href={`#${id}`} className="hover:text-foreground hover:underline">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>
      </Container>
    </>
  );
}
