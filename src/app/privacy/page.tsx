import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/layout/container";
import { Prose } from "@/components/content/prose";
import { site } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: "Privacy policy",
  description:
    "How JabsAndTabs handles personal data under UK GDPR and the Data Protection Act 2018. We collect very little and never collect health data through our tools.",
  path: "/privacy",
});

export default function Page() {
  const mail = <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>;
  return (
    <>
      <PageHeader
        title="Privacy policy"
        lead="We collect as little personal data as possible. This notice explains what we do collect, why, and your rights."
        crumbs={[{ name: "Privacy policy", href: "/privacy" }]}
      />
      <Container className="py-10">
        <Prose>
          <p className="text-sm text-muted-foreground">Last updated: 3 October 2026</p>

          <h2>Who we are</h2>
          <p>
            This privacy notice explains how {site.name} ({site.domain}) uses personal data, in line with the UK General
            Data Protection Regulation (UK GDPR) and the Data Protection Act 2018. The data controller is:
          </p>
          <ul>
            <li><strong>Name:</strong> {site.publisher.legalName}</li>
            <li><strong>Address:</strong> {site.publisher.address}</li>
            <li><strong>Company number:</strong> {site.publisher.companyNumber}</li>
            <li><strong>ICO registration number:</strong> {site.publisher.icoRegistration}</li>
            <li><strong>Contact:</strong> {mail}</li>
          </ul>
          <p>
            {site.name} is not a pharmacy or healthcare provider. If you use a provider&apos;s service after visiting our
            site, that provider is the controller of any data you give it, and its own privacy notice applies.
          </p>

          <h2>We do not collect health data</h2>
          <p>
            Our <Link href="/tools/bmi-calculator">BMI calculator</Link> and{" "}
            <Link href="/tools/eligibility-checker">eligibility checker</Link> run entirely in your web browser. The
            height, weight and other answers you enter are processed on your own device and are not sent to us, stored
            by us or shared with anyone. When you close or refresh the page, they are gone. We do not ask for, and do not
            want, information about your health. Please do not include health details if you email us.
          </p>

          <h2>The personal data we collect</h2>
          <h3>Server logs</h3>
          <p>
            When you visit the site, our hosting provider automatically processes technical information needed to
            deliver and secure the website, such as your IP address, browser type, the page requested and the date and
            time. These logs are held by the hosting provider and are used for security, fault-finding and preventing
            abuse.
          </p>
          <h3>Your cookie choice</h3>
          <p>
            When you accept or reject optional cookies, we store your choice in a strictly necessary cookie on your
            device so we do not ask you again on every page. See our <Link href="/cookies">cookie policy</Link>.
          </p>
          <h3>Anonymous link click counts</h3>
          <p>
            If you follow a link from our site to a provider, we may record that the link was clicked. We record only
            which link was used, the page path it was on and a timestamp. We do not record your IP address, any cookie
            or device identifier, or anything else that could identify you, so this information is not personal data.
          </p>
          <h3>Emails you send us</h3>
          <p>
            If you email us, we receive your email address, your name if you include it, and the content of your
            message. We use this only to respond to you and to act on your message, for example to correct an error.
          </p>
          <p>
            We do not currently use analytics, advertising or tracking cookies, and we do not sell or share personal data
            for marketing.
          </p>

          <h2>Our lawful bases</h2>
          <ul>
            <li><strong>Server logs:</strong> legitimate interests, in running a secure and reliable website.</li>
            <li><strong>Cookie choice:</strong> legitimate interests and compliance with a legal obligation (the Privacy and Electronic Communications Regulations require us to remember your choice). The cookie is strictly necessary, so consent is not required for it.</li>
            <li><strong>Emails:</strong> legitimate interests, in responding to enquiries and keeping our content accurate. If you are a provider contacting us about a listing, the same basis applies.</li>
          </ul>
          <p>If we ever introduce optional analytics or marketing cookies, we will only set them with your consent.</p>

          <h2>Who we share data with</h2>
          <p>We use the following service providers (processors), who process data only on our instructions:</p>
          <ul>
            <li><strong>Website hosting:</strong> [PLACEHOLDER: hosting provider, e.g. Vercel Inc.], which hosts the site and holds server logs.</li>
            <li><strong>Database:</strong> [PLACEHOLDER: database provider], which stores site content and anonymous link click counts.</li>
            <li><strong>Email:</strong> [PLACEHOLDER: email provider], which handles our editorial mailbox.</li>
          </ul>
          <p>
            We may also disclose information if required by law or to protect the rights and safety of others. We do not
            sell personal data.
          </p>

          <h2>International transfers</h2>
          <p>
            Some of our service providers may process data outside the UK, for example in the United States or the
            European Economic Area. Where this happens, we make sure appropriate safeguards are in place, such as UK
            adequacy regulations, the UK International Data Transfer Agreement or the UK Addendum to the EU Standard
            Contractual Clauses. [PLACEHOLDER: confirm the transfer mechanism used by each processor.]
          </p>

          <h2>How long we keep data</h2>
          <ul>
            <li><strong>Server logs:</strong> kept by our hosting provider for a limited period in line with its retention settings. [PLACEHOLDER: confirm retention period.]</li>
            <li><strong>Cookie choice:</strong> stored on your device for six months, after which we will ask again.</li>
            <li><strong>Emails:</strong> kept for up to two years after our last contact, or longer if needed to record a correction or deal with a dispute. [PLACEHOLDER: confirm.]</li>
            <li><strong>Anonymous click counts:</strong> not personal data; kept for as long as needed for reporting.</li>
          </ul>

          <h2>Your rights</h2>
          <p>Under UK data protection law, you have the right to:</p>
          <ul>
            <li><strong>access</strong> the personal data we hold about you;</li>
            <li>have inaccurate data <strong>corrected</strong> (rectification);</li>
            <li>have your data <strong>deleted</strong> (erasure) in certain circumstances;</li>
            <li><strong>restrict</strong> how we use your data in certain circumstances;</li>
            <li><strong>object</strong> to our use of your data where we rely on legitimate interests; and</li>
            <li>receive your data in a portable format (<strong>portability</strong>) where this applies.</li>
          </ul>
          <p>
            To exercise any of these rights, email {mail}. We will respond within one month. There is normally no
            charge. We may need to confirm your identity before acting on a request.
          </p>

          <h2>Complaints</h2>
          <p>
            If you are unhappy with how we have handled your data, please contact us first so we can try to put it
            right. You also have the right to complain to the Information Commissioner&apos;s Office (ICO), the UK data
            protection regulator:{" "}
            <a href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noopener noreferrer">
              ico.org.uk/make-a-complaint
            </a>
            .
          </p>

          <h2>Changes to this notice</h2>
          <p>
            We will update this notice if we change how we use personal data, for example if we introduce analytics. The
            date at the top shows when it was last changed. Significant changes will be highlighted on the site.
          </p>

          <h2>Related policies</h2>
          <ul>
            <li><Link href="/cookies">Cookie policy</Link></li>
            <li><Link href="/terms">Terms of use</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </Prose>
      </Container>
    </>
  );
}
