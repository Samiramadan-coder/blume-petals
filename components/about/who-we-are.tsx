import Image from "next/image";
import * as motion from "motion/react-client";

import { getTranslations } from "next-intl/server";

import AboutTitle from "./about-title";
import AboutSubtitle from "./about-subtitle";

export default async function WhoWeAre() {
  const t = await getTranslations("AboutWhoWeAre");

  return (
    <section className="container max-w-7xl overflow-hidden">
      <div className="grid grid-cols-1 items-center gap-10 py-20 md:grid-cols-2 md:gap-20">
        <div>
          <AboutSubtitle>{t("Eyebrow")}</AboutSubtitle>

          <AboutTitle>{t("Title")}</AboutTitle>

          <motion.div
            initial={{
              opacity: 0,
              x: -8,
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
            className="max-w-137.5 space-y-5 text-[15px] leading-relaxed text-foreground/68"
          >
            <p>{t("Paragraph1")}</p>

            <p>{t("Paragraph2")}</p>

            <p>{t("Paragraph3")}</p>
          </motion.div>
        </div>

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
            amount: 0.2,
          }}
          transition={{
            duration: 0.6,
            delay: 0.05,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative"
        >
          <Image
            src="/images/about/who-we-are/who-we-are.webp"
            alt={t("ImageAlt")}
            width={500}
            height={500}
            className="aspect-square w-full rounded-4xl object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
