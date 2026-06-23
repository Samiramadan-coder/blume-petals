import AppLogo from "./app-logo";
import HeaderNavLink from "./app-header/header-nav-link";
import { getTranslations } from "next-intl/server";
import AppHeaderShell from "./app-header/app-header-shell";
import AppHeaderControl from "./app-header/app-header-control";

export default async function AppHeader() {
  const t = await getTranslations("AppHeader");

  return (
    <AppHeaderShell>
      <div className="container max-w-7xl flex items-center justify-between gap-4 py-4">
        <AppLogo width={90} />
        <nav className=" items-center gap-10 hidden lg:flex">
          <HeaderNavLink href="/">{t("Home")}</HeaderNavLink>
          <HeaderNavLink href="/shop">{t("Shop")}</HeaderNavLink>
          <HeaderNavLink href="/builder">{t("Builder")}</HeaderNavLink>
          <HeaderNavLink href="/about">{t("About")}</HeaderNavLink>
        </nav>
        <AppHeaderControl />
      </div>
    </AppHeaderShell>
  );
}
