import {
  FaInstagram,
  FaWhatsapp,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import { Button } from "../ui/button";
import { reveal } from "@/lib/motion";
import AboutTitle from "./about-title";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import AboutSubtitle from "./about-subtitle";
import * as motion from "motion/react-client";
import { getTranslations } from "next-intl/server";
import { getSettings } from "@/lib/common-requestes";

export default async function GetStarted() {
  const t = await getTranslations("AboutGetStarted");

  const settingsData = await getSettings();

  return (
    <section className="overflow-hidden">
      <div className="container max-w-7xl">
        <div className="flex flex-col items-center gap-4 py-20 text-center">
          <AboutSubtitle className="text-center">{t("Eyebrow")}</AboutSubtitle>

          <AboutTitle className="max-w-2xl text-center">
            {t("Title")}
          </AboutTitle>

          <motion.div
            {...reveal({ x: -10, amount: 0.4 })}
            className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row"
          >
            <Button
              asChild
              variant="ghost"
              className="w-full cursor-pointer bg-secondary px-10 py-7 font-semibold hover:bg-secondary sm:w-auto"
            >
              <Link href="/builder">
                {t("PrimaryCta")}
                <ArrowRight className="size-4 rtl:rotate-180" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="w-full cursor-pointer border-2 border-border px-10 py-7 font-semibold sm:w-auto"
            >
              <Link href="/shop">{t("SecondaryCta")}</Link>
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="border-t border-border py-8">
        <div className="container max-w-7xl">
          <motion.div
            {...reveal({ x: 10, amount: 0.4 })}
            className="flex flex-col items-center justify-center gap-4 md:flex-row md:flex-wrap"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-foreground/35">
              {t("ContactLabel")}
            </p>

            <Link
              href={settingsData.connect.instagram_url}
              className="group flex items-center gap-2"
            >
              <FaInstagram aria-hidden="true" className="text-primary" />

              <span className="text-sm text-foreground/55 transition-colors group-hover:text-foreground">
                {settingsData.connect.instagram}
              </span>
            </Link>

            <Link
              href={settingsData.connect.whatsapp_url}
              className="group flex items-center gap-2"
            >
              <FaWhatsapp aria-hidden="true" className="text-primary" />

              <span className="text-sm text-foreground/55 transition-colors group-hover:text-foreground">
                {settingsData.connect.whatsapp}
              </span>
            </Link>

            <Link
              href={settingsData.connect.email_url}
              className="group flex items-center gap-2"
            >
              <FaEnvelope aria-hidden="true" className="text-primary" />

              <span className="text-sm text-foreground/55 transition-colors group-hover:text-foreground">
                {settingsData.connect.email}
              </span>
            </Link>

            <Link
              href={settingsData.connect.phone_url}
              className="group flex items-center gap-2"
            >
              <FaPhoneAlt aria-hidden="true" className="text-primary" />

              <span className="text-sm text-foreground/55 transition-colors group-hover:text-foreground">
                {settingsData.connect.phone}
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
