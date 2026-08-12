import OrderCard from "@/components/account/orders/order-card";
import { OrderDetailsSkeleton } from "@/components/account/orders/order-details-skeleton";
import VerifyOrder from "@/components/account/orders/verify-order";
import { http } from "@/lib/http";
import { OrderItem } from "@/types/account";
import { Suspense } from "react";

type params = {
  ["order-id"]?: string;
};

type searchParams = {
  payment: string;
};

async function Order({
  params,
  searchParams,
}: {
  params: params;
  searchParams: searchParams;
}) {
  const { data, ok } = await http.get<{
    data: {
      order: OrderItem;
    };
  }>(`/api/v1/orders/${params["order-id"]}`);

  if (!ok) {
    throw new Error("Failed to fetch order");
  }

  return (
    <>
      <VerifyOrder
        payment={searchParams.payment}
        orderId={params["order-id"]}
      />
      <OrderCard order={data.data.order} defaultOpen={true} />
    </>
  );
}

export default async function OrderPage({
  params,
  searchParams,
}: {
  params: Promise<params>;
  searchParams: Promise<searchParams>;
}) {
  return (
    <Suspense fallback={<OrderDetailsSkeleton />}>
      <Order params={await params} searchParams={await searchParams} />
    </Suspense>
  );
}
