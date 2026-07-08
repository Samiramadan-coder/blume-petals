import Orders from "@/components/account/orders/orders";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("Account");

  return {
    title: t("MyOrders"),
  };
}

export default function OrdersPage() {
  return <Orders />;
}
