import { Card, CardContent } from "../ui/card";
import {
  Clock3,
  PackageCheck,
  SlidersHorizontal,
  type LucideIcon,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import AboutSubtitle from "./about-subtitle";
import AboutTitle from "./about-title";
import * as motion from "motion/react-client";

const promiseCards: Array<{
  key: "Last" | "Customizable" | "Delivery";
  icon: LucideIcon;
}> = [
  { key: "Last", icon: Clock3 },
  { key: "Customizable", icon: SlidersHorizontal },
  { key: "Delivery", icon: PackageCheck },
];

export default async function OurPerform() {
  const t = await getTranslations("AboutOurPromise");

  return (
    <div className="bg-[#faf8f5]">
      <div className="container max-w-7xl">
        <div className="py-20">
          <AboutSubtitle className="text-center">{t("Eyebrow")}</AboutSubtitle>
          <AboutTitle className="text-center">{t("Title")}</AboutTitle>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {promiseCards.map(({ key, icon: Icon }, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 + index * 0.1 }}
                key={key}
              >
                <Card className="border border-border p-8 shadow-sm h-full">
                  <CardContent className="flex flex-col items-center gap-4">
                    <div className="grid h-14 w-14 place-items-center rounded-full bg-border">
                      <Icon className="h-6 w-6 text-foreground" />
                    </div>
                    <h4 className="text-center font-heading text-xl font-bold text-foreground">
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
    </div>
  );
}
