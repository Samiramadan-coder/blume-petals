import OrderCard from "./order-card";
import { OrderItem } from "@/types/account";
import { Pagination } from "@/types/shared";
import PageTitle from "../shared/page-title";
import { getTranslations } from "next-intl/server";
import PaginationTemplate from "@/components/reusable/pagination-template";

// const filters = [
//   { label: "All", value: "all" },
//   { label: "Pending", value: "pending" },
//   { label: "Processing", value: "processing" },
//   { label: "Shipped", value: "shipped" },
//   { label: "Delivered", value: "delivered" },
//   { label: "Cancelled", value: "cancelled" },
// ];

export default async function Orders({
  orders,
  pagination,
}: {
  orders: OrderItem[];
  pagination: Pagination;
}) {
  const t = await getTranslations("Account.Orders");

  return (
    <div className="space-y-6">
      <PageTitle title={t("Title")} />

      <div className="space-y-4">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>

      <PaginationTemplate
        currentPage={pagination.current_page}
        totalPages={pagination.last_page}
      />
    </div>
  );
}
