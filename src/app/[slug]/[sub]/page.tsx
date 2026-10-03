import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getNestedParams, resolveNested, isMedicationUnverified } from "@/lib/routes";
import { buildMetadata, clampDescription } from "@/lib/seo";
import { SideEffectPageTemplate, sideEffectTitle, sideEffectDescription } from "@/components/medication/side-effect-page";

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string; sub: string }> };

export async function generateStaticParams() {
  return getNestedParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, sub } = await params;
  const page = await resolveNested(slug, sub);
  if (!page) return {};
  return buildMetadata({
    title: sideEffectTitle(page.medication, page.sideEffect),
    description: clampDescription(sideEffectDescription(page.medication, page.sideEffect)),
    path: `/${page.slug}/${page.sub}`,
    index: !isMedicationUnverified(page.medication),
  });
}

export default async function NestedPageRoute({ params }: Props) {
  const { slug, sub } = await params;
  const page = await resolveNested(slug, sub);
  if (!page) notFound();
  return <SideEffectPageTemplate medication={page.medication} sideEffect={page.sideEffect} />;
}
