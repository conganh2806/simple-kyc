import { z } from "zod";
import { calculateAge } from "../../utils/dateUtils";

export const basicInfoSchema = z
  .object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    middleName: z.string().optional(),

    dateOfBirth: z.iso.datetime(),
    age: z.number().min(18, "Age must be 18+").optional(),
  })
  .superRefine((data, ctx) => {
    const realAge = calculateAge(data.dateOfBirth);

    if (data.age != realAge) {
      ctx.addIssue({
        code: "custom",
        message: `Age must be ${realAge} based on DOB`,
        path: ["age"],
      });
    }
  });
