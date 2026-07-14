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
