import type { ArticleFrontmatter, Medication, SideEffect } from "@/types";
import { UK_STATUS_LABELS } from "@/lib/labels";
import { formatMg, joinList } from "@/lib/utils";

/**
 * Data-driven copy helpers for programmatic medication pages.
 * Everything here is derived from src/data. No figures are invented; where
 * data is unverified the copy says so and points to the SmPC / prescriber.
 */

/** Pillar-plan hubs relevant to a medication (for related guides). */
export function guideHubsFor(m: Medication): ArticleFrontmatter["hub"][] {
  switch (m.slug) {
    case "mounjaro":
      return ["mounjaro"];
    case "wegovy":
      return ["wegovy"];
    case "saxenda":
      return ["injections"];
    default:
      return ["oral-glp1"];
  }
}

/** Pivotal trial programme names (names only, no outcome figures). */
export const TRIAL_PROGRAMMES: Partial<Record<Medication["slug"], string>> = {
  mounjaro: "SURMOUNT",
  wegovy: "STEP",
  saxenda: "SCALE",
  "oral-semaglutide": "OASIS",
  foundayo: "ATTAIN",
};

/** "Mounjaro (tirzepatide)", or just the name when it already contains the generic name. */
export function fullName(m: Medication): string {
  const generic = m.genericName.replace(/ \(oral\)$/, "").toLowerCase();
  return m.name.toLowerCase().includes(generic) ? m.name : `${m.name} (${m.genericName})`;
}

/** Drug class for use mid-sentence: lowercases the first word unless it is an acronym. */
export function classPhrase(m: Medication): string {
  const c = m.drugClass;
  return /^[A-Z][a-z]/.test(c) ? c.charAt(0).toLowerCase() + c.slice(1) : c;
}

export function isUnverified(m: Medication): boolean {
  return m.ukStatus === "verify" || !m.dosesVerified;
}

export function routeLabel(m: Medication): string {
  return m.route === "injection" ? "injection" : "tablet";
}

export function frequencyLabel(m: Medication): string {
  return m.frequency === "weekly" ? "once a week" : "once a day";
}

export function doseRange(m: Medication): string | null {
  if (!m.dosesVerified || m.doses.length === 0) return null;
  const mgs = m.doses.map((d) => d.mg);
  return `${formatMg(Math.min(...mgs))} to ${formatMg(Math.max(...mgs))}`;
}

export function startingDose(m: Medication) {
  if (!m.dosesVerified) return undefined;
  return m.doses.find((d) => d.role === "starting") ?? m.doses[0];
}

export interface TimelineStep {
  mg: number;
  slug: string;
  role: Medication["doses"][number]["role"];
  /** Earliest week this dose could start if increased at every step, or null if unknown. */
  fromWeek: number | null;
  note?: string;
}

/** Earliest-possible titration timeline from the SmPC step interval. */
export function titrationTimeline(m: Medication): TimelineStep[] {
  if (!m.dosesVerified) return [];
  const step = m.titrationStepWeeks ?? null;
  return [...m.doses]
    .sort((a, b) => a.mg - b.mg)
    .map((d, i) => ({ mg: d.mg, slug: d.slug, role: d.role, note: d.note, fromWeek: step ? i * step + 1 : null }));
}

export function commonSideEffectNames(m: Medication, all: SideEffect[]): string[] {
  return m.commonSideEffects.map((s) => all.find((x) => x.slug === s)?.name ?? s);
}

/** Licence wording for licensed weight-management medicines (adults). */
export function licenceCriteria(m: Medication): string | null {
  if (m.ukStatus !== "licensed") return null;
  return `In the UK, ${m.name} is licensed for weight management in adults alongside a reduced-calorie diet and increased physical activity. The licence generally covers people with a BMI of 30 or more, or 27 or more with at least one weight-related health condition. Check the current SmPC for the full wording, and remember a prescriber decides whether it is suitable for you.`;
}

export function statusSentence(m: Medication): string {
  if (m.ukStatus === "verify") {
    return `The UK licensing status of ${m.name} for weight management is being verified by our editorial team. Check the MHRA and the current SmPC before relying on any detail on this page.`;
  }
  const base = UK_STATUS_LABELS[m.ukStatus];
  return `${base}.${m.mhraApproval ? ` ${m.mhraApproval}.` : ""}`;
}

/** FAQs generated purely from the medication record. */
export function medicationFaqs(m: Medication, all: SideEffect[]): { q: string; a: string }[] {
  const faqs: { q: string; a: string }[] = [];
  faqs.push({
    q: `What is ${m.name}?`,
    a: `${fullName(m) === m.name ? m.name : `${m.name} is the brand name for ${m.genericName}. It`} is a ${classPhrase(m)} made by ${m.manufacturer}. ${m.summary} It is a prescription-only medicine, so a registered prescriber must assess whether it is suitable for you.`,
  });
  faqs.push({
    q: `How often is ${m.name} taken?`,
    a: `${m.name} is taken ${frequencyLabel(m)} as ${m.route === "injection" ? "an injection under the skin" : "a tablet"}${m.device ? ` using a ${m.device}` : ""}.${m.administration ? ` ${m.administration}` : ""} Always follow your prescriber's instructions and the Patient Information Leaflet that comes with your medicine.`,
  });
  const start = startingDose(m);
  if (start) {
    faqs.push({
      q: `What is the starting dose of ${m.name}?`,
      a: `Treatment usually starts at ${formatMg(start.mg)} and the dose is increased gradually${m.titrationStepWeeks ? `, with at least ${m.titrationStepWeeks === 1 ? "one week" : `${m.titrationStepWeeks} weeks`} on each dose` : ""}. Starting low helps the body adjust and can reduce side effects such as nausea. Your prescriber decides if and when to increase your dose.`,
    });
  } else {
    faqs.push({
      q: `What doses of ${m.name} are used?`,
      a: `We have not yet verified the UK dose schedule for ${m.name}, so we do not list doses here. Check the current Summary of Product Characteristics (SmPC) on the Electronic Medicines Compendium and follow your prescriber's advice.`,
    });
  }
  faqs.push({
    q: `Is ${m.name} licensed in the UK for weight loss?`,
    a: `${statusSentence(m)} Licensing can change, so check the MHRA and the SmPC for the latest position.`,
  });
  const names = commonSideEffectNames(m, all).map((n) => n.toLowerCase());
  if (names.length) {
    faqs.push({
      q: `What are the common side effects of ${m.name}?`,
      a: `Commonly reported side effects include ${joinList(names)}. These are often most noticeable when starting treatment or after a dose increase. Seek urgent help if you have severe, persistent stomach pain that may spread to your back. The Patient Information Leaflet lists all known side effects.`,
    });
  }
  faqs.push({
    q: `Can I get ${m.name} on the NHS?`,
    a: m.niceGuidance
      ? `NICE has published guidance on ${m.name} for weight management (${m.niceGuidance}). NHS access depends on meeting the criteria in that guidance and on how local services are commissioned, so availability varies. Your GP can explain what is available in your area.`
      : m.ukStatus === "licensed"
        ? `At the time of writing, NICE has not published guidance on ${m.name} for weight management, so it is not generally available on the NHS for this use. This may change once NICE completes its appraisal. Your GP can tell you what NHS weight management support is available locally.`
        : `We have not yet verified NICE guidance on ${m.name} for weight management. Ask your GP whether it is available through NHS weight management services in your area.`,
  });
  return faqs;
}
