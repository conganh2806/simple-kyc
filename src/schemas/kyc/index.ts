import z from "zod";
import { basicInfoSchema } from "./basicInfo";
import { contactInfoSchema } from "./contactInformation";

export const kycSchema = z.object({
  basicInfo: basicInfoSchema,
  contactInfo: contactInfoSchema,
});

export type KYCFormValues = z.infer<typeof kycSchema>;
