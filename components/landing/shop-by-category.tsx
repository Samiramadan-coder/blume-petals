import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { getTranslations } from "next-intl/server";
import { collections } from "@/constants/home-page";
import * as motion from "motion/react-client";

export default async function ShopByCategory() {
  const t = await getTranslations("LandingShopByCategory");

  return (
    <div className="container max-w-7xl">
      <div className="py-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="text-xs font-semibold uppercase mb-3 text-secondary"
        >
          {t("Eyebrow")}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="font-heading font-bold text-4xl lg:text-5xl text-balance leading-tight text-foreground mb-12"
        >
          {t("Title")}
        </motion.h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {collections.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 + index * 0.2 }}
              key={item.key}
            >
              <Card className="group overflow-hidden rounded-2xl border-0 bg-background p-0 shadow-[0_10px_30px_rgba(61,46,0,0.08)]">
                <CardContent className="p-0">
                  <div className="relative aspect-4/5">
                    <Image
                      src={item.image}
                      alt={t(`Categories.${item.key}`)}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                    />
                  </div>

                  <div className="flex h-12 items-center justify-center">
                    <h3 className="text-sm font-semibold text-foreground">
                      {t(`Categories.${item.key}`)}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
