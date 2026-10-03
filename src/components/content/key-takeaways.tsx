import * as React from "react";
import { ListChecks } from "lucide-react";

export function KeyTakeaways({ children, title = "Key takeaways" }: { children: React.ReactNode; title?: string }) {
  return (
    <aside aria-label={title} className="not-prose my-8 rounded-xl border-l-4 border-primary bg-secondary/60 p-5 md:p-6">
      <h2 className="!mt-0 flex items-center gap-2 font-sans text-base font-semibold text-primary">
        <ListChecks aria-hidden className="size-5" />
        {title}
      </h2>
      <div className="mt-3 text-[0.95rem] leading-relaxed [&_li]:mt-2 [&_ul]:list-disc [&_ul]:pl-5">{children}</div>
    </aside>
  );
}
