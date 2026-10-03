import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/layout/container";
import { Prose } from "@/components/content/prose";

export const metadata: Metadata = buildMetadata({
  title: "Medical disclaimer",
  description:
    "The information on JabsAndTabs is not medical advice. Read when to seek urgent help, how to report side effects and the limits of our information.",
  path: "/medical-disclaimer",
});

export default function Page() {
  return (
    <>
      <PageHeader
        title="Medical disclaimer"
        lead="Our content is for general information only. It is not a substitute for advice from a doctor, pharmacist or other qualified healthcare professional."
        crumbs={[{ name: "Medical disclaimer", href: "/medical-disclaimer" }]}
      />
      <Container className="py-10">
        <Prose>
          <p className="text-sm text-muted-foreground">Last updated: 3 October 2026</p>

          <h2>Not medical advice</h2>
          <p>
            Everything on JabsAndTabs, including our articles, comparisons, BMI calculator and eligibility checker, is
            general information. It does not take account of your medical history, other medicines or personal
            circumstances, and it is not a diagnosis, a recommendation or a prescription. Do not start, stop or change
            any treatment based on what you read here. Always speak to your GP, pharmacist or prescriber.
          </p>

          <h2>Prescription-only medicines</h2>
          <p>
            Mounjaro, Wegovy and the other GLP-1 medicines we write about are prescription-only medicines. They can only
            be supplied after a consultation with a qualified prescriber, who decides whether a medicine is clinically
            appropriate for you, which dose to use and how you should be monitored. Our tools do not make that decision.
            A result from our eligibility checker does not mean you will, or should, be prescribed anything.
          </p>

          <h2>When to get urgent help</h2>
          <div className="rounded-lg border-2 border-destructive/40 bg-destructive/5 p-5">
            <p className="font-semibold">Get medical help straight away, and do not take another dose until a healthcare professional has advised you, if you have:</p>
            <ul className="mt-3">
              <li>severe, persistent pain in your abdomen (tummy), which may spread to your back, with or without being sick. This can be a sign of pancreatitis;</li>
              <li>signs of a serious allergic reaction, such as swelling of the face, lips, tongue or throat, difficulty breathing or swallowing, wheezing, a fast heartbeat, or a widespread rash;</li>
              <li>sickness or diarrhoea so severe that you cannot keep fluids down, which can lead to dehydration;</li>
              <li>yellowing of your skin or the whites of your eyes, or pain in the upper right of your abdomen, which can be a sign of gallbladder or liver problems.</li>
            </ul>
            <p className="mt-3">
              Call <strong>999</strong> or go to <strong>A&amp;E</strong> in an emergency, such as difficulty breathing
              or severe swelling. For urgent advice that is not an emergency, contact <strong>NHS 111</strong> online or
              by phone, or speak to your prescriber.
            </p>
          </div>
          <p>This is not a complete list. Read the Patient Information Leaflet that comes with your medicine.</p>

          <h2>Reporting side effects</h2>
          <p>
            If you have any side effects, talk to your doctor, pharmacist or prescriber. You can also report suspected
            side effects directly to the MHRA through the{" "}
            <a href="https://yellowcard.mhra.gov.uk/" target="_blank" rel="noopener noreferrer">
              Yellow Card scheme
            </a>
            . Reporting side effects helps provide more information on the safety of medicines.
          </p>

          <h2>Who these medicines may not be suitable for</h2>
          <p>
            Weight loss medicines are not suitable for everyone. They are generally not licensed for weight management
            in people under 18, and they should not be used during pregnancy or while trying to conceive, or while
            breastfeeding, unless a prescriber advises otherwise. They may also be unsuitable for people with certain
            medical conditions or who take certain other medicines. Always tell your prescriber about your full medical
            history and anything else you take, and check with them before using any of these medicines.
          </p>

          <h2>Limits of our information</h2>
          <ul>
            <li>We work hard to keep our information accurate and current, but medical guidance, licences and provider services change, and we cannot promise that every detail is complete or up to date at the time you read it.</li>
            <li>Information about clinical trials describes average results in trial populations. Individual results vary.</li>
            <li>Articles marked &ldquo;pending clinical review&rdquo; have been fact-checked by our editorial team but not yet reviewed by a registered clinician.</li>
            <li>The SmPC and Patient Information Leaflet for your medicine, and the advice of your prescriber, always take priority over anything on this site.</li>
          </ul>
          <p>
            If you think something on our site is wrong, please tell us via our <Link href="/corrections">corrections
            page</Link>.
          </p>

          <h2>Related policies</h2>
          <ul>
            <li><Link href="/editorial-policy">Editorial policy</Link></li>
            <li><Link href="/fact-checking">Fact-checking</Link></li>
            <li><Link href="/terms">Terms of use</Link></li>
          </ul>
        </Prose>
      </Container>
    </>
  );
}
