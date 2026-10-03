import { notFound } from "next/navigation";
import { getPrisma } from "@/lib/prisma";
import { NoDatabaseNotice } from "../../no-database";
import { updateProvider } from "../../actions";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ saved?: string }> };

const area = "flex min-h-24 w-full rounded-md border border-input-strong bg-background px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-ring";

export default async function EditProvider({ params, searchParams }: Props) {
  const prisma = getPrisma();
  if (!prisma) return <NoDatabaseNotice />;
  const { slug } = await params;
  const { saved } = await searchParams;
  const p = await prisma.provider.findUnique({ where: { slug } });
  if (!p) notFound();
  const audits = await prisma.editorialAudit.findMany({ where: { entity: "Provider", entityId: p.id }, orderBy: { createdAt: "desc" }, take: 10 });

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-semibold">{p.name}</h1>
      {saved && <p role="status" className="mt-3 rounded-md bg-success px-3 py-2 text-sm text-success-foreground">Saved.</p>}
      <p className="mt-2 text-sm text-muted-foreground">
        Enter only facts checked against primary sources (GPhC/CQC registers, the provider&apos;s own site, Trustpilot). Leave blank if not verified.
      </p>
      <form action={updateProvider} className="mt-6 space-y-5">
        <input type="hidden" name="slug" value={p.slug} />
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="gphcNumber">GPhC registration number</Label>
            <Input id="gphcNumber" name="gphcNumber" defaultValue={p.gphcNumber ?? ""} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cqcRegistered">CQC registered</Label>
            <select id="cqcRegistered" name="cqcRegistered" defaultValue={p.cqcRegistered === null ? "" : String(p.cqcRegistered)} className="flex h-10 w-full rounded-md border border-input-strong bg-background px-3 text-sm">
              <option value="">Not yet verified</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="delivery">Delivery</Label>
          <Input id="delivery" name="delivery" defaultValue={p.delivery ?? ""} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="support">Clinical support (one per line)</Label>
          <textarea id="support" name="support" defaultValue={p.support.join("\n")} className={area} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="maintenancePolicy">Maintenance policy</Label>
          <textarea id="maintenancePolicy" name="maintenancePolicy" defaultValue={p.maintenancePolicy ?? ""} className={area} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="consultationFee">Consultation fee (GBP, only shown when price comparison is enabled)</Label>
          <Input id="consultationFee" name="consultationFee" inputMode="decimal" defaultValue={p.consultationFee?.toString() ?? ""} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="pros">Pros (one per line)</Label>
            <textarea id="pros" name="pros" defaultValue={p.pros.join("\n")} className={area} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cons">Cons (one per line)</Label>
            <textarea id="cons" name="cons" defaultValue={p.cons.join("\n")} className={area} />
          </div>
        </div>
        <fieldset className="grid gap-4 rounded-lg border p-4 sm:grid-cols-3">
          <legend className="px-1 text-sm font-medium">Trustpilot (all three required to display)</legend>
          <div className="space-y-2">
            <Label htmlFor="trustpilotScore">Score (0 to 5)</Label>
            <Input id="trustpilotScore" name="trustpilotScore" inputMode="decimal" defaultValue={p.trustpilotScore?.toString() ?? ""} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="trustpilotReviews">Number of reviews</Label>
            <Input id="trustpilotReviews" name="trustpilotReviews" inputMode="numeric" defaultValue={p.trustpilotReviews?.toString() ?? ""} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="trustpilotChecked">Date checked</Label>
            <Input id="trustpilotChecked" name="trustpilotChecked" type="date" defaultValue={p.trustpilotChecked?.toISOString().slice(0, 10) ?? ""} />
          </div>
        </fieldset>
        <label className="flex items-center gap-2 text-sm font-medium">
          <input type="checkbox" name="verified" defaultChecked={p.verified} className="size-4 accent-primary" />
          All facts above verified from primary sources (requires a GPhC number)
        </label>
        <div className="space-y-2">
          <Label htmlFor="notes">Audit note (what you checked and where)</Label>
          <textarea id="notes" name="notes" className={area} />
        </div>
        <Button type="submit">Save provider</Button>
      </form>

      <h2 className="mt-10 text-lg font-semibold">Recent audit log</h2>
      <ul className="mt-3 space-y-2 text-sm">
        {audits.length ? (
          audits.map((a) => (
            <li key={a.id} className="rounded border p-2">
              {a.createdAt.toISOString().slice(0, 16).replace("T", " ")} · {a.actor} · {a.action}
              {a.notes ? ` · ${a.notes}` : ""}
            </li>
          ))
        ) : (
          <li className="text-muted-foreground">No entries yet.</li>
        )}
      </ul>
    </div>
  );
}
