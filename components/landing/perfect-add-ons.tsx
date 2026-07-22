import { http } from "@/lib/http";
import { Product } from "@/types/products";
import LandingTitle from "./landing-title";
import * as motion from "motion/react-client";
import LandingSubtitle from "./landing-subtitle";
import { getTranslations } from "next-intl/server";
import AddOnCard from "../shop/add-on-card";

export default async function PerfectAddOns() {
  const t = await getTranslations("LandingPerfectAddOns");

  const { data, ok } = await http.get<{
    data: {
      items: Product[];
    };
  }>(`/api/v1/products`);

  if (!ok) {
    throw new Error("Failed to fetch featured collections");
  }

  return (
    <div className="bg-[#faf8f5]">
      <div className="container max-w-7xl">
        <div className="py-20">
          <LandingSubtitle>{t("Eyebrow")}</LandingSubtitle>

          <LandingTitle className="mb-6">{t("Title")}</LandingTitle>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.2 }}
            className="mb-12 mt-3 text-sm md:text-base max-w-sm text-foreground"
          >
            {t("Description")}
          </motion.p>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {data.data.items.slice(0, 6).map((item, index) => (
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
        </div>
      </div>
    </div>
  );
}
