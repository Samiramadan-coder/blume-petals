import { getHomeSections } from "@/lib/common-requestes";
import Content from "@/components/occasions/content";

export default async function Page() {
  const homeSections = await getHomeSections();
  return <Content section={homeSections.shop_the_moment} />;
}
