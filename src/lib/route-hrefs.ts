import type { Dose } from "@/types";

/** Pure URL helpers (safe for client components). See src/lib/routes.ts for the registry. */

export type MedicationTopicSlug =
  | "prices"
  | "side-effects"
  | "dosage"
  | "maintenance"
  | "eligibility"
  | "results"
  | "how-it-works"
  | "faqs";

export function topicSlug(med: string, topic: MedicationTopicSlug) {
  return `${med}-${topic}`;
}
export function doseSlug(med: string, dose: Dose) {
  return `${med}-${dose.slug}`;
}
export function comparisonSlug(a: string, b: string) {
  return `${a}-vs-${b}`;
}

export function hrefForTopic(med: string, topic: MedicationTopicSlug) {
  return `/${topicSlug(med, topic)}`;
}
export function hrefForDose(med: string, dose: Dose) {
  return `/${doseSlug(med, dose)}`;
}
export function hrefForSideEffect(med: string, effect: string) {
  return `/${med}-side-effects/${effect}`;
}
export function hrefForProvider(slug: string) {
  return `/providers/${slug}`;
}
export function hrefForCompare(a: string, b: string) {
  const [x, y] = [a, b].sort();
  return `/compare/${x}-vs-${y}`;
}

