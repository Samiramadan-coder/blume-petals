"use client";

import CountUp from "react-countup";
import * as motion from "motion/react-client";

import { useLocale, useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import LandingSubtitle from "./landing-subtitle";
import LandingTitle from "./landing-title";

import { cn } from "@/lib/utils";

const stats = [
  {
    key: "BouquetsDesigned",
    end: 12000,
    suffix: "+",
  },
  {
    key: "AverageRating",
    end: 4.9,
    decimals: 1,
    suffix: "★",
  },
  {
    key: "EmiratesDelivered",
    end: 7,
  },
  {
    key: "HappyCustomers",
    end: 2500,
    suffix: "+",
  },
];

export default function SubscribeSection() {
  const t = useTranslations("LandingSubscribeSection");
  const locale = useLocale();

  const numberLocale = locale === "ar" ? "ar-EG" : "en-US";

  return (
    <section>
      <div className="border-y border-[#d4c9bb] bg-border">
        <div className="container grid max-w-7xl gap-10 py-16 text-center sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item, index) => (
            <motion.div
              key={item.key}
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
                amount: 0.35,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div
                className={cn(
                  "text-4xl font-bold text-foreground lg:text-5xl",
                  {
                    "font-heading": locale === "en",
                  },
                )}
              >
                <CountUp
                  end={item.end}
                  decimals={item.decimals ?? 0}
                  duration={1.5}
                  separator=","
                  enableScrollSpy
                  scrollSpyOnce
                  formattingFn={(value) => {
                    const digits = new Intl.NumberFormat(numberLocale, {
                      minimumFractionDigits: item.decimals ?? 0,
                      maximumFractionDigits: item.decimals ?? 0,
                    }).format(value);

                    return `${digits}${item.suffix ?? ""}`;
                  }}
                />
              </div>

              <p className="mt-4 text-sm text-foreground">
                {t(`Stats.${item.key}`)}
              </p>

              <div className="mx-auto mt-4 h-px w-10 bg-foreground" />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-[#e6dcd2e0] backdrop-blur-xs">
        <div className="container max-w-7xl py-24 text-center">
          <LandingSubtitle className="mb-6">{t("Eyebrow")}</LandingSubtitle>

          <LandingTitle className="mb-6">{t("Title")}</LandingTitle>

          <motion.div
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
          >
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-foreground">
              {t("Description")}
            </p>

            <motion.form
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
                amount: 0.5,
              }}
              transition={{
                duration: 0.45,
                delay: 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mx-auto mt-9 flex max-w-md overflow-hidden rounded-full bg-white"
            >
              <Input
                type="email"
                aria-label={t("EmailAria")}
                placeholder={t("EmailPlaceholder")}
                className="h-12 flex-1 border-0 bg-white px-6 text-foreground shadow-none focus-visible:ring-0"
              />

              <Button
                type="submit"
                aria-label="Submit"
                className="h-12 w-35 cursor-pointer rounded-full bg-secondary text-secondary-foreground hover:bg-secondary"
              >
                {t("PrimaryCta")}
              </Button>
            </motion.form>

            <motion.p
              initial={{
                opacity: 0,
              }}
              whileInView={{
                opacity: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.45,
                delay: 0.14,
              }}
              className="mt-4 text-xs text-foreground"
            >
              {t("Disclaimer")}
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
