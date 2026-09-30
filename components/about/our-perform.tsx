import { cn } from "@/lib/utils";
import AboutTitle from "./about-title";
import AboutSubtitle from "./about-subtitle";
import * as motion from "motion/react-client";
import { Card, CardContent } from "../ui/card";
import { AboutPageSections } from "@/types/home-page";
import { getLocale, getTranslations } from "next-intl/server";
import { Clock3, PackageCheck, SlidersHorizontal } from "lucide-react";

const icons = [Clock3, SlidersHorizontal, PackageCheck];

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

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {section.items.map(({ description, icon, title }, index) => {
              const Icon = icons[index];

              return (
                <motion.div
                  key={index}
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
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="h-full"
                >
                  <Card className="h-full border border-border p-8 shadow-sm">
                    <CardContent className="flex h-full flex-col items-center gap-4 p-0">
                      <div className="grid size-14 place-items-center rounded-full bg-border">
                        <Icon className="size-6 text-foreground" />
                      </div>

                      <h4
                        className={cn(
                          "text-center text-xl font-bold text-foreground",
                          {
                            "font-heading": locale === "en",
                          },
                        )}
                      >
                        {title}
                      </h4>

                      <p className="text-center text-sm leading-relaxed text-foreground/60">
                        {description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
