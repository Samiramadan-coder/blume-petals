export type BuilderFormData = {
  template_id: number;
  variant_id: number;
  flowersCount: number;
  slots: {
    variant_id: number;
    qty: number;
    price: number;
    name: string;
  }[];
};
