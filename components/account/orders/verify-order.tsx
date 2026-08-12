"use client";

import { toast } from "sonner";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { verifyPaymentAction } from "@/lib/shop-actions";

export default function VerifyOrder({
  payment,
  orderId,
}: {
  payment: string | undefined;
  orderId?: string;
}) {
  const t = useTranslations("Account.Orders");

  useEffect(() => {
    if (payment) {
      const verifyPayment = async () => {
        const result = await verifyPaymentAction(orderId!);

        if (result.success) {
          toast.success(t("PaymentCompletedSuccessfully"));
        } else {
          toast.error(t("PaymentFailed"));
        }
      };

      verifyPayment();
    }
  }, [orderId, payment, t]);

  return <>VerifyOrder</>;
}
