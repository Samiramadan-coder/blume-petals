import {
  FaInstagram,
  FaWhatsapp,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import AppLogo from "./app-logo";
import { http } from "@/lib/http";
import { Separator } from "../ui/separator";
import { LocaleSwitcher } from "./locale-switcher";
import { unstable_rethrow } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { AppSettings, Category } from "@/types/landing";
import SubscribeForm from "./app-footer/subscribe-form";
import FooterNavLink from "./app-footer/footer-nav-link";

// The footer renders in the (main) layout on every page, so a failed request
// here (e.g. the API rate limiting the burst of requests a locale switch
// causes) must not throw: it would take the whole page down with it. Render
// the footer without that data instead.
async function getFooterData<T>(path: string): Promise<T | null> {
  try {
    const { data } = await http.get<{ data: T }>(path);

    return data.data;
  } catch (error) {
    // Let the 401 redirect from `http` through.
    unstable_rethrow(error);
    console.error(`Failed to fetch footer data from ${path}`, error);

    return null;
  }
}

export default async function AppFooter() {
  const t = await getTranslations("AppFooter");

  const categories = await getFooterData<{ items: Category[] }>(
    "/api/v1/categories",
  );
  const settings = await getFooterData<AppSettings>("/api/v1/settings");

  return (
    <footer className="pt-16 bg-foreground">
      <div className="container max-w-7xl">
        <header className="flex items-center justify-between flex-wrap gap-6">
          <div className="flex flex-col gap-6">
            <AppLogo width={80} preload={false} />
            <p className="text-primary text-sm max-w-70">
              {t("DesignYourDream")}
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <p className="text-white/90 text-sm">{t("GetOffer")}</p>
            <SubscribeForm />
          </div>
        </header>

        <div className="relative">
          <Separator className="bg-primary/30 h-px my-8" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-foreground px-4">
            <svg
              aria-hidden="true"
              width="24"
              height="24"
              viewBox="0 0 36 36"
              fill="none"
            >
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
          {categories && (
            <div className="space-y-4">
              <h2
                id="footer-shop"
                className="text-sm font-semibold uppercase text-primary"
              >
                {t("Shop")}
              </h2>
              <nav aria-labelledby="footer-shop">
                <ul className="space-y-2.5">
                  {categories.items.slice(0, 5).map((item) => (
                    <li key={item.slug}>
                      <FooterNavLink href={`/shop?category=${item.slug}`}>
                        {item.name}
                      </FooterNavLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          )}

          <div className="space-y-4">
            <h2
              id="footer-company"
              className="text-sm font-semibold uppercase text-primary"
            >
              {t("Company")}
            </h2>
            <nav aria-labelledby="footer-company">
              <ul className="space-y-2.5">
                <li>
                  <FooterNavLink href="/about">{t("AboutUs")}</FooterNavLink>
                </li>
                <li>
                  <FooterNavLink href="/contact">{t("Contact")}</FooterNavLink>
                </li>
              </ul>
            </nav>
          </div>

          <div className="space-y-4">
            <h2
              id="footer-support"
              className="text-sm font-semibold uppercase text-primary"
            >
              {t("Support")}
            </h2>
            <nav aria-labelledby="footer-support">
              <ul className="space-y-2.5">
                <li>
                  <FooterNavLink href="/contact">
                    {t("HelpCenter")}
                  </FooterNavLink>
                </li>
                <li>
                  <FooterNavLink href="/faq">{t("FAQ")}</FooterNavLink>
                </li>
                <li>
                  <FooterNavLink href="/privacy-policy">
                    {t("PrivacyPolicy")}
                  </FooterNavLink>
                </li>
                <li>
                  <FooterNavLink href="/terms">{t("Terms")}</FooterNavLink>
                </li>
              </ul>
            </nav>
          </div>

          {settings && (
            <div className="space-y-4">
              <h2
                id="footer-connect"
                className="text-sm font-semibold uppercase text-primary"
              >
                {t("Connect")}
              </h2>
              <nav aria-labelledby="footer-connect">
                <ul className="space-y-2.5">
                  <li>
                    <FooterNavLink
                      href={settings.connect.instagram_url ?? "#"}
                      icon={
                        <div className="bg-white/10 min-w-7 h-7 flex items-center justify-center rounded-full">
                          <FaInstagram aria-hidden="true" className="text-primary" />
                        </div>
                      }
                    >
                      <span className="truncate">
                        {settings.connect.instagram ?? "#"}
                      </span>
                    </FooterNavLink>
                  </li>

                  <li>
                    <FooterNavLink
                      href={settings.connect.whatsapp_url ?? "#"}
                      icon={
                        <div className="bg-white/10 min-w-7 h-7 flex items-center justify-center rounded-full">
                          <FaWhatsapp aria-hidden="true" className="text-primary" />
                        </div>
                      }
                    >
                      {settings.connect.whatsapp ?? "#"}
                    </FooterNavLink>
                  </li>

                  <li>
                    <FooterNavLink
                      href={settings.connect.email_url ?? "#"}
                      icon={
                        <div className="bg-white/10 min-w-7 h-7 flex items-center justify-center rounded-full">
                          <FaEnvelope aria-hidden="true" className="text-primary" />
                        </div>
                      }
                    >
                      <span className="truncate">
                        {settings.connect.email ?? "#"}
                      </span>
                    </FooterNavLink>
                  </li>

                  <li>
                    <FooterNavLink
                      href={settings.connect.phone_url ?? "#"}
                      icon={
                        <div className="bg-white/10 min-w-7 h-7 flex items-center justify-center rounded-full">
                          <FaPhoneAlt aria-hidden="true" className="text-primary" />
                        </div>
                      }
                    >
                      {settings.connect.phone ?? "#"}
                    </FooterNavLink>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>

        <Separator className="bg-primary/30 h-px my-8" />

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between flex-wrap pb-6">
          <p className="flex-1 text-white/30 text-xs">{t("Copyright")}</p>
          <div className="flex-1 text-center">
            <LocaleSwitcher textColor="text-white/30" />
          </div>
          <div className="flex-1 flex justify-end items-center gap-2">
            <div className="bg-white/8 px-2.5 py-1.5 rounded">
              <svg
                role="img"
                aria-label="Visa"
                width="32"
                height="12"
                viewBox="0 0 55 17"
                fill="none"
              >
                <text
                  x="0"
                  y="13"
                  fontFamily="Inter, sans-serif"
                  fontSize="14"
                  fontWeight="700"
                  fill="#CBB682"
                  fillOpacity="0.7"
                >
                  VISA
                </text>
              </svg>
            </div>

            <div className="bg-white/8 px-1.5 py-1.5 rounded">
              <svg
                role="img"
                aria-label="Mastercard"
                width="36"
                height="22"
                viewBox="0 0 40 22"
              >
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
