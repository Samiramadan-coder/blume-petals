"use client";

import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Rating } from "../ui/rating";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import AddToCartBtn from "./add-to-cart-btn";
import { Card, CardContent } from "../ui/card";
import { Minus, Plus, Van } from "lucide-react";
import AddToFavoriteBtn from "./add-to-favorite-btn";
import { useLocale, useTranslations } from "next-intl";
import { ProductDetails as ProductDetailsType } from "@/types/products";
import { useState } from "react";

export default function ProductVariants({
  token,
  productDetails,
}: {
  token: string | undefined;
  productDetails: ProductDetailsType;
}) {
  const MIN_QUANTITY = 1;
  const locale = useLocale();
  const t = useTranslations("Shop");
  const [quantity, setQuantity] = useState(1);
  const [messageText, setMessageText] = useState("");
  const [activeVariant, setActiveVariant] = useState(
    productDetails.variants[0],
  );

  const updateQuantity = (nextQuantity: number) => {
    if (!Number.isFinite(nextQuantity)) {
      setQuantity(MIN_QUANTITY);
      return;
    }

    setQuantity(Math.max(Math.floor(nextQuantity), MIN_QUANTITY));
  };

  return (
    <div className="space-y-6">
      <h1
        className={cn("text-3xl md:text-5xl font-bold text-foreground", {
          "font-heading": locale === "en",
        })}
      >
        {productDetails.name}
      </h1>
      <Rating
        rating={+productDetails.rating_avg}
        count={productDetails.rating_count}
      />
      <p className="text-2xl md:text-4xl font-bold text-primary">
        {t("AED")} {activeVariant.price}
      </p>
      <div
        className="text-foreground/70 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: productDetails.description }}
      />
      <div className="space-y-3">
        <p className="font-semibold text-foreground mb-3">{t("Size")}</p>
        <div className="flex gap-3 flex-wrap">
          {productDetails.variants.map((variant) => (
            <Button
              variant="outline"
              key={variant.size}
              onClick={() => setActiveVariant(variant)}
              className={cn(
                `rounded-full w-14 h-14 border-2 border-border cursor-pointer hover:bg-transparent`,
                {
                  "bg-primary hover:bg-primary font-semibold":
                    variant.size === activeVariant.size,
                },
              )}
            >
              {variant.size}
            </Button>
          ))}
        </div>
      </div>
      <div className="space-y-3">
        <p className="font-semibold text-foreground mb-3">
          {t("PersonalMessage")}
        </p>
        <Textarea
          className="h-40 border-border"
          placeholder={t("PersonalMessagePlaceholder")}
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        />
      </div>

      <Card className="bg-secondary/10 border-l-4 border-secondary rounded-lg p-3">
        <CardContent className="flex items-center gap-4 p-0">
          <Van className="size-6 text-secondary" />
          <div>
            <p className="font-semibold text-base text-foreground">
              {t("EstimatedDelivery")}
            </p>
            <p className="text-sm text-foreground/60 mt-1">
              {t("ShippingMethod1")}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-evenly flex-wrap gap-3">
        <div className="flex items-center overflow-hidden rounded-md border border-primary/30 bg-background shadow-sm">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={quantity === 1}
            onClick={() => updateQuantity(quantity - 1)}
            aria-label="Decrease quantity"
            className="h-full w-10 shrink-0 rounded-none text-primary hover:bg-primary/10 hover:text-primary disabled:opacity-30"
          >
            <Minus className="size-4" />
          </Button>

          <Input
            type="text"
            value={quantity}
            readOnly
            inputMode="numeric"
            aria-label="Quantity"
            className="h-full w-11 rounded-none border-0 bg-transparent px-0 text-center text-sm font-semibold shadow-none focus-visible:ring-0"
          />

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => updateQuantity(quantity + 1)}
            aria-label="Increase quantity"
            className="h-full w-10 shrink-0 rounded-none text-primary hover:bg-primary/10 hover:text-primary"
          >
            <Plus className="size-4" />
          </Button>
        </div>

        <AddToFavoriteBtn
          product={productDetails}
          isLoggedIn={!!token}
          version="wishlist-page"
        />

        <AddToCartBtn
          item={productDetails}
          isLoggedIn={!!token}
          variant_id={activeVariant.id}
          quantity={quantity}
          message={messageText}
        />
      </div>
    </div>
  );
}
