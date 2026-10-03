import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { site } from "@/config/site";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const NOT_VERIFIED = "Not yet verified";

/** Absolute URL for canonical / schema use. Path must start with "/". */
export function absoluteUrl(path = "/"): string {
  const base = site.url.replace(/\/$/, "");
  if (path === "/" || path === "") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

const gbp = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" });

/** Formats GBP, or "Not yet verified" for null/undefined. */
export function formatPrice(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) return NOT_VERIFIED;
  return gbp.format(value);
}

/** "3 October 2026", or "Not yet verified". Accepts ISO strings or Dates. */
export function formatDate(value: string | Date | null | undefined): string {
  if (!value) return NOT_VERIFIED;
  const d = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(d.getTime())) return NOT_VERIFIED;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/London" });
}

/** Shows a nullable value, or "Not yet verified". */
export function orNotVerified<T>(value: T | null | undefined, render?: (v: T) => string): string {
  if (value === null || value === undefined || (typeof value === "string" && value.trim() === "")) return NOT_VERIFIED;
  return render ? render(value) : String(value);
}

export function formatMg(mg: number): string {
  return `${mg.toLocaleString("en-GB", { maximumFractionDigits: 2 })}mg`;
}

export function titleCase(s: string): string {
  return s.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function sentenceCase(s: string): string {
  const t = s.replace(/[-_]/g, " ");
  return t.charAt(0).toUpperCase() + t.slice(1);
}

/** Joins a list with commas and "and" (British style, no Oxford comma). */
export function joinList(items: string[]): string {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

export function uniqueBy<T>(items: T[], key: (item: T) => string): T[] {
  const seen = new Set<string>();
  return items.filter((i) => {
    const k = key(i);
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}
