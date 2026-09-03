import Image from "next/image";

import { http } from "@/lib/http";
import { Link } from "@/i18n/navigation";
import LandingTitle from "./landing-title";
import LandingSubtitle from "./landing-subtitle";

import * as motion from "motion/react-client";

import type { Category } from "@/types/landing";

import { getTranslations } from "next-intl/server";

import { Card, CardContent } from "@/components/ui/card";

async function Categories() {
  const { data, ok } = await http.get<{
    data: {
      items: Category[];
    };
  }>("/api/v1/categories");

  if (!ok) {
    throw new Error("Failed to fetch categories");
  }

  return (
    <>
      {data.data.items.slice(0, 5).map((item, index) => (
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
          <Link href={`/shop?category=${item.slug}`} className="block">
            <Card className="group relative overflow-hidden rounded-2xl border-0 bg-background p-0 shadow-[0_10px_30px_rgba(61,46,0,0.08)]">
              <CardContent className="relative min-h-81 p-0">
                <Image
                  src={item.banner_url}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />

                <div className="absolute inset-x-0 bottom-0 flex h-12 items-center justify-center bg-border/90 backdrop-blur-sm">
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
    <section className="container max-w-7xl">
      <div className="py-20">
        <LandingSubtitle>{t("Eyebrow")}</LandingSubtitle>

        <LandingTitle>{t("Title")}</LandingTitle>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <Categories />
        </div>
      </div>
    </section>
  );
}
