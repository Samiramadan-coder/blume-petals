"use client";

import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { Button } from "../ui/button";
import { Product } from "@/types/products";
import { http } from "@/lib/http";
import { useRouter } from "@/i18n/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";

export default function AddToFavoriteBtn({ product }: { product: Product }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const t = useTranslations("Shop");

  async function addToWishlist() {
    const method = product.is_fav ? "delete" : "post";

    try {
      setLoading(true);
      await http[method](`/api/v1/products/${product.slug}/favorite`);
      toast.success(
        product.is_fav ? t("RemovedFromWishlist") : t("AddedToWishlist"),
      );
      router.refresh();
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      toast.error(t("WishlistError"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      aria-label={`Add ${product.name} to wishlist`}
      onClick={addToWishlist}
      className={cn("rounded-full h-10 w-10", {
        "bg-background hover:bg-background": !product.is_fav,
        "bg-green-400 hover:bg-green-400 shadow-sm": product.is_fav,
      })}
    >
      {loading ? (
        <Spinner className="size-5 text-primary" />
      ) : (
        <Heart
          className={cn(`size-5`, {
            "text-foreground": !product.is_fav,
            "text-white": product.is_fav,
          })}
        />
      )}
    </Button>
  );
}
