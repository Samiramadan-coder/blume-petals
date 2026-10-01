import type { Metadata } from "next";
import { http } from "@/lib/http";
import { buildPageMetadata } from "@/lib/seo";
import Hero from "@/components/about/hero";
import WhoWeAre from "@/components/about/who-we-are";
import { AboutPageSections } from "@/types/home-page";
import GetStarted from "@/components/about/get-started";
import OurPerform from "@/components/about/our-perform";
import MotionProvider from "@/providers/motion-provider";
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
  const { data, ok } = await http.get<{
    data: { sections: AboutPageSections };
  }>("/api/v1/pages/about");

  if (!ok) {
    throw new Error("Failed to fetch home page content");
  }

  return (
    <MotionProvider>
      <main>
        <Hero section={data.data.sections.hero} />
        <WhoWeAre section={data.data.sections.who_we_are} />
        <OurPerform section={data.data.sections.our_promise} />
        <DetailsConsidered />
        <GetStarted />
      </main>
    </MotionProvider>
  );
}
