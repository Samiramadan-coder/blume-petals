import OrderCard from "./order-card";
import { OrderItem } from "@/types/account";
import { Pagination } from "@/types/shared";
import PageTitle from "../shared/page-title";
import { getTranslations } from "next-intl/server";
import OrdersStatusFilter from "./orders-status-filter";
import PaginationTemplate from "@/components/reusable/pagination-template";

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

      <OrdersStatusFilter />

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
