import { z } from "zod";

export const createEventValidationZodSchema = z
  .object({
    title: z
      .string("Title is required")
      .min(3, "Title must be at least 3 characters long"),

    description: z
      .string("Description is required")
      .min(10, "Description must be at least 10 characters long"),

    date: z.string("Date is required"),

    location: z
      .string("Location is required")
      .min(3, "Title must be at least 3 characters long"),

    minParticipants: z
      .number("Minimum participants is required")
      .min(1, "Must be a whole number"),

    maxParticipants: z
      .number("Maximum participants is required")
      .min(10, "Must be a whole number"),

    categoryId: z.string("Category ID is required"),

    fee: z.number("Fee is required").min(0, "Fee cannot be negative"),
  })
  .refine((data) => data.maxParticipants >= data.minParticipants, {
    message: "Maximum participants cannot be less than minimum participants",
    path: ["maxParticipants"],
  });

export const updateEventValidationZodSchema =
  createEventValidationZodSchema.partial();
