import { z } from "zod";

// ✅ 1. Base schema (NO refine here)
const eventBaseSchema = z.object({
  title: z
    .string("Title is required")
    .min(3, "Title must be at least 3 characters long"),

  description: z
    .string("Description is required")
    .min(10, "Description must be at least 10 characters long"),

  date: z.string("Date is required"),

  location: z
    .string("Location is required")
    .min(3, "Location must be at least 3 characters long"),

  minParticipants: z
    .number("Minimum participants is required")
    .int()
    .min(1, "Must be at least 1"),

  maxParticipants: z
    .number("Maximum participants is required")
    .int()
    .min(1, "Must be at least 1"),

  categoryId: z.string("Category ID is required"),

  fee: z.number("Fee is required").min(0, "Fee cannot be negative"),
});

// ✅ 2. Create schema with refinement
export const createEventValidationZodSchema = eventBaseSchema.refine(
  (data) => data.maxParticipants >= data.minParticipants,
  {
    message: "Maximum participants cannot be less than minimum participants",
    path: ["maxParticipants"],
  },
);

// ✅ 3. Update schema (partial first, then refine safely)
export const updateEventValidationZodSchema = eventBaseSchema
  .partial()
  .refine(
    (data) =>
      !data.minParticipants ||
      !data.maxParticipants ||
      data.maxParticipants >= data.minParticipants,
    {
      message: "Maximum participants cannot be less than minimum participants",
      path: ["maxParticipants"],
    },
  );
