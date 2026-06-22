import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

const features = [
  {
    key: "ChooseShape",
    icon: "❋",
  },
  {
    key: "SelectStem",
    icon: "⊕",
  },
  {
    key: "PickWrapping",
    icon: "⊛",
  },
  {
    key: "AddMessage",
    icon: "✉",
  },
] as const;

export default async function BouquetBuilder() {
  const t = await getTranslations("LandingBouquetBuilder");

  return (
    <div>
      <div className="container">
        <div className="py-20 grid grid-cols-1 md:grid-cols-2 items-center gap-14">
          <div className="relative">
            <Image
              src="/images/home/bouquet-builder/bouquet-builder.png"
              alt="bouquet builder"
              width={500}
              height={500}
              className="aspect-square w-full object-cover rounded-4xl"
            />
            <div className="absolute -bottom-5 -inset-e-5 bg-primary py-4 px-5 rounded-2xl shadow-[0_8px_32px_rgba(203,182,130,0.4)]">
              <p className="text-xs font-semibold uppercase tracking-wider">
                {t("CardEyebrow")}
              </p>
              <p className="font-heading font-bold text-2xl">
                {t("CardTitle")}
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase mb-3 text-secondary">
              {t("Eyebrow")}
            </p>

            <h2 className="font-heading font-bold text-4xl lg:text-5xl text-balance leading-tight text-foreground">
              {t("Title")}
            </h2>

            <p className="text-base leading-relaxed mt-5 mb-10 max-w-100">
              {t("Description")}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              {features.map((feature) => (
                <div key={feature.key} className="flex items-start gap-4">
                  <div className="bg-border w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-base">
                    {feature.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {t(`Features.${feature.key}.Title`)}
                    </p>
                    <p className="text-xs leading-relaxed mt-0.5 max-w-60.5">
                      {t(`Features.${feature.key}.Description`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/builder">
              <Button
                variant="default"
                className="rounded-full h-12 w-44 bg-secondary text-secondary-foreground hover:bg-secondary cursor-pointer"
              >
                {t("PrimaryCta")}
                <ArrowRight />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
