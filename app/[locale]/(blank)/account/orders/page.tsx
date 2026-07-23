import Orders from "@/components/account/orders/orders";
import { http } from "@/lib/http";
import { OrderItem } from "@/types/account";
import { Pagination } from "@/types/shared";
import { getTranslations } from "next-intl/server";

type SearchParams = {
  page?: string;
};

export async function generateMetadata() {
  const t = await getTranslations("Account");
  return {
    title: t("MyOrders"),
  };
}

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { data, ok } = await http.get<{
    data: {
      items: OrderItem[];
      pagination: Pagination;
    };
  }>("/api/v1/orders", {
    params: {
      per_page: 1,
      page: (await searchParams).page ?? "1",
    },
  });

  if (!ok) {
    throw new Error("Failed to fetch orders");
  }

  return (
    <Orders orders={data?.data.items} pagination={data?.data.pagination} />
  );
}
