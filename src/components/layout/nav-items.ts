import { mainNav } from "@/config/site";

export interface NavChild {
  label: string;
  href: string;
}
export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

/** mainNav normalised to a mutable, uniformly typed structure. */
export const navItems: NavItem[] = mainNav.map((item) => ({
  label: item.label,
  href: item.href,
  children: "children" in item ? item.children.map((c) => ({ label: c.label, href: c.href })) : undefined,
}));
