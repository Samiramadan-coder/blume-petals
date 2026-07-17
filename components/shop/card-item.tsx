import Image from "next/image";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Rating } from "../ui/rating";
import { Link } from "@/i18n/navigation";
import { Product } from "@/types/products";
import { ShoppingCart } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { getTranslations } from "next-intl/server";
import AddToFavoriteBtn from "./add-to-favorite-btn";

export default async function CardItem({ item }: { item: Product }) {
  const t = await getTranslations("Shop");

  return (
    <Card className="group relative overflow-hidden bg-background p-0 cursor-pointer">
      <Link
        href={`/shop/product/${item.id}`}
        aria-label={`View ${item.name} details`}
        className="absolute inset-0 z-10"
      />

      <CardContent className="p-1">
        <div className="overflow-hidden relative aspect-5/5 rounded-2xl">
          <Image
            src={item.image_url}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          <div className="absolute z-20 top-0 left-0 p-4 w-full flex items-center justify-between">
            <div>
              {item.is_new && (
                <Badge className="text-white bg-secondary text-xs h-6">
                  ✨ {t("New")}
                </Badge>
              )}
            </div>

            <AddToFavoriteBtn product={item} />
          </div>

          <Button
            aria-label={`Add ${item.name} to cart`}
            className="h-10 text-base bg-primary hover:bg-secondary cursor-pointer absolute z-20 bottom-2 left-1/2 transform -translate-x-1/2 w-1/2 py-2.5 text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <ShoppingCart className="mr-2 inline-block size-5" />
            {t("AddToCart")}
          </Button>
        </div>

        <div className="flex flex-col pt-4">
          <Badge className="h-7 px-3 mb-2 text-secondary bg-border font-semibold">
            {item.category.name}
          </Badge>
          <p className="text-base font-semibold leading-snug mb-1.5 text-foreground group-hover:text-primary!">
            {item.name}
          </p>
          <div className="mb-2">
            <Rating rating={+item.rating_avg} count={item.rating_count} />
          </div>
          <p className="text-base font-bold">
            {t("AED")} {item.price_from}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
