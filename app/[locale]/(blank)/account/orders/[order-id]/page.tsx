import OrderCard from "@/components/account/orders/order-card";
import { OrderDetailsSkeleton } from "@/components/account/orders/order-details-skeleton";
import { http } from "@/lib/http";
import { OrderItem } from "@/types/account";
import { Suspense } from "react";

type params = {
  ["order-id"]?: string;
};

async function Order({ searchParams }: { searchParams: params }) {
  const { data, ok } = await http.get<{
    data: {
      order: OrderItem;
    };
  }>(`/api/v1/orders/${searchParams["order-id"]}`);

  if (!ok) {
    throw new Error("Failed to fetch order");
  }

  return <OrderCard order={data.data.order} defaultOpen={true} />;
}

export default async function OrderPage({
  params,
}: {
  params: Promise<params>;
}) {
  return (
    <Suspense fallback={<OrderDetailsSkeleton />}>
      <Order searchParams={await params} />
    </Suspense>
  );
}
