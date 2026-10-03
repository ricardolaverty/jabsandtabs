"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { navItems } from "@/components/layout/nav-items";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const close = () => setOpen(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className="inline-flex size-10 items-center justify-center rounded-md hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="size-5" aria-hidden />
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription className="sr-only">Site navigation</SheetDescription>
        </SheetHeader>
        <nav aria-label="Mobile" className="px-4 pb-8">
          <ul className="space-y-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={close} className="block rounded-md py-1 text-base font-semibold">
                  {item.label}
                </Link>
                {item.children && (
                  <ul className="mt-2 space-y-1 border-l pl-3">
                    {item.children.map((c) => (
                      <li key={c.href}>
                        <Link href={c.href} onClick={close} className="block rounded-md py-1.5 text-sm text-muted-foreground hover:text-foreground">
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            <li className="border-t pt-4">
              <Link href="/prices" onClick={close} className="block py-1 text-sm">Price and service comparison</Link>
              <Link href="/methodology" onClick={close} className="block py-1 text-sm">How we compare providers</Link>
            </li>
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
