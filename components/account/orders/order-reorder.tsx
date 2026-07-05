import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";

export default async function OrderReorder() {
  const t = await getTranslations("Account.Orders");

  return (
    <Button
      className="flex-1 cursor-pointer bg-white h-11 border-2 border-primary text-primary hover:bg-primary hover:text-white"
      variant="outline"
    >
      {t("Reorder")}
    </Button>
  );
}
