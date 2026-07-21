import Image from "next/image";
import { http } from "@/lib/http";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Product } from "@/types/products";
import LandingTitle from "./landing-title";
import * as motion from "motion/react-client";
import LandingSubtitle from "./landing-subtitle";
import { getTranslations } from "next-intl/server";
import { Card, CardContent } from "@/components/ui/card";

export default async function PerfectAddOns() {
  const t = await getTranslations("LandingPerfectAddOns");
  const tShop = await getTranslations("Shop");

  const { data, ok } = await http.get<{
    data: {
      items: Product[];
    };
  }>(`/api/v1/products`);

  if (!ok) {
    throw new Error("Failed to fetch featured collections");
  }

  return (
    <div className="bg-[#faf8f5]">
      <div className="container max-w-7xl">
        <div className="py-20">
          <LandingSubtitle>{t("Eyebrow")}</LandingSubtitle>

          <LandingTitle className="mb-6">{t("Title")}</LandingTitle>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.2 }}
            className="mb-12 mt-3 text-sm md:text-base max-w-sm text-foreground"
          >
            {t("Description")}
          </motion.p>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {data.data.items.slice(0, 6).map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.1 + index * 0.2 }}
              >
                <Card className="h-full group overflow-hidden border border-border rounded-2xl bg-white p-0 shadow-[0_10px_30px_rgba(61,46,0,0.04)] hover:shadow-[0_10px_30px_rgba(61,46,0,0.08)]">
                  <CardContent className="p-0">
                    <div className="overflow-hidden relative aspect-5/5">
                      <Image
                        src={item.image_url}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 16vw"
                      />
                    </div>

                    <div className="flex flex-col p-4">
                      <p className="text-sm font-semibold leading-snug mb-1.5 text-foreground">
                        {item.name.slice(0, 15)}...
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <p className="text-sm font-bold text-foreground">
                          {tShop("AED")} {item.price_from}
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
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
