import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/layout/container";
import { Prose } from "@/components/content/prose";
import { site } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: "Terms of use",
  description:
    "The terms that apply when you use JabsAndTabs: information only, no medical advice, third-party providers, intellectual property and liability.",
  path: "/terms",
});

export default function Page() {
  return (
    <>
      <PageHeader
        title="Terms of use"
        lead="Please read these terms before using the site. By using JabsAndTabs, you agree to them."
        crumbs={[{ name: "Terms of use", href: "/terms" }]}
      />
      <Container className="py-10">
        <Prose>
          <p className="text-sm text-muted-foreground">Last updated: 3 October 2026</p>
          <p>[PLACEHOLDER: these terms are a draft and must be reviewed by a qualified legal adviser before launch.]</p>

          <h2>1. Who we are</h2>
          <p>
            {site.domain} (&ldquo;{site.name}&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is operated by{" "}
            {site.publisher.legalName}, of {site.publisher.address} (company number: {site.publisher.companyNumber}).
            You can contact us at <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
          </p>

          <h2>2. Information only</h2>
          <p>
            The site provides general information about weight loss medicines and the online providers that offer them.
            It is for personal, non-commercial use. We are not a pharmacy, doctor service or healthcare provider, and we
            do not prescribe, sell or supply any medicine.
          </p>

          <h2>3. No medical advice</h2>
          <p>
            Nothing on the site is medical advice or a substitute for a consultation with a qualified healthcare
            professional. Our tools, including the BMI calculator and eligibility checker, give general information only
            and do not decide whether a medicine is suitable for you. Only a prescriber who has assessed you can make that
            decision. Please read our <Link href="/medical-disclaimer">medical disclaimer</Link>.
          </p>

          <h2>4. Third-party websites and providers</h2>
          <p>
            The site links to other websites, including providers and official sources. We do not control those
            websites and are not responsible for their content, availability, privacy practices or services. If you use
            a provider&apos;s service, your contract is with that provider, not with us. The provider is responsible for
            its consultations, prescribing decisions, medicines, prices, delivery and customer service. Please check a
            provider&apos;s regulatory registration and terms before using it.
          </p>

          <h2>5. Accuracy</h2>
          <p>
            We take care to keep information accurate and up to date, and we follow our{" "}
            <Link href="/editorial-policy">editorial policy</Link> and <Link href="/fact-checking">fact-checking
            process</Link>. However, medical guidance, licences and provider information change, and we cannot promise
            that every part of the site is complete, accurate or current at all times. Where we have not verified a detail,
            we say so. If you spot an error, please tell us via our <Link href="/corrections">corrections page</Link>.
          </p>

          <h2>6. Rankings and our commercial relationships</h2>
          <p>
            Our provider comparisons follow our published <Link href="/methodology">methodology</Link>. How we are
            funded is explained on our <Link href="/affiliate-disclosure">how we make money</Link> page.
          </p>

          <h2>7. Intellectual property</h2>
          <p>
            The content, design and branding of the site belong to us or our licensors and are protected by copyright and
            other intellectual property rights. You may view, print or share links to pages for your own personal use.
            You must not copy, republish, scrape or commercially exploit our content without our written permission.
            Brand names of medicines and providers belong to their respective owners and are used for identification
            only.
          </p>

          <h2>8. Acceptable use</h2>
          <p>
            You must not use the site in any unlawful way, attempt to gain unauthorised access to it, introduce malicious
            code, or interfere with its operation.
          </p>

          <h2>9. Our liability</h2>
          <p>
            Nothing in these terms excludes or limits our liability for death or personal injury caused by our
            negligence, for fraud or fraudulent misrepresentation, or for anything else that cannot be excluded or limited
            under the law of England and Wales, including your rights under consumer law such as the Consumer Rights Act
            2015.
          </p>
          <p>
            Subject to that, the site is provided free of charge for information, and we are not liable for any loss or
            damage arising from your reliance on information on the site, from decisions you make about treatment, or
            from your use of any third-party website or provider. We are not liable for business losses. [PLACEHOLDER:
            legal adviser to confirm liability wording.]
          </p>

          <h2>10. Governing law</h2>
          <p>
            These terms are governed by the law of England and Wales, and the courts of England and Wales have
            jurisdiction. If you live in Scotland or Northern Ireland, you may also bring proceedings in your local
            courts. [PLACEHOLDER: confirm governing law and jurisdiction.]
          </p>

          <h2>11. Changes to these terms</h2>
          <p>
            We may update these terms from time to time. The date at the top of this page shows when they were last
            changed. Your continued use of the site after a change means you accept the updated terms.
          </p>

          <h2>Related policies</h2>
          <ul>
            <li><Link href="/privacy">Privacy policy</Link></li>
            <li><Link href="/cookies">Cookie policy</Link></li>
            <li><Link href="/medical-disclaimer">Medical disclaimer</Link></li>
          </ul>
        </Prose>
      </Container>
    </>
  );
}
