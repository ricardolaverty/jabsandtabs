import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/layout/container";
import { Prose } from "@/components/content/prose";
import { CookiePreferencesButton } from "@/components/layout/cookie-consent";
import { site } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: "Cookie policy",
  description:
    "Which cookies JabsAndTabs uses and why. We only set one strictly necessary cookie to remember your choice, and no optional cookies without consent.",
  path: "/cookies",
});

export default function Page() {
  return (
    <>
      <PageHeader
        title="Cookie policy"
        lead="We use as few cookies as possible, and we never set optional cookies without your consent."
        crumbs={[{ name: "Cookie policy", href: "/cookies" }]}
      />
      <Container className="py-10">
        <Prose>
          <p className="text-sm text-muted-foreground">Last updated: 3 October 2026</p>

          <h2>What cookies are</h2>
          <p>
            Cookies are small text files that a website stores on your device. Similar technologies, such as local
            storage, work in a comparable way. Under the Privacy and Electronic Communications Regulations (PECR), we may
            only set cookies that are not strictly necessary if you consent to them.
          </p>

          <h2>The cookies we use</h2>
          <table>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Category</th>
                <th scope="col">Purpose</th>
                <th scope="col">Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>jt_consent</code></td>
                <td>Strictly necessary</td>
                <td>Stores your cookie choice (whether you accepted or rejected optional cookies) so we do not ask you on every page.</td>
                <td>6 months</td>
              </tr>
            </tbody>
          </table>
          <p>
            This is a first-party cookie set by {site.domain}. It does not identify you and is not shared with anyone.
          </p>

          <h2>No analytics or marketing cookies</h2>
          <p>
            We do not currently set any analytics, advertising or marketing cookies, and we do not use third-party
            tracking. If we introduce analytics in future, we will update this policy and the table above, and those
            cookies will not be set before you give consent.
          </p>
          <p>
            Our BMI calculator and eligibility checker do not use cookies to store your answers. See our{" "}
            <Link href="/privacy">privacy policy</Link>.
          </p>

          <h2>Your choices</h2>
          <p>
            When you first visit, we ask whether you accept optional cookies. &ldquo;Reject all&rdquo; is as easy to choose
            as &ldquo;Accept all&rdquo;, and rejecting does not stop you using any part of the site. You can change your
            choice at any time:
          </p>
          <div className="not-prose">
            <CookiePreferencesButton
              className="inline-flex h-10 items-center rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              label="Change cookie preferences"
            />
          </div>
          <p>
            You can also delete or block cookies through your browser settings. If you block the strictly necessary
            cookie, we will not be able to remember your choice and may ask you again.
          </p>

          <h2>Third-party websites</h2>
          <p>
            If you follow a link to another website, such as a provider or an official source, that website may set its
            own cookies. We do not control them; please check that website&apos;s cookie policy.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about cookies can be sent to <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
          </p>

          <h2>Related policies</h2>
          <ul>
            <li><Link href="/privacy">Privacy policy</Link></li>
            <li><Link href="/terms">Terms of use</Link></li>
          </ul>
        </Prose>
      </Container>
    </>
  );
}
