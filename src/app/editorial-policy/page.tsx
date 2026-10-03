import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/layout/container";
import { Prose } from "@/components/content/prose";
import { Badge } from "@/components/ui/badge";
import { site } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: "Editorial policy",
  description:
    "How we research, write, review and update our guides to UK weight loss medicines, including our sourcing rules, clinical review process and use of AI tools.",
  path: "/editorial-policy",
});

export default function Page() {
  return (
    <>
      <PageHeader
        title="Editorial policy"
        lead="The standards every article on JabsAndTabs is held to, from the sources we use to who signs it off."
        crumbs={[{ name: "Editorial policy", href: "/editorial-policy" }]}
      />
      <Container className="py-10">
        <Prose>
          <p className="text-sm text-muted-foreground">Last updated: 3 October 2026</p>

          <h2>Our principles</h2>
          <ul>
            <li><strong>Accuracy first.</strong> Every factual claim must be supported by a reliable, named source.</li>
            <li><strong>Balance.</strong> We cover benefits, risks, side effects and limitations together, and we explain who a medicine is not suitable for.</li>
            <li><strong>Clarity.</strong> We write in plain English and explain medical terms.</li>
            <li><strong>Independence.</strong> No provider, manufacturer or advertiser can review, approve or influence our editorial content before publication.</li>
            <li><strong>Transparency.</strong> We explain <Link href="/affiliate-disclosure">how we make money</Link>, and we correct mistakes openly.</li>
          </ul>

          <h2>Our sourcing hierarchy</h2>
          <p>We rely on sources in roughly this order of authority:</p>
          <ol>
            <li>The Summary of Product Characteristics (SmPC) and Patient Information Leaflet for each medicine, published on the electronic medicines compendium (EMC).</li>
            <li>The Medicines and Healthcare products Regulatory Agency (MHRA), including licensing decisions and safety updates.</li>
            <li>The National Institute for Health and Care Excellence (NICE), including technology appraisals and guidelines.</li>
            <li>NHS guidance and NHS website content.</li>
            <li>Peer-reviewed clinical trials and systematic reviews published in recognised medical journals.</li>
          </ol>
          <p>
            We do not use press releases, social media posts, forums or provider marketing as evidence for medical
            claims. Where official sources disagree or the evidence is uncertain, we say so. Where the UK regulatory
            status of a medicine is uncertain or changing, we describe it as such and advise readers to check the MHRA
            and the current SmPC. Sources are listed at the end of each article.
          </p>

          <h2>No promotion of prescription-only medicines</h2>
          <p>
            Mounjaro, Wegovy and the other GLP-1 medicines we cover are prescription-only medicines. Advertising
            prescription-only medicines to the public is prohibited in the UK under the Human Medicines Regulations 2012,
            and rule 12.12 of the CAP Code (the UK Code of Non-broadcast Advertising) applies the same restriction to
            marketing communications. Our content is therefore educational and balanced. We do not encourage anyone to
            obtain a particular medicine, we do not use promotional or urgent language, and we do not publish discount
            codes for prescription-only medicines. Brand names are used only to identify medicines factually.
          </p>

          <h2>No prices in editorial copy</h2>
          <p>
            Prices change frequently and differ between providers. To avoid out-of-date or promotional information, we
            do not include prices in our articles. Instead, we explain what affects the cost of treatment and point
            readers to our <Link href="/prices">prices section</Link>, which only shows price information where it is
            permitted and recorded with a date and source.
          </p>

          <h2>Review status and clinical sign-off</h2>
          <p>Every article carries one of three review statuses, shown on the page:</p>
          <ul>
            <li>
              <Badge variant="secondary">Draft</Badge> The article is being researched and written. Drafts are not
              published.
            </li>
            <li>
              <Badge variant="warning">Pending clinical review</Badge> The article has been written and fact-checked by
              the editorial team but has not yet been reviewed by a clinician.
            </li>
            <li>
              <Badge variant="success">Clinically reviewed</Badge> A named clinician has reviewed the article for
              medical accuracy and balance.
            </li>
          </ul>
          <p>
            Only a named clinician who holds current registration with the General Pharmaceutical Council (GPhC), the
            General Medical Council (GMC) or the Nursing and Midwifery Council (NMC) can mark an article as clinically
            reviewed. The reviewer&apos;s name, profession and registration number are shown on the article and can be
            checked on the relevant public register. We are currently appointing medical reviewers; until then, articles
            are marked as pending clinical review.
          </p>

          <h2>Keeping content up to date</h2>
          <ul>
            <li>Every article shows the date it was last updated.</li>
            <li>We review medication guides at least every six months, and sooner when there is a relevant change, such as a new licence, an MHRA safety update, new NICE guidance or a significant new trial.</li>
            <li>Provider information is re-verified on the schedule described in our <Link href="/fact-checking">fact-checking process</Link>.</li>
            <li>Significant changes to facts are recorded on our <Link href="/corrections">corrections page</Link>.</li>
          </ul>

          <h2>Use of AI and automation</h2>
          <p>
            We may use AI tools to help with research organisation, outlining, first drafts, summarising source documents
            and checking spelling and consistency. We follow these rules:
          </p>
          <ul>
            <li>A human editor is responsible for every published article.</li>
            <li>Every factual claim, figure and reference is checked by a person against the original source before publication.</li>
            <li>No AI-generated medical claim is published unless it has been verified against a primary source and the article has gone through our review workflow.</li>
            <li>AI tools are never used to invent sources, quotes, experts, reviews or patient stories.</li>
            <li>We do not enter personal or health data about any individual into AI tools.</li>
          </ul>
          <p>[PLACEHOLDER: confirm which AI tools are used and whether you wish to label AI-assisted articles individually.]</p>

          <h2>Independence from advertisers and providers</h2>
          <p>
            Providers cannot pay for coverage, request favourable changes or see articles before they are published.
            Providers may tell us about factual errors in their listings, and we will correct anything we can verify
            against evidence. Any commission we may earn in future has no influence on what we write or how providers
            are ranked. We do not publish sponsored articles.
          </p>
          <p>
            Questions about this policy can be sent to <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
          </p>

          <h2>Related policies</h2>
          <ul>
            <li><Link href="/fact-checking">Fact-checking</Link></li>
            <li><Link href="/corrections">Corrections</Link></li>
            <li><Link href="/medical-disclaimer">Medical disclaimer</Link></li>
          </ul>
        </Prose>
      </Container>
    </>
  );
}
