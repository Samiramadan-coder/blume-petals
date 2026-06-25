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

export default async function Home() {
  return (
    <main>
      <Hero />
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
