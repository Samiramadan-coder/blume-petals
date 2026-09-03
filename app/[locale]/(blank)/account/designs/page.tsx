import { http } from "@/lib/http";
import { Design } from "@/types/account";
import { Pagination } from "@/types/shared";
import { getTranslations } from "next-intl/server";
import Designs from "@/components/account/designs/designs";

type SearchParams = {
  page?: string;
};

export async function generateMetadata() {
  const t = await getTranslations("Account");
  return {
    title: t("MyDesigns"),
  };
}

export default async function DesignsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { page } = await searchParams;

  const { data, ok } = await http.get<{
    data: {
      items: Design[];
      pagination: Pagination;
    };
  }>("/api/v1/designs", {
    params: {
      page: page ?? 1,
      per_page: 10,
    },
  });

  if (!ok) {
    throw new Error("Failed to fetch designs");
  }

  return <Designs items={data.data.items} pagination={data.data.pagination} />;
}
