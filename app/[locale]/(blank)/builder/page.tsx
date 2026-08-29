import { http } from "@/lib/http";
import { buildQueryString } from "@/lib/utils";
import { FiltersOptions, Product } from "@/types/products";
import BuilderForm from "@/components/builder/builder-form";
import BuilderHeader from "@/components/builder/builder-header";

export default async function Page() {
  const { data: filters, ok: ok1 } = await http.get<{ data: FiltersOptions }>(
    "/api/v1/filters/options",
  );

  if (!ok1) {
    throw new Error("Failed to fetch data");
  }

  const { data: templates, ok: ok2 } = await http.get<{
    data: {
      items: Product[];
    };
  }>(
    `/api/v1/products?${buildQueryString({ template: filters.data.templates })}`,
  );

  if (!ok2) {
    throw new Error("Failed to fetch templates");
  }

  return (
    <main className="pb-12">
      <BuilderHeader />
      <BuilderForm maintemplates={templates.data.items} />
    </main>
  );
}
