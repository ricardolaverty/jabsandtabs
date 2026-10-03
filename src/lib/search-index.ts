import "server-only";
import { getAllArticles, CLUSTER_LABELS, articleHref } from "@/lib/content";
import { getMedications, getProviders } from "@/lib/repo";
import { CLASS_HUBS, TRUST_PAGES } from "@/lib/routes";
import { PROVIDER_TYPE_LABELS } from "@/lib/labels";

export interface SearchDoc {
  id: string;
  title: string;
  description: string;
  href: string;
  type: "Guide" | "Provider" | "Medicine" | "Hub" | "Tool" | "Page";
  keywords: string[];
}

/** Build-time search index: guides, providers, medicines, hubs, tools and trust pages. */
export async function buildSearchIndex(): Promise<SearchDoc[]> {
  const [meds, providers] = await Promise.all([getMedications(), getProviders()]);
  const docs: SearchDoc[] = [];

  for (const [slug, info] of Object.entries(CLASS_HUBS)) {
    docs.push({ id: `hub-${slug}`, title: info.title, description: `Compare ${info.title.toLowerCase()} available in the UK.`, href: `/${slug}`, type: "Hub", keywords: [info.short] });
  }
  for (const m of meds) {
    docs.push({
      id: `med-${m.slug}`,
      title: m.name,
      description: m.summary,
      href: `/${m.slug}`,
      type: "Medicine",
      keywords: [m.genericName, m.drugClass, m.manufacturer, m.route],
    });
  }
  for (const p of providers) {
    docs.push({
      id: `provider-${p.slug}`,
      title: p.name,
      description: `${PROVIDER_TYPE_LABELS[p.type]}. Review, regulator checks and service details.`,
      href: `/providers/${p.slug}`,
      type: "Provider",
      keywords: [p.type, ...p.medications],
    });
  }
  for (const a of getAllArticles()) {
    const fm = a.frontmatter;
    docs.push({
      id: `guide-${fm.slug}`,
      title: fm.title,
      description: fm.description,
      href: articleHref(a),
      type: "Guide",
      keywords: [fm.primaryKeyword, ...fm.secondaryKeywords, CLUSTER_LABELS[fm.cluster]],
    });
  }
  docs.push(
    { id: "tool-bmi", title: "BMI calculator", description: "Work out your BMI with NICE thresholds explained.", href: "/tools/bmi-calculator", type: "Tool", keywords: ["bmi", "body mass index"] },
    { id: "tool-eligibility", title: "Eligibility checker", description: "Informational questions to discuss with a prescriber.", href: "/tools/eligibility-checker", type: "Tool", keywords: ["eligible", "suitable", "who can get"] },
    { id: "page-providers", title: "Provider directory", description: "All regulated UK weight loss providers.", href: "/providers", type: "Page", keywords: ["pharmacy", "online doctor"] },
    { id: "page-prices", title: "Service comparison", description: "Compare providers on regulation, support and delivery.", href: "/prices", type: "Page", keywords: ["compare", "cost", "price"] },
  );
  for (const t of TRUST_PAGES) {
    docs.push({ id: `trust-${t.path}`, title: t.label, description: `${t.label} at JabsAndTabs.`, href: t.path, type: "Page", keywords: [] });
  }
  return docs;
}
