import z from "zod";

type T = (key: string) => string;

const imageSchema = z.union([z.string(), z.instanceof(File)]);

/**
 * Account form validation schema using Zod
 * This schema validates the user input for the profile form.
 */
export const accountSchema = (t: T) =>
  z.object({
    name: z
      .string()
      .min(1, t("Errors.FullNameIsRequired"))
      .min(2, t("Errors.FullNameIsTooShort")),
    email: z.email(t("Errors.EmailIsInvalid")),
    phone: z
      .string()
      .trim()
      .regex(/^5[024568]\d{7}$/, t("Errors.PhoneIsInvalid")),
    photo_url: imageSchema.optional(),
    locale: z.string(),
  });

export const otpSchema = (t: T) =>
  z.object({
    phone: z
      .string()
      .trim()
      .regex(/^5[024568]\d{7}$/, t("Errors.PhoneIsInvalid")),
    code: z
      .string()
      .trim()
      .regex(/^\d{6}$/, t("Errors.InvalidOTP")),
  });

export type Account = z.infer<ReturnType<typeof accountSchema>>;
export type OTPForm = z.infer<ReturnType<typeof otpSchema>>;

/**
 * Address form validation schema using Zod
 * This schema validates the user input for the address form.
 */
export const addressSchema = (t: T) =>
  z.object({
    label: z.enum(["Home", "Work", "Other"], t("Errors.InvalidAddressLabel")),
    recipient_name: z
      .string()
      .min(1, t("Errors.RecipientNameIsRequired"))
      .min(2, t("Errors.RecipientNameMinLength")),
    recipient_phone: z
      .string()
      .trim()
      .regex(/^5[024568]\d{7}$/, t("Errors.PhoneIsInvalid")),
    street: z
      .string()
      .min(1, t("Errors.StreetIsRequired"))
      .min(2, t("Errors.StreetMinLength")),
    area: z
      .string()
      .min(1, t("Errors.AreaIsRequired"))
      .min(2, t("Errors.AreaMinLength")),
    city: z
      .string()
      .min(1, t("Errors.CityIsRequired"))
      .min(2, t("Errors.CityMinLength")),
    emirate: z
      .string()
      .min(1, t("Errors.EmirateIsRequired"))
      .min(2, t("Errors.EmirateMinLength")),
    building: z
      .string()
      .min(1, t("Errors.BuildingIsRequired"))
      .min(2, t("Errors.BuildingMinLength")),
    landmark: z
      .string()
      .min(1, t("Errors.LandmarkIsRequired"))
      .min(2, t("Errors.LandmarkMinLength")),
    latitude: z.number().min(1, t("Errors.LatitudeIsRequired")),
    longitude: z.number().min(1, t("Errors.LongitudeIsRequired")),
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
