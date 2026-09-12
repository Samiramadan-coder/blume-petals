import { Suspense } from "react";
import * as motion from "motion/react-client";

import { http } from "@/lib/http";

import type { Product } from "@/types/products";
import type { AppSettings } from "@/types/landing";

import LandingTitle from "./landing-title";
import LandingSubtitle from "./landing-subtitle";
import AddOnCard from "../shop/add-on-card";

import { Skeleton } from "@/components/ui/skeleton";

import { getTranslations } from "next-intl/server";

async function PerfectAddOnsContent() {
  const [t, addOnsResponse, appSettingsResponse] = await Promise.all([
    getTranslations("LandingPerfectAddOns"),

    http.get<{
      data: {
        items: Product[];
      };
    }>("/api/v1/products?category_type=addon", {
      params: {
        per_page: 6,
      },
    }),

    http.get<{
      data: AppSettings;
    }>("/api/v1/settings"),
  ]);

  const { data: addOns, ok: ok1 } = addOnsResponse;
  const { data: appSettings, ok: ok2 } = appSettingsResponse;

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

function PerfectAddOnsSkeleton() {
  return (
    <section className="bg-[#faf8f5]">
      <div className="container max-w-7xl">
        <div className="py-20">
          <Skeleton className="mb-3 h-4 w-28" />

          <Skeleton className="mb-6 h-9 w-72" />

          <Skeleton className="mb-12 h-5 w-80 max-w-full" />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="space-y-3">
                <Skeleton className="aspect-square w-full rounded-xl" />

                <Skeleton className="h-4 w-3/4" />

                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function PerfectAddOns() {
  return (
    <Suspense fallback={<PerfectAddOnsSkeleton />}>
      <PerfectAddOnsContent />
    </Suspense>
  );
}
