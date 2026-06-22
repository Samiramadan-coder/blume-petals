import Hero from "@/components/landing/hero";
import HowItWorks from "@/components/landing/how-it-works";
import ShopByCategory from "@/components/landing/shop-by-category";

export default async function Home() {
  return (
    <main>
      <Hero />
      <ShopByCategory />
      <HowItWorks />
    </main>
  );
}
