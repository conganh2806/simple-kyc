import z from "zod";

// --- 1. ADDRESS SCHEMA ---
const ADDRESS_VALUES = ["home", "office", "billing", "mailing"] as const;
const AddressTypeEnum = z.enum(ADDRESS_VALUES);

export const addressSchema = z.object({
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required"),
  street: z.string().min(1, "Street is required"),
  postalCode: z.string().optional(),
  type: AddressTypeEnum,
});

// --- 2. EMAIL SCHEMA ---
const EMAIL_TYPES = ["personal", "work"] as const;
const EmailTypeEnum = z.enum(EMAIL_TYPES);

const emailItemSchema = z.object({
  address: z.email("Invalid email address"),
  type: EmailTypeEnum,
});

// --- 3. PHONE SCHEMA ---
const PHONE_TYPES = ["mobile", "home", "work"] as const;
const PhoneTypeEnum = z.enum(PHONE_TYPES);

const phoneItemSchema = z.object({
  number: z.string().min(10, "Phone number must be at least 10 digits"),
  type: PhoneTypeEnum,
});

export const contactInfoSchema = z.object({
  addresses: z.array(addressSchema).min(1, "At least one address is required"),
  emails: z.array(emailItemSchema).min(1, "At least one email is required"),
  phones: z.array(phoneItemSchema).min(1, "At least one phone is required"),
});
export type AddressFormValues = z.infer<typeof addressSchema>;
