import Image from "next/image";
import { cn } from "@/lib/utils";
import MainButton from "../ui/main-button";
import LandingTitle from "./landing-title";
import * as motion from "motion/react-client";
import LandingSubtitle from "./landing-subtitle";
import { alternateX, reveal, stagger } from "@/lib/motion";
import type { HomePageSections } from "@/types/home-page";
import { getLocale, getTranslations } from "next-intl/server";

export default async function BouquetBuilder({
  section,
}: {
  section: HomePageSections["bouquet_builder"];
}) {
  const t = await getTranslations("LandingBouquetBuilder");
  const locale = await getLocale();

  return (
    <section>
      <div className="container max-w-7xl overflow-hidden">
        <div className="grid grid-cols-1 items-center gap-14 py-20 md:grid-cols-2">
          <motion.div {...reveal({ x: -10 })} className="relative">
            <Image
              src="/images/home/bouquet-builder/bouquet-builder.webp"
              alt={t("ImageAlt")}
              width={500}
              height={500}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="aspect-square w-full rounded-4xl object-cover"
            />

            <motion.div
              {...reveal({ y: 8, delay: 0.12, amount: 0.3 })}
              className="absolute -bottom-5 -inset-e-3 rounded-2xl bg-primary px-5 py-4 shadow-[0_8px_32px_rgba(203,182,130,0.4)] sm:-inset-e-5"
            >
              <p className="text-xs font-semibold uppercase tracking-wider">
                {t("CardEyebrow")}
              </p>

              <p
                className={cn(
                  "text-2xl font-bold",
                  locale === "en" && "font-heading",
                )}
              >
                {t("CardTitle")}
              </p>
            </motion.div>
          </motion.div>

          <div>
            <LandingSubtitle>
              {section.subtitle ?? t("Eyebrow")}
            </LandingSubtitle>

            <LandingTitle className="mb-0">
              <span
                dangerouslySetInnerHTML={{
                  __html: section.title ?? t("Title"),
                }}
              />
            </LandingTitle>

            <motion.p
              {...reveal({ x: 10, amount: 0.3 })}
              className="my-5 max-w-100 text-base leading-relaxed text-[#6b5b45]"
            >
              {section.description ?? t("Description")}
            </motion.p>

            <ul className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {section.items.map((feature, index) => (
                <motion.li
                  key={index}
                  {...reveal({
                    x: alternateX(index),
                    delay: stagger(index),
                    amount: 0.25,
                  })}
                  className="flex items-start gap-4"
                >
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-border text-base">
                    {feature.icon && (
                      <Image src={feature.icon} alt="" width={16} height={16} />
                    )}
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      {feature.title}
                    </h3>

                    <p className="mt-0.5 max-w-60.5 text-xs leading-relaxed text-[#6b5b45]">
                      {feature.subtitle}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>

            <motion.div {...reveal({ y: 8, delay: 0.12, amount: 0.4 })}>
              <MainButton href="/builder" label={t("PrimaryCta")} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
