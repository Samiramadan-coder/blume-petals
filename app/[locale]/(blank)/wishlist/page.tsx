import { Suspense } from "react";
import { cn } from "@/lib/utils";
import { http } from "@/lib/http";
import { Pagination } from "@/types/shared";
import type { Product } from "@/types/products";
import CardItem from "@/components/shop/card-item";
import { OccasionsResponse } from "@/types/landing";
import { getLocale, getTranslations } from "next-intl/server";
import PaginationTemplate from "@/components/reusable/pagination-template";
import ListOfProductsSkeleton from "@/components/shop/list-of-product-skeleton";

type SearchParams = {
  page?: string;
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
  const { data, ok } = await http.get<{
    data: {
      items: Product[];
      pagination: Pagination;
    };
  }>("/api/v1/favorites", {
    params: {
      ...(searchParams?.page ? { page: searchParams.page } : {}),
      per_page: 6,
    },
  });

  console.log("ListOfProducts data:", data);

  if (!ok) {
    throw new Error("Failed to fetch products");
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {data.data.items.map((item, index) => (
          <CardItem key={index} item={item} />
        ))}
      </div>

      <div className="mt-12">
        <PaginationTemplate
          currentPage={data.data.pagination.current_page}
          totalPages={data.data.pagination.last_page}
        />
      </div>
    </>
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

        <div className="">
          <Suspense fallback={<ListOfProductsSkeleton />}>
            <ListOfProducts searchParams={await searchParams} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
