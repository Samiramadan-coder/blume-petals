import { Suspense } from "react";
import { cn } from "@/lib/utils";
import { http } from "@/lib/http";
import { Product } from "@/types/products";
import AddOnCard from "../shop/add-on-card";
import { Pagination } from "@/types/shared";
import * as motion from "motion/react-client";
import ProductsAddOnsSkeleton from "./skeleton/products-addons-skeleton";
import { getLocale, getTranslations } from "next-intl/server";
import PaginationTemplate from "../reusable/pagination-template";

async function ProductAddOnsData({
  currentAddOnsPage,
}: {
  currentAddOnsPage: string;
}) {
  const { data, ok } = await http.get<{
    data: {
      items: Product[];
      pagination: Pagination;
    };
  }>(`/api/v1/products?category_type=addon`, {
    params: {
      per_page: 3,
      page: currentAddOnsPage || "1",
    },
  });

  if (!ok) {
    throw new Error("Failed to fetch add-ons");
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {data.data.items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.1 + index * 0.2 }}
          >
            <AddOnCard item={item} />
          </motion.div>
        ))}
      </div>

      <PaginationTemplate
        currentPage={data.data.pagination.current_page}
        totalPages={data.data.pagination.last_page}
        pageLabel="addOnsPage"
      />
    </>
  );
}

export default async function ProductAddOns({
  currentAddOnsPage,
}: {
  currentAddOnsPage: string;
}) {
  const locale = await getLocale();
  const t = await getTranslations("Shop");

  return (
    <div className="md:col-span-2">
      <h2
        className={cn("text-3xl md:text-4xl font-bold text-foreground mb-6", {
          "font-heading": locale === "en",
        })}
      >
        {t("AddSomethingExtra")}
      </h2>

      <p className="text-foreground/70 mb-4">
        {t("AddSomethingExtraDescription")}
      </p>

      <Suspense
        key={currentAddOnsPage}
        fallback={
          <ProductsAddOnsSkeleton className="lg:grid-cols-3" count={3} />
        }
      >
        <ProductAddOnsData currentAddOnsPage={currentAddOnsPage} />
      </Suspense>
    </div>
  );
}
