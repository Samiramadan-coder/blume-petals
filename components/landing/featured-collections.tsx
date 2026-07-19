import LandingTitle from "./landing-title";
import * as motion from "motion/react-client";
import LandingSubtitle from "./landing-subtitle";
import { getTranslations } from "next-intl/server";
import { http } from "@/lib/http";
import { Product } from "@/types/products";
import CardItem from "../shop/card-item";

export default async function FeaturedCollections() {
  const t = await getTranslations("LandingFeaturedCollections");

  const { data, ok } = await http.get<{
    data: {
      items: Product[];
    };
  }>(`/api/v1/products?sort=newest`);

  if (!ok) {
    throw new Error("Failed to fetch featured collections");
  }

  return (
    <div className="container max-w-7xl">
      <div className="py-20">
        <LandingSubtitle>{t("Eyebrow")}</LandingSubtitle>
        <LandingTitle>{t("Title")}</LandingTitle>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {data.data.items.slice(0, 4).map((item, index) => (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 + index * 0.2 }}
              key={item.id}
            >
              <CardItem
                item={item}
                cardClassName="shadow-[0_10px_30px_rgba(61,46,0,0.08)]"
                cardContentClassName="p-4"
                imageClassName="rounded-none rounded-t-2xl"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
