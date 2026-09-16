import { http } from "@/lib/http";
import { Product } from "@/types/products";
import CardItem from "@/components/shop/card-item";
import CardItems from "@/components/shop/card-items";
import CartHeader from "@/components/shop/cart-header";
import CardSummary from "@/components/shop/card-summary";
import { getLocale, getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";

export default async function CartPage() {
  const locale = await getLocale();
  const t = await getTranslations("Shop");

  const { data, ok } = await http.get<{
    data: {
      items: Product[];
    };
  }>(`/api/v1/products`, {
    params: {
      sort: "rating",
      made_to_order: 0,
      per_page: 3,
    },
  });

  if (!ok) {
    throw new Error("Failed to fetch top rated products");
  }

  return (
    <main>
      <div className="container max-w-7xl py-20 min-h-[50vh]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
          <div className="md:col-span-2 space-y-6">
            <CartHeader />

            <CardItems />

            <h3
              className={cn(
                "text-2xl font-bold text-foreground",
                locale === "en" && "font-heading",
              )}
            >
              {t("YouMightAlsoLike")}
            </h3>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.data.items.map((item) => (
                <div key={item.id}>
                  <CardItem item={item} imageClassName="h-[320px]" />
                </div>
              ))}
            </div>
          </div>

          <div className="w-full max-w-md space-y-6 bg-[#fcfaf8]">
            <CardSummary />
          </div>
        </div>
      </div>
    </main>
  );
}
