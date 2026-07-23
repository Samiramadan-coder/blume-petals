import Image from "next/image";
import { http } from "@/lib/http";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";
import { CartItem, Summary } from "@/types/products";
import GoBackBtn from "@/components/shop/go-back-btn";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import UpdateQuantity from "@/components/shop/update-quantity";
import DeleteFromCart from "@/components/shop/delete-form-cart";

export default async function CartPage() {
  const t = await getTranslations("Shop");

  const { data, ok } = await http.get<{
    data: { cart: { items: CartItem[]; summary: Summary } };
  }>("/api/v1/cart");

  console.log("Cart data:", data);

  if (!ok) {
    throw new Error("Failed to fetch cart");
  }

  return (
    <main>
      <div className="container max-w-7xl py-20 min-h-[50vh]">
        <GoBackBtn />

        {data.data.cart.items.length === 0 ? (
          <p className="text-base pb-20 pt-6 text-muted-foreground italic">
            {t("YourCartIsEmpty")}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="md:col-span-2 space-y-4">
              {data.data.cart.items.map((item, index) => (
                <Card
                  className="w-full rounded-2xl border-0 bg-white shadow-[0_6px_20px_rgba(17,24,39,0.08)]"
                  key={index}
                >
                  <CardContent className="flex items-center gap-4 px-4">
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
                          <h3 className="text-lg font-semibold text-foreground">
                            {item.product.name}
                          </h3>

                          <p className="mt-1 text-sm text-muted-foreground">
                            {t("Size")}: {item.variant.size}
                          </p>
                        </div>

                        <DeleteFromCart itemId={item.id} />
                      </div>

                      <div className="mt-auto flex items-end justify-between gap-4">
                        <p className="text-lg font-semibold text-[#cbb682]">
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

            <div className="w-full max-w-md space-y-6 bg-[#fcfaf8] p-5">
              <div className="flex items-center gap-3">
                <Input
                  placeholder={t("PromoCodePlaceholder")}
                  className="h-12 flex-1 rounded-full border-border bg-white px-4 shadow-none placeholder:text-zinc-400 focus-visible:ring-primary"
                />

                <Button
                  type="button"
                  className="h-12 rounded-full bg-primary px-7 font-semibold text-white hover:bg-[#bfa664]"
                >
                  {t("Apply")}
                </Button>
              </div>

              <Card className="rounded-3xl border-0 bg-white shadow-[0_6px_20px_rgba(17,24,39,0.08)]">
                <CardContent className="space-y-5 p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">{t("Subtotal")}</span>

                    <span className="font-semibold text-muted-foreground">
                      {t("AED")} {data.data.cart.summary.subtotal}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      {t("Shipping")}
                    </span>
                    <span className="font-semibold text-muted-foreground">
                      -
                    </span>
                  </div>

                  <Separator className="bg-border" />

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-lg font-semibold">{t("Total")}</span>

                    <span className="text-3xl font-semibold text-primary">
                      {t("AED")} {data.data.cart.summary.total}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Button className="h-16 w-full rounded-full bg-primary text-lg font-semibold text-white hover:bg-[#bfa664]">
                {t("ProceedToCheckout")} · {data.data.cart.summary.total}
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
