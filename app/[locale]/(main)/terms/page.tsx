import { http } from "@/lib/http";
import { AppSettings } from "@/types/landing";

export default async function Page() {
  const { data, ok } = await http.get<{
    data: AppSettings;
  }>(`/api/v1/settings`);

  if (!ok) {
    throw new Error("Failed to fetch app settings");
  }

  return (
    <main className="container max-w-7xl py-20 min-h-[50vh]">
      <div
        className="rich-content"
        dangerouslySetInnerHTML={{
          __html: data.data.terms_and_conditions || "",
        }}
      />
    </main>
  );
}
