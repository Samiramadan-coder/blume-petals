import { Suspense } from "react";
import * as motion from "motion/react-client";

import LandingTitle from "./landing-title";
import LandingSubtitle from "./landing-subtitle";

import { getTranslations } from "next-intl/server";

import { http } from "@/lib/http";

import type { Product } from "@/types/products";

import CardItem from "../shop/card-item";
import { Skeleton } from "@/components/ui/skeleton";

async function FeaturedProducts() {
  const { data, ok } = await http.get<{
    data: {
      items: Product[];
    };
  }>("/api/v1/products?sort=rating&made_to_order=0");

  if (!ok) {
    throw new Error("Failed to fetch featured collections");
  }

  return (
    <>
      {data.data.items.slice(0, 4).map((item, index) => (
        <motion.div
          key={item.id}
          initial={{
            opacity: 0,
            x: index % 2 === 0 ? -10 : 10,
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
            duration: 0.55,
            delay: index * 0.06,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <CardItem
            showCategory={false}
            item={item}
            cardClassName="shadow-[0_10px_30px_rgba(61,46,0,0.08)]"
            cardContentClassName="p-4"
            imageClassName="rounded-none"
            titleClassName="text-sm group-hover:text-foreground!"
            priceClassName="text-foreground"
          />
        </motion.div>
      ))}
    </>
  );
}

function FeaturedProductsSkeleton() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="space-y-3">
          <Skeleton className="aspect-square w-full rounded-2xl" />

          <Skeleton className="h-4 w-3/4" />

          <Skeleton className="h-4 w-1/3" />
        </div>
      ))}
    </>
  );
}

export default async function FeaturedCollections() {
  const t = await getTranslations("LandingFeaturedCollections");

  return (
    <section className="container max-w-7xl">
      <div className="py-20">
        <LandingSubtitle>{t("Eyebrow")}</LandingSubtitle>

        <LandingTitle>{t("Title")}</LandingTitle>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Suspense fallback={<FeaturedProductsSkeleton />}>
            <FeaturedProducts />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
