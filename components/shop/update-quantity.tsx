"use client";

import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";
import { updateCartQuantityAction } from "@/lib/shop-actions";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export default function UpdateQuantity({
  itemId,
  initialQuantity,
}: {
  itemId: number;
  initialQuantity: number;
}) {
  const t = useTranslations("Shop");
  const [loading, setLoading] = useState(false);

  async function changeQuantity(operation: "increment" | "decrement") {
    setLoading(true);

    const result = await updateCartQuantityAction(
      itemId,
      operation === "increment" ? initialQuantity + 1 : initialQuantity - 1,
    );

    if (result.success) {
      toast.success(t("UpdateQuantitySuccess"));
      setLoading(false);
      return;
    }

    if (result.message) {
      toast.error(result.message);
      setLoading(false);
      return;
    }

    toast.error(t("UpdateQuantityError"));
    setLoading(false);
  }

  return (
    <div
      className={cn("flex h-10 items-center rounded-full bg-[#e9dfd4] px-1 ", {
        "pointer-events-none opacity-50": loading,
      })}
    >
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-8 rounded-full hover:bg-white/60"
        onClick={() => changeQuantity("decrement")}
      >
        <Minus className="size-3.5" />
      </Button>

      <span className="w-9 text-center text-sm font-medium">
        {initialQuantity}
      </span>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-8 rounded-full hover:bg-white/60"
        onClick={() => changeQuantity("increment")}
      >
        <Plus className="size-3.5" />
      </Button>
    </div>
  );
}
