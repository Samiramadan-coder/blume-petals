import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Link } from "@/i18n/navigation";
import MainButton from "../ui/main-button";
import * as motion from "motion/react-client";
import { HomePageSections } from "@/types/home-page";
import { getLocale, getTranslations } from "next-intl/server";
import { heroContainerVariants, heroItemVariants } from "@/lib/motion";

export default async function Hero({
  section,
}: {
  section: HomePageSections["hero"];
}) {
  const locale = await getLocale();
  const t = await getTranslations("LandingHero");

  return (
    <section className="relative isolate min-h-svh overflow-hidden">
      <Image
        src={section.image ?? "/images/home/hero/bouquet-of-rose.webp"}
        alt=""
        fill
        preload
        fetchPriority="high"
        sizes="100vw"
        className="absolute inset-0 -z-30 object-cover object-center animate-hero-zoom"
      />

      <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_top,rgba(20,12,0,0.82)_0%,rgba(20,12,0,0.4)_40%,rgba(20,12,0,0.05)_70%,transparent_100%)]" />

      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(20,12,0,0.5)_0%,rgba(20,12,0,0.1)_50%,transparent_100%)]" />

      <div className="flex min-h-svh items-end">
        <motion.div
          variants={heroContainerVariants}
          initial="hidden"
          animate="show"
          className="container max-w-7xl pb-16 pt-28 md:pb-20"
        >
          <motion.p
            variants={heroItemVariants}
            className="mb-5 text-xs font-semibold uppercase tracking-[0.25rem] text-primary"
          >
            {section.subtitle ?? t("Eyebrow")}
          </motion.p>

          <h1
            className={cn(
              "mb-5 max-w-xl text-balance text-5xl font-bold leading-[1.05] text-white md:text-6xl lg:text-7xl",
              {
                "font-heading": locale === "en",
              },
            )}
          >
            {section.title ?? t("Title")}
          </h1>

          <motion.p
            variants={heroItemVariants}
            className="mb-8 max-w-105 text-base leading-relaxed text-white/82 md:text-lg"
          >
            {section.description ?? t("Description")}
          </motion.p>

          <motion.div
            variants={heroItemVariants}
            className="mb-8 flex flex-wrap items-center gap-4"
          >
            <MainButton href="/builder" label={t("PrimaryCta")} />

            <Button
              asChild
              variant="ghost"
              className="h-12 cursor-pointer rounded-full px-0 text-white underline underline-offset-8 hover:bg-transparent hover:text-white"
            >
              <Link href="/shop">{t("SecondaryCta")}</Link>
            </Button>
          </motion.div>

          <motion.p
            variants={heroItemVariants}
            className="text-xs text-white/65"
          >
            {t("Stats")}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
