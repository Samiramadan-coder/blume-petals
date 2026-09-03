import Image from "next/image";
import * as motion from "motion/react-client";

import { Card } from "../ui/card";
import { cn } from "@/lib/utils";
import { http } from "@/lib/http";
import { Link } from "@/i18n/navigation";

import type { Occasion } from "@/types/landing";

import LandingTitle from "./landing-title";
import LandingSubtitle from "./landing-subtitle";

import { getTranslations } from "next-intl/server";

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
          <motion.div
            key={item.id}
            initial={{
              opacity: 0,
              x: direction,
              y: direction === 0 ? 8 : 0,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              y: 0,
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
            className={cn(
              "h-full",
              index === 0 || index === 3 ? "md:row-span-2" : "",
            )}
          >
            <Card className="group relative h-full min-h-55 overflow-hidden rounded-4xl p-0">
              <Image
                src={item.banner_url}
                alt={item.name}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 33vw, 100vw"
              />

              <Link
                href={`/shop?occasion=${item.slug}`}
                aria-label={item.name}
                className="absolute inset-0 flex cursor-pointer items-end bg-black/10 text-white transition-colors duration-300 hover:bg-black/20"
              >
                <p className="w-full bg-[linear-gradient(to_top,rgba(20,12,0,0.7)_0%,transparent_100%)] px-5 pb-4 pt-12 text-base font-semibold text-white">
                  {item.name}
                </p>
              </Link>
            </Card>
          </motion.div>
        );
      })}
    </>
  );
}

export default async function ShopTheMoment() {
  const t = await getTranslations("LandingShopTheMoment");

  return (
    <section className="bg-border">
      <div className="container max-w-7xl">
        <div className="py-20">
          <LandingSubtitle>{t("Eyebrow")}</LandingSubtitle>

          <LandingTitle>{t("Title")}</LandingTitle>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-[220px]">
            <Occasions />
          </div>
        </div>
      </div>
    </section>
  );
}
