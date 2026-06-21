"use client";

import { Button } from "@/components/ui/button";
import { useIsScroll } from "@/hooks/use-is-scroll";
import { usePathname } from "@/i18n/navigation";
import { Bell, Heart, ShoppingCart, Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { LocaleSwitcher } from "../locale-switcher";

export default function AppHeaderControl() {
  const scrolled = useIsScroll();
  const t = useTranslations("AppHeader");
  const pathname = usePathname();

  const textColor =
    pathname !== "/" || scrolled ? "text-foreground" : "text-white/90";

  return (
    <div className="flex items-center gap-3">
      <Button
        variant="ghost"
        size="icon"
        className="relative hover:bg-transparent cursor-pointer"
        aria-label="Bell"
      >
        <Bell size={20} className={textColor} />
        <span className="absolute -right-1 -top-1 rounded-full bg-primary px-1.5 text-xs text-white">
          2
        </span>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="relative hover:bg-transparent cursor-pointer"
        aria-label="Heart"
      >
        <Heart size={20} className={textColor} />
        <span className="absolute -right-1 -top-1 rounded-full bg-primary px-1.5 text-xs text-white/90">
          2
        </span>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        aria-label="ShoppingCart"
        className="hover:bg-transparent cursor-pointer"
      >
        <ShoppingCart size={20} className={textColor} />
      </Button>

      <div className="border border-primary/60 rounded-[3px] hidden lg:block">
        <LocaleSwitcher textColor={textColor} />
      </div>

      <Button
        variant="outline"
        className={`rounded-full text-sm h-9.5 w-20 border border-secondary hidden lg:block ${textColor} ${scrolled || pathname !== "/" ? "bg-secondary" : "bg-secondary/40"}`}
      >
        {t("SignIn")}
      </Button>

      <Button
        variant="ghost"
        className="bg-transparent hover:bg-transparent block lg:hidden"
      >
        <Menu size={20} className={textColor} />
      </Button>
    </div>
  );
}
