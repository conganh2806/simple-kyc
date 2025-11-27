import { formatLabel } from "../utils/stringUtils";

const createOptions = <T extends string>(keys: readonly T[]) => {
  return keys.map((key) => ({
    label: formatLabel(key),
    value: key,
  }));
};

const mapToOptions = (record: Record<string, string>) => {
  return Object.entries(record).map(([value, label]) => ({
    label,
    value,
  }));
};

// --- INCOME ---
export const INCOME_KEYS = ["salary", "investment", "others"] as const;
export type IncomeType = (typeof INCOME_KEYS)[number];
export const incomeTypes = createOptions(INCOME_KEYS);

// --- ASSETS ---
export const ASSET_KEYS = [
  "bond",
  "liquidity",
  "real-estate",
  "others",
] as const;
export type AssetType = (typeof ASSET_KEYS)[number];
export const assetTypes = createOptions(ASSET_KEYS);

// --- LIABILITY ---
export const LIABILITY_KEYS = [
  "personal-loan",
  "real-estate-loan",
  "others",
] as const;
export type LiabilityType = (typeof LIABILITY_KEYS)[number];
export const liabilityTypes = createOptions(LIABILITY_KEYS);

// --- WEALTH ---
export const WEALTH_KEYS = ["inheritance", "donation"] as const;
export type WealthType = (typeof WEALTH_KEYS)[number];
export const wealthTypes = createOptions(WEALTH_KEYS);

// --- ADDRESS ---
export const ADDRESS_TYPE_KEYS = ["mailing", "work", "home"] as const;
export type AddressType = (typeof ADDRESS_TYPE_KEYS)[number];
export const addressTypes = createOptions(ADDRESS_TYPE_KEYS);

// --- EMAIL ---
export const EMAIL_KEYS = ["work", "personal", "hehe"] as const;
export type EmailType = (typeof EMAIL_KEYS)[number];
export const emailTypes = createOptions(EMAIL_KEYS);

// --- PHONE ---
export const PHONE_KEYS = ["work", "personal"] as const;
export type PhoneType = (typeof PHONE_KEYS)[number];
export const phoneType = createOptions(PHONE_KEYS);

// --- YES/NO ---
export const YES_NO_KEYS = ["yes", "no"] as const;
export type YesNoType = (typeof YES_NO_KEYS)[number];
export const yesNoTypes = createOptions(YES_NO_KEYS);

// --- EXPERIENCE (Map) ---
export const EXPERIENCE_MAP = {
  "<5-years": "< 5 years",
  "5-10-years": "5 - 10 years",
  ">10-years": "> 10 years",
} as const;
export const EXPERIENCE_KEYS = Object.keys(
  EXPERIENCE_MAP,
) as (keyof typeof EXPERIENCE_MAP)[];
export const experienceOptions = mapToOptions(EXPERIENCE_MAP);

// --- RISK (Map) ---
export const RISK_MAP = {
  "10%": "10%",
  "30%": "30%",
  "all-in": "All-in",
} as const;
export const RISK_KEYS = Object.keys(RISK_MAP) as (keyof typeof RISK_MAP)[];
export const riskOptions = mapToOptions(RISK_MAP);

// --- DOCUMENTS ---
export const DOCUMENTS_MAP = {
  passport: "Passport",
  nationalId: "National ID",
  driverLicense: "Driver License",
} as const;

export const DOCUMENT_KEYS = Object.keys(DOCUMENTS_MAP) as [
  string,
  ...string[],
];
export const documentTypes = mapToOptions(DOCUMENTS_MAP);

// =============================================================================
// 3. INTERFACES
// =============================================================================

export interface KycSubmissionData extends KYCItem {
  id: number;
  status?: "approved" | "pending" | "rejected";
  createdAt?: string;
}

export interface AddressItem {
  country: string;
  city: string;
  street: string;
  postalCode: string;
  type: AddressType;
}

export interface EmailItem {
  address: string;
  type: EmailType;
  preferred?: YesNoType;
}

export interface PhoneItem {
  number: string;
  type: PhoneType;
  preferred?: YesNoType;
}

export interface IdentityDocument {
  type: string;
  expiryDate: Date | null | string;
  file: File | null | string;
}

export interface OccupationItem {
  occupation: string;
  fromDate: Date | null;
  toDate: Date | null;
}

export interface FinancialItem {
  type: string;
  amount: number | null;
}

export interface KYCItem {
  basicInfo: {
    firstName: string;
    lastName: string;
    middleName?: string;
    dateOfBirth: Date | null | string;
    age?: number;
  };

  contactInfo: {
    addresses: AddressItem[];
    emails: EmailItem[];
    phones: PhoneItem[];
  };

  identificationDocuments: IdentityDocument[];

  occupations: OccupationItem[];

  financials: {
    incomes: FinancialItem[];
    assets: FinancialItem[];
    liabilities: FinancialItem[];
    sourcesOfWealth: FinancialItem[];
    totalLiabilities?: number;
    totalWealth?: number;
    netWorth?: number;
  };

  investment: {
    experience: string;
    riskTolerance: string;
  };

  approved?: boolean;
}
