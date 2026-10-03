import * as React from "react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import type { Crumb } from "@/lib/schema";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  lead?: React.ReactNode;
  crumbs?: Crumb[];
  eyebrow?: string;
  children?: React.ReactNode;
  className?: string;
}

/** Standard page intro band: breadcrumbs, H1, lead paragraph. */
export function PageHeader({ title, lead, crumbs, eyebrow, children, className }: PageHeaderProps) {
  return (
    <header className={cn("border-b bg-secondary/50", className)}>
      <Container className="py-8 md:py-12">
        {crumbs && crumbs.length > 0 && <Breadcrumbs items={crumbs} className="mb-5" />}
        {eyebrow && <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary">{eyebrow}</p>}
        <h1 className="max-w-4xl font-serif text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">{title}</h1>
        {lead && <div className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">{lead}</div>}
        {children && <div className="mt-6">{children}</div>}
      </Container>
    </header>
  );
}
