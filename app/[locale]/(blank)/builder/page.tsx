import { http } from "@/lib/http";
import { Flower, Product } from "@/types/products";
import BuilderForm from "@/components/builder/builder-form";
import BuilderHeader from "@/components/builder/builder-header";
import { GiftOptions } from "@/types/builder-page";

export default async function Page() {
  const { data: templates, ok: ok1 } = await http.get<{
    data: {
      items: Product[];
    };
  }>(`/api/v1/products?made_to_order=1`);

  const { data: flowers, ok: ok2 } = await http.get<{
    data: {
      items: Flower[];
    };
  }>(`/api/v1/builder/flowers`);

  const { data: giftOptions, ok: ok3 } = await http.get<{
    data: GiftOptions;
  }>(`/api/v1/gift-options`);

  if (!ok1 || !ok2 || !ok3) {
    throw new Error("Failed to fetch templates, flowers, or gift options");
  }

  return (
    <main className="pb-12">
      <BuilderHeader />
      <BuilderForm
        templates={templates.data.items}
        flowers={flowers.data.items}
        giftOptions={giftOptions.data}
      />
    </main>
  );
}
