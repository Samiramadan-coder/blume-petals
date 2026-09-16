"use client";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { PackageX } from "lucide-react";
import { cn } from "@/lib/utils";
import UpdateQuantity from "./update-quantity";
import { useCart } from "@/providers/cart-provider";
import DeleteFromCart from "./delete-form-cart";
import { useTranslations } from "next-intl";
import NoDataFounded from "../reusable/no-data-founded";

export default function CardItems() {
  const { items } = useCart();
  const t = useTranslations("Shop");

  return (
    <>
      {items.length > 0 ? (
        items.map((item, index) => (
          <Card className="w-full rounded-xl border-0 bg-white" key={index}>
            <CardContent
              className={cn("flex items-center gap-4 px-4", {
                "opacity-70": !item.variant.in_stock,
              })}
            >
              <div className="relative size-24 shrink-0 overflow-hidden rounded-xl">
                <Image
                  src={item.product.image_url}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex min-w-0 flex-1 flex-col self-stretch">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="flex items-center gap-2 text-sm md:text-lg font-semibold text-foreground">
                      {item.product.name}
                      {!item.variant.in_stock && (
                        <PackageX className="size-5 text-red-400" />
                      )}
                    </h3>
                    <p className="mt-1 text-xs md:text-sm text-muted-foreground">
                      {t("Size")}: {item.variant.size}
                    </p>
                    {!item.variant.in_stock && (
                      <p className="mt-1 text-xs md:text-sm text-red-400 italic underline">
                        {t("OutOfStock")}
                      </p>
                    )}
                  </div>
                  <DeleteFromCart itemId={item.id} />
                </div>

                <div className="mt-auto flex items-end justify-between gap-4">
                  <p className="text-sm md:text-lg font-semibold text-primary">
                    {t("AED")} {item.variant.price}
                  </p>
                  <UpdateQuantity initialQuantity={item.qty} itemId={item.id} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <NoDataFounded label={t("EmptyCartState")} />
      )}
    </>
  );
}
