import type { Provider } from "../types";

/**
 * Provider seed list (slug, name, type, website only).
 * Kept free of path-alias imports so next.config.ts can import it to build
 * redirects. Re-exported from src/data/providers.ts.
 */

export type ProviderSeed = Pick<Provider, "slug" | "name" | "type" | "website"> & Partial<Provider>;

export const providerSeeds: ProviderSeed[] = [
  { slug: "chemist4u", name: "Chemist4U", type: "online-pharmacy", website: "https://www.chemist4u.com" },
  { slug: "mybmi", name: "MyBMI", type: "online-pharmacy", website: "https://www.mybmi.co.uk" },
  { slug: "myweightloss", name: "MyWeightloss", type: "online-pharmacy", website: "https://www.myweightloss.co.uk" },
  { slug: "superdrug", name: "Superdrug Online Doctor", type: "high-street-pharmacy", website: "https://onlinedoctor.superdrug.com" },
  { slug: "boots", name: "Boots Online Doctor", type: "high-street-pharmacy", website: "https://onlinedoctor.boots.com" },
  { slug: "asda", name: "Asda Online Doctor", type: "high-street-pharmacy", website: "https://onlinedoctor.asda.com" },
  { slug: "lloyds", name: "LloydsPharmacy Online Doctor", type: "online-doctor", website: "https://onlinedoctor.lloydspharmacy.com" },
  { slug: "well", name: "Well Pharmacy Online Doctor", type: "high-street-pharmacy", website: "https://www.well.co.uk" },
  { slug: "zava", name: "Zava", type: "online-doctor", website: "https://www.zavamed.com/uk" },
  { slug: "numan", name: "Numan", type: "telehealth-programme", website: "https://www.numan.com" },
  { slug: "manual", name: "Manual", type: "telehealth-programme", website: "https://www.manual.co" },
  { slug: "juniper", name: "Juniper", type: "telehealth-programme", website: "https://www.myjuniper.co.uk" },
  { slug: "voy", name: "Voy", type: "telehealth-programme", website: "https://joinvoy.com" },
  { slug: "simple-online-pharmacy", name: "Simple Online Pharmacy", type: "online-pharmacy", website: "https://www.simpleonlinepharmacy.co.uk" },
  { slug: "pharmacy2u", name: "Pharmacy2U", type: "online-pharmacy", website: "https://www.pharmacy2u.co.uk" },
  { slug: "medexpress", name: "MedExpress", type: "online-pharmacy", website: "https://www.medexpress.co.uk" },
  { slug: "oxford-online-pharmacy", name: "Oxford Online Pharmacy", type: "online-pharmacy", website: "https://www.oxfordonlinepharmacy.co.uk" },
  { slug: "click-pharmacy", name: "Click Pharmacy", type: "online-pharmacy", website: "https://www.clickpharmacy.co.uk" },
  { slug: "phlo", name: "Phlo", type: "online-pharmacy", website: "https://www.phlo.io" },
  { slug: "uk-meds", name: "UK Meds", type: "online-pharmacy", website: "https://www.ukmeds.co.uk" },
];

/** Curated provider-vs-provider pairs to publish first (full matrix is generated in Phase 4). */
export const providerComparisons: [string, string][] = [
  ["boots", "superdrug"],
  ["chemist4u", "numan"],
  ["zava", "manual"],
  ["boots", "asda"],
  ["superdrug", "asda"],
  ["juniper", "numan"],
  ["voy", "juniper"],
  ["pharmacy2u", "boots"],
  ["simple-online-pharmacy", "medexpress"],
  ["lloyds", "boots"],
  ["chemist4u", "boots"],
  ["chemist4u", "superdrug"],
];
