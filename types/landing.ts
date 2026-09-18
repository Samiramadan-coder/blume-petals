export type Category = {
  banner_url: string;
  color: string;
  icon_url: string;
  id: number;
  name: string;
  name_translations: { ar: string; en: string };
  slug: string;
  sort_order: number;
  type: string;
};

export type Occasion = {
  banner_url: string;
  color: string;
  ends_at: string | null;
  icon_url: string | null;
  id: number;
  image_url: string | null;
  is_visible: boolean;
  name: string;
  name_translations: { ar: string; en: string };
  preset_template_id: number | null;
  slug: string;
  sort_order: number;
  starts_at: string | null;
  type: string;
};

export type AppSettings = {
  about_us: string | null;
  terms_and_conditions: string | null;
  policy: string | null;
  logo_url: string | null;
  showAddition: boolean;
  // whatsapp: string | null;
  // instagram: string | null;
  // contact_email: string | null;
  // contact_phone: string | null;
  connect: {
    email: string;
    email_url: string;
    instagram: string;
    instagram_url: string;
    phone: string;
    phone_url: string;
    whatsapp: string;
    whatsapp_url: string;
  };
};

export type CustomerDesign = {
  id: number;
  image_url: string;
  total_stems: number;
  unit_price: string;
  made_by: string;
  flowers: {
    name: string;
    qty: number;
    variant_id: number;
  }[];
  bouquet: {
    image_url: string;
    name: string;
    product_id: number;
    size: string;
    slug: string;
    variant_id: number;
  };
};
