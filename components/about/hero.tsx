import { getLocale, getTranslations } from "next-intl/server";
import * as motion from "motion/react-client";
import { cn } from "@/lib/utils";

export default async function Hero() {
  const t = await getTranslations("AboutHero");
  const locale = await getLocale();

  return (
    <section className="relative min-h-[80svh]">
      <div className="absolute inset-0 bg-[url('/images/about/hero/rose.png')] bg-cover bg-center bg-no-repeat" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(230,220,210,0.5)_0%,rgba(230,220,210,0.78)_100%)]" />
      <div className="container absolute inset-0 flex flex-col items-center justify-center px-4 text-center sm:px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className={cn(
            "text-5xl md:text-6xl font-bold text-foreground mb-5 leading-tight text-balance max-w-156 text-center",
            { "font-heading": locale === "en" },
          )}
        >
          {t("Title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="text-base md:text-lg leading-relaxed text-pretty text-foreground/65 max-w-156 text-center"
        >
          {t("Description")}
        </motion.p>
      </div>
    </section>
  );
}
