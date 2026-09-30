import Hero from "@/components/landing/hero";
import HowItWorks from "@/components/landing/how-it-works";
import PerfectAddOns from "@/components/landing/perfect-add-ons";
import ShopTheMoment from "@/components/landing/shop-the-moment";
import BouquetBuilder from "@/components/landing/bouquet-builder";
import ShopByCategory from "@/components/landing/shop-by-category";
import SubscribeSection from "@/components/landing/subscribe-section";
import FeaturedCollections from "@/components/landing/featured-collections";
import TodayExclusiveOffers from "@/components/landing/today-exclusive-offers";
import DesignedByOurCustomers from "@/components/landing/designed-by-our-customers";
import { http } from "@/lib/http";
import type { HomePageSections } from "@/types/home-page";

export default async function Home() {
  const { data, ok } = await http.get<{ data: { sections: HomePageSections } }>(
    "/api/v1/pages/home",
  );

  if (!ok) {
    throw new Error("Failed to fetch home page content");
  }

  console.log(data);

  return (
    <main className="bg-[#f5f2ed]">
      <Hero section={data.data.sections.hero} />
      <ShopByCategory />
      <HowItWorks />
      <BouquetBuilder />
      <ShopTheMoment />
      <FeaturedCollections />
      <PerfectAddOns />
      <TodayExclusiveOffers />
      <DesignedByOurCustomers />
      <SubscribeSection />
    </main>
  );
}
