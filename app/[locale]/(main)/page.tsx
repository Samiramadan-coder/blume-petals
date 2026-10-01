import type { Metadata } from "next";
import { http } from "@/lib/http";
import { buildPageMetadata } from "@/lib/seo";
import Hero from "@/components/landing/hero";
import MotionProvider from "@/providers/motion-provider";
import type { HomePageSections } from "@/types/home-page";
import { getLocale, getTranslations } from "next-intl/server";
import HowItWorks from "@/components/landing/how-it-works";
import PerfectAddOns from "@/components/landing/perfect-add-ons";
import ShopTheMoment from "@/components/landing/shop-the-moment";
import BouquetBuilder from "@/components/landing/bouquet-builder";
import ShopByCategory from "@/components/landing/shop-by-category";
import SubscribeSection from "@/components/landing/subscribe-section";
import FeaturedCollections from "@/components/landing/featured-collections";
import TodayExclusiveOffers from "@/components/landing/today-exclusive-offers";
import DesignedByOurCustomers from "@/components/landing/designed-by-our-customers";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("Metadata.Home");

  return buildPageMetadata({
    locale,
    pathname: "/",
    title: t("Title"),
    description: t("Description"),
    absoluteTitle: true,
    image: {
      url: "/images/home/hero/bouquet-of-rose.webp",
      width: 1024,
      height: 1024,
      alt: t("ImageAlt"),
    },
  });
}

export default async function Home() {
  const { data, ok } = await http.get<{ data: { sections: HomePageSections } }>(
    "/api/v1/pages/home",
  );

  if (!ok) {
    throw new Error("Failed to fetch home page content");
  }

  return (
    <MotionProvider>
      <main className="bg-[#f5f2ed]">
        <Hero section={data.data.sections.hero} />
        <ShopByCategory section={data.data.sections.categories} />
        <HowItWorks section={data.data.sections.how_it_works} />
        <BouquetBuilder section={data.data.sections.bouquet_builder} />
        <ShopTheMoment section={data.data.sections.shop_the_moment} />
        <FeaturedCollections section={data.data.sections.our_selection} />
        <PerfectAddOns />
        <TodayExclusiveOffers />
        <DesignedByOurCustomers section={data.data.sections.real_creations} />
        <SubscribeSection />
      </main>
    </MotionProvider>
  );
}
