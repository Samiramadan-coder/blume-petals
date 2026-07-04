import z from "zod";

const imageSchema = z.union([z.string(), z.instanceof(Blob)]);

// Account schema for validating account data.
export const accountSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: z.email("Invalid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .min(10, "Phone number must be at least 10 characters"),

  photo_path: imageSchema.optional(),
});

export type Account = z.infer<typeof accountSchema>;

// Addresses
export const addressSchema = z.object({
  label: z.enum(["Home", "Work", "Other"], "Invalid address label"),
  recipient_name: z
    .string()
    .min(1, "Recepient name is required")
    .min(2, "Recipient name must be at least 2 characters"),
  recipient_phone: z
    .string()
    .min(1, "Recepient Phone is required")
    .min(10, "Recepient Phone must be at least 10 characters"),
  street: z
    .string()
    .min(1, "Street is required")
    .min(2, "Street must be at least 2 characters"),
  area: z
    .string()
    .min(1, "Area is required")
    .min(2, "Area must be at least 2 characters"),
  city: z
    .string()
    .min(1, "City is required")
    .min(2, "City must be at least 2 characters"),
  emirate: z
    .string()
    .min(1, "Emirates is required")
    .min(2, "Emirates must be at least 2 characters"),
  building: z
    .string()
    .min(1, "Building is required")
    .min(2, "Building must be at least 2 characters"),
  landmark: z
    .string()
    .min(1, "Landmark is required")
    .min(2, "Landmark must be at least 2 characters"),
  latitude: z.number().min(1, "Latitude is required"),
  longitude: z.number().min(1, "Longitude is required"),
  is_default: z.boolean().optional(),
});

export type AddressFormBody = z.infer<typeof addressSchema>;

export type AddressLabel = AddressFormBody["label"];

export type Address = AddressFormBody & { id: number };

export type AddressesResponse = {
  data: { items: Address[] };
};
