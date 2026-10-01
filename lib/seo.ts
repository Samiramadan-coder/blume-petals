import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";

const SITE_NAME = "Blúme Petals";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://blumepetals.com";

const OG_LOCALES: Record<(typeof routing.locales)[number], string> = {
  en: "en_AE",
  ar: "ar_AE",
};

type PageMetadataOptions = {
  locale: string;
  pathname: string;
  title: string;
  description: string;
  // Skip the root layout's title template (use when the title already names the brand).
  absoluteTitle?: boolean;
  image: {
    url: string;
    width: number;
    height: number;
    alt: string;
  };
};

export function buildPageMetadata({
  locale,
  pathname,
  title,
  description,
  absoluteTitle = false,
  image,
}: PageMetadataOptions): Metadata {
  const currentLocale = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale;

  const canonical = getPathname({ locale: currentLocale, href: pathname });
  const socialTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical,
      languages: {
        ...Object.fromEntries(
          routing.locales.map((item) => [
            item,
            getPathname({ locale: item, href: pathname }),
          ]),
        ),
        "x-default": getPathname({
          locale: routing.defaultLocale,
          href: pathname,
        }),
      },
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: socialTitle,
      description,
      url: canonical,
      locale: OG_LOCALES[currentLocale],
      alternateLocale: routing.locales
        .filter((item) => item !== currentLocale)
        .map((item) => OG_LOCALES[item]),
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [{ url: image.url, alt: image.alt }],
    },
  };
}
