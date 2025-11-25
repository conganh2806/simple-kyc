import z from "zod";
import { basicInfoSchema } from "./basicInfo";
import { contactInfoSchema } from "./contactInformation";
import { identificationDocumentSchema } from "./identificationDocuments";

export const kycSchema = z.object({
  basicInfo: basicInfoSchema,
  contactInfo: contactInfoSchema,
  identificationDocuments: z
    .array(identificationDocumentSchema)
    .min(1, "At least one identification document is required"),
});

export type KYCFormValues = z.infer<typeof kycSchema>;
