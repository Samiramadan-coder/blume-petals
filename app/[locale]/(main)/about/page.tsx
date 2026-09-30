import { http } from "@/lib/http";
import Hero from "@/components/about/hero";
import { getTranslations } from "next-intl/server";
import WhoWeAre from "@/components/about/who-we-are";
import { AboutPageSections } from "@/types/home-page";
import GetStarted from "@/components/about/get-started";
import OurPerform from "@/components/about/our-perform";
import DetailsConsidered from "@/components/about/details-considered";

export async function generateMetadata() {
  const t = await getTranslations("AboutHero");
  return {
    title: t("About"),
  };
}

export default async function AboutPage() {
  const { data, ok } = await http.get<{
    data: { sections: AboutPageSections };
  }>("/api/v1/pages/about");

  if (!ok) {
    throw new Error("Failed to fetch home page content");
  }

  console.log(data);

  return (
    <div>
      <Hero section={data.data.sections.hero} />
      <WhoWeAre section={data.data.sections.who_we_are} />
      <OurPerform section={data.data.sections.our_promise} />
      <DetailsConsidered />
      <GetStarted />
    </div>
  );
}
