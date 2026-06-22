import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { getTranslations } from "next-intl/server";
import { Rating } from "../ui/rating";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Heart } from "lucide-react";

const collections = [
  {
    id: "golden-hour",
    itemKey: "GoldenHour",
    image: "/images/home/hero/bouquet-of-rose.png",
    rating: 4.5,
    reviews: 120,
  },
  {
    id: "moonlight-box",
    itemKey: "MoonlightBox",
    image: "/images/home/hero/bouquet-of-rose.png",
    rating: 4.8,
    reviews: 89,
  },
  {
    id: "dawn-gift",
    itemKey: "DawnGift",
    image: "/images/home/hero/bouquet-of-rose.png",
    rating: 4.7,
    reviews: 64,
  },
  {
    id: "signature-build",
    itemKey: "SignatureBuild",
    image: "/images/home/hero/bouquet-of-rose.png",
    rating: 4.9,
    reviews: 142,
  },
] as const;

export default async function FeaturedCollections() {
  const t = await getTranslations("LandingFeaturedCollections");

  return (
    <div className="container">
      <div className="py-20">
        <p className="text-xs font-semibold uppercase mb-3 text-secondary">
          {t("Eyebrow")}
        </p>

        <h2 className="font-heading font-bold text-4xl lg:text-5xl text-balance leading-tight text-foreground mb-12">
          {t("Title")}
        </h2>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {collections.map((item) => (
            <Card
              key={item.id}
              className="group overflow-hidden rounded-2xl bg-background p-0 shadow-[0_10px_30px_rgba(61,46,0,0.04)] hover:shadow-[0_10px_30px_rgba(61,46,0,0.08)]"
            >
              <CardContent className="p-0">
                <div className="overflow-hidden relative aspect-5/5">
                  <Image
                    src={item.image}
                    alt={t(`Items.${item.itemKey}.Title`)}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="100vw"
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
          ))}
        </div>
      </div>
    </div>
  );
}
