import Orders from "@/components/account/orders/orders";
import { http } from "@/lib/http";
import { OrderItem } from "@/types/account";
import { Pagination } from "@/types/shared";
import { getTranslations } from "next-intl/server";

type SearchParams = {
  page?: string;
  status?: string;
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
    next: {
      revalidate: 60,
      tags: ["orders"],
    },
    params: {
      per_page: 5,
      page: (await searchParams).page ?? "1",
      status: (await searchParams).status ?? "all",
    },
  });

  if (!ok) {
    throw new Error("Failed to fetch orders");
  }

  return (
    <Orders orders={data?.data.items} pagination={data?.data.pagination} />
  );
}
