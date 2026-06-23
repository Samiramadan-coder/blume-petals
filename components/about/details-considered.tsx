import AppLogo from "../reusable/app-logo";
import { getTranslations } from "next-intl/server";

export default async function DetailsConsidered() {
  const t = await getTranslations("AboutDetailsConsidered");

  return (
    <div className="bg-border">
      <div className="container max-w-7xl">
        <div className="py-20 flex flex-col items-center gap-6 text-center">
          <AppLogo width={120} />
          <p className="text-sm italic text-foreground/50">{t("Statement")}</p>
          <div className="flex items-center gap-6 flex-wrap justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full shadow-md border-2 border-white bg-primary"></div>
              <span className="text-[11px] font-medium text-foreground/50">
                {t("Palette.Gold")}
              </span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full shadow-md border-2 border-white bg-[#7d947b]"></div>
              <span className="text-[11px] font-medium text-foreground/50">
                {t("Palette.Sage")}
              </span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full shadow-md border-2 border-white bg-border"></div>
              <span className="text-[11px] font-medium text-foreground/50">
                {t("Palette.Beige")}
              </span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full shadow-md border-2 border-white bg-[#ed8074]"></div>
              <span className="text-[11px] font-medium text-foreground/50">
                {t("Palette.Terracotta")}
              </span>
            </div>
          </div>
          <p className="text-xs text-foreground/40 tracking-wide">
            {t("Caption")}
          </p>
        </div>
      </div>
    </div>
  );
}
