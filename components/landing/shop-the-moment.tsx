import Image from "next/image";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { categories } from "@/constants/home-page";
import { ShopTheMomentCategory } from "@/types/home-page";
import LandingSubtitle from "./landing-subtitle";
import LandingTitle from "./landing-title";
import * as motion from "motion/react-client";

export default async function ShopTheMoment() {
  const t = await getTranslations("LandingShopTheMoment");

  return (
    <div className="bg-border">
      <div className="container max-w-7xl">
        <div className="py-20">
          <LandingSubtitle>{t("Eyebrow")}</LandingSubtitle>
          <LandingTitle>{t("Title")}</LandingTitle>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-[220px]">
            {categories.map((category, index) => (
              <CategoryCard
                key={category.key}
                title={t(`Occasions.${category.key}`)}
                href={category.href}
                image={category.image}
                className={category.className}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

type CategoryCardProps = Pick<
  ShopTheMomentCategory,
  "image" | "className" | "href"
> & {
  title: string;
  index: number;
};

function CategoryCard({
  image,
  title,
  className,
  href,
  index,
}: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.1 + index * 0.2 }}
      className={cn("h-full", className)}
    >
      <Card
        className={cn(
          "group relative h-full min-h-55 overflow-hidden rounded-4xl p-0",
        )}
      >
        <Image
          src={`/images/home/shop-the-moment/${image}.png`}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(min-width: 768px) 33vw, 100vw"
        />
        <Link
          href={href}
          aria-label={title}
          className="absolute inset-0 flex cursor-pointer items-end bg-black/10 text-white transition duration-200 hover:bg-black/20"
        >
          <p className="text-base font-semibold text-white w-full px-5 pb-4 pt-12 bg-[linear-gradient(to_top,rgba(20,12,0,0.7)_0%,transparent_100%)]">
            {title}
          </p>
        </Link>
      </Card>
    </motion.div>
  );
}
