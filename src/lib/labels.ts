import type { Provider, UkStatus } from "@/types";

export const PROVIDER_TYPE_LABELS: Record<Provider["type"], string> = {
  "online-pharmacy": "Online pharmacy",
  "online-doctor": "Online doctor service",
  "high-street-pharmacy": "High-street pharmacy online",
  "telehealth-programme": "Telehealth programme",
};

/** Which regulator to check for each provider type (pharmacies: GPhC; doctor-led services: CQC in England). */
export const PROVIDER_TYPE_REGULATOR: Record<Provider["type"], string> = {
  "online-pharmacy": "GPhC (pharmacy premises); CQC if doctors prescribe",
  "online-doctor": "CQC (in England) and GPhC for the dispensing pharmacy",
  "high-street-pharmacy": "GPhC (pharmacy premises); CQC if doctors prescribe",
  "telehealth-programme": "CQC (in England) and GPhC for the dispensing pharmacy",
};

export const UK_STATUS_LABELS: Record<UkStatus, string> = {
  licensed: "Licensed in the UK for weight management",
  "licensed-diabetes-only": "Licensed in the UK for type 2 diabetes only",
  "not-yet-licensed": "Not yet licensed in the UK",
  verify: "UK status being verified",
};

export const DOSE_ROLE_LABELS = {
  starting: "Starting dose",
  titration: "Step-up dose",
  maintenance: "Maintenance dose",
  maximum: "Maximum dose",
} as const;

export const GPHC_REGISTER_URL = "https://www.pharmacyregulation.org/registers";
export const CQC_SEARCH_URL = "https://www.cqc.org.uk/search/all";
export const YELLOW_CARD_URL = "https://yellowcard.mhra.gov.uk/";
export const EMC_URL = "https://www.medicines.org.uk/emc";
export const MHRA_URL = "https://www.gov.uk/government/organisations/medicines-and-healthcare-products-regulatory-agency";
