import z from "zod";

type T = (key: string) => string;

const imageSchema = z.union([z.string(), z.instanceof(Blob)]);

/**
 * Account form validation schema using Zod
 * This schema validates the user input for the profile form.
 */
export const accountSchema = (t: T) =>
  z.object({
    name: z.string().min(1, t("nameIsRequired")).min(2, t("nameMinLength")),
    email: z.email(t("emailIsInvalid")),
    phone: z.string().min(1, t("phoneIsRequired")).min(10, t("phoneMinLength")),
    photo_path: imageSchema.optional(),
    locale: z.string(),
  });

export type Account = z.infer<ReturnType<typeof accountSchema>>;

/**
 * Address form validation schema using Zod
 * This schema validates the user input for the address form.
 */
export const addressSchema = (t: T) =>
  z.object({
    label: z.enum(["Home", "Work", "Other"], t("invalidAddressLabel")),
    recipient_name: z
      .string()
      .min(1, t("recipientNameIsRequired"))
      .min(2, t("recipientNameMinLength")),
    recipient_phone: z
      .string()
      .min(1, t("recipientPhoneIsRequired"))
      .min(10, t("recipientPhoneMinLength")),
    street: z
      .string()
      .min(1, t("streetIsRequired"))
      .min(2, t("streetMinLength")),
    area: z.string().min(1, t("areaIsRequired")).min(2, t("areaMinLength")),
    city: z.string().min(1, t("cityIsRequired")).min(2, t("cityMinLength")),
    emirate: z
      .string()
      .min(1, t("emirateIsRequired"))
      .min(2, t("emirateMinLength")),
    building: z
      .string()
      .min(1, t("buildingIsRequired"))
      .min(2, t("buildingMinLength")),
    landmark: z
      .string()
      .min(1, t("landmarkIsRequired"))
      .min(2, t("landmarkMinLength")),
    latitude: z.number().min(1, t("latitudeIsRequired")),
    longitude: z.number().min(1, t("longitudeIsRequired")),
    is_default: z.boolean().optional(),
  });

export type AddressFormBody = z.infer<ReturnType<typeof addressSchema>>;

export type AddressLabel = "Home" | "Work" | "Other";

export type Address = AddressFormBody & { id: number };

export type AddressesResponse = {
  data: { items: Address[] };
};

// Orders
const fileSchema = z.instanceof(File);

export const ratingSchema = (t: T) =>
  z.object({
    rating: z.number().min(1, t("RatingRequired")),
    feedback: z.string().optional(),
    photos: z.array(fileSchema).optional(),
  });

export type RatingFormData = z.infer<ReturnType<typeof ratingSchema>>;
