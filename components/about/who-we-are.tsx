import Image from "next/image";
import * as motion from "motion/react-client";

import { reveal } from "@/lib/motion";
import { getTranslations } from "next-intl/server";
import { AboutPageSections } from "@/types/home-page";

import AboutTitle from "./about-title";
import AboutSubtitle from "./about-subtitle";

const WHO_WE_ARE_FALLBACK_IMAGE = "/images/about/who-we-are/who-we-are.webp";

export default async function WhoWeAre({
  section,
}: {
  section: AboutPageSections["who_we_are"];
}) {
  const t = await getTranslations("AboutWhoWeAre");

  const imageSrc = section.image || WHO_WE_ARE_FALLBACK_IMAGE;

  return (
    <section className="container max-w-7xl overflow-hidden">
      <div className="grid grid-cols-1 items-center gap-10 py-20 md:grid-cols-2 md:gap-20">
        <div>
          <AboutSubtitle>{section.subtitle ?? t("Eyebrow")}</AboutSubtitle>

          <AboutTitle>{section.title ?? t("Title")}</AboutTitle>

          <motion.div
            {...reveal({ x: -10, amount: 0.25 })}
            className="max-w-137.5 space-y-5 text-[15px] leading-relaxed text-foreground/68"
            dangerouslySetInnerHTML={{
              __html: section.description || "",
            }}
          />
        </div>

        <motion.div {...reveal({ x: 10, delay: 0.06 })} className="relative">
          <Image
            src={imageSrc}
            alt={t("ImageAlt")}
            width={500}
            height={500}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="aspect-square w-full rounded-4xl object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
