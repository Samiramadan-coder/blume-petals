import Image from "next/image";
import { Suspense } from "react";
import { Card } from "../ui/card";
import { Link } from "@/i18n/navigation";
import { Skeleton } from "../ui/skeleton";
import * as motion from "motion/react-client";
import { getTranslations } from "next-intl/server";
import LandingTitle from "../landing/landing-title";
import { HomePageSections } from "@/types/home-page";
import { getOccasions } from "@/lib/common-requestes";
import LandingSubtitle from "../landing/landing-subtitle";
import { revealContainerVariants, revealItemVariants } from "@/lib/motion";

const GRID_CLASS = "grid grid-cols-1 gap-4 md:grid-cols-3";

async function Occasions() {
  const t = await getTranslations("LandingShopTheMoment");
  const occasions = await getOccasions();

  return (
    <motion.ul
      variants={revealContainerVariants}
      initial="hidden"
      whileInView="show"
      // "some", not a ratio: stacked in one column the list is many screens
      // tall, so a fixed fraction of it can never be in view at once.
      viewport={{ once: true, amount: "some" }}
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
          >
            <Card className="group overflow-hidden min-h-55 rounded-[28px] border-0 bg-[#f7f2e9] p-0">
              {/* Image */}
              <div className="relative aspect-video w-full overflow-hidden">
                <Image
                  src={item.banner_url}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
              </div>

              {/* Content */}
              <div className="flex min-h-66.25 flex-col px-7 py-6">
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-[#b39a69]">
                  {t("occaasion")}
                </span>

                <h3 className="mt-2 text-3xl font-semibold leading-tight text-[#2f241d]">
                  {item.name}
                </h3>

                <div
                  className="mt-4 line-clamp-3 text-sm leading-6 text-[#8a7d72]"
                  dangerouslySetInnerHTML={{
                    __html: item.description,
                  }}
                />

                <div className="mt-auto pt-8">
                  <div className="mb-5 h-px w-full bg-[#ded5c9]" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#9a8e84]">
                      {item.products_count ?? 0} {t("designs")}
                    </span>

                    <Link
                      href={`/shop?occasion=${item.slug}`}
                      prefetch={false}
                      className="flex items-center gap-2 text-sm font-semibold text-[#3b3029] transition-colors hover:text-black"
                    >
                      {t("shopNow")}
                      <span className="transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
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
        <li key={index} aria-hidden="true">
          <Skeleton className="h-full min-h-55 rounded-4xl" />
        </li>
      ))}
    </ul>
  );
}

export default async function Content({
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
