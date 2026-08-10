import OrderCard from "./order-card";
import { OrderItem } from "@/types/account";
import { Pagination } from "@/types/shared";
import PaginationTemplate from "@/components/reusable/pagination-template";

export default async function Orders({
  orders,
  pagination,
}: {
  orders: OrderItem[];
  pagination: Pagination;
}) {
  return (
    <>
      <div className="space-y-4">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>

      <PaginationTemplate
        currentPage={pagination.current_page}
        totalPages={pagination.last_page}
      />
    </>
  );
}
