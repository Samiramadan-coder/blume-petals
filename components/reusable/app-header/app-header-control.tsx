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
import { deleteToken } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import SidebarNavLink from "./sidebar-nav-link";
import { LocaleSwitcher } from "../locale-switcher";
import { useIsScroll } from "@/hooks/use-is-scroll";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { Bell, Heart, ShoppingCart, Menu, LogOut } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const sidebarNavItems = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Builder", href: "/builder" },
  { label: "About", href: "/about" },
];

const sidebarUserNavItems = [
  { label: "MyProfile", href: "/account/profile" },
  { label: "MyOrders", href: "/account/orders" },
  { label: "MyDesigns", href: "/account/designs" },
  { label: "SavedAddresses", href: "/account/addresses" },
  { label: "Settings", href: "/account/settings" },
];

export default function AppHeaderControl({ user }: { user: User | null }) {
  const scrolled = useIsScroll();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("AppHeader");
  const tAccount = useTranslations("Account");

  const textColor =
    pathname !== "/" || scrolled ? "text-foreground" : "text-white/90";

  async function logout() {
    try {
      await http.post("/api/v1/auth/logout");
      await deleteToken();
      toast.success(t("LogoutSuccess"));
      router.push("/login");
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
        <Heart className={cn(`size-5`, textColor)} />
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
        <Bell className={cn(`size-5`, textColor)} />
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
        <ShoppingCart className={cn(`size-5`, textColor)} />
      </Button>

      <div className="border border-primary/60 rounded-[3px] hidden lg:block">
        <LocaleSwitcher textColor={textColor} />
      </div>

      <div className="hidden lg:block">
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
                <DropdownMenuItem
                  className="py-2 text-foreground cursor-pointer rounded-none"
                  onClick={() => router.push("/account/profile")}
                >
                  {tAccount("MyProfile")}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="py-2 text-foreground cursor-pointer rounded-none"
                  onClick={() => router.push("/account/orders")}
                >
                  {tAccount("MyOrders")}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="py-2 text-foreground cursor-pointer rounded-none"
                  onClick={() => router.push("/account/designs")}
                >
                  {tAccount("MyDesigns")}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="py-2 text-foreground cursor-pointer rounded-none whitespace-nowrap"
                  onClick={() => router.push("/account/addresses")}
                >
                  {tAccount("SavedAddresses")}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="py-2 text-foreground cursor-pointer rounded-none"
                  onClick={() => router.push("/account/settings")}
                >
                  {tAccount("Settings")}
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="py-2 text-red-500 cursor-pointer rounded-none"
                onClick={logout}
              >
                <LogOut />
                {t("Logout")}
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
                border-secondary`,
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
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="bg-transparent hover:bg-transparent block lg:hidden cursor-pointer"
          >
            <Menu className={cn(`size-5`, textColor)} />
          </Button>
        </SheetTrigger>
        <SheetContent showCloseButton={true}>
          <SheetHeader>
            <SheetTitle className="border-b-2 border-border py-2 -mx-4 px-4 font-heading text-lg font-semibold">
              Blúme Petals
            </SheetTitle>
            <SheetDescription className="py-4 flex flex-col gap-4">
              {sidebarNavItems.map((item) => (
                <SheetClose asChild key={item.href}>
                  <SidebarNavLink label={t(item.label)} href={item.href} />
                </SheetClose>
              ))}

              {user && (
                <>
                  <Separator />

                  {sidebarUserNavItems.map((item) => (
                    <SheetClose asChild key={item.href}>
                      <SidebarNavLink
                        label={tAccount(item.label)}
                        href={item.href}
                      />
                    </SheetClose>
                  ))}
                </>
              )}
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
