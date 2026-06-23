import { Link } from "@/i18n/navigation";
import { Button } from "../ui/button";
import { getTranslations } from "next-intl/server";
import MainButton from "../ui/main-button";

export default async function Hero() {
  const t = await getTranslations("LandingHero");

  return (
    <section className="relative h-screen">
      <div className="absolute inset-0 bg-[url('/images/home/hero/bouquet-of-rose.png')] bg-cover bg-center bg-no-repeat"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(20,12,0,0.82)_0%,rgba(20,12,0,0.4)_40%,rgba(20,12,0,0.05)_70%,transparent_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(20,12,0,0.5)_0%,rgba(20,12,0,0.1)_50%,transparent_100%)]" />
      <div className="absolute inset-0 flex items-end">
        <div className="container max-w-7xl pb-12">
          <p className="uppercase text-xs text-primary mb-5">{t("Eyebrow")}</p>
          <h1 className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl leading-[1.05] max-w-xl mb-5 text-white">
            {t("Title")}
          </h1>
          <p className="text-base md:text-lg leading-relaxed text-white/80 mb-8">
            {t("Description")}
          </p>
          <div className="flex gap-4 mb-8">
            <MainButton href="/builder" label={t("PrimaryCta")} />
            <Link href="/shop">
              <Button
                variant="ghost"
                className="rounded-full h-12 w-44 text-white hover:bg-transparent hover:text-white underline underline-offset-8 cursor-pointer"
              >
                {t("SecondaryCta")}
              </Button>
            </Link>
          </div>
          <p className="text-xs text-white/65">{t("Stats")}</p>
        </div>
      </div>
    </section>
  );
}
