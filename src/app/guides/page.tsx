import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ArticleGrid } from "@/components/content/article-card";
import { CLUSTER_LABELS, getActiveClusters, getAllArticles, getArticlesByCluster } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Guides to UK weight loss medicines",
  description: "Evidence-based guides to Mounjaro, Wegovy, oral GLP-1s, side effects, dosing, eligibility, diet and choosing a regulated provider.",
  path: "/guides",
});

export default function GuidesPage() {
  const all = getAllArticles();
  const clusters = getActiveClusters();
  return (
    <>
      <PageHeader
        title="Guides"
        lead="Evidence-based guides written from SmPCs, NICE guidance and peer-reviewed trials. Every guide is clinically reviewed before it is published."
        crumbs={[{ name: "Guides", href: "/guides" }]}
      />
      <Container className="py-6">
        {clusters.length > 0 && (
          <nav aria-label="Guide topics" className="py-4">
            <ul className="flex flex-wrap gap-2">
              {clusters.map((c) => (
                <li key={c}>
                  <Link href={`/guides/topic/${c}`} className="inline-flex rounded-full border bg-card px-3 py-1.5 text-sm font-medium hover:border-primary hover:bg-secondary">
                    {CLUSTER_LABELS[c]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
        {all.length === 0 ? (
          <ArticleGrid articles={[]} emptyMessage="Our guides are being clinically reviewed and will be published here once a registered clinician has signed them off." />
        ) : (
          clusters.map((c) => {
            const items = getArticlesByCluster(c);
            return (
              <Section key={c} title={CLUSTER_LABELS[c]}>
                <ArticleGrid articles={items.slice(0, 6)} />
                {items.length > 6 && (
                  <p className="mt-4 text-sm">
                    <Link href={`/guides/topic/${c}`} className="font-medium text-primary underline">
                      All {items.length} {CLUSTER_LABELS[c].toLowerCase()} guides
                    </Link>
                  </p>
                )}
              </Section>
            );
          })
        )}
      </Container>
    </>
  );
}
