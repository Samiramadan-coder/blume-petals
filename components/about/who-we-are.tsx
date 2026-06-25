import Image from "next/image";
import { getTranslations } from "next-intl/server";
import * as motion from "motion/react-client";
import AboutTitle from "./about-title";
import AboutSubtitle from "./about-subtitle";

export default async function WhoWeAre() {
  const t = await getTranslations("AboutWhoWeAre");

  return (
    <div className="container max-w-7xl">
      <div className="py-20 grid grid-cols-1 md:grid-cols-2 items-center gap-10 md:gap-20">
        <div>
          <AboutSubtitle>{t("Eyebrow")}</AboutSubtitle>

          <AboutTitle>{t("Title")}</AboutTitle>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.2 }}
            className="text-foreground/68 leading-relaxed text-[15px] max-w-137.5 space-y-5"
          >
            <p>{t("Paragraph1")}</p>
            <p>{t("Paragraph2")}</p>
            <p>{t("Paragraph3")}</p>
          </motion.div>
        </div>

        <div className="relative">
          <Image
            src="/images/about/who-we-are/who-we-are.png"
            alt={t("ImageAlt")}
            width={500}
            height={500}
            className="aspect-square w-full object-cover rounded-4xl"
          />
        </div>
      </div>
    </div>
  );
}
