import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import Hero from "@/components/landing/hero";
import MotionProvider from "@/providers/motion-provider";
import { getHomeSections } from "@/lib/common-requestes";
import HowItWorks from "@/components/landing/how-it-works";
import { getLocale, getTranslations } from "next-intl/server";
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
  const homeSections = await getHomeSections();

  return (
    <MotionProvider>
      <main className="bg-[#f5f2ed]">
        <Hero section={homeSections.hero} />
        <ShopByCategory section={homeSections.categories} />
        <HowItWorks section={homeSections.how_it_works} />
        <BouquetBuilder section={homeSections.bouquet_builder} />
        <ShopTheMoment section={homeSections.shop_the_moment} />
        <FeaturedCollections section={homeSections.our_selection} />
        <PerfectAddOns />
        <TodayExclusiveOffers />
        <DesignedByOurCustomers section={homeSections.real_creations} />
        <SubscribeSection />
      </main>
    </MotionProvider>
  );
}
