"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { DialogDelete } from "@/components/reusable/delete-dialoge";
import { cancelOrder } from "@/lib/account-actions";
import { toast } from "sonner";
import { useState } from "react";

export default function OrderCancel({ orderId }: { orderId: number }) {
  const t = useTranslations("Actions");
  const tShop = useTranslations("Shop");
  const [loading, setLoading] = useState(false);

  return (
    <DialogDelete
      loading={loading}
      onConfirm={async () => {
        setLoading(true);
        const result = await cancelOrder(orderId);
        setLoading(false);

        if (result.success) {
          toast.success(tShop("OrderCancelledSuccessfully"));
          return;
        }

        toast.error(tShop("OrderCancellationFailed"));
      }}
      title="Order Cancel"
      description="Are you sure you want to cancel this order? This action cannot be undone."
      trigger={
        <Button className="flex-1 uppercase h-11" variant="destructive">
          {t("Cancel")}
        </Button>
      }
    />
  );
}
