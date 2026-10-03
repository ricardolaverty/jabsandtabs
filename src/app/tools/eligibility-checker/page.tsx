import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/layout/container";
import { Prose } from "@/components/content/prose";
import { FaqSection } from "@/components/content/faq-section";
import { MedicalDisclaimer } from "@/components/content/medical-disclaimer";
import { EligibilityChecker } from "@/components/tools/eligibility-checker";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Weight-Loss Medicine Suitability Checker (Informational)",
  description:
    "A private, informational questionnaire to help you prepare for a conversation with a prescriber about weight-loss medicines. Not a prescribing decision.",
  path: "/tools/eligibility-checker",
});

const faqs = [
  {
    q: "Does this checker tell me whether I can have a weight-loss medicine?",
    a: "No. It is an informational tool that reflects the general criteria in UK product licences and highlights important cautions. It cannot assess your full medical history, examine you or review your medicines. Only a registered prescriber, after a proper consultation, can decide whether a weight-loss medicine is safe and suitable for you.",
  },
  {
    q: "Why does the checker ask about pancreatitis and thyroid cancer?",
    a: "A history of pancreatitis, or a personal or family history of medullary thyroid cancer or multiple endocrine neoplasia type 2 (MEN2), are important cautions or contraindications for GLP-1 medicines. Any prescriber will need to know about them. If you tick either, the summary highlights it so you remember to raise it.",
  },
  {
    q: "What happens in a real online consultation?",
    a: "A regulated online provider will usually ask detailed questions about your health, medicines and weight history, and should verify your identity. Many also ask for evidence of your weight, such as a photo or video, or confirmation from your GP. A prescriber reviews your answers and may ask follow-up questions or decline to prescribe.",
  },
  {
    q: "Why do my BMI thresholds depend on my family background?",
    a: "NICE recommends lower BMI thresholds for people of South Asian, Chinese, other Asian, Middle Eastern, Black African or African-Caribbean family background, because the risk of conditions such as type 2 diabetes rises at a lower BMI. A prescriber will take this into account when assessing you.",
  },
  {
    q: "Are my answers saved or shared?",
    a: "No. The questionnaire runs entirely in your web browser. Your answers are not sent to us, not saved on your device and are cleared when you leave or refresh the page, or choose Start again. We cannot see what you enter.",
  },
];

export default function EligibilityCheckerPage() {
  return (
    <>
      <PageHeader
        eyebrow="Tools"
        title="Weight-loss medicine suitability checker"
        lead="Answer a few questions to see what a prescriber is likely to consider, including important cautions to mention. Informational only: this is never a prescribing decision."
        crumbs={[
          { name: "Tools", href: "/tools" },
          { name: "Suitability checker", href: "/tools/eligibility-checker" },
        ]}
      />
      <Container className="py-10 md:py-14">
        <div className="mx-auto max-w-3xl">
          <EligibilityChecker />

          <Prose className="mt-4">
            <h2>How prescribers assess suitability</h2>
            <p>
              Weight-loss medicines such as Mounjaro and Wegovy are prescription-only. Before prescribing, a GP,
              pharmacist independent prescriber or other registered prescriber will normally consider:
            </p>
            <ul>
              <li>
                <strong>Your BMI</strong>, and whether you have weight-related conditions. At the time of writing, the
                product licences for Mounjaro and Wegovy cover adults with a BMI of 30 or more, or 27 or more with at
                least one weight-related condition. Check the current SmPC, as licences can change.
              </li>
              <li>
                <strong>Your family background</strong>, as NICE recommends lower BMI thresholds for some groups.
                Read more about <Link href="/tools/bmi-calculator">calculating your BMI</Link>.
              </li>
              <li>
                <strong>Your medical history</strong>, including conditions that are cautions or contraindications,
                such as pancreatitis, medullary thyroid cancer or MEN2, and eating disorders.
              </li>
              <li>
                <strong>Your current medicines</strong>, especially insulin and sulfonylureas, which can increase the
                risk of low blood sugar when combined with these medicines.
              </li>
              <li>
                <strong>Pregnancy and plans to conceive</strong>, because GLP-1 weight-loss medicines should not be
                used in pregnancy.
              </li>
            </ul>
            <p>
              NHS access follows NICE guidance, which uses its own criteria and is not the same as the product
              licence. See <Link href="/guides/who-can-get-weight-loss-injections">who can get weight-loss injections</Link>{" "}
              and <Link href="/guides/who-should-not-take-glp1s">who should not take GLP-1 medicines</Link>.
            </p>

            <h2>Why honesty in online consultations matters</h2>
            <p>
              Online consultations rely on the information you give. Inaccurate answers about your weight, health or
              medicines can lead to a medicine being prescribed when it is not safe for you. Regulated providers are
              expected to verify your identity and take reasonable steps to confirm your weight, for example by asking
              for a photo, a video consultation or information from your GP. These checks are there to protect you.
            </p>
            <p>
              If you are considering a private service, you can{" "}
              <Link href="/providers">compare regulated providers</Link> and how they carry out their consultations.
            </p>

            <h2>What this tool does not do</h2>
            <ul>
              <li>It does not decide whether you can have a medicine, and it is not a prescribing decision.</li>
              <li>It does not cover every condition, medicine or caution a prescriber will ask about.</li>
              <li>It does not replace advice from your GP, pharmacist or another registered prescriber.</li>
              <li>
                It does not collect or store your answers. Everything runs in your browser and nothing is sent to us.
              </li>
            </ul>
          </Prose>

          <FaqSection faqs={faqs} />
          <MedicalDisclaimer />
        </div>
      </Container>
    </>
  );
}
