import * as React from "react";
import { cn } from "@/lib/utils";

/** Long-form typography wrapper used by articles and trust pages. */
export function Prose({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("prose-body", className)} {...props} />;
}
