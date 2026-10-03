import Link from "next/link";
import { Calculator, ClipboardList, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/layout/container";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MedicalDisclaimer } from "@/components/content/medical-disclaimer";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Weight Management Tools: BMI Calculator and Suitability Checker",
  description:
    "Free informational tools: a BMI calculator with NICE categories and a questionnaire to help you prepare for a conversation with a prescriber.",
  path: "/tools",
});

const tools = [
  {
    href: "/tools/bmi-calculator",
    title: "BMI calculator",
    description:
      "Work out your body mass index in metric or imperial units and see the NHS/NICE weight category, including the lower thresholds NICE recommends for some family backgrounds.",
    icon: Calculator,
    cta: "Open the BMI calculator",
  },
  {
    href: "/tools/eligibility-checker",
    title: "Weight-loss medicine suitability checker",
    description:
      "A short, informational questionnaire that highlights the things a prescriber is likely to ask about, including important cautions, so you can prepare for a consultation.",
    icon: ClipboardList,
    cta: "Open the suitability checker",
  },
];

export default function ToolsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Tools"
        title="Weight management tools"
        lead="Simple, private tools to help you understand your BMI and prepare for a conversation with a GP, pharmacist or other prescriber."
        crumbs={[{ name: "Tools", href: "/tools" }]}
      />
      <Container className="py-10 md:py-14">
        <div className="grid gap-6 md:grid-cols-2">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Card key={tool.href}>
                <CardHeader>
                  <span className="mb-2 inline-flex size-11 items-center justify-center rounded-lg bg-secondary text-primary">
                    <Icon aria-hidden className="size-5" />
                  </span>
                  <CardTitle>
                    <Link href={tool.href} className="hover:underline">
                      {tool.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">{tool.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button asChild>
                    <Link href={tool.href}>{tool.cta}</Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        <aside
          aria-label="About these tools"
          className="mt-10 flex gap-4 rounded-xl border bg-info p-5 text-info-foreground"
        >
          <ShieldCheck aria-hidden className="mt-0.5 size-5 shrink-0" />
          <div className="space-y-2 text-sm leading-relaxed">
            <p className="font-semibold">These tools are informational only</p>
            <p>
              They are never a prescribing decision and do not tell you whether a medicine is right for you. Only a
              registered prescriber, after a full consultation, can decide whether a weight-loss medicine is safe and
              suitable. Calculations run in your browser and nothing you enter is sent to us or stored.
            </p>
          </div>
        </aside>

        <MedicalDisclaimer />
      </Container>
    </>
  );
}
