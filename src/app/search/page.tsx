import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/layout/container";
import { SiteSearch } from "@/components/search/site-search";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Search",
  description: "Search JabsAndTabs guides, medicines and UK weight loss providers.",
  path: "/search",
  index: false,
});

export default function SearchPage() {
  return (
    <>
      <PageHeader title="Search" crumbs={[{ name: "Search", href: "/search" }]} />
      <Container className="py-8">
        <Suspense fallback={<p className="text-sm text-muted-foreground">Loading search…</p>}>
          <SiteSearch />
        </Suspense>
      </Container>
    </>
  );
}
