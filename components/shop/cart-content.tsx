"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/providers/cart-provider";
import GoBackBtn from "@/components/shop/go-back-btn";
import { useLocale, useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import ValidateCoupon from "@/components/shop/validate-coupon";
import UpdateQuantity from "@/components/shop/update-quantity";
import DeleteFromCart from "@/components/shop/delete-form-cart";
import NoDataFounded from "@/components/reusable/no-data-founded";
import { PackageX } from "lucide-react";

export default function CartContent() {
  const locale = useLocale();
  const t = useTranslations("Shop");
  const { items, summary } = useCart();

  return (
    <main>
      <div className="container max-w-7xl py-20 min-h-[50vh]">
        <div className="flex gap-8">
          <GoBackBtn />
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <span
              className={cn(locale === "en" ? "font-heading" : "font-cairo")}
            >
              {t("MyCart")}:
            </span>
            <Badge className="w-8 h-8 text-base">{items.length}</Badge>
          </h3>
        </div>

        {items.length === 0 ? (
          <NoDataFounded />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
            <div className="md:col-span-2 space-y-6">
              {items.map((item, index) => (
                <Card
                  className="w-full rounded-xl border-0 bg-white"
                  key={index}
                >
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
                        <UpdateQuantity
                          initialQuantity={item.qty}
                          itemId={item.id}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="w-full max-w-md space-y-6 bg-[#fcfaf8]">
              {summary && (
                <ValidateCoupon
                  key={JSON.stringify(summary)}
                  summary={summary}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
