import Image from "next/image";
import * as motion from "motion/react-client";

import { getLocale, getTranslations } from "next-intl/server";

import MainButton from "../ui/main-button";
import LandingSubtitle from "./landing-subtitle";
import LandingTitle from "./landing-title";

import { features } from "@/constants/home-page";
import { cn } from "@/lib/utils";

export default async function BouquetBuilder() {
  const t = await getTranslations("LandingBouquetBuilder");
  const locale = await getLocale();

  return (
    <section>
      <div className="container max-w-7xl overflow-hidden">
        <div className="grid grid-cols-1 items-center gap-14 py-20 md:grid-cols-2">
          <motion.div
            initial={{
              opacity: 0,
              x: -12,
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
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative"
          >
            <Image
              src="/images/home/bouquet-builder/bouquet-builder.webp"
              alt="Bouquet builder"
              width={500}
              height={500}
              className="aspect-square w-full rounded-4xl object-cover"
            />

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
                amount: 0.3,
              }}
              transition={{
                duration: 0.5,
                delay: 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute -bottom-5 -inset-e-5 rounded-2xl bg-primary px-5 py-4 shadow-[0_8px_32px_rgba(203,182,130,0.4)]"
            >
              <p className="text-xs font-semibold uppercase tracking-wider">
                {t("CardEyebrow")}
              </p>

              <p
                className={cn(
                  "text-2xl font-bold",
                  locale === "en" && "font-heading",
                )}
              >
                {t("CardTitle")}
              </p>
            </motion.div>
          </motion.div>

          <div>
            <LandingSubtitle>{t("Eyebrow")}</LandingSubtitle>

            <LandingTitle className="mb-0">
              <p
                dangerouslySetInnerHTML={{
                  __html: t("Title"),
                }}
              />
            </LandingTitle>

            <motion.p
              initial={{
                opacity: 0,
                x: 8,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                amount: 0.3,
              }}
              transition={{
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="my-5 max-w-100 text-base leading-relaxed text-[#6b5b45]"
            >
              {t("Description")}
            </motion.p>

            <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.key}
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
                    amount: 0.25,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex items-start gap-4"
                >
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-border text-base text-secondary">
                    {feature.icon}
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {t(`Features.${feature.key}.Title`)}
                    </p>

                    <p className="mt-0.5 max-w-60.5 text-xs leading-relaxed text-[#6b5b45]">
                      {t(`Features.${feature.key}.Description`)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{
                opacity: 0,
                y: 6,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.4,
              }}
              transition={{
                duration: 0.45,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <MainButton href="/builder" label={t("PrimaryCta")} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
