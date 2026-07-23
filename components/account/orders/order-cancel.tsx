import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";

export default async function OrderCancel() {
  const t = await getTranslations("Actions");

  return (
    <Button className="flex-1 uppercase h-11" variant="destructive">
      {t("Cancel")}
    </Button>
  );
}
