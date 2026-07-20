"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
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

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { User } from "@/types/shared";
import LogoutBtn from "../logout-btn";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import SidebarNavLink from "./sidebar-nav-link";
import { LocaleSwitcher } from "../locale-switcher";
import { useIsScroll } from "@/hooks/use-is-scroll";
import { Separator } from "@/components/ui/separator";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { Bell, Heart, ShoppingCart, Menu } from "lucide-react";

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

const sidebarAuthNavItems = [
  { label: "SignIn", href: "/login" },
  { label: "Register", href: "/register" },
];

export default function AppHeaderControl({
  user,
  wishlistCount,
  addedToCartCount,
}: {
  user: User | null;
  wishlistCount: number;
  addedToCartCount: number;
}) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const scrolled = useIsScroll();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("AppHeader");
  const tAccount = useTranslations("Account");

  const textColor =
    pathname !== "/" || scrolled ? "text-foreground" : "text-white/90";

  return (
    <div className="flex items-center gap-3">
      {user ? (
        <>
          <Link href="/wishlist">
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-transparent cursor-pointer"
              aria-label="Heart"
            >
              <Heart className={cn(`size-5 text-white/92`, textColor)} />
              <span className="absolute -right-1 -top-1 w-5 h-5 grid place-content-center rounded-full bg-red-400 px-1.5 text-[12px] text-white/92">
                {wishlistCount}
              </span>
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-transparent cursor-pointer"
            aria-label="Bell"
          >
            <Bell className={cn(`size-5 text-white/92`, textColor)} />
            <span className="absolute -right-1 -top-1 w-5 h-5 grid place-content-center rounded-full bg-red-400 px-1.5 text-[12px] text-white/92">
              0
            </span>
          </Button>

          <Link href="/cart">
            <Button
              variant="ghost"
              size="icon"
              aria-label="ShoppingCart"
              className="hover:bg-transparent cursor-pointer relative"
            >
              <ShoppingCart className={cn(`size-5`, textColor)} />
              <span className="absolute -right-1 -top-1 w-5 h-5 grid place-content-center rounded-full bg-red-400 px-1.5 text-[12px] text-white/92">
                {addedToCartCount}
              </span>
            </Button>
          </Link>
        </>
      ) : null}

      <div className="hidden lg:block">
        <LocaleSwitcher textColor={textColor} />
      </div>

      <div className="hidden lg:block">
        {user ? (
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              {user.photo_url ? (
                <div className="w-9 h-9 rounded-full overflow-hidden shadow-sm cursor-pointer">
                  <Image
                    src={user.photo_url}
                    height={400}
                    width={400}
                    className="h-full w-full object-cover object-center"
                    alt="Profile Photo"
                    priority
                  />
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-9 rounded-full bg-secondary hover:bg-secondary focus:bg-secondary cursor-pointer"
                >
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </Button>
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-45">
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
              <LogoutBtn className="h-10" />
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

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
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
            <SheetTitle className="border-b border-border py-3 -mx-4 px-4 font-heading text-xl font-semibold">
              Blúme Petals
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-4 px-4">
            {sidebarNavItems.map((item) => (
              <SheetClose asChild key={item.href}>
                <SidebarNavLink
                  label={t(item.label)}
                  href={item.href}
                  onClick={() => setIsSheetOpen(false)}
                />
              </SheetClose>
            ))}

            {user ? (
              <>
                <Separator />
                {sidebarUserNavItems.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <SidebarNavLink
                      label={tAccount(item.label)}
                      href={item.href}
                      onClick={() => setIsSheetOpen(false)}
                    />
                  </SheetClose>
                ))}
              </>
            ) : (
              <>
                <Separator />
                {sidebarAuthNavItems.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <SidebarNavLink
                      label={t(item.label)}
                      href={item.href}
                      onClick={() => setIsSheetOpen(false)}
                    />
                  </SheetClose>
                ))}
              </>
            )}
          </div>

          <SheetFooter className="border-t border-border px-4 py-3">
            <LogoutBtn className="border border-red-300 rounded-full" />
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
