import Image from "next/image";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";

type Category = {
  image: string;
  title: string;
  className?: string;
  href: string;
};

const categories: Category[] = [
  {
    image: "valantine",
    title: "Valentine's Day",
    className: "md:row-span-2",
    href: "",
  },
  {
    image: "birthday",
    title: "Birthday",
    href: "",
  },
  {
    image: "wedding",
    title: "Wedding",
    href: "",
  },
  {
    image: "eid",
    title: "Eid",
    className: "md:row-span-2",
    href: "",
  },
  {
    image: "anniversary",
    title: "Anniversary",
    href: "",
  },
  {
    image: "mother",
    title: "Mother's Day",
    href: "",
  },
];

export default function ShopTheMoment() {
  return (
    <div className="bg-border">
      <div className="container">
        <div className="py-20">
          <p className="text-xs font-semibold uppercase mb-3 text-secondary">
            Shop the Moment
          </p>

          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-balance leading-tight text-foreground mb-12">
            Shop by Occasion
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-[220px]">
            {categories.map((category) => (
              <CategoryCard key={category.title} {...category} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

type CategoryCardProps = Pick<
  Category,
  "image" | "className" | "href" | "title"
>;

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
        href={href || "#"}
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
