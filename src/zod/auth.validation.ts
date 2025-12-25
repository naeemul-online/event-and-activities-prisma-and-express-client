/* eslint-disable @typescript-eslint/no-explicit-any */
import z from "zod";

const UserRole = z.enum(["ADMIN", "HOST", "USER"]);

export const registerPatientValidationZodSchema = z
  .object({
    fullName: z.string().min(1, { message: "Name is required" }),
    location: z.string().optional(),
    bio: z.string().optional(),
    role: UserRole,
    email: z.email({ message: "Valid email is required" }),
    password: z
      .string()
      .min(6, {
        error: "Password is required and must be at least 6 characters long",
      })
      .max(100, {
        error: "Password must be at most 100 characters long",
      }),
    confirmPassword: z.string().min(6, {
      error:
        "Confirm Password is required and must be at least 6 characters long",
    }),
    interestIds: z
      .array(
        z.number().int().positive().min(1, {
          message: "Interest ID must be a positive integer",
        })
      )
      .min(1, {
        message: "Please select at least one interest.",
      }),
  })
  .refine((data: any) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginValidationZodSchema = z.object({
  email: z.email({
    message: "Email is required",
  }),
  password: z
    .string("Password is required")
    .min(6, {
      error: "Password is required and must be at least 6 characters long",
    })
    .max(100, {
      error: "Password must be at most 100 characters long",
    }),
});
