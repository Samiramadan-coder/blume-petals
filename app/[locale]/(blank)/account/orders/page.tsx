import Orders from "@/components/account/orders/orders";
import { http } from "@/lib/http";
import { OrderItem } from "@/types/account";
import { Pagination } from "@/types/shared";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("Account");

  return {
    title: t("MyOrders"),
  };
}

export default async function OrdersPage() {
  const { data, ok } = await http.get<{
    data: { items: OrderItem[]; pagination: Pagination };
  }>("/api/v1/orders");

  if (!ok) {
    throw new Error("Failed to fetch orders");
  }

  console.log("OrdersPage data:", data.data.items);

  return <Orders orders={data?.data.items || []} />;
}
