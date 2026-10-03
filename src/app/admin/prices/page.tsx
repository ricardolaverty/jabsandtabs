import { getPrisma } from "@/lib/prisma";
import { NoDatabaseNotice } from "../no-database";
import { addPricePoint } from "../actions";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { formatDate } from "@/lib/utils";
import { flags } from "@/config/flags";

type Props = { searchParams: Promise<{ saved?: string }> };

const sel = "flex h-10 w-full rounded-md border border-input-strong bg-background px-3 text-sm";

export default async function AdminPrices({ searchParams }: Props) {
  const prisma = getPrisma();
  if (!prisma) return <NoDatabaseNotice />;
  const { saved } = await searchParams;
  const [providers, medications, recent] = await Promise.all([
    prisma.provider.findMany({ orderBy: { name: "asc" }, select: { slug: true, name: true } }),
    prisma.medication.findMany({ include: { doses: { orderBy: { mg: "asc" } } } }),
    prisma.pricePoint.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
      include: { provider: { select: { name: true } }, medication: { select: { name: true } } },
    }),
  ]);
  const doseOptions = medications.flatMap((m) => m.doses.map((d) => ({ value: d.slug, label: `${m.name} ${d.mg}mg (${d.slug})` })));

  return (
    <div>
      <h1 className="text-2xl font-semibold">Price points</h1>
      {!flags.pomPricing && (
        <p className="mt-2 rounded-md bg-info px-3 py-2 text-sm text-info-foreground">
          Price display is switched off (FLAG_POM_PRICING). Prices recorded here are stored with history but not shown on the site.
        </p>
      )}
      {saved && <p role="status" className="mt-3 rounded-md bg-success px-3 py-2 text-sm text-success-foreground">Price point added.</p>}

      <form action={addPricePoint} className="mt-6 grid max-w-3xl gap-4 rounded-xl border p-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="providerSlug">Provider</Label>
          <select id="providerSlug" name="providerSlug" required className={sel}>
            {providers.map((p) => (
              <option key={p.slug} value={p.slug}>{p.name}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="medicationSlug">Medicine</Label>
          <select id="medicationSlug" name="medicationSlug" required className={sel}>
            {medications.map((m) => (
              <option key={m.slug} value={m.slug}>{m.name}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="doseSlug">Dose (must belong to the chosen medicine)</Label>
          <select id="doseSlug" name="doseSlug" required className={sel}>
            {doseOptions.map((d) => (
              <option key={d.label} value={d.value}>{d.label}</option>
            ))}
          </select>
        </div>
        {[
          ["retailPrice", "Retail price (GBP, 4-week supply)"],
          ["discountPrice", "Discount price (GBP)"],
          ["deliveryCharge", "Delivery charge (GBP)"],
          ["consultationFee", "Consultation fee (GBP)"],
        ].map(([name, label]) => (
          <div key={name} className="space-y-2">
            <Label htmlFor={name}>{label}</Label>
            <Input id={name} name={name} inputMode="decimal" />
          </div>
        ))}
        <div className="space-y-2">
          <Label htmlFor="checkedAt">Date checked</Label>
          <Input id="checkedAt" name="checkedAt" type="date" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="verifiedBy">Verified by</Label>
          <Input id="verifiedBy" name="verifiedBy" required />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="sourceUrl">Source URL (provider page showing this price)</Label>
          <Input id="sourceUrl" name="sourceUrl" type="url" required />
        </div>
        <div className="sm:col-span-2">
          <Button type="submit">Add price point</Button>
        </div>
      </form>

      <h2 className="mt-10 text-lg font-semibold">Most recent entries</h2>
      <div className="mt-3 overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-muted/60 text-left">
            <tr>
              {["Provider", "Medicine", "Dose", "Retail", "Discount", "Checked", "By"].map((h) => (
                <th key={h} scope="col" className="px-3 py-2">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recent.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="px-3 py-2">{r.provider.name}</td>
                <td className="px-3 py-2">{r.medication.name}</td>
                <td className="px-3 py-2">{r.doseSlug}</td>
                <td className="px-3 py-2">{r.retailPrice?.toString() ?? "–"}</td>
                <td className="px-3 py-2">{r.discountPrice?.toString() ?? "–"}</td>
                <td className="px-3 py-2">
                  <a href={r.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline">{formatDate(r.checkedAt)}</a>
                </td>
                <td className="px-3 py-2">{r.verifiedBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
