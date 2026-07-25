"use client";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { validateCouponCodeAction } from "@/lib/shop-actions";

export default function ValidateCoupon() {
  const t = useTranslations("Shop");
  const [couponCode, setCouponCode] = useState("");

  async function handleApplyCoupon() {
    const result = await validateCouponCodeAction(couponCode);
    console.log(result);
  }

  return (
    <div className="flex items-center gap-3">
      <Input
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
        placeholder={t("PromoCodePlaceholder")}
        className="h-12 flex-1 rounded-full border-border bg-white px-4 shadow-none placeholder:text-zinc-400 focus-visible:ring-primary"
      />

      <Button
        type="button"
        disabled={!couponCode.trim()}
        className="h-12 rounded-full bg-primary px-7 font-semibold text-white hover:bg-[#bfa664]"
        onClick={handleApplyCoupon}
      >
        {t("Apply")}
      </Button>
    </div>
  );
}
