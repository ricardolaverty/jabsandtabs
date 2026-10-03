import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/layout/container";
import { Prose } from "@/components/content/prose";
import { site } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: "Contact us",
  description:
    "How to contact the JabsAndTabs editorial team about corrections, provider information or press enquiries. We cannot give personal medical advice.",
  path: "/contact",
});

export default function Page() {
  return (
    <>
      <PageHeader
        title="Contact us"
        lead="Get in touch with the editorial team about corrections, provider information or press enquiries."
        crumbs={[{ name: "Contact", href: "/contact" }]}
      />
      <Container className="py-10">
        <Prose>
          <p className="text-sm text-muted-foreground">Last updated: 3 October 2026</p>

          <div className="rounded-lg border bg-card p-5">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Editorial team</p>
            <p className="mt-2 flex items-center gap-2 text-lg">
              <Mail aria-hidden="true" className="size-5 text-primary" />
              <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">We aim to reply within five working days.</p>
          </div>

          <h2>What you can contact us about</h2>
          <ul>
            <li><strong>Corrections:</strong> if you think something on the site is wrong or out of date. Please include the page address and, if possible, a reliable source. See our <Link href="/corrections">corrections policy</Link>.</li>
            <li><strong>Provider information updates:</strong> if you represent a provider and your details have changed or are incorrect.</li>
            <li><strong>Concerns about independence:</strong> if you think any commercial relationship has affected our content.</li>
            <li><strong>Privacy requests:</strong> to exercise your data protection rights. See our <Link href="/privacy">privacy policy</Link>.</li>
            <li><strong>Press and general enquiries.</strong></li>
          </ul>

          <h2>Please do not send personal medical details</h2>
          <p>
            We are not a pharmacy or a healthcare provider, and we cannot give medical advice, recommend a treatment or
            tell you whether a medicine is right for you. Please do not send us information about your health,
            medicines or symptoms.
          </p>
          <ul>
            <li>For advice about your treatment, speak to your GP, a pharmacist or your prescriber.</li>
            <li>For urgent medical advice, contact NHS 111 online or by phone.</li>
            <li>In an emergency, call 999 or go to A&amp;E.</li>
            <li>For questions about an order or prescription, contact the provider you used directly.</li>
          </ul>

          <h2>Provider correction requests</h2>
          <p>
            We welcome corrections from providers, but we can only change information we can verify. Please email from
            an address at your organisation&apos;s official domain and include evidence, for example:
          </p>
          <ul>
            <li>a link to your entry on the GPhC or CQC register;</li>
            <li>a link to the page on your website where the information is published; and</li>
            <li>the exact change you are asking us to make.</li>
          </ul>
          <p>
            Corrections do not change how we score providers. We apply our <Link href="/methodology">methodology</Link>{" "}
            in the same way to every provider, and we do not accept payment for changes to listings or rankings.
          </p>

          <h2>Postal address</h2>
          <p>
            {site.publisher.legalName}
            <br />
            {site.publisher.address}
          </p>

          <h2>Related policies</h2>
          <ul>
            <li><Link href="/about">About us</Link></li>
            <li><Link href="/corrections">Corrections</Link></li>
            <li><Link href="/medical-disclaimer">Medical disclaimer</Link></li>
          </ul>
        </Prose>
      </Container>
    </>
  );
}
