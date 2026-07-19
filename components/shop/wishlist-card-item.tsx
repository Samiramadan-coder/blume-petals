import Image from "next/image";
import { Badge } from "../ui/badge";
import { Link } from "@/i18n/navigation";
import { Product } from "@/types/products";
import { Card, CardContent } from "../ui/card";
import { getTranslations } from "next-intl/server";
import AddToFavoriteBtn from "./add-to-favorite-btn";
import AddToCartBtn from "./add-to-cart-btn";

export default async function WishlistCardItem({ item }: { item: Product }) {
  const t = await getTranslations("Shop");

  return (
    <Card className="group relative overflow-hidden p-0! cursor-pointer shadow-[0_6px_20px_rgba(17,24,39,0.08)]">
      <Link
        href={`/shop/${item.slug}`}
        aria-label={`View ${item.name} details`}
        className="absolute inset-0 z-10"
      />

      <CardContent className="p-0">
        <div className="overflow-hidden relative aspect-5/5 rounded-t-2xl">
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
        </div>

        <div className="flex flex-col p-4">
          <p className="text-base font-semibold leading-snug mb-3 text-foreground">
            {item.name}
          </p>
          <p className="text-lg font-bold text-primary">
            {t("AED")} {item.price_from}
          </p>
          <AddToCartBtn
            item={item}
            version="wishlist-page"
            isLoggedIn={true}
            message=""
            quantity={1}
            variant_id={0}
          />
        </div>
      </CardContent>
    </Card>
  );
}
