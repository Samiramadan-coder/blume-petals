export type BuilderFormData = {
  template_id: number;
  template_url: string;
  variant_id: number;
  flowersCount: number;
  ribbon_id: number;
  card_style_id: number;
  message_text: string;
  generated_image_url: string | null;
  slots: {
    variant_id: number;
    qty: number;
    price: number;
    name: string;
    image_url: string;
  }[];
};

export type CardStyle = {
  color_hex: string | null;
  description: string;
  id: number;
  image_url: string;
  kind: string;
  name: string;
  price: string;
};

export type Ribbon = {
  color_hex: string;
  description: string | null;
  id: number;
  image_url: string | null;
  kind: string;
  name: string;
  price: string;
};

export type GiftOptions = {
  card_styles: CardStyle[];
  message_max: number;
  ribbons: Ribbon[];
};
