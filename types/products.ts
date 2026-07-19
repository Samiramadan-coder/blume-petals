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
  category: {
    id: number;
    name: string;
    slug: string;
  };
};

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
