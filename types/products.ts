import { T } from "@/constants/shared";
import z from "zod";

type Variant = {
  color_hex: string | null;
  color_slug: string | null;
  compare_at_price: string | null;
  id: number;
  in_stock: boolean;
  is_on_sale: boolean;
  price: string;
  size: string;
  sku: string;
  stock: number;
  available_stock: number;
};

export type Product = {
  id: number;
  image_url: string;
  in_stock: boolean;
  is_best_seller: boolean;
  description: string;
  is_new: boolean;
  is_new_arrival: boolean;
  name: string;
  price_from: string;
  rating_avg: string;
  rating_count: number;
  slug: string;
  status: string;
  is_fav: boolean;
  variants: Variant[];
  category: {
    id: number;
    name: string;
    slug: string;
  };
};

export type ProductDetails = Product & {
  images: {
    alt: string;
    id: number;
    is_primary: boolean;
    url: string;
  }[];
  occasions: {
    name: string;
    slug: string;
  }[];
  variants: Variant[];
  similar: Product[];
  reviews: {
    comment: string;
    created_at: string;
    id: number;
    rating: number;
    user: string;
  }[];
};

export type CartItem = {
  available: boolean;
  id: number;
  line_total: string;
  message_text: string | null;
  qty: number;
  unit_price: string;
  product: Product;
  variant: Variant;
};

export type Summary = {
  item_count: number;
  line_count: number;
  subtotal: string;
  total: string;
  vat_rate: string;
  vat_total: string;
};

export type Coupon = {
  code: string;
  type: "fixed" | "percentage";
  value: string;
  discount: string;
  subtotal: string;
  total: string;
};

export const couponSchema = (t: T) =>
  z.object({
    coupon_code: z.string().min(1, t("CouponCodeRequired")),
  });

export type CouponFormValues = z.infer<ReturnType<typeof couponSchema>>;

export type PickupLocation = {
  address: string;
  city_id: number;
  hours: string;
  id: number;
  latitude: string;
  longitude: string;
  name: string;
  ready_in: string;
  sort_order: number;
};
