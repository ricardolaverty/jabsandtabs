/**
 * Author and medical reviewer profiles.
 * Placeholders only. Real people must be recruited, with verifiable
 * credentials (GPhC / GMC / NMC / HCPC numbers), before any article is
 * marked "clinically-reviewed". Never invent credentials.
 */
export interface Author {
  slug: string;
  name: string;
  role: "writer" | "editor" | "medical-reviewer";
  credentials: string | null;
  registration: { body: "GPhC" | "GMC" | "NMC" | "HCPC"; number: string } | null;
  bio: string;
  image: string | null;
  sameAs: string[];
}

export const authors: Author[] = [
  {
    slug: "editorial-team",
    name: "JabsAndTabs Editorial Team",
    role: "editor",
    credentials: null,
    registration: null,
    bio: "Our editorial team researches UK weight management medicines and regulated online providers, working from primary sources such as SmPCs, NICE guidance and peer-reviewed trials.",
    image: null,
    sameAs: [],
  },
  {
    slug: "medical-reviewer-placeholder",
    name: "[Medical reviewer to be appointed]",
    role: "medical-reviewer",
    credentials: null,
    registration: null,
    bio: "Placeholder. Replace with a UK-registered pharmacist or doctor before publishing reviewed content.",
    image: null,
    sameAs: [],
  },
];

export function getAuthor(slug: string) {
  return authors.find((a) => a.slug === slug);
}
