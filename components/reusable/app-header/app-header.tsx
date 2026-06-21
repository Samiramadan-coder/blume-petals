import AppLogo from "../app-logo";
import HeaderNavLink from "./header-nav-link";
import { Separator } from "../../ui/separator";
import { Button } from "../../ui/button";
import { Bell, Heart, Search, ShoppingCart } from "lucide-react";
import { getTranslations } from "next-intl/server";
import AppHeaderShell from "./app-header-shell";

export default async function AppHeader() {
  const t = await getTranslations("AppHeader");

  return (
    <AppHeaderShell>
      <div className="container flex items-center justify-between gap-4 py-4">
        <AppLogo width={80} />

        <nav className="flex items-center gap-8">
          <HeaderNavLink href="/">{t("Home")}</HeaderNavLink>
          <HeaderNavLink href="/shop">{t("Shop")}</HeaderNavLink>
          <HeaderNavLink href="/builder">{t("Builder")}</HeaderNavLink>
          <HeaderNavLink href="/about">{t("About")}</HeaderNavLink>
        </nav>

        <Control />
      </div>
    </AppHeaderShell>
  );
}

async function Control() {
  const t = await getTranslations("AppHeader");

  return (
    <div className="flex items-center gap-3">
      <Button variant="ghost" size="icon" aria-label="Search">
        <Search size={20} />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="relative"
        aria-label="Bell"
      >
        <Bell size={20} />
        <span className="absolute -right-1 -top-1 rounded-full bg-primary px-1.5 text-xs text-white">
          2
        </span>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="relative"
        aria-label="Heart"
      >
        <Heart size={20} />
        <span className="absolute -right-1 -top-1 rounded-full bg-primary px-1.5 text-xs text-white">
          2
        </span>
      </Button>

      <Button variant="ghost" size="icon" aria-label="ShoppingCart">
        <ShoppingCart size={20} />
      </Button>

      <Separator orientation="vertical" className="h-6" />

      <HeaderNavLink href="/login" className="text-primary">
        {t("SignIn")}
      </HeaderNavLink>

      <Separator orientation="vertical" className="h-6" />

      <HeaderNavLink href="/register" className="text-primary">
        {t("Register")}
      </HeaderNavLink>
    </div>
  );
}
