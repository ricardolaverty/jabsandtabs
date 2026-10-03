import Link from "next/link";
import { getPrisma } from "@/lib/prisma";
import { NoDatabaseNotice } from "./no-database";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export default async function AdminHome() {
  const prisma = getPrisma();
  if (!prisma) return <NoDatabaseNotice />;
  const providers = await prisma.provider.findMany({ orderBy: { name: "asc" }, include: { _count: { select: { prices: true } } } });
  return (
    <div>
      <h1 className="text-2xl font-semibold">Providers</h1>
      <p className="mt-1 text-sm text-muted-foreground">Edit provider facts. Every save is written to the editorial audit log.</p>
      <div className="mt-6 overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-muted/60 text-left">
            <tr>
              <th scope="col" className="px-3 py-2">Provider</th>
              <th scope="col" className="px-3 py-2">GPhC</th>
              <th scope="col" className="px-3 py-2">Status</th>
              <th scope="col" className="px-3 py-2">Last verified</th>
              <th scope="col" className="px-3 py-2">Price points</th>
            </tr>
          </thead>
          <tbody>
            {providers.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="px-3 py-2">
                  <Link href={`/admin/providers/${p.slug}`} className="font-medium text-primary hover:underline">{p.name}</Link>
                </td>
                <td className="px-3 py-2">{p.gphcNumber ?? "Not yet verified"}</td>
                <td className="px-3 py-2">{p.verified ? <Badge variant="success">Verified</Badge> : <Badge variant="outline">Unverified</Badge>}</td>
                <td className="px-3 py-2">{formatDate(p.lastVerifiedAt)}</td>
                <td className="px-3 py-2">{p._count.prices}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
