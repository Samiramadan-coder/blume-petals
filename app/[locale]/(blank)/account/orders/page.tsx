import { http } from "@/lib/http";
import { OrderItem } from "@/types/account";
import { Pagination } from "@/types/shared";
import { getTranslations } from "next-intl/server";
import Orders from "@/components/account/orders/orders";
import NoDataFounded from "@/components/reusable/no-data-founded";

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
  const { page, status } = await searchParams;

  const { data, ok } = await http.get<{
    data: {
      items: OrderItem[];
      pagination: Pagination;
    };
  }>("/api/v1/orders", {
    next: {
      tags: ["orders"],
    },
    params: {
      per_page: 5,
      page: page ?? "1",
      status: status ?? "all",
    },
  });

  if (!ok) {
    throw new Error("Failed to fetch orders");
  }

  return (
    <>
      {data.data.items.length === 0 ? (
        <NoDataFounded />
      ) : (
        <Orders orders={data?.data.items} pagination={data?.data.pagination} />
      )}
    </>
  );
}
