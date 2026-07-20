import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { getTranslations } from "next-intl/server";
import MainButton from "../ui/main-button";
import { steps } from "@/constants/home-page";
import * as motion from "motion/react-client";
import LandingSubtitle from "./landing-subtitle";
import LandingTitle from "./landing-title";

export default async function HowItWorks() {
  const t = await getTranslations("LandingHowItWorks");

  return (
    <div className="bg-border">
      <div className="container max-w-7xl">
        <div className="py-20">
          <LandingSubtitle className="text-center">
            {t("Eyebrow")}
          </LandingSubtitle>

          <LandingTitle className="text-center">{t("Title")}</LandingTitle>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step, index) => (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.1 + index * 0.2 }}
                key={step.id}
                className="relative"
              >
                <Card className="group border-transparent bg-transparent shadow-none py-0">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-[24px]">
                      <Image
                        src={step.image}
                        alt={t(`Steps.${step.key}.Title`)}
                        width={500}
                        height={500}
                        className="aspect-square w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />

                      <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#d8c07f] text-sm font-semibold text-[#3d2e00]">
                        {step.id}
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="font-heading font-semibold text-lg text-foreground">
                        {t(`Steps.${step.key}.Title`)}
                      </h3>

                      <p className="text-sm leading-relaxed">
                        {t(`Steps.${step.key}.Description`)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <MainButton href="/builder" label={t("PrimaryCta")} />
          </div>
        </div>
      </div>
    </div>
  );
}
