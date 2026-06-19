import { LocaleSwitcher } from "@/components/reusable/language";
import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations();
  return (
    <main>
      {t("Home.title")}
      <LocaleSwitcher />
    </main>
  );
}
