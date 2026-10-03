import type { MetadataRoute } from "next";
import { getAllRoutes } from "@/lib/routes";
import { absoluteUrl } from "@/lib/utils";

/**
 * Single sitemap (well under the 50,000 URL limit). Only indexable routes are
 * listed; gated routes are absent because the registry excludes them when
 * their flag is off. If the site grows past ~40k URLs, switch to
 * generateSitemaps() and list each child sitemap in robots.ts.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = await getAllRoutes();
  return routes
    .filter((r) => r.indexable)
    .map((r) => ({
      url: absoluteUrl(r.path),
      lastModified: r.lastModified ? new Date(r.lastModified) : undefined,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    }));
}
