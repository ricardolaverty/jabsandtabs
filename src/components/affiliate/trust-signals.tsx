import Link from "next/link";
import { BadgeCheck, FileSearch, HandCoins, Scale } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { icon: Scale, title: "Independent methodology", text: "Published scoring. No provider can pay for a better position.", href: "/methodology" },
  { icon: FileSearch, title: "Evidence-based", text: "Built from SmPCs, NICE guidance, MHRA and peer-reviewed trials.", href: "/editorial-policy" },
  { icon: BadgeCheck, title: "Regulator checks", text: "We point you to the GPhC and CQC registers to check any provider.", href: "/fact-checking" },
  { icon: HandCoins, title: "Transparent funding", text: "How we are funded, explained in full.", href: "/affiliate-disclosure" },
];

export function TrustSignals({ className }: { className?: string }) {
  return (
    <ul className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {items.map((i) => (
        <li key={i.href} className="rounded-xl border bg-card p-5">
          <i.icon aria-hidden className="size-6 text-primary" />
          <p className="mt-3 font-semibold">
            <Link href={i.href} className="hover:underline">
              {i.title}
            </Link>
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{i.text}</p>
        </li>
      ))}
    </ul>
  );
}
