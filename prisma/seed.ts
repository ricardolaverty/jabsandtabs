/**
 * Seeds the database from src/data. Safe to re-run (upserts).
 * Run with: npm run db:seed
 *
 * Facts that are null in src/data stay null: the seed never invents values.
 */
import { PrismaClient, type DoseRole, type ProviderType, type Seriousness, type UkStatus, type AuthorRole } from "@prisma/client";
import { medications, sideEffects } from "../src/data/medications";
import { providers } from "../src/data/providers";
import { authors } from "../src/data/authors";

const prisma = new PrismaClient();
const toEnum = <T extends string>(v: string) => v.replace(/-/g, "_") as T;

async function main() {
  for (const s of sideEffects) {
    await prisma.sideEffect.upsert({
      where: { slug: s.slug },
      update: { name: s.name, injectableOnly: !!s.injectableOnly, seriousness: toEnum<Seriousness>(s.seriousness) },
      create: { slug: s.slug, name: s.name, injectableOnly: !!s.injectableOnly, seriousness: toEnum<Seriousness>(s.seriousness) },
    });
  }

  for (const m of medications) {
    const data = {
      name: m.name,
      genericName: m.genericName,
      drugClass: m.drugClass,
      manufacturer: m.manufacturer,
      route: m.route,
      frequency: m.frequency,
      device: m.device ?? null,
      dosesVerified: m.dosesVerified,
      ukStatus: toEnum<UkStatus>(m.ukStatus),
      mhraApproval: m.mhraApproval,
      niceGuidance: m.niceGuidance,
      summary: m.summary,
      hub: m.hub,
      titrationStepWeeks: m.titrationStepWeeks ?? null,
    };
    const med = await prisma.medication.upsert({ where: { slug: m.slug }, update: data, create: { slug: m.slug, ...data } });
    for (const [i, d] of m.doses.entries()) {
      await prisma.dose.upsert({
        where: { medicationId_slug: { medicationId: med.id, slug: d.slug } },
        update: { mg: d.mg, role: d.role as DoseRole, sortOrder: i },
        create: { medicationId: med.id, slug: d.slug, mg: d.mg, role: d.role as DoseRole, sortOrder: i },
      });
    }
    for (const seSlug of m.commonSideEffects) {
      const se = await prisma.sideEffect.findUnique({ where: { slug: seSlug } });
      if (!se) continue;
      await prisma.medicationSideEffect.upsert({
        where: { medicationId_sideEffectId: { medicationId: med.id, sideEffectId: se.id } },
        update: { common: true },
        create: { medicationId: med.id, sideEffectId: se.id, common: true },
      });
    }
  }

  for (const p of providers) {
    const data = {
      name: p.name,
      type: toEnum<ProviderType>(p.type),
      website: p.website,
      gphcNumber: p.gphcNumber,
      cqcRegistered: p.cqcRegistered,
      trustpilotScore: p.trustpilot?.score ?? null,
      trustpilotReviews: p.trustpilot?.reviews ?? null,
      trustpilotChecked: p.trustpilot ? new Date(p.trustpilot.checkedAt) : null,
      delivery: p.delivery,
      support: p.support ?? [],
      maintenancePolicy: p.maintenancePolicy,
      consultationFee: p.consultationFee,
      pros: p.pros,
      cons: p.cons,
      verified: p.verified,
      lastVerifiedAt: p.lastVerifiedAt ? new Date(p.lastVerifiedAt) : null,
    };
    const prov = await prisma.provider.upsert({ where: { slug: p.slug }, update: data, create: { slug: p.slug, ...data } });
    for (const medSlug of p.medications) {
      const med = await prisma.medication.findUnique({ where: { slug: medSlug } });
      if (!med) continue;
      await prisma.providerMedication.upsert({
        where: { providerId_medicationId: { providerId: prov.id, medicationId: med.id } },
        update: {},
        create: { providerId: prov.id, medicationId: med.id },
      });
    }
  }

  for (const a of authors) {
    const author = await prisma.author.upsert({
      where: { slug: a.slug },
      update: { name: a.name, role: toEnum<AuthorRole>(a.role), bio: a.bio, image: a.image, sameAs: a.sameAs },
      create: { slug: a.slug, name: a.name, role: toEnum<AuthorRole>(a.role), bio: a.bio, image: a.image, sameAs: a.sameAs },
    });
    if (a.registration) {
      await prisma.reviewerCredential.upsert({
        where: { authorId: author.id },
        update: { qualifications: a.credentials ?? "", body: a.registration.body, registrationNumber: a.registration.number },
        create: { authorId: author.id, qualifications: a.credentials ?? "", body: a.registration.body, registrationNumber: a.registration.number },
      });
    }
  }

  console.log(`Seeded ${sideEffects.length} side effects, ${medications.length} medications, ${providers.length} providers, ${authors.length} authors.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
