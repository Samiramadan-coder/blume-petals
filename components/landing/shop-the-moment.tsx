import Image from "next/image";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";
import { http } from "@/lib/http";
import { Link } from "@/i18n/navigation";
import LandingTitle from "./landing-title";
import * as motion from "motion/react-client";
import LandingSubtitle from "./landing-subtitle";
import { getTranslations } from "next-intl/server";
import { OccasionsResponse } from "@/types/landing";

async function Occasions() {
  const { data, ok } = await http.get<OccasionsResponse>("/api/v1/occasions");

  if (!ok) {
    throw new Error("Failed to fetch occasions");
  }

  return (
    <>
      {data.data.items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.1 + index * 0.2 }}
          className={cn(
            "h-full",
            index === 0 || index === 3 ? "md:row-span-2" : "",
          )}
        >
          <Card
            className={cn(
              "group relative h-full min-h-55 overflow-hidden rounded-4xl p-0",
            )}
          >
            <Image
              src={item.banner_url}
              alt={item.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(min-width: 768px) 33vw, 100vw"
            />
            <Link
              href={`/shop?occasion=${item.slug}`}
              aria-label={item.name}
              className="absolute inset-0 flex cursor-pointer items-end bg-black/10 text-white transition duration-200 hover:bg-black/20"
            >
              <p className="text-base font-semibold text-white w-full px-5 pb-4 pt-12 bg-[linear-gradient(to_top,rgba(20,12,0,0.7)_0%,transparent_100%)]">
                {item.name}
              </p>
            </Link>
          </Card>
        </motion.div>
      ))}
    </>
  );
}

export default async function ShopTheMoment() {
  const t = await getTranslations("LandingShopTheMoment");

  return (
    <div className="bg-border">
      <div className="container max-w-7xl">
        <div className="py-20">
          <LandingSubtitle>{t("Eyebrow")}</LandingSubtitle>
          <LandingTitle>{t("Title")}</LandingTitle>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-[220px]">
            <Occasions />
          </div>
        </div>
      </div>
    </div>
  );
}
