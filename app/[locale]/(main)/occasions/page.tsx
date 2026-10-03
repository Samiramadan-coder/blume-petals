import { http } from "@/lib/http";
import { HomePageSections } from "@/types/home-page";
import ShopTheMoment from "@/components/landing/shop-the-moment";

export default async function Page() {
  const { data, ok } = await http.get<{ data: { sections: HomePageSections } }>(
    "/api/v1/pages/home",
  );

  if (!ok) {
    throw new Error("Failed to fetch home page content");
  }

  return <ShopTheMoment section={data.data.sections.shop_the_moment} />;
}
