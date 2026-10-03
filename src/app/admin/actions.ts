"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getPrisma } from "@/lib/prisma";

const actor = () => process.env.ADMIN_USER ?? "admin";

const nullableText = z
  .string()
  .transform((v) => v.trim())
  .transform((v) => (v === "" ? null : v));

const lines = z.string().transform((v) =>
  v
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean),
);

const money = z
  .string()
  .transform((v) => v.trim())
  .refine((v) => v === "" || /^\d+(\.\d{1,2})?$/.test(v), "Enter an amount like 149.99")
  .transform((v) => (v === "" ? null : v));

const providerSchema = z.object({
  slug: z.string().min(1),
  gphcNumber: nullableText,
  cqcRegistered: z.enum(["", "true", "false"]).transform((v) => (v === "" ? null : v === "true")),
  delivery: nullableText,
  support: lines,
  maintenancePolicy: nullableText,
  consultationFee: money,
  pros: lines,
  cons: lines,
  trustpilotScore: z.string().transform((v) => (v.trim() === "" ? null : Number(v))).refine((v) => v === null || (v >= 0 && v <= 5), "Score 0 to 5"),
  trustpilotReviews: z.string().transform((v) => (v.trim() === "" ? null : parseInt(v, 10))).refine((v) => v === null || (Number.isInteger(v) && v >= 0), "Whole number"),
  trustpilotChecked: z.string().transform((v) => (v.trim() === "" ? null : new Date(v))),
  verified: z.string().optional().transform((v) => v === "on"),
  notes: nullableText,
});

export async function updateProvider(formData: FormData) {
  const prisma = getPrisma();
  if (!prisma) throw new Error("DATABASE_URL is not configured.");
  const parsed = providerSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    throw new Error(parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; "));
  }
  const d = parsed.data;
  // Only mark verified when the core regulator field has been completed.
  const verified = d.verified && d.gphcNumber !== null;
  const provider = await prisma.provider.update({
    where: { slug: d.slug },
    data: {
      gphcNumber: d.gphcNumber,
      cqcRegistered: d.cqcRegistered,
      delivery: d.delivery,
      support: d.support,
      maintenancePolicy: d.maintenancePolicy,
      consultationFee: d.consultationFee,
      pros: d.pros,
      cons: d.cons,
      trustpilotScore: d.trustpilotScore,
      trustpilotReviews: d.trustpilotReviews,
      trustpilotChecked: d.trustpilotChecked,
      verified,
      lastVerifiedAt: verified ? new Date() : undefined,
    },
  });
  await prisma.editorialAudit.create({
    data: { entity: "Provider", entityId: provider.id, action: "update", actor: actor(), notes: d.notes },
  });
  revalidatePath("/", "layout");
  redirect(`/admin/providers/${d.slug}?saved=1`);
}

const priceSchema = z.object({
  providerSlug: z.string().min(1),
  medicationSlug: z.string().min(1),
  doseSlug: z.string().min(1),
  retailPrice: money,
  discountPrice: money,
  deliveryCharge: money,
  consultationFee: money,
  checkedAt: z.string().min(1, "Date checked is required").transform((v) => new Date(v)),
  sourceUrl: z.string().url("A source URL is required"),
  verifiedBy: z.string().min(2, "Who verified this price?"),
});

export async function addPricePoint(formData: FormData) {
  const prisma = getPrisma();
  if (!prisma) throw new Error("DATABASE_URL is not configured.");
  const parsed = priceSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    throw new Error(parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; "));
  }
  const d = parsed.data;
  const [provider, medication] = await Promise.all([
    prisma.provider.findUniqueOrThrow({ where: { slug: d.providerSlug } }),
    prisma.medication.findUniqueOrThrow({ where: { slug: d.medicationSlug }, include: { doses: true } }),
  ]);
  const dose = medication.doses.find((x) => x.slug === d.doseSlug);
  if (!dose) throw new Error(`Unknown dose ${d.doseSlug} for ${d.medicationSlug}`);
  const pp = await prisma.pricePoint.create({
    data: {
      providerId: provider.id,
      medicationId: medication.id,
      doseId: dose.id,
      doseSlug: dose.slug,
      retailPrice: d.retailPrice,
      discountPrice: d.discountPrice,
      deliveryCharge: d.deliveryCharge,
      consultationFee: d.consultationFee,
      checkedAt: d.checkedAt,
      sourceUrl: d.sourceUrl,
      verifiedBy: d.verifiedBy,
    },
  });
  await prisma.editorialAudit.create({ data: { entity: "PricePoint", entityId: pp.id, action: "create", actor: actor() } });
  revalidatePath("/", "layout");
  redirect("/admin/prices?saved=1");
}
