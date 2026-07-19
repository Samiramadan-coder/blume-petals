"use client";

import { toast } from "sonner";
import { useState } from "react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { Product } from "@/types/products";
import { ShoppingCart } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { addToCartAction } from "@/lib/shop-actions";

export default function AddToCartBtn({
  variant_id,
  quantity,
  message,
  item,
  isLoggedIn,
}: {
  variant_id: number;
  quantity: number;
  message: string;
  item: Product;
  isLoggedIn: boolean;
}) {
  const router = useRouter();
  const t = useTranslations("Shop");
  const [loading, setLoading] = useState(false);

  async function addToCart() {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    setLoading(true);
    const result = await addToCartAction(variant_id, quantity, message);

    if (result.success) {
      toast.success(t("AddToCartSuccess"));
      setLoading(false);
      return;
    }

    toast.error(t("AddToCartError"));
    setLoading(false);
  }

  return (
    <Button
      variant="ghost"
      aria-label={`Add ${item.name} to cart`}
      onClick={addToCart}
      className="text-base h-12 cursor-pointer text-white border-2 border-secondary p-5 bg-secondary hover:bg-secondary hover:text-white font-semibold"
    >
      {loading ? <Spinner /> : <ShoppingCart className="size-5" />}
      <span className="hidden sm:inline">{t("AddToCart")}</span>
    </Button>
  );
}
