import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Logo } from "@/components/layout/logo";
import { CookiePreferencesButton } from "@/components/layout/cookie-consent";
import { site } from "@/config/site";
import { TRUST_PAGES } from "@/lib/routes";

const exploreLinks = [
  { label: "Mounjaro", href: "/mounjaro" },
  { label: "Wegovy", href: "/wegovy" },
  { label: "Saxenda", href: "/saxenda" },
  { label: "Oral GLP-1 tablets", href: "/oral-glp1" },
  { label: "Weight loss injections", href: "/weight-loss-injections" },
  { label: "Mounjaro vs Wegovy", href: "/mounjaro-vs-wegovy" },
];

const compareLinks = [
  { label: "Provider directory", href: "/providers" },
  { label: "Compare providers", href: "/compare" },
  { label: "Service comparison", href: "/prices" },
  { label: "Guides", href: "/guides" },
  { label: "BMI calculator", href: "/tools/bmi-calculator" },
  { label: "Eligibility checker", href: "/tools/eligibility-checker" },
];

const regulators = [
  { label: "GPhC register (pharmacies)", href: "https://www.pharmacyregulation.org/registers" },
  { label: "CQC (online doctors)", href: "https://www.cqc.org.uk/" },
  { label: "MHRA Yellow Card (report side effects)", href: "https://yellowcard.mhra.gov.uk/" },
  { label: "NHS 111", href: "https://111.nhs.uk/" },
];

function FooterList({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="text-sm font-semibold">{title}</h2>
      <ul className="mt-3 space-y-2 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-muted-foreground hover:text-foreground hover:underline">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t bg-secondary/40">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">{site.description}</p>
            <div className="mt-6 rounded-lg border bg-background p-4 text-xs leading-relaxed text-muted-foreground">
              <p className="font-semibold text-foreground">Medical disclaimer</p>
              <p className="mt-1">
                Information on this site is for general education only and is not medical advice. Weight loss medicines
                are prescription-only: a GP, pharmacist or other prescriber must decide whether a treatment is suitable
                for you. If you have severe or persistent abdominal pain, call NHS 111 or, in an emergency, 999.{" "}
                <Link href="/medical-disclaimer" className="font-medium text-primary underline">
                  Full disclaimer
                </Link>
              </p>
            </div>
          </div>
          <FooterList title="Medicines" links={exploreLinks} />
          <FooterList title="Compare and tools" links={compareLinks} />
          <div>
            <h2 className="text-sm font-semibold">Regulators and safety</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {regulators.map((r) => (
                <li key={r.href}>
                  <a
                    href={r.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground hover:underline"
                  >
                    {r.label}
                    <ExternalLink aria-hidden className="size-3" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <nav aria-label="Trust and legal" className="mt-10 border-t pt-6">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {TRUST_PAGES.map((t) => (
              <li key={t.path}>
                <Link href={t.path} className="text-muted-foreground hover:text-foreground hover:underline">
                  {t.label}
                </Link>
              </li>
            ))}
            <li>
              <CookiePreferencesButton className="text-muted-foreground hover:text-foreground hover:underline" />
            </li>
          </ul>
        </nav>

        <div className="mt-6 space-y-2 text-xs leading-relaxed text-muted-foreground">
          <p>
            &copy; {year} {site.publisher.legalName}. {site.name} is an independent publisher and is not a pharmacy or
            prescriber. We do not sell medicines.
          </p>
        </div>
      </Container>
    </footer>
  );
}
