import { Suspense } from "react";
import { http } from "@/lib/http";
import { Pagination } from "@/types/shared";
import type { Product } from "@/types/products";
import { getTranslations } from "next-intl/server";
import { Separator } from "@/components/ui/separator";
import GoBackBtn from "@/components/shop/go-back-btn";
import NoDataFounded from "@/components/reusable/no-data-founded";
import WishlistSkeleton from "@/components/shop/wishlist-skeleton";
import WishlistCardItem from "@/components/shop/wishlist-card-item";
import PaginationTemplate from "@/components/reusable/pagination-template";

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

  if (!ok) {
    throw new Error("Failed to fetch products");
  }

  return (
    <>
      {data.data.items.length === 0 ? (
        <NoDataFounded />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.data.items.map((item, index) => (
              <WishlistCardItem key={index} item={item} />
            ))}
          </div>

          <div className="mt-12">
            <PaginationTemplate
              currentPage={data.data.pagination.current_page}
              totalPages={data.data.pagination.last_page}
            />
          </div>
        </>
      )}
    </>
  );
}

/**
 * WhishListPage component is the main page for displaying the user's wishlist.
 * It fetches the list of favorite products and displays them using the ListOfProducts component.
 * The page also includes a title and description for the wishlist section.
 */
export default async function WishListPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const t = await getTranslations("Shop");

  return (
    <div>
      <div className="py-10">
        <div className="container max-w-7xl">
          <GoBackBtn />

          <h1 className="text-4xl mt-4 font-playfair font-bold text-foreground">
            {t("WishList")}
          </h1>
        </div>

        <Separator className="my-8 bg-border" />

        <div className="container max-w-7xl">
          <Suspense fallback={<WishlistSkeleton />}>
            <ListOfProducts searchParams={await searchParams} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
