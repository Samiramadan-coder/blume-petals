import LandingTitle from "./landing-title";
import * as motion from "motion/react-client";
import LandingSubtitle from "./landing-subtitle";

import { getTranslations } from "next-intl/server";

import { http } from "@/lib/http";

import type { Product } from "@/types/products";

import CardItem from "../shop/card-item";

export default async function FeaturedCollections() {
  const t = await getTranslations("LandingFeaturedCollections");

  const { data, ok } = await http.get<{
    data: {
      items: Product[];
    };
  }>("/api/v1/products?sort=rating");

  if (!ok) {
    throw new Error("Failed to fetch featured collections");
  }

  return (
    <section className="container max-w-7xl">
      <div className="py-20">
        <LandingSubtitle>{t("Eyebrow")}</LandingSubtitle>

        <LandingTitle>{t("Title")}</LandingTitle>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
        </div>
      </div>
    </section>
  );
}
