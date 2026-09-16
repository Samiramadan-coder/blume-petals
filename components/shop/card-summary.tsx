"use client";

import ValidateCoupon from "./validate-coupon";
import { useCart } from "@/providers/cart-provider";

export default function CardSummary() {
  const { summary, items } = useCart();

  return (
    <>
      {summary && items.length > 0 && (
        <ValidateCoupon key={JSON.stringify(summary)} summary={summary} />
      )}
    </>
  );
}
