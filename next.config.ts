import type { NextConfig } from "next";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { providerComparisons } from "./src/data/provider-seeds";
import { medicationComparisons } from "./src/data/medications";

/**
 * Reversed comparison URLs 301 to the canonical order:
 *  - provider pairs: alphabetical (/compare/boots-vs-superdrug)
 *  - medication pairs: the order defined in medicationComparisons
 */
function comparisonRedirects() {
  const out: { source: string; destination: string; permanent: true }[] = [];
  const seen = new Set<string>();
  for (const [x, y] of providerComparisons) {
    const [a, b] = [x, y].sort();
    const key = `${a}|${b}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ source: `/compare/${b}-vs-${a}`, destination: `/compare/${a}-vs-${b}`, permanent: true });
  }
  for (const [a, b] of medicationComparisons) {
    out.push({ source: `/${b}-vs-${a}`, destination: `/${a}-vs-${b}`, permanent: true });
  }
  return out;
}

/**
 * Mounted pillars: an article with frontmatter `canonicalPath` is rendered at
 * that programmatic URL, so /guides/{slug} 301s there (CONTRACTS.md §3).
 */
function mountedArticleRedirects() {
  const dir = path.join(process.cwd(), "content", "articles");
  if (!fs.existsSync(dir)) return [];
  const out: { source: string; destination: string; permanent: true }[] = [];
  for (const file of fs.readdirSync(dir)) {
    if (!file.endsWith(".mdx") || file.startsWith("_")) continue;
    try {
      const { data } = matter(fs.readFileSync(path.join(dir, file), "utf8"));
      const slug = typeof data.slug === "string" ? data.slug : null;
      const canonical = typeof data.canonicalPath === "string" ? data.canonicalPath : null;
      if (slug && canonical && canonical.startsWith("/") && canonical !== `/guides/${slug}`) {
        out.push({ source: `/guides/${slug}`, destination: canonical, permanent: true });
      }
    } catch {
      // Invalid frontmatter is reported by src/lib/content.ts at build time.
    }
  }
  return out;
}

const isDev = process.env.NODE_ENV !== "production";

const csp = [
  "default-src 'self'",
  // Next.js injects inline bootstrap scripts; JSON-LD is inline too.
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: false,
  async redirects() {
    return [...comparisonRedirects(), ...mountedArticleRedirects()];
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/go/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
      { source: "/admin/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
    ];
  },
};

export default nextConfig;
