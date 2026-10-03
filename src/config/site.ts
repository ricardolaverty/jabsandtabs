export const site = {
  name: "JabsAndTabs",
  domain: "jabsandtabs.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.jabsandtabs.com",
  tagline: "Compare UK weight loss injections & tablets",
  description:
    "Independent, evidence-based guides to UK weight loss medicines (Mounjaro, Wegovy and oral GLP-1s) and the regulated online providers that prescribe them.",
  locale: "en-GB",
  country: "GB",
  contactEmail: "editorial@jabsandtabs.com",
  social: {
    x: "",
    linkedin: "",
  },
  /** Legal entity / publisher details: complete before launch. */
  publisher: {
    legalName: "[OWNER LEGAL NAME / TRADING NAME]",
    address: "[REGISTERED ADDRESS]",
    companyNumber: "[IF INCORPORATED]",
    icoRegistration: "[ICO REGISTRATION NUMBER]",
  },
} as const;

export const mainNav = [
  {
    label: "Jabs",
    href: "/weight-loss-injections",
    children: [
      { label: "Mounjaro", href: "/mounjaro" },
      { label: "Wegovy", href: "/wegovy" },
      { label: "Saxenda", href: "/saxenda" },
      { label: "Compare injections", href: "/weight-loss-injections" },
    ],
  },
  {
    label: "Tabs",
    href: "/oral-glp1",
    children: [
      { label: "Oral GLP-1 hub", href: "/oral-glp1" },
      { label: "Wegovy tablets (oral semaglutide)", href: "/oral-semaglutide" },
      { label: "Foundayo (orforglipron)", href: "/foundayo" },
    ],
  },
  { label: "Providers", href: "/providers" },
  { label: "Compare", href: "/compare" },
  { label: "Guides", href: "/guides" },
  { label: "Tools", href: "/tools" },
] as const;
