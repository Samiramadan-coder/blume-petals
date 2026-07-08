import Designs from "@/components/account/designs/designs";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("Account");

  return {
    title: t("MyDesigns"),
  };
}

export default function DesignsPage() {
  return <Designs />;
}
