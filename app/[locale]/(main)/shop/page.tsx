import {
  Sheet,
  SheetHeader,
  SheetContent,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";

import { Suspense } from "react";
import * as motion from "motion/react-client";

import { http } from "@/lib/http";
import { buildQueryString, cn, normalizeArrayParam } from "@/lib/utils";

import { ListFilter } from "lucide-react";

import { Button } from "@/components/ui/button";

import Filters from "@/components/shop/filters";
import CardItem from "@/components/shop/card-item";
import ProductSortSelect from "@/components/shop/product-sort-select";

import NoDataFounded from "@/components/reusable/no-data-founded";
import PaginationTemplate from "@/components/reusable/pagination-template";

import ListOfProductsSkeleton from "@/components/shop/skeleton/list-of-product-skeleton";

import { getLocale, getTranslations } from "next-intl/server";

import type { Pagination } from "@/types/shared";
import type { FiltersOptions, Product } from "@/types/products";

export async function generateMetadata() {
  const t = await getTranslations("Shop");

  return {
    title: t("Title"),
  };
}

type SearchParams = {
  price_min?: string;
  price_max?: string;
  size?: string | string[];
  page?: string;
  occasion?: string | string[];
  in_stock?: string;
  category?: string;
  sort?: string;
};

async function ListOfProducts({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const t = await getTranslations("Shop");

  const sizes = normalizeArrayParam(searchParams.size);

  const occasions = normalizeArrayParam(searchParams.occasion);

  const requestParams = {
    ...(searchParams.price_min
      ? {
          price_min: searchParams.price_min,
        }
      : {
          price_min: "0",
        }),

    ...(searchParams.price_max
      ? {
          price_max: searchParams.price_max,
        }
      : {
          price_max: "500",
        }),

    ...(sizes
      ? {
          size: sizes,
        }
      : {}),

    ...(searchParams.page
      ? {
          page: searchParams.page,
        }
      : {}),

    ...(occasions
      ? {
          occasion: occasions,
        }
      : {}),

    ...(searchParams.in_stock
      ? {
          in_stock: searchParams.in_stock,
        }
      : {}),

    ...(searchParams.category
      ? {
          category: searchParams.category,
        }
      : {}),

    ...(searchParams.sort
      ? {
          sort: searchParams.sort,
        }
      : {}),

    per_page: 12,
    made_to_order: 0,
  };

  const { data, ok } = await http.get<{
    data: {
      items: Product[];
      pagination: Pagination;
    };
  }>(`/api/v1/products?${buildQueryString(requestParams)}`);

  if (!ok) {
    throw new Error("Failed to fetch products");
  }

  return (
    <div className="col-span-1 md:col-span-2 lg:col-span-3">
      <motion.div
        initial={{
          opacity: 0,
          x: 6,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 0.45,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="flex items-center justify-between gap-6 border-b border-border pb-6"
      >
        <p className="text-sm font-semibold text-foreground/70">
          {data.data.pagination.total} {t("Products")}
        </p>

        <ProductSortSelect />
      </motion.div>

      {data.data.items.length === 0 ? (
        <NoDataFounded />
      ) : (
        <>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {data.data.items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{
                  opacity: 0,
                  x: index % 2 === 0 ? -8 : 8,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <CardItem item={item} imageClassName="h-[320px]" />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{
              opacity: 0,
              y: 6,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.45,
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-12"
          >
            <PaginationTemplate
              currentPage={data.data.pagination.current_page}
              totalPages={data.data.pagination.last_page}
            />
          </motion.div>
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

  const { data, ok } = await http.get<{
    data: FiltersOptions;
  }>("/api/v1/filters/options");

  if (!ok) {
    throw new Error("Failed to fetch filter options");
  }

  return (
    <main>
      <section className="bg-linear-to-br from-muted via-background to-background pt-10 md:pt-16">
        <div className="container max-w-7xl overflow-hidden">
          <motion.div
            initial={{
              opacity: 0,
              x: -8,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.55,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
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
          </motion.div>
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
                  aria-label="Filter"
                >
                  <ListFilter />
                </Button>
              </SheetTrigger>

              <SheetContent showCloseButton>
                <SheetHeader className="mt-6">
                  <SheetDescription
                    asChild
                    className="flex flex-col gap-3 py-4"
                  >
                    <Filters filters={data.data} />
                  </SheetDescription>
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
