import {
  Sheet,
  SheetTitle,
  SheetHeader,
  SheetContent,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";

import { Suspense } from "react";
import { ListFilter } from "lucide-react";
import { Button } from "@/components/ui/button";
import Filters from "@/components/shop/filters";
import { http, ValidationError } from "@/lib/http";
import type { Pagination } from "@/types/shared";
import CardItem from "@/components/shop/card-item";
import { getLocale, getTranslations } from "next-intl/server";
import type { FiltersOptions, Product } from "@/types/products";
import NoDataFounded from "@/components/reusable/no-data-founded";
import ProductSortSelect from "@/components/shop/product-sort-select";
import { buildQueryString, cn, normalizeArrayParam } from "@/lib/utils";
import PaginationTemplate from "@/components/reusable/pagination-template";
import ListOfProductsSkeleton from "@/components/shop/skeleton/list-of-product-skeleton";

export async function generateMetadata() {
  const t = await getTranslations("Shop");

  return {
    title: t("Title"),
  };
}

type SearchParams = {
  price_min?: string | string[];
  price_max?: string | string[];
  size?: string | string[];
  page?: string | string[];
  occasion?: string | string[];
  in_stock?: string | string[];
  category?: string | string[];
  sort?: string | string[];
  is_on_sale?: string | string[];
};

const SORTS: FiltersOptions["sorts"] = [
  "newest",
  "best_selling",
  "price_asc",
  "price_desc",
  "rating",
];

const BOOLEANS = ["1", "0", "true", "false"];

// Entrance animation shared by every block of the page. It is CSS only, so the
// content is already visible in the server HTML and it never waits on hydration.
const ENTER =
  "animate-in fade-in duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] fill-mode-both motion-reduce:animate-none";

// Number of cards that can be above the fold (first row on desktop).
const EAGER_IMAGES = 3;

function firstParam(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

function toPrice(value?: string | string[]) {
  const raw = firstParam(value);
  const price = Number(raw);

  return raw && Number.isFinite(price) && price >= 0 ? price : undefined;
}

function toPage(value?: string | string[]) {
  const page = Number(firstParam(value));

  return Number.isInteger(page) && page > 0 ? page : undefined;
}

function toOneOf(value: string | string[] | undefined, allowed: string[]) {
  const raw = firstParam(value);

  return raw && allowed.includes(raw) ? raw : undefined;
}

/**
 * The search params come straight from the URL, so anything the API would
 * reject with a 422 (unknown sort, non-numeric price, max below min, ...) is
 * dropped here instead of crashing the page.
 */
function buildRequestParams(searchParams: SearchParams) {
  const sizes = normalizeArrayParam(searchParams.size);
  const occasions = normalizeArrayParam(searchParams.occasion);
  const priceMin = toPrice(searchParams.price_min);
  const priceMax = toPrice(searchParams.price_max);
  const page = toPage(searchParams.page);
  const inStock = toOneOf(searchParams.in_stock, BOOLEANS);
  const isOnSale = toOneOf(searchParams.is_on_sale, BOOLEANS);
  const sort = toOneOf(searchParams.sort, SORTS);
  const category = firstParam(searchParams.category);

  return {
    ...(priceMin !== undefined ? { price_min: priceMin } : {}),
    ...(priceMax !== undefined
      ? { price_max: Math.max(priceMax, priceMin ?? 0) }
      : {}),
    ...(sizes ? { size: sizes } : {}),
    ...(page ? { page } : {}),
    ...(occasions ? { occasion: occasions } : {}),
    ...(inStock ? { in_stock: inStock } : {}),
    ...(category ? { category } : {}),
    ...(sort ? { sort } : {}),
    ...(isOnSale ? { is_on_sale: isOnSale } : {}),
    per_page: 12,
    made_to_order: 0,
  };
}

async function fetchProducts(searchParams: SearchParams) {
  try {
    const { data } = await http.get<{
      data: {
        items: Product[];
        pagination: Pagination;
      };
    }>(
      `/api/v1/products?${buildQueryString(buildRequestParams(searchParams))}`,
    );

    return data.data;
  } catch (error) {
    // A filter value the API does not know (e.g. a category that no longer
    // exists) matches nothing: show the empty state, not the error page.
    if (error instanceof ValidationError) {
      return null;
    }

    throw error;
  }
}

async function ListOfProducts({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const t = await getTranslations("Shop");
  const products = await fetchProducts(searchParams);
  const items = products?.items ?? [];

  return (
    <div className="col-span-1 md:col-span-2 lg:col-span-3">
      <div
        className={cn(
          ENTER,
          "flex items-center justify-between gap-6 border-b border-border pb-6",
        )}
      >
        <p
          role="status"
          className="text-sm font-semibold text-foreground/70"
        >
          {products?.pagination.total ?? 0} {t("Products")}
        </p>

        <ProductSortSelect />
      </div>

      {!products || items.length === 0 ? (
        <NoDataFounded label={t("EmptyState")} />
      ) : (
        <>
          <ul className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {items.map((item, index) => (
              <li
                key={item.id}
                className={cn(ENTER, "slide-in-from-bottom-2")}
                style={{ animationDelay: `${index * 40}ms` }}
              >
                <CardItem
                  item={item}
                  imageClassName="h-[320px]"
                  imageLoading={index < EAGER_IMAGES ? "eager" : "lazy"}
                />
              </li>
            ))}
          </ul>

          <div
            className={cn(ENTER, "mt-12 slide-in-from-bottom-1.5")}
            style={{ animationDelay: "100ms" }}
          >
            <PaginationTemplate
              currentPage={products.pagination.current_page}
              totalPages={products.pagination.last_page}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const locale = await getLocale();
  const t = await getTranslations("Shop");

  const params = await searchParams;

  // The options rarely change, so they are not re-fetched on every filter,
  // sort or page change (each of those re-renders this page).
  const { data, ok } = await http.get<{
    data: FiltersOptions;
  }>("/api/v1/filters/options", { next: { revalidate: 60 } });

  if (!ok) {
    throw new Error("Failed to fetch filter options");
  }

  return (
    <main>
      <section className="bg-linear-to-br from-muted via-background to-background pt-10 md:pt-16">
        <div className="container max-w-7xl overflow-hidden">
          <div className={cn(ENTER, "slide-in-from-start-2")}>
            <h1
              className={cn(
                "mb-2 text-4xl font-bold text-foreground md:text-5xl",
                {
                  "font-heading": locale === "en",
                },
              )}
            >
              {t("Title")}
            </h1>

            <p className="text-lg text-foreground/60">{t("Description")}</p>
          </div>
        </div>
      </section>

      <div className="container max-w-7xl">
        <div className="py-25">
          <div className="grid grid-cols-1 items-start md:grid-cols-3 lg:grid-cols-4">
            <div className="sticky top-28 hidden md:block">
              <Filters filters={data.data} />
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  className="block cursor-pointer bg-transparent hover:bg-transparent md:hidden"
                  aria-label={t("FilterProducts")}
                >
                  <ListFilter />
                </Button>
              </SheetTrigger>

              <SheetContent showCloseButton className="overflow-y-auto">
                <SheetHeader className="mt-6">
                  <SheetTitle className="sr-only">
                    {t("FilterProducts")}
                  </SheetTitle>

                  <SheetDescription className="sr-only">
                    {t("Description")}
                  </SheetDescription>

                  <Filters filters={data.data} className="me-0" />
                </SheetHeader>
              </SheetContent>
            </Sheet>

            <Suspense
              key={JSON.stringify(params)}
              fallback={<ListOfProductsSkeleton />}
            >
              <ListOfProducts searchParams={params} />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}
