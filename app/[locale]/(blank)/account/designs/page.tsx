import Designs from "@/components/account/designs/designs";
import { http } from "@/lib/http";
import { Design } from "@/types/account";
import { Pagination } from "@/types/shared";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("Account");

  return {
    title: t("MyDesigns"),
  };
}

export default async function DesignsPage() {
  const { data, ok } = await http.get<{
    data: {
      items: Design[];
      pagination: Pagination;
    };
  }>("/api/v1/designs");

  if (!ok) {
    throw new Error("Failed to fetch designs");
  }

  console.log(data);

  return <Designs items={data.data.items} pagination={data.data.pagination} />;
}
