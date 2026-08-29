import { http } from "@/lib/http";
import { Flower, Product } from "@/types/products";
import BuilderForm from "@/components/builder/builder-form";
import BuilderHeader from "@/components/builder/builder-header";

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

  if (!ok1 || !ok2) {
    throw new Error("Failed to fetch templates or flowers");
  }

  return (
    <main className="pb-12">
      <BuilderHeader />
      <BuilderForm
        templates={templates.data.items}
        flowers={flowers.data.items}
      />
    </main>
  );
}
