import { z } from "zod";

export const basicInfoSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  middleName: z.string().optional(),

  dateOfBirth: z.iso.datetime(),
  age: z.number().min(18, "Age must be 18+").optional(),
});
