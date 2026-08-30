export type BuilderFormData = {
  template_id: number;
  template_url: string;
  variant_id: number;
  flowersCount: number;
  slots: {
    variant_id: number;
    qty: number;
    price: number;
    name: string;
    image_url: string;
  }[];
};
