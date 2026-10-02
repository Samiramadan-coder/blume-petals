"use client";

import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";
import { updateCartQuantityAction } from "@/lib/shop-actions";
import { useEffect, useOptimistic, useRef, useTransition } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export default function UpdateQuantity({
  itemId,
  initialQuantity,
  productName,
}: {
  itemId: number;
  initialQuantity: number;
  productName: string;
}) {
  const t = useTranslations("Shop");
  const [loading, startTransition] = useTransition();
  // Shows the new quantity immediately; falls back to the server value once
  // the refreshed cart arrives (or the request fails).
  const [quantity, setQuantity] = useOptimistic(initialQuantity);
  // `loading` only flips on the next render, so key repeats and double
  // clicks need a synchronous guard to avoid duplicate requests.
  const busy = useRef(false);

  function changeQuantity(operation: "increment" | "decrement") {
    const nextQuantity =
      operation === "increment" ? initialQuantity + 1 : initialQuantity - 1;

    if (busy.current || nextQuantity < 1) return;
    busy.current = true;

    startTransition(async () => {
      setQuantity(nextQuantity);

      try {
        const result = await updateCartQuantityAction(itemId, nextQuantity);

        if (result.success) {
          toast.success(t("UpdateQuantitySuccess"));
          return;
        }

        toast.error(result.message ?? t("UpdateQuantityError"));
      } catch {
        toast.error(t("UpdateQuantityError"));
      }
    });
  }

  // Released only once the transition settles, i.e. after the refreshed
  // quantity has been rendered, so the next change starts from fresh data.
  useEffect(() => {
    if (!loading) busy.current = false;
  }, [loading]);

  return (
    <div
      aria-busy={loading}
      className={cn(
        "flex h-10 items-center rounded-full bg-[#e9dfd4] px-1 transition-opacity motion-reduce:transition-none",
        { "opacity-50": loading },
      )}
    >
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-8 rounded-full hover:bg-white/60 aria-disabled:pointer-events-none"
        onClick={() => changeQuantity("decrement")}
        disabled={quantity <= 1 && !loading}
        aria-disabled={loading}
        aria-label={t("DecreaseQuantity", { name: productName })}
      >
        <Minus className="size-3.5" />
      </Button>

      <span className="w-9 text-center text-sm font-medium tabular-nums">
        {quantity}
      </span>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-8 rounded-full hover:bg-white/60 aria-disabled:pointer-events-none"
        onClick={() => changeQuantity("increment")}
        aria-disabled={loading}
        aria-label={t("IncreaseQuantity", { name: productName })}
      >
        <Plus className="size-3.5" />
      </Button>
    </div>
  );
}
