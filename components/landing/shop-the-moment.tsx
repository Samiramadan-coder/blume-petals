import Image from "next/image";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

type Category = {
  image: string;
  key: string;
  className?: string;
  href: string;
};

const categories: Category[] = [
  {
    image: "valantine",
    key: "Valentine",
    className: "md:row-span-2",
    href: "/shop",
  },
  {
    image: "birthday",
    key: "Birthday",
    href: "/shop",
  },
  {
    image: "wedding",
    key: "Wedding",
    href: "/shop",
  },
  {
    image: "eid",
    key: "Eid",
    className: "md:row-span-2",
    href: "/shop",
  },
  {
    image: "anniversary",
    key: "Anniversary",
    href: "/shop",
  },
  {
    image: "mother",
    key: "MothersDay",
    href: "/shop",
  },
];

export default async function ShopTheMoment() {
  const t = await getTranslations("LandingShopTheMoment");

  return (
    <div className="bg-border">
      <div className="container max-w-7xl">
        <div className="py-20">
          <p className="text-xs font-semibold uppercase mb-3 text-secondary">
            {t("Eyebrow")}
          </p>

          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-balance leading-tight text-foreground mb-12">
            {t("Title")}
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-[220px]">
            {categories.map((category) => (
              <CategoryCard
                key={category.key}
                title={t(`Occasions.${category.key}`)}
                href={category.href}
                image={category.image}
                className={category.className}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

type CategoryCardProps = Pick<Category, "image" | "className" | "href"> & {
  title: string;
};

function CategoryCard({ image, title, className, href }: CategoryCardProps) {
  return (
    <Card
      className={cn(
        "group relative overflow-hidden rounded-4xl p-0",
        className,
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
  );
}
