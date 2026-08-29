import BuilderForm from "@/components/builder/builder-form";
import BuilderHeader from "@/components/builder/builder-header";
import { http } from "@/lib/http";

export default async function Page() {
  const { data, ok } = await http.get("/api/v1/filters/options");

  if (!ok) {
    throw new Error("Failed to fetch data");
  }

  console.log(data);
  return (
    <main className="pb-12">
      <BuilderHeader />
      <BuilderForm />
    </main>
  );
}
