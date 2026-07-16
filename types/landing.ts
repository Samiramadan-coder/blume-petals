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

export type CategoriesResponse = {
  data: {
    items: Category[];
  };
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

export type OccasionsResponse = {
  data: {
    items: Occasion[];
  };
};
