import { Badge } from "../ui/badge";
import { Countdown } from "./count-down";
import { getTranslations } from "next-intl/server";
import MainButton from "../ui/main-button";
import LandingTitle from "./landing-title";

import * as motion from "motion/react-client";

export default async function TodayExclusiveOffers() {
  const t = await getTranslations("LandingTodayExclusiveOffers");

  return (
    <section className="bg-[url('/images/home/today-exclusive-offers/rose.webp')] bg-cover bg-center bg-no-repeat">
      <div className="container max-w-7xl">
        <div className="flex flex-wrap items-center justify-center gap-10 py-20 md:justify-between">
          <motion.div
            initial={{
              opacity: 0,
              x: -10,
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
              duration: 0.55,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <Badge
              variant="ghost"
              className="mb-4 bg-[#ed8074] px-4 py-1.5 text-xs font-bold uppercase text-white"
            >
              {t("Badge")}
            </Badge>

            <LandingTitle className="max-w-105 text-white">
              {t("Title")}
            </LandingTitle>

            <p className="mb-6 max-w-85 text-sm text-white/70 md:text-base">
              {t("Description")}
            </p>

            <MainButton href="/shop" label={t("PrimaryCta")} />
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              x: 10,
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
              duration: 0.55,
              delay: 0.06,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <Countdown
              targetDate="2026-08-14T23:59:59"
              labels={{
                eyebrow: t("Countdown.Eyebrow"),
                hours: t("Countdown.Hours"),
                minutes: t("Countdown.Minutes"),
                seconds: t("Countdown.Seconds"),
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
