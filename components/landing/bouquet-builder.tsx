import Image from "next/image";
import { getTranslations } from "next-intl/server";
import MainButton from "../ui/main-button";
import LandingSubtitle from "./landing-subtitle";
import LandingTitle from "./landing-title";
import * as motion from "motion/react-client";
import { features } from "@/constants/home-page";

export default async function BouquetBuilder() {
  const t = await getTranslations("LandingBouquetBuilder");

  return (
    <div>
      <div className="container max-w-7xl">
        <div className="py-20 grid grid-cols-1 md:grid-cols-2 items-center gap-14">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
            className="relative"
          >
            <Image
              src="/images/home/bouquet-builder/bouquet-builder.png"
              alt="bouquet builder"
              width={500}
              height={500}
              className="aspect-square w-full object-cover rounded-4xl"
            />
            <div className="absolute -bottom-5 -inset-e-5 bg-primary py-4 px-5 rounded-2xl shadow-[0_8px_32px_rgba(203,182,130,0.4)]">
              <p className="text-xs font-semibold uppercase tracking-wider">
                {t("CardEyebrow")}
              </p>
              <p className="font-heading font-bold text-2xl">
                {t("CardTitle")}
              </p>
            </div>
          </motion.div>

          <div>
            <LandingSubtitle>{t("Eyebrow")}</LandingSubtitle>
            <LandingTitle>{t("Title")}</LandingTitle>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.2 }}
              className="text-base leading-relaxed mt-5 mb-10 max-w-100"
            >
              {t("Description")}
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              {features.map((feature, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.2 + index * 0.1 }}
                  key={feature.key}
                  className="flex items-start gap-4"
                >
                  <div className="bg-border w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-base">
                    {feature.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {t(`Features.${feature.key}.Title`)}
                    </p>
                    <p className="text-xs leading-relaxed mt-0.5 max-w-60.5">
                      {t(`Features.${feature.key}.Description`)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <MainButton href="/builder" label={t("PrimaryCta")} />
          </div>
        </div>
      </div>
    </div>
  );
}
