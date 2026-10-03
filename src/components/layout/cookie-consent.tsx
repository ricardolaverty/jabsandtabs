"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

/**
 * PECR / UK GDPR cookie consent.
 *
 * - No non-essential cookies or scripts are set before consent. The site
 *   currently uses none at all; analytics must read `getConsent()` before loading.
 * - "Reject all" and "Accept all" have equal prominence.
 * - The choice itself is stored in a strictly necessary first-party cookie.
 */

export const CONSENT_COOKIE = "jt_consent";
const OPEN_EVENT = "jt:open-cookie-preferences";
const MAX_AGE = 60 * 60 * 24 * 180; // 6 months

export interface ConsentState {
  analytics: boolean;
  marketing: boolean;
  /** ISO timestamp of the choice. */
  at: string;
}

export function getConsent(): ConsentState | null {
  if (typeof document === "undefined") return null;
  const raw = document.cookie.split("; ").find((c) => c.startsWith(`${CONSENT_COOKIE}=`));
  if (!raw) return null;
  try {
    return JSON.parse(decodeURIComponent(raw.split("=").slice(1).join("="))) as ConsentState;
  } catch {
    return null;
  }
}

function saveConsent(state: Omit<ConsentState, "at">) {
  const value: ConsentState = { ...state, at: new Date().toISOString() };
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(value))}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax${secure}`;
  window.dispatchEvent(new CustomEvent("jt:consent-changed", { detail: value }));
}

export function openCookiePreferences() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function CookiePreferencesButton({ className, label = "Cookie preferences" }: { className?: string; label?: string }) {
  return (
    <button type="button" onClick={openCookiePreferences} className={className}>
      {label}
    </button>
  );
}

export function CookieConsent() {
  const [open, setOpen] = React.useState(false);
  const [manage, setManage] = React.useState(false);
  const [analytics, setAnalytics] = React.useState(false);
  const [marketing, setMarketing] = React.useState(false);

  React.useEffect(() => {
    const existing = getConsent();
    if (!existing) setOpen(true);
    else {
      setAnalytics(existing.analytics);
      setMarketing(existing.marketing);
    }
    const onOpen = () => {
      setManage(true);
      setOpen(true);
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  if (!open) return null;

  const decide = (state: Omit<ConsentState, "at">) => {
    saveConsent(state);
    setAnalytics(state.analytics);
    setMarketing(state.marketing);
    setOpen(false);
    setManage(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-desc"
      className="fixed inset-x-0 bottom-0 z-50 border-t bg-card p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] sm:inset-x-4 sm:bottom-4 sm:mx-auto sm:max-w-2xl sm:rounded-xl sm:border"
    >
      <h2 id="cookie-title" className="text-base font-semibold">
        Cookies on JabsAndTabs
      </h2>
      <p id="cookie-desc" className="mt-1 text-sm text-muted-foreground">
        We use strictly necessary cookies to make this site work. We would also like to use optional analytics cookies
        to understand how the site is used. We will not set optional cookies unless you accept them.{" "}
        <Link href="/cookies" className="font-medium text-primary underline">
          Cookie policy
        </Link>
      </p>

      {manage && (
        <fieldset className="mt-4 space-y-3 rounded-lg border p-3 text-sm">
          <legend className="px-1 font-medium">Choose which cookies to allow</legend>
          <label className="flex items-start gap-3">
            <input type="checkbox" checked disabled className="mt-1 size-4" />
            <span>
              <span className="font-medium">Strictly necessary</span> (always on): remembers your cookie choice.
            </span>
          </label>
          <label className="flex items-start gap-3">
            <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} className="mt-1 size-4 accent-primary" />
            <span>
              <span className="font-medium">Analytics</span>: anonymous statistics on which pages are used.
            </span>
          </label>
          <label className="flex items-start gap-3">
            <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} className="mt-1 size-4 accent-primary" />
            <span>
              <span className="font-medium">Marketing</span>: we do not currently use marketing cookies.
            </span>
          </label>
        </fieldset>
      )}

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        <Button variant="default" onClick={() => decide({ analytics: false, marketing: false })}>
          Reject all
        </Button>
        <Button variant="default" onClick={() => decide({ analytics: true, marketing: true })}>
          Accept all
        </Button>
        {manage ? (
          <Button variant="outline" onClick={() => decide({ analytics, marketing })}>
            Save choices
          </Button>
        ) : (
          <Button variant="outline" onClick={() => setManage(true)}>
            Manage choices
          </Button>
        )}
      </div>
    </div>
  );
}
