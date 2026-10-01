import Image from "next/image";
import { cn } from "@/lib/utils";
import MainButton from "../ui/main-button";
import LandingTitle from "./landing-title";
import * as motion from "motion/react-client";
import LandingSubtitle from "./landing-subtitle";
import { Card, CardContent } from "@/components/ui/card";
import { alternateX, reveal, stagger } from "@/lib/motion";
import type { HomePageSections } from "@/types/home-page";
import { getLocale, getTranslations } from "next-intl/server";

const images = [
  "/images/home/how-it-works/1.webp",
  "/images/home/how-it-works/2.webp",
  "/images/home/how-it-works/3.webp",
  "/images/home/how-it-works/4.webp",
];

export default async function HowItWorks({
  section,
}: {
  section: HomePageSections["how_it_works"];
}) {
  const t = await getTranslations("LandingHowItWorks");
  const locale = await getLocale();

  return (
    <section className="bg-border">
      <div className="container max-w-7xl">
        <div className="py-20">
          <LandingSubtitle className="text-center">
            {section.subtitle ?? t("Eyebrow")}
          </LandingSubtitle>

          <LandingTitle className="mx-auto max-w-112.5 text-center">
            {section.title ?? t("Title")}
          </LandingTitle>

          <ol className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {section.items.map((step, index) => (
              <motion.li
                key={index}
                {...reveal({
                  x: alternateX(index),
                  delay: stagger(index),
                  amount: 0.15,
                })}
                className="relative"
              >
                <Card className="group border-transparent bg-transparent py-0 shadow-none">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-[24px]">
                      <Image
                        src={step.image ?? images[index]}
                        alt=""
                        width={500}
                        height={500}
                        sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                        className="aspect-square w-full object-cover"
                      />

                      <div className="absolute inset-s-4 top-4 flex size-10 items-center justify-center rounded-full bg-[#d8c07f] text-sm font-semibold text-[#3d2e00]">
                        {index + 1}
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3
                        className={cn("text-lg font-semibold text-foreground", {
                          "font-heading": locale === "en",
                        })}
                      >
                        {step.title}
                      </h3>

                      <p className="text-sm leading-relaxed text-[#6b5b45]">
                        {step.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.li>
            ))}
          </ol>

          <motion.div
            {...reveal({ y: 8, delay: 0.12, amount: 0.5 })}
            className="mt-8 text-center"
          >
            <MainButton href="/builder" label={t("PrimaryCta")} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
