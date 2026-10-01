import Image from "next/image";
import { Suspense } from "react";
import * as motion from "motion/react-client";

import { cn } from "@/lib/utils";
import { http } from "@/lib/http";
import { alternateX, reveal, stagger } from "@/lib/motion";

import MainButton from "../ui/main-button";
import LandingTitle from "./landing-title";
import LandingSubtitle from "./landing-subtitle";

import { getTranslations } from "next-intl/server";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import type { CustomerDesign } from "@/types/landing";
import { HomePageSections } from "@/types/home-page";

const rotations = [
  "-rotate-2",
  "rotate-1",
  "-rotate-1",
  "rotate-2",
  "-rotate-2",
];

async function CustomerDesigns({ cardCaption }: { cardCaption: string }) {
  const { data, ok } = await http.get<{
    data: {
      items: CustomerDesign[];
    };
  }>("/api/v1/designs/showcase?limit=5");

  if (!ok) {
    throw new Error("Failed to fetch designs showcase");
  }

  return (
    <>
      {data.data.items.map((review, index) => (
        <motion.li
          key={review.id}
          className="group"
          {...reveal({
            x: alternateX(index),
            delay: stagger(index),
            amount: 0.15,
          })}
        >
          <div
            className={cn(
              "transition-transform duration-300 ease-out group-hover:rotate-0 group-hover:scale-103 motion-reduce:transition-none",
              rotations[index % rotations.length],
            )}
          >
            <Card
              className={cn(
                "rounded-none p-3 pb-10 shadow-[0_8px_30px_rgba(61,46,0,0.08)]",
              )}
            >
              <CardContent className="p-0">
                <div className="relative h-53.75 w-full overflow-hidden">
                  <Image
                    src={review.image_url || review.bouquet.image_url}
                    alt={review.bouquet.name}
                    fill
                    sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </CardContent>
            </Card>

            <div className={cn("pt-4 text-center")}>
              <h3 className="text-sm font-semibold text-foreground">
                {review.made_by}
              </h3>
              <p className="text-[11px] text-[#9caf88]">{cardCaption}</p>
            </div>
          </div>
        </motion.li>
      ))}
    </>
  );
}

function CustomerDesignsSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <li
          key={index}
          aria-hidden="true"
          className={rotations[index % rotations.length]}
        >
          <Card className="rounded-none p-3 pb-10">
            <CardContent className="p-0">
              <Skeleton className="h-53.75 w-full" />
            </CardContent>
          </Card>

          <div className="space-y-2 pt-4 text-center">
            <Skeleton className="mx-auto h-4 w-24" />
            <Skeleton className="mx-auto h-3 w-16" />
          </div>
        </li>
      ))}
    </>
  );
}

export default async function DesignedByOurCustomers({
  section,
}: {
  section: HomePageSections["real_creations"];
}) {
  const t = await getTranslations("LandingDesignedByOurCustomers");

  return (
    <section className="overflow-hidden bg-[#faf8f5]">
      <div className="container max-w-6xl">
        <div className="py-20">
          <LandingSubtitle className="text-center">
            {section.subtitle ?? t("Eyebrow")}
          </LandingSubtitle>

          <LandingTitle className="mb-6 text-center">
            {section.title ?? t("Title")}
          </LandingTitle>

          <motion.p
            {...reveal({ y: 8, amount: 0.4 })}
            className="mx-auto mb-12 mt-4 max-w-100 text-center text-sm md:text-base"
          >
            {section.description ?? t("Description")}
          </motion.p>

          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            <Suspense fallback={<CustomerDesignsSkeleton />}>
              <CustomerDesigns cardCaption={t("CardCaption")} />
            </Suspense>
          </ul>

          <motion.div
            {...reveal({ y: 8, delay: 0.12, amount: 0.5 })}
            className="mt-8 text-center"
          >
            <MainButton href="/builder" label={t("PrimaryCta")} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
