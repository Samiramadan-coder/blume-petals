import Image from "next/image";
import { http } from "@/lib/http";
import LandingTitle from "./landing-title";
import * as motion from "motion/react-client";
import LandingSubtitle from "./landing-subtitle";
import { getTranslations } from "next-intl/server";
import { Card, CardContent } from "@/components/ui/card";
import type { CategoriesResponse } from "@/types/landing";
import { Link } from "@/i18n/navigation";

async function Categories() {
  const { data, ok } = await http.get<CategoriesResponse>("/api/v1/categories");

  if (!ok) {
    throw new Error("Failed to fetch categories");
  }

  return (
    <>
      {data.data.items.map((item, index) => (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 + index * 0.2 }}
          key={item.id}
        >
          <Link href={`/shop?category=${item.slug}`}>
            <Card className="group overflow-hidden rounded-2xl border-0 bg-background p-0 shadow-[0_10px_30px_rgba(61,46,0,0.08)]">
              <CardContent className="p-0">
                <div className="relative aspect-4/5 overflow-hidden">
                  <Image
                    src={item.banner_url}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  />
                </div>

                <div className="flex h-12 items-center justify-center">
                  <h3 className="text-sm font-semibold text-foreground">
                    {item.name}
                  </h3>
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
    </>
  );
}

export default async function ShopByCategory() {
  const t = await getTranslations("LandingShopByCategory");

  return (
    <div className="container max-w-7xl">
      <div className="py-20">
        <LandingSubtitle>{t("Eyebrow")}</LandingSubtitle>
        <LandingTitle>{t("Title")}</LandingTitle>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <Categories />
        </div>
      </div>
    </div>
  );
}
