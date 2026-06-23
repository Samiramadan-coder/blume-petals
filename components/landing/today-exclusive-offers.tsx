import { Badge } from "../ui/badge";
import { Countdown } from "./count-down";
import { getTranslations } from "next-intl/server";
import MainButton from "../ui/main-button";

export default async function TodayExclusiveOffers() {
  const t = await getTranslations("LandingTodayExclusiveOffers");

  return (
    <div className="bg-[url('/images/home/today-exclusive-offers/rose.png')] bg-cover bg-center bg-no-repeat">
      <div className="container">
        <div className="py-20 flex items-center justify-center md:justify-between flex-wrap gap-10">
          <div>
            <Badge
              variant="ghost"
              className="bg-[#ed8074] text-xs font-bold uppercase text-white mb-4 px-4 py-1.5"
            >
              {t("Badge")}
            </Badge>
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-white text-balance leading-tight mb-4 max-w-105">
              {t("Title")}
            </h2>
            <p className="text-sm md:text-base mb-6 text-white/70 max-w-85">
              {t("Description")}
            </p>

            <MainButton href="/builder" label={t("PrimaryCta")} />
          </div>

          <Countdown
            targetDate="2026-06-25T23:59:59"
            labels={{
              eyebrow: t("Countdown.Eyebrow"),
              hours: t("Countdown.Hours"),
              minutes: t("Countdown.Minutes"),
              seconds: t("Countdown.Seconds"),
            }}
          />
        </div>
      </div>
    </div>
  );
}
