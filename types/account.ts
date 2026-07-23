import z from "zod";
import { Summary } from "./products";

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
    country_id: z.number().min(1, t("Errors.CountryIsRequired")),
    city_id: z.number().min(1, t("Errors.CityIsRequired")),
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

export type Address = {
  apartment: null;
  area: string;
  building: string;
  city: { id: number; name: string; delivery_fee: string };
  country: { id: number; name: string };
  id: number;
  is_default: boolean;
  label: "Home" | "Work" | "Other";
  landmark: string;
  latitude: string;
  longitude: string;
  recipient_name: string;
  recipient_phone: string;
  street: string;
};

// export type Address = AddressFormBody & { id: number };

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

export type Country = {
  id: number;
  name: string;
  name_translations: {
    en: string;
    ar: string;
  };
  code: string;
  sort_order: number;
};

export type City = {
  country_id: number;
  delivery_fee: string;
  id: number;
  name: string;
  name_translations: { en: string; ar: string };
  sort_order: number;
};

export type OrderItem = {
  address: {
    apartment: string | null;
    area: string;
    building: string;
    city: string;
    country: string;
    delivery_fee: string;
    landmark: string;
    latitude: string;
    longitude: string;
    recipient_name: string;
    recipient_phone: string;
    street: string;
  };
  summary: {
    discount_total: string;
    grand_total: string;
    shipping_total: string;
    subtotal: string;
    vat_rate: string;
    vat_total: string;
  };
  order_number: number;
  payment_status: string;
  placed_at: string;
  status:
    | "pending"
    | "processing"
    | "shipped"
    | "delivered"
    | "pickup"
    | "cancelled";
  status_label:
    | "Pending"
    | "Processing"
    | "Shipped"
    | "Delivered"
    | "Pickup"
    | "Cancelled";
  currency: string;
  customer_notes: string | null;
  fulfillment_method: string;
  id: number;
  items: {
    id: number;
    line_total: string;
    message_text: string | null;
    name: string;
    qty: number;
  }[];
};
