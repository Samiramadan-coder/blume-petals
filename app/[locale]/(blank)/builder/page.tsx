import { http } from "@/lib/http";
import { Product } from "@/types/products";
import BuilderForm from "@/components/builder/builder-form";
import BuilderHeader from "@/components/builder/builder-header";

export default async function Page() {
  const { data: templates, ok: ok1 } = await http.get<{
    data: {
      items: Product[];
    };
  }>(`/api/v1/products?made_to_order=1`);

  if (!ok1) {
    throw new Error("Failed to fetch templates");
  }

  return (
    <main className="pb-12">
      <BuilderHeader />
      <BuilderForm maintemplates={templates.data.items} />
    </main>
  );
}
