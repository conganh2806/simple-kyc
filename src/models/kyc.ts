export const incomeTypes = [
  { label: "Salary", value: "salary" },
  { label: "Investment", value: "investment" },
  { label: "Others", value: "others" },
];

export const assetTypes = [
  { label: "Bond", value: "bond" },
  { label: "Liquidity", value: "liquidity" },
  { label: "Real Estate", value: "real-estate" },
  { label: "Others", value: "others" },
];

export const liabilityTypes = [
  { label: "Personal Loan", value: "personal-loan" },
  { label: "Real Estate Loan", value: "real-estate-loan" },
  { label: "Others", value: "others" },
];

export const wealthTypes = [
  { label: "Inheritance", value: "inheritance" },
  { label: "Donation", value: "donation" },
];

export const experienceOptions = [
  { label: "< 5 years", value: "<5-years" },
  { label: "5 - 10 years", value: "5-10-years" },
  { label: "> 10 years", value: ">10-years" },
];

export const riskOptions = [
  { label: "10%", value: "10%" },
  { label: "30%", value: "30%" },
  { label: "All-in", value: "all-in" },
];

export const addressTypes = [
  { label: "Home", value: "home" },
  { label: "Office", value: "office" },
  { label: "Billing", value: "billing" },
  { label: "Mailing", value: "mailing" },
];

export const emailTypes = [
  { label: "Work", value: "work" },
  { label: "Personal", value: "personal" },
];

export const phoneType = [
  { label: "Mobile", value: "mobile" },
  { label: "Home", value: "home" },
  { label: "Work", value: "work" },
];

export const yesNoTypes = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
];

export const documentTypes = [
  { label: "Passport", value: "passport" },
  { label: "National ID", value: "nationalId" },
  { label: "Driver License", value: "driverLicense" },
];

// Address
export interface AddressItem {
  country: string;
  city: string;
  street: string;
  postalCode: string;
  type: string;
}

export interface EmailItem {
  address: string;
  type: string;
}

export interface PhoneItem {
  number: string;
  type: string;
}

export interface IdentityDocument {
  type: string;
  expiryDate: Date | null;
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
    dateOfBirth: Date | null;
    age?: number;
  };

  addresses: AddressItem[];
  emails: EmailItem[];
  phones: PhoneItem[];

  documents: IdentityDocument[];

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
}
