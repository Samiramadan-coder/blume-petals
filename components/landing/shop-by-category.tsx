import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

const collections = [
  {
    title: "Bouquets",
    image: "/images/home/hero/bouquet-of-rose.png",
  },
  {
    title: "Preserved",
    image: "/images/home/hero/bouquet-of-rose.png",
  },
  {
    title: "Gifting",
    image: "/images/home/hero/bouquet-of-rose.png",
  },
  {
    title: "Custom Builder",
    image: "/images/home/hero/bouquet-of-rose.png",
  },
  {
    title: "Seasonal",
    image: "/images/home/hero/bouquet-of-rose.png",
  },
];

export default function ShopByCategory() {
  return (
    <div className="container">
      <div className="py-20">
        <p className="text-xs font-semibold uppercase mb-3 text-secondary">
          Browse Our Range
        </p>

        <h2 className="font-heading font-bold text-4xl lg:text-5xl text-balance leading-tight text-foreground mb-12">
          Shop by Category
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {collections.map((item) => (
            <Card
              key={item.title}
              className="overflow-hidden rounded-2xl border-0 bg-background p-0 shadow-[0_10px_30px_rgba(61,46,0,0.08)]"
            >
              <CardContent className="p-0">
                <div className="relative aspect-4/5">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex h-12 items-center justify-center">
                  <h3 className="text-sm font-semibold text-foreground">
                    {item.title}
                  </h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
