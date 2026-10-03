import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { JsonLd } from "@/components/seo/json-ld";
import { ArticleGrid } from "@/components/content/article-card";
import { Callout } from "@/components/content/callout";
import { getAuthor, getAuthors } from "@/lib/repo";
import { getAllArticles } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

const ROLE_LABELS = { writer: "Writer", editor: "Editor", "medical-reviewer": "Medical reviewer" } as const;

export async function generateStaticParams() {
  return (await getAuthors()).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = await getAuthor(slug);
  if (!a) return {};
  return buildMetadata({
    title: a.name,
    description: a.bio.slice(0, 155),
    path: `/authors/${a.slug}`,
    // Placeholder profiles (e.g. "[Medical reviewer to be appointed]") are not indexed.
    index: !a.name.startsWith("["),
  });
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params;
  const a = await getAuthor(slug);
  if (!a) notFound();
  const written = getAllArticles().filter((x) => x.frontmatter.author === a.slug || x.frontmatter.medicalReviewer === a.slug);
  const isPerson = a.slug !== "editorial-team";
  return (
    <>
      {!a.name.startsWith("[") && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": isPerson ? "Person" : "Organization",
            name: a.name,
            url: absoluteUrl(`/authors/${a.slug}`),
            description: a.bio,
            ...(a.credentials ? { hasCredential: a.credentials } : {}),
            ...(a.sameAs.length ? { sameAs: a.sameAs } : {}),
          }}
        />
      )}
      <PageHeader eyebrow={ROLE_LABELS[a.role]} title={a.name} lead={a.bio} crumbs={[{ name: a.name, href: `/authors/${a.slug}` }]} />
      <Container className="py-6">
        <Section title="Credentials">
          {a.registration ? (
            <p>
              {a.credentials} · Registered with the {a.registration.body}, number {a.registration.number}.
            </p>
          ) : (
            <Callout type="info" title="No professional registration listed">
              {a.role === "medical-reviewer"
                ? "This reviewer position has not yet been filled. Articles remain marked “Pending clinical review” until a UK-registered clinician signs them off."
                : "This profile does not represent a registered healthcare professional. Clinical accuracy is checked by our medical reviewers."}
            </Callout>
          )}
        </Section>
        <Section title={a.role === "medical-reviewer" ? "Articles reviewed" : "Articles"}>
          <ArticleGrid articles={written} emptyMessage="No published articles yet." />
        </Section>
      </Container>
    </>
  );
}
