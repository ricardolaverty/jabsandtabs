import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";

export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container className="py-8">
      <nav aria-label="Admin" className="mb-6 flex flex-wrap gap-4 border-b pb-4 text-sm font-medium">
        <span className="font-semibold">Admin</span>
        <Link href="/admin" className="text-primary hover:underline">Providers</Link>
        <Link href="/admin/prices" className="text-primary hover:underline">Price points</Link>
      </nav>
      {children}
    </Container>
  );
}
