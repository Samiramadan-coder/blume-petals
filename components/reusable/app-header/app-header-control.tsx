"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { http } from "@/lib/http";
import { User } from "@/types/shared";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { deleteToken, getTokenHeaders } from "@/lib/actions";
import { LocaleSwitcher } from "../locale-switcher";
import { useIsScroll } from "@/hooks/use-is-scroll";
import { Link, usePathname } from "@/i18n/navigation";
import { Bell, Heart, ShoppingCart, Menu } from "lucide-react";

export default function AppHeaderControl({ user }: { user: User | null }) {
  const scrolled = useIsScroll();
  const pathname = usePathname();
  const t = useTranslations("AppHeader");

  const textColor =
    pathname !== "/" || scrolled ? "text-foreground" : "text-white/90";

  async function logout() {
    try {
      await http.post("/api/v1/auth/logout", undefined, {
        headers: await getTokenHeaders(),
      });
      await deleteToken();
      toast.success(t("LogoutSuccess"));
    } catch (err) {
      console.error("Logout error:", err);
      toast.error(t("LogoutError"));
    }
  }

  return (
    <div className="flex items-center gap-3">
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
        aria-label="ShoppingCart"
        className="hover:bg-transparent cursor-pointer"
      >
        <ShoppingCart size={20} className={textColor} />
      </Button>

      <div className="border border-primary/60 rounded-[3px] hidden lg:block">
        <LocaleSwitcher textColor={textColor} />
      </div>

      {user ? (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-9 rounded-full bg-secondary hover:bg-secondary focus:bg-secondary cursor-pointer"
            >
              {user.name?.charAt(0).toUpperCase() || "U"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuGroup>
              <DropdownMenuItem className="py-2 text-foreground cursor-pointer rounded-none">
                My Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="py-2 text-foreground cursor-pointer rounded-none">
                My Orders
              </DropdownMenuItem>
              <DropdownMenuItem className="py-2 text-foreground cursor-pointer rounded-none">
                My Design
              </DropdownMenuItem>
              <DropdownMenuItem className="py-2 text-foreground cursor-pointer rounded-none whitespace-nowrap">
                Saved Addresses
              </DropdownMenuItem>
              <DropdownMenuItem className="py-2 text-foreground cursor-pointer rounded-none">
                Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="py-2 text-red-500 cursor-pointer rounded-none"
              onClick={async () => {
                await logout();
              }}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href="/login">
          <Button
            variant="outline"
            className={cn(
              `
              cursor-pointer 
              rounded-full 
              text-sm 
              h-9.5 
              min-w-20 
              border 
              border-secondary 
              hidden 
              lg:block`,
              textColor,
              {
                "bg-secondary": scrolled || pathname !== "/",
                "bg-secondary/40": !scrolled && pathname === "/",
              },
            )}
          >
            {t("SignIn")}
          </Button>
        </Link>
      )}

      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="bg-transparent hover:bg-transparent block lg:hidden cursor-pointer"
          >
            <Menu size={20} className={textColor} />
          </Button>
        </SheetTrigger>
        <SheetContent showCloseButton={true}>
          <SheetHeader>
            <SheetTitle className="border-b-2 border-border py-2 -mx-4 px-4 font-heading text-lg font-semibold">
              Blúme Petals
            </SheetTitle>
            <SheetDescription className="py-4 flex flex-col gap-3">
              <SheetClose asChild>
                <Link
                  href="/"
                  className={`text-foreground ${pathname === "/" ? "font-semibold text-primary" : ""}`}
                >
                  {t("Home")}
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  href="/shop"
                  className={`text-foreground ${pathname.startsWith("/shop") ? "font-semibold text-primary" : ""}`}
                >
                  {t("Shop")}
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  href="/builder"
                  className={`text-foreground ${pathname.startsWith("/builder") ? "font-semibold text-primary" : ""}`}
                >
                  {t("Builder")}
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  href="/about"
                  className={`text-foreground ${pathname.startsWith("/about") ? "font-semibold text-primary" : ""}`}
                >
                  {t("About")}
                </Link>
              </SheetClose>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
