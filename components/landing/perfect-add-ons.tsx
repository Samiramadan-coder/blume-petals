import { http } from "@/lib/http";
import type { Product } from "@/types/products";
import type { AppSettings } from "@/types/landing";

import LandingTitle from "./landing-title";
import LandingSubtitle from "./landing-subtitle";
import AddOnCard from "../shop/add-on-card";

import * as motion from "motion/react-client";
import { getTranslations } from "next-intl/server";

export default async function PerfectAddOns() {
  const t = await getTranslations("LandingPerfectAddOns");

  const { data: addOns, ok: ok1 } = await http.get<{
    data: {
      items: Product[];
    };
  }>("/api/v1/products?category_type=addon", {
    params: {
      per_page: 6,
    },
  });

  const { data: appSettings, ok: ok2 } = await http.get<{
    data: AppSettings;
  }>("/api/v1/settings");

  if (!ok1 || !ok2) {
    throw new Error("Failed to fetch add-ons or app settings");
  }

  if (!appSettings.data.showAddition) {
    return null;
  }

  return (
    <section className="bg-[#faf8f5]">
      <div className="container max-w-7xl">
        <div className="py-20">
          <LandingSubtitle>{t("Eyebrow")}</LandingSubtitle>

          <LandingTitle className="mb-6">{t("Title")}</LandingTitle>

          <motion.p
            initial={{
              opacity: 0,
              x: 8,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mb-12 mt-3 max-w-sm text-sm text-foreground md:text-base"
          >
            {t("Description")}
          </motion.p>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {addOns.data.items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{
                  opacity: 0,
                  x: index % 2 === 0 ? -8 : 8,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.045,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <AddOnCard item={item} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
