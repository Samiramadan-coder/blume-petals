import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations();
  return <main className="container mx-auto">{t("Home.title")}</main>;
}
