import { getTranslations } from "next-intl/server";

export default async function Hero() {
  const t = await getTranslations("AboutHero");

  return (
    <section className="relative min-h-[80svh]">
      <div className="absolute inset-0 bg-[url('/images/about/hero/rose.png')] bg-cover bg-center bg-no-repeat" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(230,220,210,0.5)_0%,rgba(230,220,210,0.78)_100%)]" />
      <div className="container absolute inset-0 flex flex-col items-center justify-center px-4 text-center sm:px-6">
        <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-5 leading-tight text-balance max-w-156 text-center">
          {t("Title")}
        </h1>
        <p className="text-base md:text-lg leading-relaxed text-pretty text-foreground/65 max-w-156 text-center">
          {t("Description")}
        </p>
      </div>
    </section>
  );
}
