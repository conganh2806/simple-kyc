import z from "zod";

export const loginSchema = z.object({
  email: z.email({ pattern: z.regexes.email }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const SPECIAL_CHARS_REGEX = /[@#&!]/;

export const registerSchema = z
  .object({
    email: z.email({ pattern: z.regexes.email }),
    password: z
      .string()
      .min(1, "Password is required")
      .min(12, "Password must be at least 12 characters")
      .max(16, "Password must be at most 16 characters")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        SPECIAL_CHARS_REGEX,
        "Password must contain at least one special char (@, #, &, !)",
      ),
    confirmPassword: z.string().min(1, "Confirm Password is required"),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type LoginFormInputs = z.infer<typeof loginSchema>;
export type RegisterFormInputs = z.infer<typeof registerSchema>;
