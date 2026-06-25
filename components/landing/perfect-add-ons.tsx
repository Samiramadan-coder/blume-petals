import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { getTranslations } from "next-intl/server";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Plus } from "lucide-react";
import LandingSubtitle from "./landing-subtitle";
import LandingTitle from "./landing-title";
import * as motion from "motion/react-client";
import { addOns } from "@/constants/home-page";

export default async function PerfectAddOns() {
  const t = await getTranslations("LandingPerfectAddOns");

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
            {addOns.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 + index * 0.2 }}
              >
                <Card className="h-full group overflow-hidden border border-border rounded-2xl bg-white p-0 shadow-[0_10px_30px_rgba(61,46,0,0.04)] hover:shadow-[0_10px_30px_rgba(61,46,0,0.08)]">
                  <CardContent className="p-0">
                    <div className="overflow-hidden relative aspect-5/5">
                      <Image
                        src={item.image}
                        alt={t(`Items.${item.key}.Title`)}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 16vw"
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
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
