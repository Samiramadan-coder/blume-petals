import Image from "next/image";
import * as motion from "motion/react-client";

import { Card, CardContent } from "@/components/ui/card";
import { getLocale, getTranslations } from "next-intl/server";

import MainButton from "../ui/main-button";
import LandingSubtitle from "./landing-subtitle";
import LandingTitle from "./landing-title";

import { steps } from "@/constants/home-page";
import { cn } from "@/lib/utils";

export default async function HowItWorks() {
  const t = await getTranslations("LandingHowItWorks");
  const locale = await getLocale();

  return (
    <section className="bg-border">
      <div className="container max-w-7xl">
        <div className="py-20">
          <LandingSubtitle className="text-center">
            {t("Eyebrow")}
          </LandingSubtitle>

          <LandingTitle className="mx-auto max-w-112.5 text-center">
            {t("Title")}
          </LandingTitle>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{
                  opacity: 0,
                  x: index % 2 === 0 ? -10 : 10,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative"
              >
                <Card className="group border-transparent bg-transparent py-0 shadow-none">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-[24px]">
                      <Image
                        src={step.image}
                        alt={t(`Steps.${step.key}.Title`)}
                        width={500}
                        height={500}
                        className="aspect-square w-full object-cover"
                      />

                      <div className="absolute left-4 top-4 flex size-10 items-center justify-center rounded-full bg-[#d8c07f] text-sm font-semibold text-[#3d2e00]">
                        {step.id}
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3
                        className={cn("text-lg font-semibold text-foreground", {
                          "font-heading": locale === "en",
                        })}
                      >
                        {t(`Steps.${step.key}.Title`)}
                      </h3>

                      <p className="text-sm leading-relaxed text-[#6b5b45]">
                        {t(`Steps.${step.key}.Description`)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{
              opacity: 0,
              y: 8,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.5,
            }}
            transition={{
              duration: 0.5,
              delay: 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-8 text-center"
          >
            <MainButton href="/builder" label={t("PrimaryCta")} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
