import { z } from "zod";

export const updateUserZodSchema = z
  .object({
    fullName: z
      .string()
      .min(2, "Full name must be at least 2 characters")
      .optional(),

    email: z.string().email("Invalid email address"),

    location: z.string().optional(),

    bio: z.string().max(500, "Bio must be under 500 characters").optional(),

    role: z.enum(["USER", "HOST", "ADMIN"]).optional(),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .optional(),

    confirmPassword: z.string().optional(),

    interestIds: z.array(z.number().int().positive()).optional(),
  })
  .superRefine((data, ctx) => {
    // If password is provided, confirmPassword must exist
    if (data.password && !data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "Confirm password is required",
        code: z.ZodIssueCode.custom,
      });
    }

    // If both exist, they must match
    if (
      data.password &&
      data.confirmPassword &&
      data.password !== data.confirmPassword
    ) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "Passwords do not match",
        code: z.ZodIssueCode.custom,
      });
    }
  });
