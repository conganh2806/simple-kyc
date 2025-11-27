import z from "zod";
import {
  ADDRESS_TYPE_KEYS,
  EMAIL_KEYS,
  PHONE_KEYS,
  YES_NO_KEYS,
} from "../../models/kyc";

// --- 1. ADDRESS SCHEMA ---
const AddressTypeEnum = z.enum(ADDRESS_TYPE_KEYS);
export const addressSchema = z.object({
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required"),
  street: z.string().min(1, "Street is required"),
  postalCode: z.string().optional(),
  type: AddressTypeEnum,
});

// --- 2. EMAIL SCHEMA ---
const EmailTypeEnum = z.enum(EMAIL_KEYS);
const PreferredTypeEnums = z.enum(YES_NO_KEYS);
const emailItemSchema = z.object({
  email: z.email("Invalid email address"),
  type: EmailTypeEnum,
  preferred: PreferredTypeEnums,
});

// --- 3. PHONE SCHEMA ---
const PhoneTypeEnum = z.enum(PHONE_KEYS);
const phoneItemSchema = z.object({
  number: z.string().min(10, "Phone number must be at least 10 digits"),
  type: PhoneTypeEnum,
  preferred: PreferredTypeEnums,
});

export const contactInfoSchema = z.object({
  addresses: z.array(addressSchema).min(1, "At least one address is required"),
  emails: z.array(emailItemSchema).min(1, "At least one email is required"),
  phones: z.array(phoneItemSchema).min(1, "At least one phone is required"),
});

export type AddressFormValues = z.infer<typeof addressSchema>;
export type EmailFormValues = z.infer<typeof emailItemSchema>;
export type PhoneFormValues = z.infer<typeof phoneItemSchema>;
