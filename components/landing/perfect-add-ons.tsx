import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { getTranslations } from "next-intl/server";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Plus } from "lucide-react";

const addOns = [
  {
    id: "teddy-bear",
    key: "TeddyBear",
    image: "/images/home/hero/bouquet-of-rose.png",
  },
  {
    id: "scented-candle",
    key: "ScentedCandle",
    image: "/images/home/hero/bouquet-of-rose.png",
  },
  {
    id: "macaron-box",
    key: "MacaronBox",
    image: "/images/home/hero/bouquet-of-rose.png",
  },
  {
    id: "greeting-card",
    key: "GreetingCard",
    image: "/images/home/hero/bouquet-of-rose.png",
  },
  {
    id: "silk-ribbon",
    key: "SilkRibbon",
    image: "/images/home/hero/bouquet-of-rose.png",
  },
  {
    id: "chocolate-box",
    key: "ChocolateBox",
    image: "/images/home/hero/bouquet-of-rose.png",
  },
] as const;

export default async function PerfectAddOns() {
  const t = await getTranslations("LandingPerfectAddOns");

  return (
    <div className="bg-[#faf8f5]">
      <div className="container">
        <div className="py-20">
          <p className="text-xs font-semibold uppercase mb-3 text-secondary">
            {t("Eyebrow")}
          </p>

          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-balance leading-tight text-foreground">
            {t("Title")}
          </h2>

          <p className="mb-12 mt-3 text-sm md:text-base max-w-sm text-foreground">
            {t("Description")}
          </p>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-6">
            {addOns.map((item) => (
              <Card
                key={item.id}
                className="group overflow-hidden border border-border rounded-2xl bg-white p-0 shadow-[0_10px_30px_rgba(61,46,0,0.04)] hover:shadow-[0_10px_30px_rgba(61,46,0,0.08)]"
              >
                <CardContent className="p-0">
                  <div className="overflow-hidden relative aspect-5/5">
                    <Image
                      src={item.image}
                      alt={t(`Items.${item.key}.Title`)}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="100vw"
                    />

                    <div className="absolute top-0 left-0 p-4 w-full z-10">
                      <Badge className="text-foreground text-xs">
                        {t("Badge")}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex flex-col p-4">
                    <p className="text-sm font-semibold leading-snug mb-1.5 text-foreground">
                      {t(`Items.${item.key}.Title`)}
                    </p>
                    <p className="text-xs leading-snug">
                      {t(`Items.${item.key}.Description`)}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <p className="text-sm font-bold text-foreground">
                        {t(`Items.${item.key}.Price`)}
                      </p>
                      <Button
                        aria-label={t("AddItemAria")}
                        className="w-8 h-8 p-0 rounded-full bg-primary text-white hover:bg-primary/90"
                      >
                        <Plus size={16} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
