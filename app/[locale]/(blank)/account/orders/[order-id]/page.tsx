import OrderCard from "@/components/account/orders/order-card";
import { OrderDetailsSkeleton } from "@/components/account/orders/order-details-skeleton";
import { http } from "@/lib/http";
import { verifyPaymentAction } from "@/lib/shop-actions";
import { OrderItem } from "@/types/account";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { toast } from "sonner";

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
  const t = await getTranslations("Account.Orders");

  const { data, ok } = await http.get<{
    data: {
      order: OrderItem;
    };
  }>(`/api/v1/orders/${params["order-id"]}`);

  if (searchParams.payment) {
    const result = await verifyPaymentAction(params["order-id"]!);

    if (result.success) {
      toast.success(t("PaymentCompletedSuccessfully"));
    } else {
      toast.error(t("PaymentFailed"));
    }
  }

  if (!ok) {
    throw new Error("Failed to fetch order");
  }

  return <OrderCard order={data.data.order} defaultOpen={true} />;
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
