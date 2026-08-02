import { Separator } from "../ui/separator";
import { tabs } from "@/constants/shop-page";
import Reviews from "./product-info/reviews";
import { getTranslations } from "next-intl/server";
import { Delivery } from "./product-info/delivery";
import { Description } from "./product-info/description";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ProductDetails as ProductDetailsType } from "@/types/products";

export default async function ProductInfo({
  product,
  reviewCurrentPage,
}: {
  product: ProductDetailsType;
  reviewCurrentPage?: string;
}) {
  const t = await getTranslations("Shop");

  return (
    <div className="md:col-span-2">
      <Tabs defaultValue="description" className="gap-0">
        <TabsList variant="line" className="h-16! space-x-6 ">
          {tabs(t).map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="text-base px-0 cursor-pointer data-[state=active]:after:bg-primary! data-[state=active]:text-primary!"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <Separator className="mb-6" />

        <TabsContent value="description">
          <Description description={product.description} />
        </TabsContent>
        <TabsContent value="reviews">
          <Reviews slug={product.slug} reviewCurrentPage={reviewCurrentPage} />
        </TabsContent>
        <TabsContent value="delivery">
          <Delivery />
        </TabsContent>
      </Tabs>
    </div>
  );
}
