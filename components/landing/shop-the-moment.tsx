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
            <Card className="group relative h-full min-h-55 overflow-hidden rounded-4xl p-0">
              <Image
                src={item.banner_url}
                alt=""
                fill
                className="object-cover"
                sizes="(min-width: 768px) 33vw, 100vw"
              />

              <Link
                href={`/shop?occasion=${item.slug}`}
                // Each prefetch renders /shop on the server; one per card is a
                // burst of requests that the host blocks with a 403.
                prefetch={false}
                className="absolute inset-0 flex cursor-pointer items-end bg-black/10 text-white transition-colors duration-300 hover:bg-black/20"
              >
                <h3 className="w-full bg-[linear-gradient(to_top,rgba(20,12,0,15)_0%,transparent_100%)] px-5 pb-4 pt-12 text-base font-semibold text-white">
                  {item.name}
                  <span
                    className="block text-sm font-normal leading-relaxed mt-2"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  ></span>
                </h3>
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
