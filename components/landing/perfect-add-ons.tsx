import { http } from "@/lib/http";
import { Product } from "@/types/products";
import LandingTitle from "./landing-title";
import * as motion from "motion/react-client";
import LandingSubtitle from "./landing-subtitle";
import { getTranslations } from "next-intl/server";
import AddOnCard from "../shop/add-on-card";
import { AppSettings } from "@/types/landing";

export default async function PerfectAddOns() {
  const t = await getTranslations("LandingPerfectAddOns");

  // Fetch add-ons from the API
  const { data: addOns, ok: ok1 } = await http.get<{
    data: {
      items: Product[];
    };
  }>(`/api/v1/products?category_type=addon`, {
    params: {
      per_page: 6,
    },
  });

  const { data: appSettings, ok: ok2 } = await http.get<{
    data: AppSettings;
  }>(`/api/v1/settings`, {
    params: {
      per_page: 1,
    },
  });

  if (!ok1 || !ok2) {
    throw new Error("Failed to fetch add-ons or app settings");
  }

  if (!appSettings.data.showAddition) {
    return null;
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
            {addOns.data.items.map((item, index) => (
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
