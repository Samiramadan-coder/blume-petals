"use client";

import { http } from "@/lib/http";
import { Button } from "../ui/button";
import { Product } from "@/types/products";
import { ShoppingCart } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useState } from "react";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";
import { addToCartAction } from "@/lib/shop-actions";

export default function AddToCartBtn({
  variant_id,
  quantity,
  message,
  item,
  isLoggedIn,
  version = "default",
}: {
  variant_id: number;
  quantity: number;
  message: string;
  item: Product;
  isLoggedIn: boolean;
  version?: "default" | "wishlist-page" | "product-page";
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

  if (version === "default") {
    return (
      <Button
        aria-label={`Add ${item.name} to cart`}
        onClick={addToCart}
        className="h-10 text-base bg-primary hover:bg-secondary cursor-pointer absolute z-20 bottom-2 left-1/2 transform -translate-x-1/2 w-2/3 py-2.5 text-white font-semibold lg:opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        {loading ? <Spinner /> : <ShoppingCart className="size-5" />}
        {t("AddToCart")}
      </Button>
    );
  }

  if (version === "wishlist-page") {
    return (
      <Button
        variant="outline"
        aria-label={`Add ${item.name} to cart`}
        onClick={addToCart}
        className="h-10 text-base py-2.5 text-primary font-semibold mt-4 border-2"
      >
        {loading ? <Spinner /> : <ShoppingCart className="size-5" />}
        {t("AddToCart")}
      </Button>
    );
  }

  if (version === "product-page") {
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
}
