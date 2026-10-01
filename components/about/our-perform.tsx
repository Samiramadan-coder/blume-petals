import Image from "next/image";
import { cn } from "@/lib/utils";
import AboutTitle from "./about-title";
import AboutSubtitle from "./about-subtitle";
import * as motion from "motion/react-client";
import { Card, CardContent } from "../ui/card";
import { AboutPageSections } from "@/types/home-page";
import { alternateX, reveal, stagger } from "@/lib/motion";
import { getLocale, getTranslations } from "next-intl/server";

export default async function OurPerform({
  section,
}: {
  section: AboutPageSections["our_promise"];
}) {
  const t = await getTranslations("AboutOurPromise");
  const locale = await getLocale();

  return (
    <section className="bg-[#f7f3ee]">
      <div className="container max-w-5xl">
        <div className="py-20">
          <AboutSubtitle className="text-center">
            {section.subtitle ?? t("Eyebrow")}
          </AboutSubtitle>

          <AboutTitle className="text-center">
            {section.title ?? t("Title")}
          </AboutTitle>

          <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {section.items.map(({ description, icon, title }, index) => {
              return (
                <motion.li
                  key={index}
                  {...reveal({
                    x: alternateX(index),
                    delay: stagger(index),
                  })}
                  className="h-full"
                >
                  <Card className="h-full border border-border p-8 shadow-sm">
                    <CardContent className="flex h-full flex-col items-center gap-4 p-0">
                      <div className="grid size-14 place-items-center rounded-full bg-border">
                        {icon && (
                          <Image src={icon} alt="" width={24} height={24} />
                        )}
                      </div>

                      <h3
                        className={cn(
                          "text-center text-xl font-bold text-foreground",
                          {
                            "font-heading": locale === "en",
                          },
                        )}
                      >
                        {title}
                      </h3>

                      <p className="text-center text-sm leading-relaxed text-foreground/60">
                        {description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
