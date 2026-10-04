import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import Hero from "@/components/about/hero";
import WhoWeAre from "@/components/about/who-we-are";
import GetStarted from "@/components/about/get-started";
import OurPerform from "@/components/about/our-perform";
import MotionProvider from "@/providers/motion-provider";
import { getAboutSections } from "@/lib/common-requestes";
import { getLocale, getTranslations } from "next-intl/server";
import DetailsConsidered from "@/components/about/details-considered";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("Metadata.About");

  return buildPageMetadata({
    locale,
    pathname: "/about",
    title: t("Title"),
    description: t("Description"),
    absoluteTitle: true,
    image: {
      url: "/images/about/hero/rose.webp",
      width: 1024,
      height: 1024,
      alt: t("ImageAlt"),
    },
  });
}

export default async function AboutPage() {
  const aboutSections = await getAboutSections();

  return (
    <MotionProvider>
      <main>
        <Hero section={aboutSections.hero} />
        <WhoWeAre section={aboutSections.who_we_are} />
        <OurPerform section={aboutSections.our_promise} />
        <DetailsConsidered />
        <GetStarted />
      </main>
    </MotionProvider>
  );
}
