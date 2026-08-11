import Image from "next/image";
import { http } from "@/lib/http";
import { Badge } from "@/components/ui/badge";
import { getTranslations } from "next-intl/server";
import { CartItem, Summary } from "@/types/products";
import GoBackBtn from "@/components/shop/go-back-btn";
import { Card, CardContent } from "@/components/ui/card";
import UpdateQuantity from "@/components/shop/update-quantity";
import DeleteFromCart from "@/components/shop/delete-form-cart";
import ValidateCoupon from "@/components/shop/validate-coupon";
import NoDataFounded from "@/components/reusable/no-data-founded";

export default async function CartPage() {
  const t = await getTranslations("Shop");

  const { data, ok } = await http.get<{
    data: {
      cart: {
        items: CartItem[];
        summary: Summary;
      };
    };
  }>("/api/v1/cart");

  if (!ok) {
    throw new Error("Failed to fetch cart");
  }

  return (
    <main>
      <div className="container max-w-7xl py-20 min-h-[50vh]">
        <div className="flex gap-8">
          <GoBackBtn />
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <span>{t("MyCart")}:</span>
            <Badge className="w-8 h-8 text-base">
              {data.data.cart.items.length}
            </Badge>
          </h3>
        </div>

        {data.data.cart.items.length === 0 ? (
          <NoDataFounded />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
            <div className="md:col-span-2 space-y-6">
              {data.data.cart.items.map((item, index) => (
                <Card
                  className="w-full rounded-xl border-0 bg-white"
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
                        <p className="text-lg font-semibold text-primary">
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
              <ValidateCoupon
                key={JSON.stringify(data.data.cart.summary)}
                summary={data.data.cart.summary}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
