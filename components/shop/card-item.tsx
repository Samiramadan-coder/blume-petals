import Image from "next/image";
import { Badge } from "../ui/badge";
import { Rating } from "../ui/rating";
import { cookies } from "next/headers";
import { Link } from "@/i18n/navigation";
import { Product } from "@/types/products";
import { Card, CardContent } from "../ui/card";
import { getTranslations } from "next-intl/server";
import AddToFavoriteBtn from "./add-to-favorite-btn";
import { cn } from "@/lib/utils";

export default async function CardItem({
  item,
  cardClassName,
  cardContentClassName,
  imageClassName,
  showCategory = true,
  titleClassName,
  priceClassName,
}: {
  item: Product;
  cardClassName?: string;
  cardContentClassName?: string;
  imageClassName?: string;
  showCategory?: boolean;
  titleClassName?: string;
  priceClassName?: string;
}) {
  const cookieStore = await cookies();
  const t = await getTranslations("Shop");
  const isLoggedIn = Boolean(cookieStore.get("token")?.value);

  return (
    <Card
      className={cn(
        "group relative overflow-hidden bg-background p-0 rounded-lg cursor-pointer",
        cardClassName,
      )}
    >
      <Link
        href={`/shop/${item.slug}`}
        aria-label={`View ${item.name} details`}
        className="absolute inset-0 z-10"
      />

      <CardContent className="px-0">
        <div
          className={cn(
            "overflow-hidden relative aspect-5/5 rounded-lg w-full",
            imageClassName,
          )}
        >
          <Image
            src={item.image_url}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="absolute z-20 top-0 left-0 p-4 w-full flex items-center justify-between">
            <div>
              {item.is_new && (
                <Badge className="text-white bg-secondary text-xs h-6">
                  ✨ {t("New")}
                </Badge>
              )}
            </div>

            <AddToFavoriteBtn product={item} isLoggedIn={isLoggedIn} />
          </div>
        </div>

        <div className={cn("flex flex-col pt-4 px-1", cardContentClassName)}>
          {showCategory && item.category && (
            <Badge className="h-6 px-2 mb-2 text-secondary bg-border font-semibold text-xs">
              {item.category?.name}
            </Badge>
          )}
          <p
            dangerouslySetInnerHTML={{ __html: item.name }}
            className={cn(
              "text-base font-semibold leading-snug mb-1.5 text-foreground group-hover:text-primary!",
              titleClassName,
            )}
          ></p>
          <div className="mb-3">
            <Rating rating={+item.rating_avg} count={item.rating_count} />
          </div>
          <p className={cn("text-base font-bold text-primary", priceClassName)}>
            {t("AED")} {item.price_from}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
