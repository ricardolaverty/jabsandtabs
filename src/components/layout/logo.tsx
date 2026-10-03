import Link from "next/link";
import { site } from "@/config/site";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 rounded-md font-serif text-xl font-semibold tracking-tight" aria-label={`${site.name} home`}>
      <svg aria-hidden viewBox="0 0 64 64" className="size-8">
        <rect width="64" height="64" rx="14" className="fill-primary" />
        <path d="M20 18h8v20a10 10 0 0 1-10 10h-2v-7h2a3 3 0 0 0 3-3z" className="fill-primary-foreground" />
        <path d="M34 18h16v7h-4.5v23h-7V25H34z" className="fill-accent" />
      </svg>
      <span>
        Jabs<span className="text-primary">And</span>Tabs
      </span>
    </Link>
  );
}
