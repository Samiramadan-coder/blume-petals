import { Link } from "@/i18n/navigation";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import {
  FaInstagram,
  FaWhatsapp,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import { getTranslations } from "next-intl/server";

export default async function GetStarted() {
  const t = await getTranslations("AboutGetStarted");

  return (
    <>
      <div className="container max-w-7xl">
        <div className="py-20 flex flex-col items-center gap-4 text-center">
          <p className="text-xs font-semibold uppercase mb-3 tracking-[0.3em] text-primary text-center">
            {t("Eyebrow")}
          </p>

          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-balance leading-tight text-foreground mb-8 text-center max-w-2xl">
            {t("Title")}
          </h2>

          <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
            <Link href="/builder">
              <Button
                variant="ghost"
                className="bg-secondary hover:bg-secondary py-7 px-10 cursor-pointer font-semibold w-full sm:w-auto"
              >
                {t("PrimaryCta")}
                <ArrowRight />
              </Button>
            </Link>

            <Link href="/shop">
              <Button
                variant="outline"
                className="py-7 px-10 cursor-pointer border-2 border-border font-semibold w-full sm:w-auto"
              >
                {t("SecondaryCta")}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="py-8 border-t border-border">
        <div className="container max-w-7xl">
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:flex-wrap">
            <p className="font-semibold tracking-widest uppercase text-xs text-foreground/35">
              {t("ContactLabel")}
            </p>
            <Link href="#" className="flex items-center gap-2">
              <FaInstagram className="text-primary" />
              <span className="relative text-sm text-foreground/55 hover:text-foreground">
                {t("Contact.Instagram.Value")}
              </span>
            </Link>

            <Link href="#" className="flex items-center gap-2">
              <FaWhatsapp className="text-primary" />
              <span className="relative text-sm text-foreground/55 hover:text-foreground">
                {t("Contact.WhatsApp.Value")}
              </span>
            </Link>

            <Link href="#" className="flex items-center gap-2">
              <FaEnvelope className="text-primary" />
              <span className="relative text-sm text-foreground/55 hover:text-foreground">
                {t("Contact.Email.Value")}
              </span>
            </Link>

            <Link href="#" className="flex items-center gap-2">
              <FaPhoneAlt className="text-primary" />
              <span className="relative text-sm text-foreground/55 hover:text-foreground">
                {t("Contact.Phone.Value")}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
