import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/layout/container";
import { Prose } from "@/components/content/prose";
import { site } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: "About us",
  description:
    "Who we are and what we do: independent, evidence-based guides to UK weight loss medicines and the regulated online providers that prescribe them.",
  path: "/about",
});

export default function Page() {
  return (
    <>
      <PageHeader
        title="About JabsAndTabs"
        lead="Independent, evidence-based information about UK weight loss medicines and the regulated online services that prescribe them."
        crumbs={[{ name: "About us", href: "/about" }]}
      />
      <Container className="py-10">
        <Prose>
          <p className="text-sm text-muted-foreground">Last updated: 3 October 2026</p>

          <h2>Who we are</h2>
          <p>
            {site.name} is an independent publisher that explains GLP-1 and related weight loss medicines, such as
            Mounjaro (tirzepatide) and Wegovy (semaglutide), in plain English. We also compare the UK online pharmacies
            and doctor services that offer weight management consultations, using a{" "}
            <Link href="/methodology">published methodology</Link>.
          </p>
          <p>
            The site is published by {site.publisher.legalName}. It is a non-commercial project: we do not currently
            earn commission or carry affiliate links. See <Link href="/affiliate-disclosure">how we make money</Link>{" "}
            for details.
          </p>

          <h2>What we do</h2>
          <ul>
            <li>Publish educational guides on how weight loss medicines work, their side effects, dosing and eligibility, based on official sources.</li>
            <li>Compare regulated UK providers on regulation, transparency, clinical process, delivery and customer reviews.</li>
            <li>Provide simple informational tools, such as a BMI calculator and an eligibility checker, that run entirely in your browser.</li>
            <li>Correct mistakes openly and keep a public <Link href="/corrections">corrections log</Link>.</li>
          </ul>

          <h2>What we do not do</h2>
          <ul>
            <li>We are not a pharmacy, a doctor service or a healthcare provider.</li>
            <li>We do not prescribe, sell, supply or dispense any medicine.</li>
            <li>We do not offer consultations or give personal medical advice. Only a prescriber who has assessed you can decide whether a medicine is suitable.</li>
            <li>We do not accept payment for reviews, rankings or articles.</li>
          </ul>
          <p>
            Please read our <Link href="/medical-disclaimer">medical disclaimer</Link> before relying on anything you
            read here.
          </p>

          <h2>Our mission</h2>
          <p>
            Weight loss medicines are now widely available through online services, and the choices can be confusing.
            Our aim is to help people understand the medicines and the safety checks that matter, so they can have a
            better-informed conversation with a GP, pharmacist or prescriber, and choose a regulated service with their
            eyes open.
          </p>

          <h2>How our content is made</h2>
          <p>
            Our articles are researched from primary sources: the Summary of Product Characteristics (SmPC) for each
            medicine, the MHRA, NICE, the NHS and peer-reviewed clinical trials. We do not promote prescription-only
            medicines, we do not include prices in our editorial copy, and every article carries a review status so you
            can see whether it has been clinically reviewed. Read more in our{" "}
            <Link href="/editorial-policy">editorial policy</Link> and{" "}
            <Link href="/fact-checking">fact-checking process</Link>.
          </p>

          <h2>Our team</h2>
          <p>
            Our content is written and maintained by the{" "}
            <Link href="/authors/editorial-team">JabsAndTabs editorial team</Link>. We are in the process of appointing
            independent medical reviewers who are registered with the GPhC, GMC or NMC. Until a named, registered
            clinician has reviewed an article, it is clearly marked as awaiting clinical review. We will publish each
            reviewer&apos;s name and registration details when they are appointed.
          </p>

          <h2>How we are funded</h2>
          <p>
            We may earn commission from some providers in future. Commission never affects our rankings. See{" "}
            <Link href="/affiliate-disclosure">how we make money</Link> for details.
          </p>

          <h2>Contact us</h2>
          <p>
            You can reach the editorial team at <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>. Please
            do not send personal medical details. See our <Link href="/contact">contact page</Link> for more
            information.
          </p>

          <h2>Related policies</h2>
          <ul>
            <li><Link href="/editorial-policy">Editorial policy</Link></li>
            <li><Link href="/methodology">How we compare providers</Link></li>
            <li><Link href="/affiliate-disclosure">How we make money</Link></li>
          </ul>
        </Prose>
      </Container>
    </>
  );
}
