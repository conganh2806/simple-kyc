import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "application/pdf",
];

const DOCUMENT_TYPES = ["passport", "nationalId", "driverLicense"] as const;

export const identificationDocumentSchema = z.object({
  type: z.enum(DOCUMENT_TYPES, {
    error: "Please select a valid document type",
  }),
  expiryDate: z.iso.datetime(),
  uploadDocument: z
    .custom<FileList>()
    .refine((files) => files instanceof FileList, "Expected a file list")
    .refine((files) => files && files.length > 0, "Document file is required")
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, `Max file size is 5MB.`)
    .refine((files) => {
      return ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type);
    }, "Only .jpg, .png and .pdf formats are supported."),
});

export type DocumentFormValue = z.infer<typeof identificationDocumentSchema>;
