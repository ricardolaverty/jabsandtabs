import Link from "next/link";
import { Pill, Syringe } from "lucide-react";

const cols = [
  {
    icon: Syringe,
    title: "Jabs: weight loss injections",
    href: "/weight-loss-injections",
    points: [
      "Mounjaro (tirzepatide) and Wegovy (semaglutide) are injected once a week; liraglutide once a day",
      "The most extensively studied option, with large long-term trial programmes",
      "Pens need refrigerated storage and cold-chain delivery",
    ],
  },
  {
    icon: Pill,
    title: "Tabs: oral GLP-1 tablets",
    href: "/oral-glp1",
    points: [
      "Wegovy tablets (oral semaglutide) and Foundayo (orforglipron) are taken once a day",
      "Wegovy tablets need strict fasting before and after each dose; Foundayo has no food or water rules",
      "Newer to the UK: both were authorised by the MHRA in 2026",
    ],
  },
];

export function JabsVsTabs() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {cols.map((c) => (
        <div key={c.href} className="rounded-xl border bg-card p-6">
          <c.icon aria-hidden className="size-7 text-primary" />
          <h3 className="mt-3 text-xl font-semibold">
            <Link href={c.href} className="hover:underline">
              {c.title}
            </Link>
          </h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
            {c.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
