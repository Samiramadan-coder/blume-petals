"use client";

import { Button } from "../ui/button";
import { Product } from "@/types/products";
import { ShoppingCart } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

export default function AddToShopCartBtn({
  item,
  isLoggedIn,
}: {
  item: Product;
  isLoggedIn: boolean;
}) {
  const router = useRouter();
  const t = useTranslations("Shop");

  async function addToCart() {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
  }

  return (
    <Button
      aria-label={`Add ${item.name} to cart`}
      onClick={addToCart}
      className="h-10 text-base bg-primary hover:bg-secondary cursor-pointer absolute z-20 bottom-2 left-1/2 transform -translate-x-1/2 w-2/3 py-2.5 text-white font-semibold lg:opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    >
      <ShoppingCart className="mr-2 inline-block size-5" />
      {t("AddToCart")}
    </Button>
  );
}
