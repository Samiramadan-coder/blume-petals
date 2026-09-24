import {
  FaInstagram,
  FaWhatsapp,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import { Button } from "../ui/button";
import AboutTitle from "./about-title";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import AboutSubtitle from "./about-subtitle";
import * as motion from "motion/react-client";
import { getTranslations } from "next-intl/server";
import { http } from "@/lib/http";
import { AppSettings } from "@/types/landing";

export default async function GetStarted() {
  const t = await getTranslations("AboutGetStarted");

  const { data: settingsData, ok: ok2 } = await http.get<{
    data: AppSettings;
  }>(`/api/v1/settings`);

  if (!ok2) {
    throw new Error("Failed to fetch app settings");
  }

  return (
    <section className="overflow-hidden">
      <div className="container max-w-7xl">
        <div className="flex flex-col items-center gap-4 py-20 text-center">
          <AboutSubtitle className="text-center">{t("Eyebrow")}</AboutSubtitle>

          <AboutTitle className="max-w-2xl text-center">
            {t("Title")}
          </AboutTitle>

          <motion.div
            initial={{
              opacity: 0,
              x: -8,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.4,
            }}
            transition={{
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row"
          >
            <Button
              asChild
              variant="ghost"
              className="w-full cursor-pointer bg-secondary px-10 py-7 font-semibold hover:bg-secondary sm:w-auto"
            >
              <Link href="/builder">
                {t("PrimaryCta")}
                <ArrowRight className="size-4" />
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
            initial={{
              opacity: 0,
              x: 8,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.4,
            }}
            transition={{
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex flex-col items-center justify-center gap-4 md:flex-row md:flex-wrap"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-foreground/35">
              {t("ContactLabel")}
            </p>

            <Link
              href={settingsData.data.connect.instagram_url}
              className="group flex items-center gap-2"
            >
              <FaInstagram className="text-primary" />

              <span className="text-sm text-foreground/55 transition-colors group-hover:text-foreground">
                {settingsData.data.connect.instagram}
              </span>
            </Link>

            <Link
              href={settingsData.data.connect.whatsapp_url}
              className="group flex items-center gap-2"
            >
              <FaWhatsapp className="text-primary" />

              <span className="text-sm text-foreground/55 transition-colors group-hover:text-foreground">
                {settingsData.data.connect.whatsapp}
              </span>
            </Link>

            <Link
              href={settingsData.data.connect.email_url}
              className="group flex items-center gap-2"
            >
              <FaEnvelope className="text-primary" />

              <span className="text-sm text-foreground/55 transition-colors group-hover:text-foreground">
                {settingsData.data.connect.email}
              </span>
            </Link>

            <Link
              href={settingsData.data.connect.phone_url}
              className="group flex items-center gap-2"
            >
              <FaPhoneAlt className="text-primary" />

              <span className="text-sm text-foreground/55 transition-colors group-hover:text-foreground">
                {settingsData.data.connect.phone}
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
