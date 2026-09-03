import { getLocale, getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";
import ContactForm from "@/components/contact/contact-form";

export async function generateMetadata() {
  const t = await getTranslations("Contact");
  return {
    title: t("Title"),
  };
}

export default async function ContactPage() {
  const locale = await getLocale();
  const t = await getTranslations("Contact");

  return (
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
  );
}
