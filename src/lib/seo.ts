import type { Metadata } from "next";
import { site } from "@/config/site";
import { absoluteUrl } from "@/lib/utils";

export interface BuildMetadataInput {
  title: string;
  description: string;
  /** Canonical path, e.g. "/mounjaro". Lowercase, no trailing slash. */
  path: string;
  /** Set false for thin, gated, unverified or unreviewed pages. */
  index?: boolean;
  type?: "website" | "article";
  publishedTime?: string | null;
  modifiedTime?: string | null;
  /** Use the title as-is instead of applying the "| JabsAndTabs" template. */
  absoluteTitle?: boolean;
  keywords?: string[];
}

/** Standard metadata: canonical, Open Graph, Twitter and robots. */
export function buildMetadata({
  title,
  description,
  path,
  index = true,
  type = "website",
  publishedTime,
  modifiedTime,
  absoluteTitle = false,
  keywords,
}: BuildMetadataInput): Metadata {
  const canonical = path === "/" ? "/" : path.replace(/\/+$/, "").toLowerCase();
  const ogImage = `/og?title=${encodeURIComponent(title)}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords,
    alternates: { canonical },
    robots: index
      ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } }
      : { index: false, follow: true, googleBot: { index: false, follow: true } },
    openGraph: {
      type,
      url: absoluteUrl(canonical),
      siteName: site.name,
      locale: "en_GB",
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      ...(type === "article"
        ? { publishedTime: publishedTime ?? undefined, modifiedTime: modifiedTime ?? undefined }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

/** Trims a description to <=155 characters at a word boundary. */
export function clampDescription(text: string, max = 155): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}
