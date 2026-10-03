import type { Metadata } from "next";
import { fullName } from "@/lib/medication-content";
import { notFound } from "next/navigation";
import { getTopLevelSlugs, resolveTopLevel, isMedicationUnverified, CLASS_HUBS, type TopLevelPage } from "@/lib/routes";
import { buildMetadata, clampDescription } from "@/lib/seo";
import { getMountedArticle } from "@/lib/content";
import { MedicationHubTemplate } from "@/components/medication/medication-hub";
import { ClassHubTemplate } from "@/components/medication/class-hub";
import { MedicationTopicTemplate, topicTitle, topicDescription } from "@/components/medication/medication-topic";
import { DosePageTemplate, doseTitle, doseDescription } from "@/components/medication/dose-page";
import { MedicationComparisonTemplate, comparisonTitle, comparisonDescription } from "@/components/medication/medication-comparison";

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getTopLevelSlugs()).map((slug) => ({ slug }));
}

function describe(page: TopLevelPage): { title: string; description: string; index: boolean } {
  switch (page.kind) {
    case "medication-hub": {
      const m = page.medication;
      return {
        title: `${fullName(m)} UK guide: doses, side effects and providers`,
        description: `${m.summary} Doses, side effects, UK status and regulated providers explained.`,
        index: !isMedicationUnverified(m),
      };
    }
    case "class-hub": {
      const info = CLASS_HUBS[page.slug];
      return {
        title: `${info.title}: UK comparison and guide`,
        description:
          page.hub === "injections"
            ? "Compare UK weight loss injections (Mounjaro, Wegovy and Saxenda): how they work, doses, side effects and UK status."
            : "Oral GLP-1 tablets for weight loss in the UK: what is licensed, how tablets differ from injections and what is being verified.",
        index: true,
      };
    }
    case "medication-topic":
      return {
        title: topicTitle(page.medication, page.topic),
        description: topicDescription(page.medication, page.topic),
        index: !isMedicationUnverified(page.medication),
      };
    case "dose":
      return {
        title: doseTitle(page.medication, page.dose),
        description: doseDescription(page.medication, page.dose),
        index: !isMedicationUnverified(page.medication),
      };
    case "medication-comparison":
      return {
        title: comparisonTitle(page.a, page.b),
        description: comparisonDescription(page.a, page.b),
        index: !isMedicationUnverified(page.a) && !isMedicationUnverified(page.b),
      };
  }
}

/** Pillar article mounted at this URL via frontmatter canonicalPath (topic, comparison and class-hub pages). */
function mountedFor(page: TopLevelPage) {
  if (page.kind === "medication-topic" || page.kind === "medication-comparison" || page.kind === "class-hub") {
    return getMountedArticle(`/${page.slug}`);
  }
  return undefined;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await resolveTopLevel(slug);
  if (!page) return {};
  const d = describe(page);
  const article = mountedFor(page);
  if (article) {
    const fm = article.frontmatter;
    return buildMetadata({
      title: fm.title,
      description: clampDescription(fm.description),
      path: `/${page.slug}`,
      type: "article",
      publishedTime: fm.publishedAt,
      modifiedTime: fm.updatedAt,
      keywords: [fm.primaryKeyword, ...fm.secondaryKeywords],
      index: d.index && fm.reviewStatus === "clinically-reviewed",
    });
  }
  return buildMetadata({ title: d.title, description: clampDescription(d.description), path: `/${page.slug}`, index: d.index });
}

export default async function TopLevelPageRoute({ params }: Props) {
  const { slug } = await params;
  const page = await resolveTopLevel(slug);
  if (!page) notFound();
  const article = mountedFor(page);

  switch (page.kind) {
    case "medication-hub":
      return <MedicationHubTemplate medication={page.medication} />;
    case "class-hub":
      return <ClassHubTemplate slug={page.slug} hub={page.hub} medications={page.medications} article={article} />;
    case "medication-topic":
      return <MedicationTopicTemplate medication={page.medication} topic={page.topic} article={article} />;
    case "dose":
      return <DosePageTemplate medication={page.medication} dose={page.dose} />;
    case "medication-comparison":
      return <MedicationComparisonTemplate a={page.a} b={page.b} article={article} />;
  }
}
