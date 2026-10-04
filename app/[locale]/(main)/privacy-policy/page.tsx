import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { getLocale, getTranslations } from "next-intl/server";
import LegalContent from "@/components/reusable/legal-content";
import { getSettings } from "@/lib/common-requestes";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("Metadata");

  return buildPageMetadata({
    locale,
    pathname: "/privacy-policy",
    title: t("Privacy.Title"),
    description: t("Privacy.Description"),
    image: {
      url: "/images/home/hero/bouquet-of-rose.webp",
      width: 1024,
      height: 1024,
      alt: t("Home.ImageAlt"),
    },
  });
}

export default async function Page() {
  const t = await getTranslations("Metadata.Privacy");

  const settings = await getSettings();

  return <LegalContent title={t("Title")} html={settings.policy} />;
}
