"use client";

import { Button } from "@/components/ui/button";
import { usePathname } from "@/i18n/navigation";
import { Bell, Heart, ShoppingCart } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";

export default function AppHeaderControl() {
  const [isScrolled, setScrolled] = useState(false);
  const t = useTranslations("AppHeader");
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    onScroll();

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="flex items-center gap-3">
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        aria-label="Bell"
      >
        <Bell
          size={20}
          className={
            pathname !== "/" || isScrolled ? "text-foreground" : "text-white"
          }
        />
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
        <Heart
          size={20}
          className={
            pathname !== "/" || isScrolled ? "text-foreground" : "text-white"
          }
        />
        <span className="absolute -right-1 -top-1 rounded-full bg-primary px-1.5 text-xs text-white">
          2
        </span>
      </Button>

      <Button variant="ghost" size="icon" aria-label="ShoppingCart">
        <ShoppingCart
          size={20}
          className={
            pathname !== "/" || isScrolled ? "text-foreground" : "text-white"
          }
        />
      </Button>

      {/* <Separator orientation="vertical" className="h-6" /> */}

      {/* <HeaderNavLink href="/login" className="text-primary">
        {t("SignIn")}
      </HeaderNavLink> */}

      {/* <Separator orientation="vertical" className="h-6" /> */}

      {/* <HeaderNavLink href="/register" className="text-primary">
        {t("Register")}
      </HeaderNavLink> */}
    </div>
  );
}
