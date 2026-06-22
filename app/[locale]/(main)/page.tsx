import BouquetBuilder from "@/components/landing/bouquet-builder";
import FeaturedCollections from "@/components/landing/featured-collections";
import Hero from "@/components/landing/hero";
import HowItWorks from "@/components/landing/how-it-works";
import PerfectAddOns from "@/components/landing/perfect-add-ons";
import ShopByCategory from "@/components/landing/shop-by-category";
import ShopTheMoment from "@/components/landing/shop-the-moment";
import TodayExclusiveOffers from "@/components/landing/today-exclusive-offers";

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
    </main>
  );
}
