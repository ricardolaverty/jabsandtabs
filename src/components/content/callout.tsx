import * as React from "react";
import { AlertTriangle, BookOpenCheck, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const styles = {
  info: { icon: Info, label: "Good to know", className: "border-info-foreground/20 bg-info text-info-foreground" },
  warning: { icon: AlertTriangle, label: "Important", className: "border-warning-foreground/25 bg-warning text-warning-foreground" },
  evidence: { icon: BookOpenCheck, label: "What the evidence says", className: "border-primary/20 bg-secondary text-secondary-foreground" },
} as const;

export type CalloutType = keyof typeof styles;

export function Callout({ type = "info", title, children }: { type?: CalloutType; title?: string; children: React.ReactNode }) {
  const s = styles[type] ?? styles.info;
  const Icon = s.icon;
  return (
    <aside role="note" className={cn("my-6 flex gap-3 rounded-lg border p-4", s.className)}>
      <Icon aria-hidden className="mt-0.5 size-5 shrink-0" />
      <div className="min-w-0 text-[0.95rem] leading-relaxed [&>*+*]:mt-2 [&_a]:font-semibold [&_a]:underline">
        <p className="font-semibold">{title ?? s.label}</p>
        {children}
      </div>
    </aside>
  );
}
