import {
  Sheet,
  SheetHeader,
  SheetContent,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import { http } from "@/lib/http";
import { ListFilter } from "lucide-react";
import { Pagination } from "@/types/shared";
import Filters from "@/components/shop/filters";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types/products";
import CardItem from "@/components/shop/card-item";
import ProductSortSelect from "@/components/shop/product-sort-select";
import { getTranslations } from "next-intl/server";

export default async function ShopPage() {
  const t = await getTranslations("Shop");

  const { data, ok } = await http.get<{
    data: { items: Product[]; pagination: Pagination };
  }>("/api/v1/products");

  if (!ok) {
    throw new Error("Failed to fetch products");
  }

  console.log("Products data:", data);

  return (
    <div className="container max-w-7xl">
      <div className="py-20">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-2">
          {t("Title")}
        </h1>

        <p className="text-lg text-foreground/60">{t("Description")}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-start gap-6 mt-14">
          <div className="hidden sm:block sticky top-24">
            <Filters />
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="bg-transparent hover:bg-transparent block lg:hidden cursor-pointer"
              >
                <ListFilter />
              </Button>
            </SheetTrigger>
            <SheetContent showCloseButton={true}>
              <SheetHeader className="mt-6">
                <SheetDescription asChild className="py-4 flex flex-col gap-3">
                  <Filters />
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>

          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <div className="flex items-center justify-between gap-6 border-b border-border pb-6">
              <p className="text-sm font-semibold text-foreground/70">
                {data.data.pagination.total} {t("Products")}
              </p>

              <ProductSortSelect />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {data.data.items.map((item, index) => (
                <CardItem key={index} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
