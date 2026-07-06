import OrderCard from "./order-card";
import { getTranslations } from "next-intl/server";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import PageTitle from "../shared/page-title";

const filters = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Processing", value: "processing" },
  { label: "Shipped", value: "shipped" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
];

export default async function Orders() {
  const t = await getTranslations("Account.Orders");

  return (
    <>
      <PageTitle title={t("Title")} />

      <Tabs defaultValue="all">
        <TabsList className="mb-6 bg-transparent flex-wrap h-auto! gap-2">
          {filters.map((filter) => (
            <TabsTrigger
              key={filter.value}
              value={filter.value}
              className="text-base text-foreground h-10 px-5 rounded-full shadow-none! bg-primary/20! cursor-pointer data-[state=active]:bg-primary!"
            >
              {filter.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="all">
          <div className="space-y-5">
            <OrderCard />
            <OrderCard />
          </div>
        </TabsContent>
        <TabsContent value="pending">
          <OrderCard />
        </TabsContent>
        <TabsContent value="processing">
          <OrderCard />
        </TabsContent>
        <TabsContent value="shipped">
          <OrderCard />
        </TabsContent>
        <TabsContent value="delivered">
          <OrderCard />
        </TabsContent>
        <TabsContent value="cancelled">
          <OrderCard />
        </TabsContent>
      </Tabs>
    </>
  );
}
