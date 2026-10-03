import Link from "next/link";
import { Search } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Logo } from "@/components/layout/logo";
import { DesktopNav } from "@/components/layout/desktop-nav";
import { MobileNav } from "@/components/layout/mobile-nav";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Logo />
        <DesktopNav />
        <div className="flex items-center gap-1">
          <Link
            href="/search"
            className="inline-flex size-10 items-center justify-center rounded-md hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring"
            aria-label="Search the site"
          >
            <Search className="size-5" aria-hidden />
          </Link>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
