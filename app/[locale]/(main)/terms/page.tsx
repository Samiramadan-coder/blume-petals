import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { getSettings } from "@/lib/common-requestes";
import { getLocale, getTranslations } from "next-intl/server";
import LegalContent from "@/components/reusable/legal-content";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("Metadata");

  return buildPageMetadata({
    locale,
    pathname: "/terms",
    title: t("Terms.Title"),
    description: t("Terms.Description"),
    image: {
      url: "/images/home/hero/bouquet-of-rose.webp",
      width: 1024,
      height: 1024,
      alt: t("Home.ImageAlt"),
    },
  });
}

export default async function Page() {
  const t = await getTranslations("Metadata.Terms");

  const appSettings = await getSettings();

  return (
    <LegalContent title={t("Title")} html={appSettings.terms_and_conditions} />
  );
}
