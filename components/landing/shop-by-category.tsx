import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { getTranslations } from "next-intl/server";

const collections = [
  {
    key: "Bouquets",
    image: "/images/home/hero/bouquet-of-rose.png",
  },
  {
    key: "Preserved",
    image: "/images/home/hero/bouquet-of-rose.png",
  },
  {
    key: "Gifting",
    image: "/images/home/hero/bouquet-of-rose.png",
  },
  {
    key: "CustomBuilder",
    image: "/images/home/hero/bouquet-of-rose.png",
  },
  {
    key: "Seasonal",
    image: "/images/home/hero/bouquet-of-rose.png",
  },
] as const;

export default async function ShopByCategory() {
  const t = await getTranslations("LandingShopByCategory");

  return (
    <div className="container">
      <div className="py-20">
        <p className="text-xs font-semibold uppercase mb-3 text-secondary">
          {t("Eyebrow")}
        </p>

        <h2 className="font-heading font-bold text-4xl lg:text-5xl text-balance leading-tight text-foreground mb-12">
          {t("Title")}
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {collections.map((item) => (
            <Card
              key={item.key}
              className="overflow-hidden rounded-2xl border-0 bg-background p-0 shadow-[0_10px_30px_rgba(61,46,0,0.08)]"
            >
              <CardContent className="p-0">
                <div className="relative aspect-4/5">
                  <Image
                    src={item.image}
                    alt={t(`Categories.${item.key}`)}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>

                <div className="flex h-12 items-center justify-center">
                  <h3 className="text-sm font-semibold text-foreground">
                    {t(`Categories.${item.key}`)}
                  </h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
