"use client";

import { cn } from "@/lib/utils";
import { http } from "@/lib/http";
import CountUp from "react-countup";
import LandingTitle from "./landing-title";
import { useEffect, useState } from "react";
import * as motion from "motion/react-client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LandingSubtitle from "./landing-subtitle";
import { useLocale, useTranslations } from "next-intl";

type Stats = {
  average_rating: string;
  bouquets_designed: number;
  emirates_delivered: number;
  happy_customers: number;
  reviews_count: number;
};

export default function SubscribeSection() {
  const locale = useLocale();
  const t = useTranslations("LandingSubscribeSection");
  const numberLocale = locale === "ar" ? "ar-EG" : "en-US";
  const [statsData, setStatsData] = useState<Stats | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await http.get<{ data: Stats }>("/api/v1/stats");
        setStatsData(data.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const stats = [
    {
      key: "BouquetsDesigned",
      end: statsData?.bouquets_designed ?? 0,
      suffix: "+",
    },
    {
      key: "AverageRating",
      end: parseFloat(statsData?.average_rating ?? "0"),
      decimals: 1,
      suffix: "★",
    },
    {
      key: "EmiratesDelivered",
      end: statsData?.emirates_delivered ?? 0,
    },
    {
      key: "HappyCustomers",
      end: statsData?.happy_customers ?? 0,
      suffix: "+",
    },
  ];

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
