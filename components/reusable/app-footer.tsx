import {
  FaInstagram,
  FaWhatsapp,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import FooterNavLink from "./app-footer/footer-nav-link";
import AppLogo from "./app-logo";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { LocaleSwitcher } from "./locale-switcher";
import { getTranslations } from "next-intl/server";

export default async function AppFooter() {
  const t = await getTranslations("AppFooter");

  return (
    <footer className="pt-16 bg-foreground">
      <div className="container">
        <header className="flex items-center justify-between flex-wrap gap-6">
          <div className="flex flex-col gap-6">
            <AppLogo width={80} />
            <p className="text-primary text-sm max-w-70">
              {t("DesignYourDream")}
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <p className="text-white/90 text-sm">{t("GetOffer")}</p>
            <form className="flex w-full max-w-sm overflow-hidden rounded-full border border-primary/30 bg-primary/10">
              <Input
                type="email"
                placeholder={t("EmailPlaceholder")}
                className="h-11 flex-1 border-0 bg-transparent px-5 text-[#e6dcd2] placeholder:text-[#e6dcd2]/60 focus-visible:ring-0"
              />

              <Button
                type="submit"
                className="h-11 rounded-full bg-primary text-foreground px-6"
              >
                {t("Subscribe")}
              </Button>
            </form>
          </div>
        </header>

        <div className="relative">
          <Separator className="bg-primary/30 h-px my-8" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-foreground px-4">
            <svg width="24" height="24" viewBox="0 0 36 36" fill="none">
              <path
                d="M18 32V14"
                stroke="#CBB682"
                strokeWidth="1.6"
                strokeLinecap="round"
              ></path>
              <path
                d="M18 14C18 14 10 12 9 5C9 5 14 6 18 14Z"
                fill="#CBB682"
                fillOpacity="0.6"
              ></path>
              <path
                d="M18 14C18 14 26 12 27 5C27 5 22 6 18 14Z"
                fill="#CBB682"
                fillOpacity="0.6"
              ></path>
              <path
                d="M18 20C18 20 13 18 12 12C12 12 16 13 18 20Z"
                fill="rgba(230,220,210,0.3)"
              ></path>
              <path
                d="M18 20C18 20 23 18 24 12C24 12 20 13 18 20Z"
                fill="rgba(230,220,210,0.3)"
              ></path>
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase text-primary">
              {t("Shop")}
            </h4>
            <nav>
              <ul className="space-y-2.5">
                <li>
                  <FooterNavLink href="">{t("Bouquets")}</FooterNavLink>
                </li>
                <li>
                  <FooterNavLink href="">{t("Preserved")}</FooterNavLink>
                </li>
                <li>
                  <FooterNavLink href="">{t("Gifting")}</FooterNavLink>
                </li>
                <li>
                  <FooterNavLink href="">{t("CustomBuilder")}</FooterNavLink>
                </li>
                <li>
                  <FooterNavLink href="">{t("Seasonal")}</FooterNavLink>
                </li>
                <li>
                  <FooterNavLink href="">{t("Occasions")}</FooterNavLink>
                </li>
              </ul>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase text-primary">
              {t("Company")}
            </h4>
            <nav>
              <ul className="space-y-2.5">
                <li>
                  <FooterNavLink href="">{t("AboutUs")}</FooterNavLink>
                </li>
                <li>
                  <FooterNavLink href="">{t("OurStory")}</FooterNavLink>
                </li>
                <li>
                  <FooterNavLink href="">{t("Careers")}</FooterNavLink>
                </li>
                <li>
                  <FooterNavLink href="">{t("Contact")}</FooterNavLink>
                </li>
              </ul>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase text-primary">
              {t("Support")}
            </h4>
            <nav>
              <ul className="space-y-2.5">
                <li>
                  <FooterNavLink href="">{t("HelpCenter")}</FooterNavLink>
                </li>
                <li>
                  <FooterNavLink href="">{t("TrackOrder")}</FooterNavLink>
                </li>
                <li>
                  <FooterNavLink href="">{t("ReturnsRefunds")}</FooterNavLink>
                </li>
                <li>
                  <FooterNavLink href="">{t("FAQ")}</FooterNavLink>
                </li>
                <li>
                  <FooterNavLink href="">{t("PrivacyPolicy")}</FooterNavLink>
                </li>
                <li>
                  <FooterNavLink href="">{t("Terms")}</FooterNavLink>
                </li>
              </ul>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase text-primary">
              {t("Connect")}
            </h4>
            <nav>
              <ul className="space-y-2.5">
                <li>
                  <FooterNavLink
                    href=""
                    icon={
                      <div className="bg-white/10 w-7 h-7 flex items-center justify-center rounded-full">
                        <FaInstagram className="text-primary" />
                      </div>
                    }
                  >
                    {t("InstagramHandle")}
                  </FooterNavLink>
                </li>

                <li>
                  <FooterNavLink
                    href=""
                    icon={
                      <div className="bg-white/10 w-7 h-7 flex items-center justify-center rounded-full">
                        <FaWhatsapp className="text-primary" />
                      </div>
                    }
                  >
                    {t("WhatsAppUs")}
                  </FooterNavLink>
                </li>

                <li>
                  <FooterNavLink
                    href=""
                    icon={
                      <div className="bg-white/10 w-7 h-7 flex items-center justify-center rounded-full">
                        <FaEnvelope className="text-primary" />
                      </div>
                    }
                  >
                    {t("EmailUs")}
                  </FooterNavLink>
                </li>

                <li>
                  <FooterNavLink
                    href=""
                    icon={
                      <div className="bg-white/10 w-7 h-7 flex items-center justify-center rounded-full">
                        <FaPhoneAlt className="text-primary" />
                      </div>
                    }
                  >
                    {t("CallUs")}
                  </FooterNavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <Separator className="bg-primary/30 h-px my-8" />

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between flex-wrap pb-6">
          <p className="flex-1 text-white/30 text-xs">{t("Copyright")}</p>
          <div className="flex-1 text-center">
            <LocaleSwitcher textColor="text-white/30" />
          </div>
          <div className="flex-1 flex justify-end items-center gap-2">
            <div className="text-primary text-xs bg-white/30 w-13 h-6 grid place-items-center rounded-xs">
              Visa
            </div>
            <div className="bg-white/30 w-12 h-8 grid place-items-center rounded-xs">
              <svg width="36" height="22" viewBox="0 0 40 22">
                <circle
                  cx="14"
                  cy="11"
                  r="10"
                  fill="#CBB682"
                  fillOpacity="0.6"
                ></circle>
                <circle
                  cx="26"
                  cy="11"
                  r="10"
                  fill="#ED8074"
                  fillOpacity="0.6"
                ></circle>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
