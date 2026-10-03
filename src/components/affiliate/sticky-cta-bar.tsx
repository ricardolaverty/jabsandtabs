"use client";

import * as React from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function StickyCtaBar({ href, label, text }: { href: string; label: string; text: string }) {
  const [dismissed, setDismissed] = React.useState(false);
  if (dismissed) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t bg-card/95 p-3 shadow-lg backdrop-blur md:hidden">
      <div className="flex items-center gap-3">
        <p className="flex-1 text-sm font-medium leading-snug">{text}</p>
        <Button asChild size="sm" variant="cta">
          <Link href={href}>{label}</Link>
        </Button>
        <button type="button" onClick={() => setDismissed(true)} className="rounded p-1 text-muted-foreground hover:text-foreground" aria-label="Dismiss">
          <X aria-hidden className="size-4" />
        </button>
      </div>
    </div>
  );
}
