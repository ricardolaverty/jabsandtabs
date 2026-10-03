import Link from "next/link";
import { Stethoscope } from "lucide-react";

/** Required at the end of every article and medical page. */
export function MedicalDisclaimer() {
  return (
    <aside aria-label="Medical disclaimer" className="my-10 rounded-xl border bg-muted/60 p-5 text-sm leading-relaxed">
      <p className="flex items-center gap-2 font-semibold text-foreground">
        <Stethoscope aria-hidden className="size-4" />
        Medical disclaimer
      </p>
      <p className="mt-2 text-muted-foreground">
        This information is for general education and does not replace advice from a qualified healthcare
        professional. Weight loss medicines are prescription-only: only a GP, pharmacist independent prescriber or
        other registered prescriber can decide whether a treatment is safe and suitable for you. Always read the
        Patient Information Leaflet that comes with your medicine.
      </p>
      <p className="mt-2 text-muted-foreground">
        Seek urgent help (NHS 111, or 999 in an emergency) if you have severe or persistent abdominal pain, signs of a
        severe allergic reaction, or cannot keep fluids down. You can report suspected side effects through the{" "}
        <a href="https://yellowcard.mhra.gov.uk/" target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline">
          MHRA Yellow Card scheme
        </a>
        .{" "}
        <Link href="/medical-disclaimer" className="font-medium text-primary underline">
          Read our full medical disclaimer
        </Link>
        .
      </p>
    </aside>
  );
}
