import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/layout/container";
import { Prose } from "@/components/content/prose";
import { site } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: "Corrections policy and log",
  description:
    "How we correct mistakes on JabsAndTabs, the difference between a correction and an update, our public corrections log and how to report an error.",
  path: "/corrections",
});

export default function Page() {
  return (
    <>
      <PageHeader
        title="Corrections"
        lead="When we get something wrong, we fix it quickly and say so openly."
        crumbs={[{ name: "Corrections", href: "/corrections" }]}
      />
      <Container className="py-10">
        <Prose>
          <p className="text-sm text-muted-foreground">Last updated: 3 October 2026</p>

          <h2>Our corrections policy</h2>
          <p>
            We aim to be accurate, but mistakes can happen. When we find, or are told about, an error, we check it
            against primary sources. If we confirm it, we correct the page as quickly as possible, normally within two
            working days, and sooner for anything that could affect someone&apos;s safety. We do not quietly remove or
            rewrite mistakes.
          </p>

          <h2>Corrections and updates</h2>
          <p><strong>A correction</strong> is when we change content because it was wrong when published. For example:</p>
          <ul>
            <li>an incorrect dose, side effect, licence status or other medical fact;</li>
            <li>incorrect regulatory or service details for a provider;</li>
            <li>a score that was calculated wrongly, or a misattributed source.</li>
          </ul>
          <p>
            <strong>An update</strong> is when we change content because something has changed or to improve it, for
            example a new MHRA safety update, a new trial, a change to a provider&apos;s service, or clearer wording.
            Updates change the &ldquo;last updated&rdquo; date on the page but are not listed as corrections. Spelling and
            formatting fixes that do not change meaning are not logged.
          </p>

          <h2>How we log corrections</h2>
          <p>For every correction, we:</p>
          <ul>
            <li>add a dated correction note to the affected page explaining what was wrong and what we changed;</li>
            <li>record it in the corrections log below; and</li>
            <li>keep an internal record of who made the change and the source used to verify it.</li>
          </ul>
          <p>
            Changes to provider scores, and any removal or suspension of a provider, are also recorded here, in line with
            our <Link href="/methodology">methodology</Link>.
          </p>

          <h2>Corrections log</h2>
          <table>
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Page</th>
                <th scope="col">What was corrected</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={3}>No corrections have been recorded yet.</td>
              </tr>
            </tbody>
          </table>

          <h2>How to report an error</h2>
          <p>
            Email <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a> and include:
          </p>
          <ul>
            <li>the address of the page;</li>
            <li>what you believe is wrong; and</li>
            <li>if possible, a link to a reliable source, such as the SmPC, MHRA, NICE, NHS, GPhC or CQC.</li>
          </ul>
          <p>
            Providers asking us to correct their own details must include evidence; see our{" "}
            <Link href="/contact">contact page</Link>. Please do not include personal medical information in your
            message. We will reply to let you know what we have decided.
          </p>

          <h2>Related policies</h2>
          <ul>
            <li><Link href="/fact-checking">Fact-checking</Link></li>
            <li><Link href="/editorial-policy">Editorial policy</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </Prose>
      </Container>
    </>
  );
}
