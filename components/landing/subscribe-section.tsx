"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CountUp from "react-countup";
import { useTranslations } from "next-intl";
import LandingSubtitle from "./landing-subtitle";
import LandingTitle from "./landing-title";
import * as motion from "motion/react-client";

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

  return (
    <section className="bg-border">
      <div className="border-b border-white/50">
        <div className="container max-w-7xl grid gap-10 py-16 text-center sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div key={item.key}>
              <div className="font-heading text-4xl font-bold text-foreground lg:text-5xl">
                <CountUp
                  end={item.end}
                  decimals={item.decimals ?? 0}
                  duration={1.5}
                  separator=","
                  suffix={item.suffix ?? ""}
                />
              </div>
              <p className="mt-4 text-sm text-foreground">
                {t(`Stats.${item.key}`)}
              </p>
              <div className="mx-auto mt-4 h-px w-10 bg-foreground" />
            </div>
          ))}
        </div>
      </div>

      <div className="container max-w-7xl py-24 text-center">
        <LandingSubtitle className="mb-6">{t("Eyebrow")}</LandingSubtitle>
        <LandingTitle className="mb-6">{t("Title")}</LandingTitle>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.2 }}
          className="mx-auto mt-6 max-w-xl text-lg leading-8 text-foreground"
        >
          {t("Description")}
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.4 }}
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
            className="h-12 w-35 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary cursor-pointer"
          >
            {t("PrimaryCta")}
          </Button>
        </motion.form>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.6 }}
          className="mt-4 text-xs text-foreground"
        >
          {t("Disclaimer")}
        </motion.p>
      </div>
    </section>
  );
}
