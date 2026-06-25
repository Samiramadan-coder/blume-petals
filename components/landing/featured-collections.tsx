import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { getTranslations } from "next-intl/server";
import { Rating } from "../ui/rating";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Heart } from "lucide-react";
import { featuredCollections } from "@/constants/home-page";
import LandingSubtitle from "./landing-subtitle";
import LandingTitle from "./landing-title";
import * as motion from "motion/react-client";

export default async function FeaturedCollections() {
  const t = await getTranslations("LandingFeaturedCollections");

  return (
    <div className="container max-w-7xl">
      <div className="py-20">
        <LandingSubtitle>{t("Eyebrow")}</LandingSubtitle>
        <LandingTitle>{t("Title")}</LandingTitle>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featuredCollections.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 + index * 0.2 }}
              key={item.id}
            >
              <Card className="group overflow-hidden rounded-2xl bg-background p-0 shadow-[0_10px_30px_rgba(61,46,0,0.04)] hover:shadow-[0_10px_30px_rgba(61,46,0,0.08)]">
                <CardContent className="p-0">
                  <div className="overflow-hidden relative aspect-5/5">
                    <Image
                      src={item.image}
                      alt={t(`Items.${item.itemKey}.Title`)}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />

                    <div className="absolute top-0 left-0 p-4 w-full z-10 flex items-center justify-between">
                      <Badge className="text-foreground text-xs">
                        {t("Badge")}
                      </Badge>

                      <Button
                        aria-label={t("FavoriteAria")}
                        className="rounded-full h-10 w-10 bg-background hover:bg-background"
                      >
                        <Heart size={16} className="text-foreground" />
                      </Button>
                    </div>

                    <Button
                      aria-label={t("AddToCartAria")}
                      className="h-10 bg-secondary hover:bg-secondary cursor-pointer absolute -bottom-10 left-0 right-0 group-hover:bottom-0 w-full z-10 py-2.5 rounded-b-2xl text-foreground font-semibold"
                    >
                      {t("AddToCart")}
                    </Button>
                  </div>

                  <div className="flex flex-col p-4">
                    <p className="text-sm font-semibold leading-snug mb-1.5 text-foreground">
                      {t(`Items.${item.itemKey}.Title`)}
                    </p>
                    <div className="mb-2">
                      <Rating rating={item.rating} count={item.reviews} />
                    </div>
                    <p className="text-base font-bold">
                      {t(`Items.${item.itemKey}.Price`)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
