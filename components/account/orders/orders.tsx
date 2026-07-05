import OrderCard from "./order-card";
import { getTranslations } from "next-intl/server";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";

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
      <div className="flex items-center justify-between gap-4 mb-6">
        <h1 className="text-xl md:text-3xl font-bold text-foreground font-heading">
          {t("Title")}
        </h1>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-6 bg-transparent space-x-2">
          {filters.map((filter) => (
            <TabsTrigger
              key={filter.value}
              value={filter.value}
              className="text-base p-4 rounded-full shadow-none! bg-primary/20! cursor-pointer data-[state=active]:bg-primary!"
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
