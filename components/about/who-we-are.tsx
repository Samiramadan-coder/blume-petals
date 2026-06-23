import Image from "next/image";
import { getTranslations } from "next-intl/server";

export default async function WhoWeAre() {
  const t = await getTranslations("AboutWhoWeAre");

  return (
    <div className="container max-w-7xl">
      <div className="py-20 grid grid-cols-1 md:grid-cols-2 items-center gap-10 md:gap-20">
        <div>
          <p className="text-xs font-semibold uppercase mb-3 tracking-[0.3em] text-primary">
            {t("Eyebrow")}
          </p>

          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-balance leading-tight text-foreground mb-8">
            {t("Title")}
          </h2>

          <div className="text-foreground/68 leading-relaxed text-[15px] max-w-137.5 space-y-5">
            <p>{t("Paragraph1")}</p>
            <p>{t("Paragraph2")}</p>
            <p>{t("Paragraph3")}</p>
          </div>
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
