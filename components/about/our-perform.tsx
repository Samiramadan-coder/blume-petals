import {
  Clock3,
  PackageCheck,
  SlidersHorizontal,
  type LucideIcon,
} from "lucide-react";

import * as motion from "motion/react-client";

import { Card, CardContent } from "../ui/card";

import AboutTitle from "./about-title";
import AboutSubtitle from "./about-subtitle";

import { getLocale, getTranslations } from "next-intl/server";

import { cn } from "@/lib/utils";

const promiseCards: Array<{
  key: "Last" | "Customizable" | "Delivery";
  icon: LucideIcon;
}> = [
  {
    key: "Last",
    icon: Clock3,
  },
  {
    key: "Customizable",
    icon: SlidersHorizontal,
  },
  {
    key: "Delivery",
    icon: PackageCheck,
  },
];

export default async function OurPerform() {
  const t = await getTranslations("AboutOurPromise");
  const locale = await getLocale();

  return (
    <section className="bg-[#f7f3ee]">
      <div className="container max-w-5xl">
        <div className="py-20">
          <AboutSubtitle className="text-center">{t("Eyebrow")}</AboutSubtitle>

          <AboutTitle className="text-center">{t("Title")}</AboutTitle>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {promiseCards.map(({ key, icon: Icon }, index) => (
              <motion.div
                key={key}
                initial={{
                  opacity: 0,
                  x: index % 2 === 0 ? -8 : 8,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="h-full"
              >
                <Card className="h-full border border-border p-8 shadow-sm">
                  <CardContent className="flex h-full flex-col items-center gap-4 p-0">
                    <div className="grid size-14 place-items-center rounded-full bg-border">
                      <Icon className="size-6 text-foreground" />
                    </div>

                    <h4
                      className={cn(
                        "text-center text-xl font-bold text-foreground",
                        {
                          "font-heading": locale === "en",
                        },
                      )}
                    >
                      {t(`Cards.${key}.Title`)}
                    </h4>

                    <p className="text-center text-sm leading-relaxed text-foreground/60">
                      {t(`Cards.${key}.Description`)}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
