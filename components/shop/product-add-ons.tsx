import { cn } from "@/lib/utils";
import { Product } from "@/types/products";
import AddOnCard from "../shop/add-on-card";
import { Pagination } from "@/types/shared";
import * as motion from "motion/react-client";
import { getLocale, getTranslations } from "next-intl/server";
import PaginationTemplate from "../reusable/pagination-template";

export default async function ProductAddOns({
  addOns,
  pagination,
}: {
  addOns: Product[];
  pagination: Pagination;
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        {addOns.map((item, index) => (
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
        currentPage={pagination.current_page}
        totalPages={pagination.last_page}
      />
    </div>
  );
}
