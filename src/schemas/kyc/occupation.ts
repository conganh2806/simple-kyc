import z from "zod";
import { OCCUPATION_KEYS } from "../../models/kyc";

export const occupationSchema = z
  .object({
    occupation: z.enum(OCCUPATION_KEYS, {
      error: "Please select a valid occupation type",
    }),
    fromDate: z.iso.datetime({
      error: "Invalid datetime",
    }),
    toDate: z.iso
      .datetime({
        error: "Invalid datetime",
      })
      .nullable()
      .optional(),
  })
  .refine(
    (data) => {
      if (!data.toDate) return true;

      const start = new Date(data.fromDate);
      const end = new Date(data.toDate);

      return end > start;
    },
    {
      error: "End date must be after start date",
      path: ["toDate"],
    },
  );

export type OccupationFormValues = z.infer<typeof occupationSchema>;
