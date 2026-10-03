import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/layout/container";
import { Prose } from "@/components/content/prose";
import { criteria, effectiveWeights } from "@/config/methodology";
import { flags } from "@/config/flags";

export const metadata: Metadata = buildMetadata({
  title: "How we compare providers",
  description:
    "Our published methodology for comparing UK online weight loss providers: the criteria, weights and evidence we use, and why scores are never for sale.",
  path: "/methodology",
});

export default function Page() {
  const priceEnabled = flags.pomPricing;
  const rows = effectiveWeights(priceEnabled);
  const totalWeight = criteria.reduce((s, c) => s + c.weight, 0);

  return (
    <>
      <PageHeader
        title="How we compare providers"
        lead="The criteria, weights and evidence behind every provider score on JabsAndTabs. The same rules apply to every provider."
        crumbs={[{ name: "Methodology", href: "/methodology" }]}
      />
      <Container className="py-10">
        <Prose>
          <p className="text-sm text-muted-foreground">Last updated: 3 October 2026</p>

          <h2>Our approach</h2>
          <p>
            We score regulated UK providers of weight management services against a fixed set of criteria. Each
            criterion has a published weight, and the weights total {totalWeight}. We focus first on safety and
            regulation, because choosing a properly regulated service matters more than anything else.
          </p>

          <h2>Criteria and weights</h2>
          <table>
            <caption className="sr-only">Scoring criteria and weights</caption>
            <thead>
              <tr>
                <th scope="col">Criterion</th>
                <th scope="col">Weight</th>
                <th scope="col">Effective weight</th>
                <th scope="col">What we assess</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((c) => (
                <tr key={c.key}>
                  <th scope="row" className="!border-b !bg-transparent font-semibold">
                    {c.label}
                  </th>
                  <td>{c.weight}%</td>
                  <td>{c.key === "price" && !priceEnabled ? "Not scored" : `${c.effectiveWeight}%`}</td>
                  <td>{c.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {priceEnabled ? (
            <p>Price is currently scored at its full published weight.</p>
          ) : (
            <p>
              <strong>Price is not currently scored.</strong> Price comparison is switched off on this site at present,
              so we do not score providers on price. Its weight is redistributed across the other criteria in proportion
              to their published weights, which is what the &ldquo;effective weight&rdquo; column shows.
            </p>
          )}

          <h2>The evidence we use</h2>
          <p>
            Each criterion is scored only from evidence we can record with a source and date. We never score from
            impressions or from information a provider gives us privately.
          </p>
          <ul>
            {criteria.map((c) => (
              <li key={c.key}>
                <strong>{c.label}:</strong> {c.evidence.join("; ")}.
              </li>
            ))}
          </ul>
          <p>
            Read more about how we check these sources in our <Link href="/fact-checking">fact-checking process</Link>.
          </p>

          <h2>Unscored providers are listed alphabetically</h2>
          <p>
            A provider is only scored once its key details have been verified from primary sources. Until then, it is
            listed alphabetically, without a score or ranking position, and unverified details are shown as &ldquo;Not
            yet verified&rdquo;. A place in an alphabetical list is not a recommendation.
          </p>

          <h2>What does not affect scores</h2>
          <ul>
            <li><strong>Scores are never for sale.</strong> No provider can pay to be listed, scored, ranked or reviewed more favourably.</li>
            <li><strong>Commission is not an input.</strong> Whether or not we earn commission from a provider, and how much, plays no part in its score. See <Link href="/affiliate-disclosure">how we make money</Link>.</li>
          </ul>

          <h2>How ties are handled</h2>
          <p>
            Overall scores are rounded to one decimal place. Where two or more providers have the same overall score,
            we order them by their regulation and safety score, then by transparency. If they are still level, they are
            shown alphabetically and marked as tied. We never break a tie in favour of a provider for commercial
            reasons.
          </p>

          <h2>How often we re-score</h2>
          <p>
            Providers are re-scored at least every three months, and straight away when we learn of a significant
            change, such as a change in regulatory status, an inspection report, or a change to how the service works.
            Each provider page shows the date it was last verified. Changes to the methodology itself are dated and
            explained on this page.
          </p>

          <h2>What would remove a provider</h2>
          <p>We will remove a provider from our comparisons, or suspend its score, if, for example:</p>
          <ul>
            <li>it is no longer registered with the relevant regulator, or we cannot confirm its registration;</li>
            <li>a regulator takes enforcement action, such as suspension, conditions or an improvement notice, that is relevant to the service;</li>
            <li>it supplies prescription-only medicines without an appropriate prescribing consultation;</li>
            <li>it makes claims we consider misleading or unsafe; or</li>
            <li>it stops offering weight management services in the UK.</li>
          </ul>
          <p>Removals and suspensions are recorded on our <Link href="/corrections">corrections page</Link>.</p>

          <h2>Related policies</h2>
          <ul>
            <li><Link href="/fact-checking">Fact-checking</Link></li>
            <li><Link href="/affiliate-disclosure">How we make money</Link></li>
            <li><Link href="/providers">All providers</Link></li>
          </ul>
        </Prose>
      </Container>
    </>
  );
}
