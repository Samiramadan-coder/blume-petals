"use client";

import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { Product } from "@/types/products";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { addToWishlistAction } from "@/lib/shop-actions";

export default function AddToFavoriteBtn({
  product,
  isLoggedIn,
  version = "default",
}: {
  product: Product;
  isLoggedIn?: boolean;
  version?: "default" | "wishlist-page";
}) {
  const router = useRouter();
  const t = useTranslations("Shop");
  const [loading, setLoading] = useState(false);

  // Shown state: updated as soon as the request succeeds, then re-synced with
  // the server value once the refreshed product list arrives. Without it the
  // heart keeps the old state for the whole duration of `router.refresh()`.
  const [isFav, setIsFav] = useState(product.is_fav);
  const [serverIsFav, setServerIsFav] = useState(product.is_fav);

  if (serverIsFav !== product.is_fav) {
    setServerIsFav(product.is_fav);
    setIsFav(product.is_fav);
  }

  async function addToWishlist() {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    if (loading) return;

    setLoading(true);
    const result = await addToWishlistAction(isFav, product.slug);

    if (result.success) {
      toast.success(isFav ? t("RemovedFromWishlist") : t("AddedToWishlist"));
      setIsFav(!isFav);
      router.refresh();
      setLoading(false);
      return;
    }

    toast.error(t("WishlistError"));
    setLoading(false);
  }

  if (version === "default") {
    return (
      <Button
        aria-label={`Add ${product.name} to wishlist`}
        aria-pressed={isFav}
        aria-busy={loading}
        onClick={addToWishlist}
        className="rounded-full h-8 w-8 cursor-pointer bg-background hover:bg-background shadow-md"
      >
        {loading ? (
          <Spinner className="size-5 text-primary" />
        ) : (
          <Heart
            className={cn(`size-4`, {
              "text-foreground": !isFav,
              "text-primary fill-primary": isFav,
            })}
          />
        )}
      </Button>
    );
  }

  if (version === "wishlist-page") {
    return (
      <Button
        variant="outline"
        aria-label={`Add ${product.name} to wishlist`}
        aria-pressed={isFav}
        aria-busy={loading}
        onClick={addToWishlist}
        className={cn(
          "w-full cursor-pointer h-12 text-base border-2 border-primary p-5 text-primary font-semibold",
          {
            "hover:bg-primary hover:text-white": !isFav,
            "bg-primary text-white hover:text-primary hover:bg-white": isFav,
          },
        )}
      >
        {loading ? (
          <Spinner className="size-5 text-primary" />
        ) : (
          <Heart
            className={cn(`size-5`, {
              "fill-white": isFav,
            })}
          />
        )}
        <span className="hidden sm:inline">
          {isFav ? t("InWishlist") : t("AddToWishlist")}
        </span>
      </Button>
    );
  }
}
