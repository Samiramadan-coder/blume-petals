"use client";

import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { http } from "@/lib/http";
import { Heart } from "lucide-react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { Product } from "@/types/products";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

export default function AddToFavoriteBtn({
  product,
  isLoggedIn,
  version = "default",
}: {
  product: Product;
  isLoggedIn?: boolean;
  version?: "default" | "one";
}) {
  const router = useRouter();
  const t = useTranslations("Shop");
  const [loading, setLoading] = useState(false);

  async function addToWishlist() {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

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

  if (version === "default") {
    return (
      <Button
        aria-label={`Add ${product.name} to wishlist`}
        onClick={addToWishlist}
        className="rounded-full h-10 w-10 bg-background hover:bg-background shadow-md"
      >
        {loading ? (
          <Spinner className="size-5 text-primary" />
        ) : (
          <Heart
            className={cn(`size-5`, {
              "text-foreground": !product.is_fav,
              "text-primary fill-primary": product.is_fav,
            })}
          />
        )}
      </Button>
    );
  }

  if (version === "one") {
    return (
      <Button
        variant="outline"
        aria-label={`Add ${product.name} to wishlist`}
        onClick={addToWishlist}
        className={cn(
          "cursor-pointer text-base border-2 border-primary p-5 text-primary font-semibold",
          {
            "hover:bg-primary hover:text-white": !product.is_fav,
            "bg-primary text-white hover:text-primary hover:bg-white":
              product.is_fav,
          },
        )}
      >
        {loading ? (
          <Spinner className="size-5 text-primary" />
        ) : (
          <Heart
            className={cn(`size-5`, {
              "fill-white": product.is_fav,
            })}
          />
        )}
        {product.is_fav ? t("InWishlist") : t("AddToWishlist")}
      </Button>
    );
  }
}
