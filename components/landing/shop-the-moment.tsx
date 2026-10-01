import Image from "next/image";
import { Suspense } from "react";
import * as motion from "motion/react-client";

import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

import { cn } from "@/lib/utils";
import { http } from "@/lib/http";
import { Link } from "@/i18n/navigation";
import { reveal, stagger } from "@/lib/motion";

import type { Occasion } from "@/types/landing";

import LandingTitle from "./landing-title";
import LandingSubtitle from "./landing-subtitle";

import { getTranslations } from "next-intl/server";
import { HomePageSections } from "@/types/home-page";

async function Occasions() {
  const { data, ok } = await http.get<{
    data: {
      items: Occasion[];
    };
  }>("/api/v1/occasions");

  if (!ok) {
    throw new Error("Failed to fetch occasions");
  }

  return (
    <>
      {data.data.items.map((item, index) => {
        const direction = index % 3 === 0 ? -10 : index % 3 === 2 ? 10 : 0;

        return (
          <motion.li
            key={item.id}
            {...reveal({
              x: direction,
              y: direction === 0 ? 8 : 0,
              delay: stagger(index),
              amount: 0.15,
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
                className="absolute inset-0 flex cursor-pointer items-end bg-black/10 text-white transition-colors duration-300 hover:bg-black/20"
              >
                <h3 className="w-full bg-[linear-gradient(to_top,rgba(20,12,0,0.7)_0%,transparent_100%)] px-5 pb-4 pt-12 text-base font-semibold text-white">
                  {item.name}
                </h3>
              </Link>
            </Card>
          </motion.li>
        );
      })}
    </>
  );
}

function OccasionsSkeleton() {
  return (
    <>
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
    </>
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

          <ul className="grid grid-cols-1 gap-4 md:auto-rows-[220px] md:grid-cols-3">
            <Suspense fallback={<OccasionsSkeleton />}>
              <Occasions />
            </Suspense>
          </ul>
        </div>
      </div>
    </section>
  );
}
