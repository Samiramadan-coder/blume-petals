import Image from "next/image";
import { Suspense } from "react";
import { Link } from "@/i18n/navigation";
import LandingTitle from "./landing-title";
import * as motion from "motion/react-client";
import LandingSubtitle from "./landing-subtitle";
import { getTranslations } from "next-intl/server";
import { Skeleton } from "@/components/ui/skeleton";
import { HomePageSections } from "@/types/home-page";
import { getCategories } from "@/lib/common-requestes";
import { Card, CardContent } from "@/components/ui/card";
import { alternateX, reveal, stagger } from "@/lib/motion";

async function Categories() {
  const data = await getCategories();

  return (
    <>
      {data.slice(0, 5).map((item, index) => (
        <motion.li
          key={item.id}
          {...reveal({
            x: alternateX(index),
            delay: stagger(index),
            amount: 0.15,
          })}
        >
          <Link href={`/shop?category=${item.slug}`} className="block">
            <Card className="group relative overflow-hidden rounded-2xl border-0 bg-background p-0 shadow-[0_10px_30px_rgba(61,46,0,0.08)]">
              <CardContent className="relative min-h-81 p-0">
                <Image
                  src={item.banner_url}
                  alt=""
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
        </motion.li>
      ))}
    </>
  );
}

function CategoriesSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <li key={index} aria-hidden="true">
          <Skeleton className="min-h-81 rounded-2xl" />
        </li>
      ))}
    </>
  );
}

export default async function ShopByCategory({
  section,
}: {
  section: HomePageSections["categories"];
}) {
  const t = await getTranslations("LandingShopByCategory");

  return (
    <section className="container max-w-7xl">
      <div className="py-20">
        <LandingSubtitle>{section.subtitle ?? t("Eyebrow")}</LandingSubtitle>

        <LandingTitle>{section.title ?? t("Title")}</LandingTitle>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <Suspense fallback={<CategoriesSkeleton />}>
            <Categories />
          </Suspense>
        </ul>
      </div>
    </section>
  );
}
