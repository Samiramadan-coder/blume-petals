import { getLocale, getTranslations } from "next-intl/server";
import * as motion from "motion/react-client";

import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    x: -8,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export default async function Hero() {
  const t = await getTranslations("AboutHero");
  const locale = await getLocale();

  return (
    <section className="relative min-h-[80svh] overflow-hidden">
      <div className="absolute inset-0 scale-[1.02] bg-[url('/images/about/hero/rose.webp')] bg-cover bg-center bg-no-repeat animate-hero-zoom" />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(230,220,210,0.5)_0%,rgba(230,220,210,0.78)_100%)]" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="container absolute inset-0 flex flex-col items-center justify-center px-4 text-center sm:px-6"
      >
        <motion.h1
          variants={itemVariants}
          className={cn(
            "mb-5 max-w-156 text-balance text-center text-5xl font-bold leading-tight text-foreground md:text-6xl",
            {
              "font-heading": locale === "en",
            },
          )}
        >
          {t("Title")}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="max-w-156 text-pretty text-center text-base leading-relaxed text-foreground/65 md:text-lg"
        >
          {t("Description")}
        </motion.p>
      </motion.div>
    </section>
  );
}
