import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/layout/container";
import { Prose } from "@/components/content/prose";
import { site } from "@/config/site";
import { NOT_VERIFIED } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Fact-checking process",
  description:
    "How we check medical facts and verify provider details against the GPhC and CQC registers, why some fields say Not yet verified, and how to report an error.",
  path: "/fact-checking",
});

export default function Page() {
  return (
    <>
      <PageHeader
        title="Our fact-checking process"
        lead="How we check what we publish, and what we do when information cannot yet be confirmed."
        crumbs={[{ name: "Fact-checking", href: "/fact-checking" }]}
      />
      <Container className="py-10">
        <Prose>
          <p className="text-sm text-muted-foreground">Last updated: 3 October 2026</p>

          <h2>How we check articles</h2>
          <ol>
            <li><strong>Research from primary sources.</strong> The writer works from the sources set out in our <Link href="/editorial-policy">editorial policy</Link>, starting with the SmPC, MHRA, NICE and NHS.</li>
            <li><strong>Every claim is referenced.</strong> Each medical or regulatory claim is linked to a specific source, which is listed at the end of the article.</li>
            <li><strong>Independent fact-check.</strong> A second member of the editorial team checks each claim, figure and link against the original source, not against a summary.</li>
            <li><strong>Compliance check.</strong> We check that the article is balanced, includes relevant safety information and does not promote prescription-only medicines or include prices.</li>
            <li><strong>Clinical review.</strong> A registered clinician (GPhC, GMC or NMC) reviews the article for medical accuracy. Until this has happened, the article is clearly marked as pending clinical review.</li>
            <li><strong>Publication and monitoring.</strong> We record the date of publication and update, and monitor sources for changes.</li>
          </ol>

          <h2>How we verify provider information</h2>
          <p>Before any factual detail about a provider is shown as verified, we check it against a primary source:</p>
          <ul>
            <li>
              <strong>Pharmacy registration:</strong> checked on the{" "}
              <a href="https://www.pharmacyregulation.org/registers" target="_blank" rel="noopener noreferrer">
                General Pharmaceutical Council (GPhC) register
              </a>
              , including the registered pharmacy premises and any conditions or enforcement.
            </li>
            <li>
              <strong>Doctor-led services in England:</strong> checked on the{" "}
              <a href="https://www.cqc.org.uk/" target="_blank" rel="noopener noreferrer">
                Care Quality Commission (CQC)
              </a>{" "}
              website, including registration status and the latest inspection report. Services in Scotland, Wales and
              Northern Ireland are checked with the relevant regulator.
            </li>
            <li>
              <strong>Service details</strong> (such as consultation process, delivery options, support channels and
              cancellation terms): checked on the provider&apos;s own published website and terms, with the date and
              page recorded.
            </li>
            <li>
              <strong>Customer review scores:</strong> checked on the independent review platform, recording the score,
              the number of reviews and the date checked.
            </li>
          </ul>
          <p>
            We record the source and date for each fact. We do not accept a provider&apos;s word alone for regulatory
            details, and we never use non-public information.
          </p>

          <h2>Why some fields say &ldquo;{NOT_VERIFIED}&rdquo;</h2>
          <p>
            If we have not yet confirmed a detail from a primary source, we show &ldquo;{NOT_VERIFIED}&rdquo; rather than
            guess or copy unchecked information. This is deliberate. A blank that is honestly labelled is more useful to
            you than a figure that might be wrong. Providers whose key details are not yet verified are listed
            alphabetically and are not scored. Always check a provider&apos;s registration yourself before using its
            service.
          </p>

          <h2>How often we re-verify</h2>
          <ul>
            <li>Regulatory registration (GPhC, CQC) is re-checked at least every three months, and immediately if we become aware of enforcement action or a change in status.</li>
            <li>Service details and customer review scores are re-checked at least every three months.</li>
            <li>Medication information is reviewed at least every six months, or sooner when official guidance changes.</li>
          </ul>
          <p>Each provider page shows when it was last verified. [PLACEHOLDER: confirm these intervals are achievable before launch.]</p>

          <h2>Reporting an error</h2>
          <p>
            If you spot something that is wrong or out of date, please tell us. Email{" "}
            <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a> with the page address, what you think is
            wrong and, if possible, a link to a reliable source. See our <Link href="/corrections">corrections
            policy</Link> for how we handle reports, or our <Link href="/contact">contact page</Link> for other
            enquiries.
          </p>

          <h2>Related policies</h2>
          <ul>
            <li><Link href="/editorial-policy">Editorial policy</Link></li>
            <li><Link href="/methodology">How we compare providers</Link></li>
            <li><Link href="/corrections">Corrections</Link></li>
          </ul>
        </Prose>
      </Container>
    </>
  );
}
