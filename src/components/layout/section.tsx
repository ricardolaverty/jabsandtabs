import * as React from "react";
import { cn } from "@/lib/utils";

/** Page section with an h2 and optional intro. `id` enables in-page anchors. */
export function Section({
  id,
  title,
  intro,
  children,
  className,
}: {
  id?: string;
  title?: string;
  intro?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  const headingId = id ? `${id}-heading` : undefined;
  return (
    <section id={id} aria-labelledby={title ? headingId : undefined} className={cn("scroll-mt-24 py-8", className)}>
      {title && (
        <h2 id={headingId} className="font-serif text-2xl font-semibold tracking-tight md:text-3xl">
          {title}
        </h2>
      )}
      {intro && <div className="mt-2 max-w-3xl text-muted-foreground">{intro}</div>}
      <div className={cn(title || intro ? "mt-6" : undefined)}>{children}</div>
    </section>
  );
}
