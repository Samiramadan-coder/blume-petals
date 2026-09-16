"use client";

import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import GoBackBtn from "./go-back-btn";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import { useCart } from "@/providers/cart-provider";

export default function CartHeader() {
  const locale = useLocale();
  const t = useTranslations("Shop");
  const { items } = useCart();

  return (
    <div className="flex gap-8">
      <GoBackBtn />
      <h3 className="text-2xl font-bold flex items-center gap-2">
        <span className={cn(locale === "en" ? "font-heading" : "font-cairo")}>
          {t("MyCart")}:
        </span>
        <Badge className="w-8 h-8 text-base">{items.length}</Badge>
      </h3>
    </div>
  );
}
