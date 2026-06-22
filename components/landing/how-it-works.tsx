import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { getTranslations } from "next-intl/server";
import MainButton from "../ui/main-button";

const steps = [
  {
    id: 1,
    key: "ChooseShape",
    image: "/images/home/hero/bouquet-of-rose.png",
  },
  {
    id: 2,
    key: "PickFlowers",
    image: "/images/home/hero/bouquet-of-rose.png",
  },
  {
    id: 3,
    key: "FinishingTouches",
    image: "/images/home/hero/bouquet-of-rose.png",
  },
  {
    id: 4,
    key: "CraftAndDeliver",
    image: "/images/home/hero/bouquet-of-rose.png",
  },
] as const;

export default async function HowItWorks() {
  const t = await getTranslations("LandingHowItWorks");

  return (
    <div className="bg-border">
      <div className="container">
        <div className="py-20">
          <p className="text-xs font-semibold uppercase mb-3 text-secondary text-center">
            {t("Eyebrow")}
          </p>

          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-balance leading-tight text-foreground mb-12 text-center">
            {t("Title")}
          </h2>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step) => (
              <div key={step.id} className="relative">
                <Card className="border-transparent bg-transparent shadow-none py-0">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-[24px]">
                      <Image
                        src={step.image}
                        alt={t(`Steps.${step.key}.Title`)}
                        width={500}
                        height={500}
                        className="aspect-square w-full object-cover"
                      />

                      <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#d8c07f] text-sm font-semibold text-[#3d2e00]">
                        {step.id}
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="font-heading font-semibold text-lg text-foreground">
                        {t(`Steps.${step.key}.Title`)}
                      </h3>

                      <p className="text-sm leading-relaxed">
                        {t(`Steps.${step.key}.Description`)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <MainButton href="/builder" label={t("PrimaryCta")} />
          </div>
        </div>
      </div>
    </div>
  );
}
