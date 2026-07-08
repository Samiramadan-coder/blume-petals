import Settings from "@/components/account/settings/settings";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("Account");

  return {
    title: t("Settings"),
  };
}

export default function SettingsPage() {
  return <Settings />;
}
