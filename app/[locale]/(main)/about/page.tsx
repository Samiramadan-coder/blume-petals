import DetailsConsidered from "@/components/about/details-considered";
import Hero from "@/components/about/hero";
import OurPerform from "@/components/about/our-perform";
import WhoWeAre from "@/components/about/who-we-are";

export default function AboutPage() {
  return (
    <div>
      <Hero />
      <WhoWeAre />
      <OurPerform />
      <DetailsConsidered />
    </div>
  );
}
