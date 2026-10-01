import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import * as motion from "motion/react-client";

import { cn } from "@/lib/utils";
import { AboutPageSections } from "@/types/home-page";
import { heroContainerVariants, heroItemVariants } from "@/lib/motion";

export default async function Hero({
  section,
}: {
  section: AboutPageSections["hero"];
}) {
  const t = await getTranslations("AboutHero");
  const locale = await getLocale();

  return (
    <section className="relative isolate flex min-h-[80svh] items-center justify-center overflow-hidden">
      <Image
        src="/images/about/hero/rose.webp"
        alt=""
        fill
        preload
        fetchPriority="high"
        sizes="100vw"
        className="-z-20 scale-[1.02] object-cover object-center animate-hero-zoom"
      />

      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(230,220,210,0.5)_0%,rgba(230,220,210,0.78)_100%)]" />

      <motion.div
        variants={heroContainerVariants}
        initial="hidden"
        animate="show"
        className="container flex flex-col items-center py-20 text-center"
      >
        <h1
          className={cn(
            "mb-5 max-w-156 text-balance text-center text-5xl font-bold leading-tight text-foreground md:text-6xl",
            {
              "font-heading": locale === "en",
            },
          )}
        >
          {section.title ?? t("Title")}
        </h1>

        <motion.p
          variants={heroItemVariants}
          className="max-w-156 text-pretty text-center text-base leading-relaxed text-foreground/65 md:text-lg"
        >
          {section.subtitle ?? t("Description")}
        </motion.p>
      </motion.div>
    </section>
  );
}
