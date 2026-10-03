import { NextResponse, type NextRequest } from "next/server";
import { flags } from "@/config/flags";
import { getActiveAffiliateLink, getProvider, recordClick } from "@/lib/repo";

export const dynamic = "force-dynamic";

/** Only same-site paths are logged; anything else is dropped. No personal data is stored. */
function safePage(from: string | null): string | null {
  if (!from) return null;
  if (!from.startsWith("/") || from.startsWith("//")) return null;
  return from.split("?")[0].slice(0, 200);
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ provider: string }> }) {
  const { provider: slug } = await params;
  const provider = await getProvider(slug);
  if (!provider) {
    return NextResponse.redirect(new URL("/providers", request.url), 302);
  }
  const fallback = new URL(`/providers/${provider.slug}`, request.url);

  if (!flags.affiliateLinks) {
    return NextResponse.redirect(fallback, 302);
  }

  const link = await getActiveAffiliateLink(provider.slug);
  if (!link) {
    return NextResponse.redirect(fallback, 302);
  }

  let target: URL;
  try {
    target = new URL(link.trackingUrl);
    if (target.protocol !== "https:") throw new Error("non-https tracking URL");
  } catch {
    return NextResponse.redirect(fallback, 302);
  }

  await recordClick(link.id, safePage(request.nextUrl.searchParams.get("from")));

  const res = NextResponse.redirect(target, 302);
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  res.headers.set("Cache-Control", "no-store");
  res.headers.set("Referrer-Policy", "no-referrer-when-downgrade");
  return res;
}
