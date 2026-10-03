import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero text-hero-foreground">
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-accent/15 blur-3xl" />
      <Container className="relative py-14 md:py-20">
        <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-medium">
          <ShieldCheck aria-hidden className="size-4" /> Independent and evidence-based
        </p>
        <h1 className="mt-5 max-w-3xl font-serif text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
          Compare UK Weight Loss Injections &amp; Tablets
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-hero-foreground/85">
          Clear, balanced guides to Mounjaro, Wegovy and the new GLP-1 tablets, and a transparent comparison of the
          regulated UK providers that prescribe them. No paid rankings, no hype.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg" variant="cta">
            <Link href="/providers">
              Compare providers <ArrowRight aria-hidden />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white/30 bg-transparent text-hero-foreground hover:bg-white/10">
            <Link href="/mounjaro-vs-wegovy">Mounjaro vs Wegovy</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
