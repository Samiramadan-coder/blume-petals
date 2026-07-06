import Image from "next/image";
import { Button } from "../ui/button";
import { Link } from "@/i18n/navigation";
import MainButton from "../ui/main-button";
import { getTranslations } from "next-intl/server";
import * as motion from "motion/react-client";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
    },
  },
};

export default async function Hero() {
  const t = await getTranslations("LandingHero");

  return (
    <section className="relative isolate min-h-svh overflow-hidden">
      <Image
        src="/images/home/hero/bouquet-of-rose.png"
        alt="Bouquet of rose"
        fill
        priority
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 85vw, 75vw"
        className="absolute inset-0 -z-30 object-cover object-center animate-hero-zoom"
      />

      <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_top,rgba(20,12,0,0.82)_0%,rgba(20,12,0,0.4)_40%,rgba(20,12,0,0.05)_70%,transparent_100%)]" />

      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(20,12,0,0.5)_0%,rgba(20,12,0,0.1)_50%,transparent_100%)]" />

      <div className="flex min-h-svh items-end">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="container max-w-7xl pb-16 md:pb-20"
        >
          <motion.p
            variants={itemVariants}
            className="mb-5 text-xs uppercase tracking-wide text-primary"
          >
            {t("Eyebrow")}
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="mb-5 max-w-xl font-heading text-5xl font-bold leading-[1.05] text-white md:text-6xl lg:text-7xl"
          >
            {t("Title")}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mb-8 max-w-xl text-base leading-relaxed text-white/80 md:text-lg"
          >
            {t("Description")}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mb-8 flex flex-wrap items-center gap-4"
          >
            <MainButton href="/builder" label={t("PrimaryCta")} />

            <Button
              asChild
              variant="ghost"
              className="h-12 w-44 cursor-pointer rounded-full text-white underline underline-offset-8 hover:bg-transparent hover:text-white"
            >
              <Link href="/shop">{t("SecondaryCta")}</Link>
            </Button>
          </motion.div>

          <motion.p variants={itemVariants} className="text-xs text-white/65">
            {t("Stats")}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
