import Image from "next/image";
import * as motion from "motion/react-client";

import { Card, CardContent } from "@/components/ui/card";

import { cn } from "@/lib/utils";

import MainButton from "../ui/main-button";
import LandingSubtitle from "./landing-subtitle";
import LandingTitle from "./landing-title";

import { reviews } from "@/constants/home-page";
import { getTranslations } from "next-intl/server";

const rotations = [
  "-rotate-2",
  "rotate-1",
  "-rotate-1",
  "rotate-2",
  "-rotate-2",
];

export default async function DesignedByOurCustomers() {
  const t = await getTranslations("LandingDesignedByOurCustomers");

  return (
    <section className="overflow-hidden bg-[#faf8f5]">
      <div className="container max-w-7xl">
        <div className="py-20">
          <LandingSubtitle className="text-center">
            {t("Eyebrow")}
          </LandingSubtitle>

          <LandingTitle className="mb-6 text-center">{t("Title")}</LandingTitle>

          <motion.p
            initial={{
              opacity: 0,
              y: 8,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.4,
            }}
            transition={{
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mx-auto mb-12 mt-4 max-w-100 text-center text-sm md:text-base"
          >
            {t("Description")}
          </motion.p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {reviews.map((review, index) => (
              <motion.div
                key={review.name}
                initial={{
                  opacity: 0,
                  x: index % 2 === 0 ? -8 : 8,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Card
                  className={cn(
                    "p-0 pb-8 shadow-[0_8px_30px_rgba(61,46,0,0.08)] transition-transform duration-300 ease-out hover:rotate-0",
                    rotations[index % rotations.length],
                  )}
                >
                  <CardContent className="p-3">
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={review.image}
                        alt={review.name}
                        fill
                        sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  </CardContent>
                </Card>

                <div className="pt-4 text-center">
                  <h3 className="text-sm font-semibold text-foreground">
                    {review.name}
                  </h3>

                  <p className="text-[11px]">{t("CardCaption")}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{
              opacity: 0,
              y: 6,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.5,
            }}
            transition={{
              duration: 0.45,
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-8 text-center"
          >
            <MainButton href="/builder" label={t("PrimaryCta")} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
