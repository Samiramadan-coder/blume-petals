import AppLogo from "./app-logo";
import NavLink from "./nav-link";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Bell, Heart, Search, ShoppingCart } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function AppHeader() {
  const t = await getTranslations("AppHeader");

  return (
    <header className="sticky top-0 z-50 border-b border-border">
      <div className="container flex items-center justify-between gap-4 py-6">
        <AppLogo width={90} />

        <nav className="flex items-center gap-8">
          <NavLink href="/">{t("Home")}</NavLink>
          <NavLink href="/shop">{t("Shop")}</NavLink>
          <NavLink href="/builder">{t("Builder")}</NavLink>
          <NavLink href="/about">{t("About")}</NavLink>
        </nav>

        <Control />
      </div>
    </header>
  );
}

async function Control() {
  const t = await getTranslations();

  return (
    <div className="flex items-center gap-3">
      <Button variant="ghost" size="icon">
        <Search size={20} />
      </Button>

      <Button variant="ghost" size="icon" className="relative">
        <Bell size={20} />
        <span className="absolute -right-1 -top-1 rounded-full bg-primary px-1.5 text-xs text-white">
          2
        </span>
      </Button>

      <Button variant="ghost" size="icon" className="relative">
        <Heart size={20} />
        <span className="absolute -right-1 -top-1 rounded-full bg-primary px-1.5 text-xs text-white">
          2
        </span>
      </Button>

      <Button variant="ghost" size="icon">
        <ShoppingCart size={20} />
      </Button>

      <Separator orientation="vertical" className="h-6" />

      <NavLink href="/login" className="text-primary">
        {t("SignIn")}
      </NavLink>

      <Separator orientation="vertical" className="h-6" />

      <NavLink href="/register" className="text-primary">
        {t("Register")}
      </NavLink>
    </div>
  );
}
