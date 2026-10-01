import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";
import { buildPageMetadata } from "@/lib/seo";
import MotionProvider from "@/providers/motion-provider";
import ContactForm from "@/components/contact/contact-form";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("Metadata");

  return buildPageMetadata({
    locale,
    pathname: "/contact",
    title: t("Contact.Title"),
    description: t("Contact.Description"),
    image: {
      url: "/images/home/hero/bouquet-of-rose.webp",
      width: 1024,
      height: 1024,
      alt: t("Home.ImageAlt"),
    },
  });
}

export default async function ContactPage() {
  const locale = await getLocale();
  const t = await getTranslations("Contact");

  return (
    <MotionProvider>
      <main className="container max-w-7xl py-20 min-h-screen">
        <h1
          className={cn("text-3xl font-bold", {
            "font-heading": locale === "en",
          })}
        >
          {t("Title")}
        </h1>

        <p className="mt-4 text-base text-muted-foreground">
          {t("ContactDescription")}
        </p>

        <ContactForm />
      </main>
    </MotionProvider>
  );
}
