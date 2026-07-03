import z from "zod";

const imageSchema = z.union([z.string(), z.instanceof(Blob)]);

/**
 * Account schema for validating account data.
 */
export const accountSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.email("Invalid email address"),
  phone: z.string().min(8, "Phone number is required"),
  photo_path: imageSchema.optional(),
});

export type Account = z.infer<typeof accountSchema>;
