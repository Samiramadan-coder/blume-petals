import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";
import { buildPageMetadata } from "@/lib/seo";
import MotionProvider from "@/providers/motion-provider";
import ContactForm from "@/components/contact/contact-form";
import { getSettings } from "@/lib/common-requestes";
import { Link } from "@/i18n/navigation";
import { FaEnvelope, FaInstagram, FaPhone, FaWhatsapp } from "react-icons/fa";

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
  const appSettings = await getSettings();
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

        <div className="mt-8">
          <div className="mb-5">
            <h3 className="text-2xl font-bold ltr:font-heading">
              {t("SocialMedia")}
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              {t("SocialMediaDescription")}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href={appSettings.connect.whatsapp_url}
              target="_blank"
              className="bg-white group flex items-center gap-3 rounded-2xl p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/5 shadow-sm"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-lg text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <FaWhatsapp />
              </span>

              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">{t("WhatsApp")}</p>
                <p className="truncate text-sm font-medium">
                  {appSettings.connect.whatsapp}
                </p>
              </div>
            </Link>

            <Link
              href={appSettings.connect.instagram_url}
              target="_blank"
              className="bg-white group flex items-center gap-3 rounded-2xl p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/5 shadow-sm"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-lg text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <FaInstagram />
              </span>

              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">
                  {t("Instagram")}
                </p>
                <p className="truncate text-sm font-medium">
                  {appSettings.connect.instagram}
                </p>
              </div>
            </Link>

            <Link
              href={appSettings.connect.email_url}
              target="_blank"
              className="bg-white group flex items-center gap-3 rounded-2xl p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/5 shadow-sm"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-lg text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <FaEnvelope />
              </span>

              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">{t("Email")}</p>
                <p className="truncate text-sm font-medium">
                  {appSettings.connect.email}
                </p>
              </div>
            </Link>

            <Link
              href={appSettings.connect.phone_url}
              target="_blank"
              className="bg-white group flex items-center gap-3 rounded-2xl p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/5 shadow-sm"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-lg text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <FaPhone />
              </span>

              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">{t("Phone")}</p>
                <p className="truncate text-sm font-medium">
                  {appSettings.connect.phone}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </MotionProvider>
  );
}
