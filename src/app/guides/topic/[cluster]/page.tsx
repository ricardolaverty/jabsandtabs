import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ContentCluster } from "@/types";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/layout/container";
import { ArticleGrid } from "@/components/content/article-card";
import { CLUSTER_LABELS, CONTENT_CLUSTERS, getArticlesByCluster } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

type Props = { params: Promise<{ cluster: string }> };

function isCluster(c: string): c is ContentCluster {
  return (CONTENT_CLUSTERS as readonly string[]).includes(c);
}

export function generateStaticParams() {
  return CONTENT_CLUSTERS.map((cluster) => ({ cluster }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { cluster } = await params;
  if (!isCluster(cluster)) return {};
  const label = CLUSTER_LABELS[cluster];
  return buildMetadata({
    title: `${label}: weight loss medicine guides`,
    description: `Evidence-based guides on ${label.toLowerCase()} for UK weight loss medicines, including Mounjaro, Wegovy and oral GLP-1s.`,
    path: `/guides/topic/${cluster}`,
    // Empty topic pages are thin content.
    index: getArticlesByCluster(cluster).length > 0,
  });
}

export default async function ClusterPage({ params }: Props) {
  const { cluster } = await params;
  if (!isCluster(cluster)) notFound();
  const label = CLUSTER_LABELS[cluster];
  return (
    <>
      <PageHeader
        title={`${label} guides`}
        crumbs={[
          { name: "Guides", href: "/guides" },
          { name: label, href: `/guides/topic/${cluster}` },
        ]}
      />
      <Container className="py-8">
        <ArticleGrid articles={getArticlesByCluster(cluster)} />
      </Container>
    </>
  );
}
