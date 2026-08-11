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

import {
  sidebarAuthNavItems,
  sidebarNavItems,
  sidebarUserNavItems,
} from "@/constants/navbar";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { User } from "@/types/shared";
import LogoutBtn from "../logout-btn";
import { Button } from "@/components/ui/button";
import SidebarNavLink from "./sidebar-nav-link";
import { LocaleSwitcher } from "../locale-switcher";
import { useIsScroll } from "@/hooks/use-is-scroll";
import { Separator } from "@/components/ui/separator";
import { useLocale, useTranslations } from "next-intl";
import NotificationsContent from "./notifications-content";
import { Heart, ShoppingBag, Menu, Bell } from "lucide-react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { useNotifications } from "@/providers/notifications-provider";

export default function AppHeaderControl({
  user,
  wishlistCount,
  cartCount,
}: {
  user: User | null;
  wishlistCount: number;
  cartCount: number;
}) {
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();
  const scrolled = useIsScroll();
  const t = useTranslations("AppHeader");

  const tAccount = useTranslations("Account");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const textColor =
    pathname !== "/" || scrolled ? "text-foreground" : "text-white/90";

  return (
    <div className="flex items-center gap-3">
      {user ? (
        <>
          <WishlistButton textColor={textColor} wishlistCount={wishlistCount} />
          <NotificationsButton textColor={textColor} />
          <CartButton textColor={textColor} cartCount={cartCount} />
        </>
      ) : null}

      <LocaleSwitcher textColor={textColor} />

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
            <SheetTitle
              className={cn(
                "border-b border-border py-3 -mx-4 px-4 text-xl font-semibold",
                { "font-heading": locale === "en" },
              )}
            >
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

          {user && (
            <SheetFooter className="border-t border-border px-4 py-3">
              <LogoutBtn className="border border-red-300 rounded-full" />
            </SheetFooter>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

// Wishlist button component.
function WishlistButton({
  wishlistCount,
  textColor,
}: {
  wishlistCount: number;
  textColor: string;
}) {
  return (
    <Link href="/wishlist">
      <Button
        variant="ghost"
        size="icon"
        className="relative hover:bg-transparent cursor-pointer"
        aria-label="Heart"
      >
        <Heart className={cn(`size-5 text-white/92`, textColor)} />
        {wishlistCount > 0 && (
          <span className="absolute -right-1 -top-1 size-4 grid place-content-center rounded-full bg-primary px-1.5 text-[10px] text-foreground font-semibold">
            {wishlistCount > 9 ? "9+" : wishlistCount}
          </span>
        )}
      </Button>
    </Link>
  );
}

// Notifications button component.
function NotificationsButton({ textColor }: { textColor: string }) {
  const { unreadCount } = useNotifications();
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "relative cursor-pointer bg-transparent",
            "hover:bg-transparent",
            "focus:bg-transparent",
            "active:bg-transparent",
            "data-[state=open]:bg-transparent",
            "data-[state=open]:hover:bg-transparent",
            "data-[state=open]:text-inherit",
            "focus-visible:ring-0 focus-visible:ring-offset-0",
          )}
          aria-label="Open notifications"
        >
          <Bell className={cn("size-5 text-white/92", textColor)} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 grid size-4 place-content-center rounded-full bg-primary text-[10px] font-semibold text-foreground">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>

      {open && <NotificationsContent />}
    </Popover>
  );
}

// Cart button component.
function CartButton({
  textColor,
  cartCount,
}: {
  textColor: string;
  cartCount: number;
}) {
  return (
    <Link href="/cart">
      <Button
        variant="ghost"
        size="icon"
        aria-label="ShoppingCart"
        className="hover:bg-transparent cursor-pointer relative"
      >
        <ShoppingBag className={cn(`size-5`, textColor)} />
        {cartCount > 0 && (
          <span className="absolute -right-1 -top-1 size-4 grid place-content-center rounded-full bg-red-400 px-1.5 text-[10px] text-white">
            {cartCount > 9 ? "9+" : cartCount}
          </span>
        )}
      </Button>
    </Link>
  );
}
