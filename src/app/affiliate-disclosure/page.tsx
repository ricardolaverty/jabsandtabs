import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/layout/container";
import { Prose } from "@/components/content/prose";
import { flags } from "@/config/flags";
import { site } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: "How we make money",
  description:
    "Our affiliate disclosure: JabsAndTabs does not currently earn commission or carry affiliate links. If that changes, links will be clearly labelled.",
  path: "/affiliate-disclosure",
});

export default function Page() {
  return (
    <>
      <PageHeader
        title="How we make money"
        lead="We want you to know exactly how this site is funded and what that does, and does not, mean for our content."
        crumbs={[{ name: "How we make money", href: "/affiliate-disclosure" }]}
      />
      <Container className="py-10">
        <Prose>
          <p className="text-sm text-muted-foreground">Last updated: 3 October 2026</p>

          <h2>We do not currently earn commission</h2>
          {flags.affiliateLinks ? (
            <p>
              Some links on this site are tracked affiliate links. If you follow one to a provider and then use that
              provider&apos;s service, the provider may pay us a fee. You do not pay any more because you came from our
              site. These links are labelled as described below.
              [PLACEHOLDER: list the affiliate networks or providers you have agreements with.]
            </p>
          ) : (
            <>
              <p>
                <strong>
                  {site.name} does not currently earn commission from any provider and does not carry affiliate links.
                </strong>{" "}
                Links from our comparisons point to our own provider review pages, not out to providers. No provider
                pays us for anything on this site.
              </p>
              <p>
                If that ever changes, we will update this page first and clearly label every affiliate link, as
                described below.
              </p>
            </>
          )}

          <h2>Commission would never affect rankings</h2>
          <p>
            If we ever earn commission, whether a provider pays us, and how much, will not be an input to any score or
            ranking. Every provider is assessed using the same <Link href="/methodology">published methodology</Link>.
            No provider can pay to be listed, to rank higher or to receive a more favourable review.
          </p>

          <h2>No sponsored articles</h2>
          <p>
            We do not publish sponsored articles, advertorials or paid reviews. Providers and manufacturers cannot
            commission, review or approve our editorial content. See our <Link href="/editorial-policy">editorial
            policy</Link> for more.
          </p>

          <h2>How to tell an affiliate link</h2>
          <p>If we introduce affiliate links, you will be able to recognise them because:</p>
          <ul>
            <li>they will be marked with a visible label, such as &ldquo;Affiliate link&rdquo;, next to the link or button;</li>
            <li>a disclosure will appear at the top of any page that contains them;</li>
            <li>they will carry the <code>rel=&quot;sponsored&quot;</code> attribute, which tells search engines the link is commercial; and</li>
            <li>they will lead to the provider&apos;s website, rather than to another page on {site.name}.</li>
          </ul>
          <p>Links to our own pages, and to official sources such as the NHS, MHRA or GPhC, are never affiliate links.</p>

          <h2>Questions</h2>
          <p>
            If you have any questions about how we are funded, email{" "}
            <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
          </p>

          <h2>Related policies</h2>
          <ul>
            <li><Link href="/methodology">How we compare providers</Link></li>
            <li><Link href="/editorial-policy">Editorial policy</Link></li>
          </ul>
        </Prose>
      </Container>
    </>
  );
}
