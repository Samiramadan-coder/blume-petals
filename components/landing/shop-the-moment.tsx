import Image from "next/image";
import { Suspense } from "react";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { Skeleton } from "../ui/skeleton";
import LandingTitle from "./landing-title";
import * as motion from "motion/react-client";
import LandingSubtitle from "./landing-subtitle";
import { getTranslations } from "next-intl/server";
import { HomePageSections } from "@/types/home-page";
import { getOccasions } from "@/lib/common-requestes";
import { revealContainerVariants, revealItemVariants } from "@/lib/motion";

const GRID_CLASS = "grid grid-cols-1 gap-4 md:auto-rows-[220px] md:grid-cols-3";

async function Occasions() {
  const t = await getTranslations("LandingShopTheMoment");
  const occasions = await getOccasions();

  return (
    <motion.ul
      variants={revealContainerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      className={GRID_CLASS}
    >
      {occasions.map((item, index) => {
        const direction = index % 3 === 0 ? -10 : index % 3 === 2 ? 10 : 0;

        return (
          <motion.li
            key={item.id}
            variants={revealItemVariants({
              x: direction,
              y: direction === 0 ? 8 : 0,
            })}
            className={cn(
              "h-full",
              index === 0 || index === 3 ? "md:row-span-2" : "",
            )}
          >
            <Card className="group relative h-full min-h-55 overflow-hidden rounded-[28px] border-0 p-0">
              <Image
                src={item.banner_url}
                alt={item.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(min-width: 768px) 33vw, 100vw"
              />

              <Link
                href={`/shop?occasion=${item.slug}`}
                prefetch={false}
                className="absolute inset-0 flex cursor-pointer flex-col justify-end"
              >
                {/* overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent" />

                <div className="relative z-10 flex h-full flex-col justify-end p-6">
                  {/* Top content */}
                  <div className="mb-2 pt-3">
                    <span className="text-xs font-medium uppercase tracking-[0.18em] text-white/70">
                      {t("occaasion")}
                    </span>

                    <h3 className="mt-2 text-2xl font-semibold leading-tight text-white">
                      {item.name}
                    </h3>
                  </div>

                  {/* Bottom */}
                  <div className="flex items-end justify-between gap-4">
                    <span className="rounded-full bg-black/25 px-4 py-2 text-sm text-white backdrop-blur-sm">
                      {item.products_count ?? 0} {t("designs")}
                    </span>

                    <span className="flex items-center gap-2 rounded-full border border-white/40 bg-black/20 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 group-hover:bg-white group-hover:text-black">
                      {t("shopNow")}
                      <span className="transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180">
                        →
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
            </Card>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}

function OccasionsSkeleton() {
  return (
    <ul className={GRID_CLASS}>
      {Array.from({ length: 6 }).map((_, index) => (
        <li
          key={index}
          aria-hidden="true"
          className={cn(
            "h-full",
            index === 0 || index === 3 ? "md:row-span-2" : "",
          )}
        >
          <Skeleton className="h-full min-h-55 rounded-4xl" />
        </li>
      ))}
    </ul>
  );
}

export default async function ShopTheMoment({
  section,
}: {
  section: HomePageSections["shop_the_moment"];
}) {
  const t = await getTranslations("LandingShopTheMoment");

  return (
    <section className="bg-border">
      <div className="container max-w-7xl">
        <div className="py-20">
          <LandingSubtitle>{section.subtitle ?? t("Eyebrow")}</LandingSubtitle>

          <LandingTitle>{section.title ?? t("Title")}</LandingTitle>

          <Suspense fallback={<OccasionsSkeleton />}>
            <Occasions />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
