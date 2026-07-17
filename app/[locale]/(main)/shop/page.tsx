import {
  Sheet,
  SheetHeader,
  SheetContent,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import { Suspense } from "react";
import { cn } from "@/lib/utils";
import { http } from "@/lib/http";
import { ListFilter } from "lucide-react";
import { Pagination } from "@/types/shared";
import Filters from "@/components/shop/filters";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types/products";
import CardItem from "@/components/shop/card-item";
import { OccasionsResponse } from "@/types/landing";
import { getLocale, getTranslations } from "next-intl/server";
import ProductSortSelect from "@/components/shop/product-sort-select";
import PaginationTemplate from "@/components/reusable/pagination-template";
import ListOfProductsSkeleton from "@/components/shop/list-of-product-skeleton";

type SearchParams = {
  price_min?: string;
  price_max?: string;
  size?: string;
  page?: string;
  occasion?: string;
  category?: string;
};

/**
 * ListOfProducts component fetches and displays a list of products from the API.
 * It shows the total number of products and allows sorting through the ProductSortSelect component.
 * Each product is displayed using the CardItem component.
 */
async function ListOfProducts({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const t = await getTranslations("Shop");

  const { data, ok } = await http.get<{
    data: {
      items: Product[];
      pagination: Pagination;
    };
  }>("/api/v1/products", {
    params: {
      ...(searchParams?.price_min ? { price_min: searchParams.price_min } : {}),
      ...(searchParams?.price_max ? { price_max: searchParams.price_max } : {}),
      ...(searchParams?.size ? { size: searchParams.size } : {}),
      ...(searchParams?.page ? { page: searchParams.page } : {}),
      ...(searchParams?.occasion ? { occasion: searchParams.occasion } : {}),
      ...(searchParams?.category ? { category: searchParams.category } : {}),
      per_page: 12,
    },
  });

  console.log("ListOfProducts data:", data);

  if (!ok) {
    throw new Error("Failed to fetch products");
  }

  return (
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

      <PaginationTemplate
        currentPage={data.data.pagination.current_page}
        totalPages={data.data.pagination.last_page}
      />
    </div>
  );
}

/**
 * ShopPage component serves as the main page for the shop section.
 * It includes a title, description, filters, and a list of products.
 * The filters are displayed in a sidebar for larger screens and in a sheet for smaller screens.
 * The ListOfProducts component is wrapped in Suspense to handle loading states.
 */
export default async function ShopPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const locale = await getLocale();
  const t = await getTranslations("Shop");

  // Fetch occasions data for the shop-the-moment section
  const { data, ok } = await http.get<OccasionsResponse>("/api/v1/occasions");

  if (!ok) {
    throw new Error("Failed to fetch occasions");
  }

  return (
    <div className="container max-w-7xl">
      <div className="py-20">
        <h1
          className={cn("text-4xl md:text-5xl font-bold text-foreground mb-2", {
            "font-heading": locale === "en",
          })}
        >
          {t("Title")}
        </h1>

        <p className="text-lg text-foreground/60">{t("Description")}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-start gap-6 mt-25">
          <div className="hidden sm:block sticky top-24">
            <Filters occasions={data.data.items} />
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
                  <Filters occasions={data.data.items} />
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>

          <Suspense fallback={<ListOfProductsSkeleton />}>
            <ListOfProducts searchParams={await searchParams} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
