import { http } from "@/lib/http";
import Hero from "@/components/landing/hero";
import type { HomePageSections } from "@/types/home-page";
import HowItWorks from "@/components/landing/how-it-works";
import PerfectAddOns from "@/components/landing/perfect-add-ons";
import ShopTheMoment from "@/components/landing/shop-the-moment";
import BouquetBuilder from "@/components/landing/bouquet-builder";
import ShopByCategory from "@/components/landing/shop-by-category";
import SubscribeSection from "@/components/landing/subscribe-section";
import FeaturedCollections from "@/components/landing/featured-collections";
import TodayExclusiveOffers from "@/components/landing/today-exclusive-offers";
import DesignedByOurCustomers from "@/components/landing/designed-by-our-customers";

export default async function Home() {
  const { data, ok } = await http.get<{ data: { sections: HomePageSections } }>(
    "/api/v1/pages/home",
  );

  if (!ok) {
    throw new Error("Failed to fetch home page content");
  }

  return (
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
  );
}
