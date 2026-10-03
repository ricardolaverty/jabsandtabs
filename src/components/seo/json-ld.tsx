import type { JsonLd as JsonLdData } from "@/lib/schema";

/** Renders one or more JSON-LD blocks. Null entries are skipped. */
export function JsonLd({ data }: { data: JsonLdData | (JsonLdData | null)[] | null }) {
  const items = (Array.isArray(data) ? data : [data]).filter((d): d is JsonLdData => d !== null);
  if (!items.length) return null;
  return (
    <>
      {items.map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          // Escape "<" so content can never close the script tag.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(d).replace(/</g, "\\u003c") }}
        />
      ))}
    </>
  );
}
