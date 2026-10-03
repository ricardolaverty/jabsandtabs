"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { navItems } from "@/components/layout/nav-items";
import { cn } from "@/lib/utils";

const blurbs: Record<string, string> = {
  "/mounjaro": "Tirzepatide, once-weekly injection",
  "/wegovy": "Semaglutide, once-weekly injection",
  "/saxenda": "Liraglutide, once-daily injection",
  "/weight-loss-injections": "Side-by-side comparison of the jabs",
  "/oral-glp1": "Everything about GLP-1 tablets",
  "/oral-semaglutide": "Once-daily semaglutide tablet",
  "/foundayo": "Small-molecule GLP-1 tablet",
};

export function DesktopNav() {
  const pathname = usePathname();
  return (
    <NavigationMenu className="hidden lg:flex" aria-label="Main">
      <NavigationMenuList>
        {navItems.map((item) =>
          item.children ? (
            <NavigationMenuItem key={item.href}>
              <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[30rem] grid-cols-2 gap-1">
                  {item.children.map((c) => (
                    <li key={c.href}>
                      <NavigationMenuLink asChild active={pathname === c.href}>
                        <Link href={c.href}>
                          <span className="block font-semibold text-foreground">{c.label}</span>
                          {blurbs[c.href] && <span className="mt-1 block text-xs text-muted-foreground">{blurbs[c.href]}</span>}
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem key={item.href}>
              <NavigationMenuLink asChild active={pathname.startsWith(item.href)}>
                <Link
                  href={item.href}
                  className={cn(navigationMenuTriggerStyle, "data-[active]:text-primary")}
                  aria-current={pathname.startsWith(item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ),
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
