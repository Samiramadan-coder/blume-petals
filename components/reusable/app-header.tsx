import AppLogo from "./app-logo";
import { http } from "@/lib/http";
import { cookies } from "next/headers";
import { Pagination, User } from "@/types/shared";
import { Notification } from "@/types/notifications";
import { getTranslations } from "next-intl/server";
import HeaderNavLink from "./app-header/header-nav-link";
import AppHeaderShell from "./app-header/app-header-shell";
import AppHeaderControl from "./app-header/app-header-control";

export interface UserResponse {
  data: {
    user: User;
  };
}

export default async function AppHeader() {
  const cookieStore = await cookies();
  const t = await getTranslations("AppHeader");
  const isAuthenticated = cookieStore.get("token");

  let user: User | null = null;
  let wishlistCount = 0;
  let addedToCartCount = 0;
  let countUnreadNotifications = 0;
  let notificationsList: Notification[] = [];

  if (isAuthenticated) {
    // Fetch user data
    const { data: userData } = await http.get<UserResponse>("/api/v1/auth/me", {
      next: {
        tags: ["user"],
      },
    });

    user = userData.data.user;

    // Fetch wishlist count
    const { data: wishlistData } = await http.get<{
      data: { pagination: Pagination };
    }>("/api/v1/favorites", {
      next: {
        tags: ["wishlist-count"],
      },
    });

    wishlistCount = wishlistData.data.pagination.total;

    // Fetch cart count
    const { data: cartData } = await http.get<{
      data: { cart: { items: [] } };
    }>("/api/v1/cart", {
      next: {
        tags: ["cart-count"],
      },
    });

    addedToCartCount = cartData.data.cart.items.length;

    // Fetch unread notifications count
    const { data: notificationsData } = await http.get<{
      data: { unread_count: number };
    }>("/api/v1/notifications/unread-count", {
      next: {
        tags: ["notifications-count"],
      },
    });

    countUnreadNotifications = notificationsData.data.unread_count;

    // Fetch notifications
    const { data: notifications } = await http.get<{
      data: { items: Notification[]; pagination: Pagination };
    }>("/api/v1/notifications", {
      next: {
        tags: ["notifications-list"],
      },
    });

    notificationsList = notifications.data.items;
  }

  return (
    <AppHeaderShell>
      <div className="container max-w-7xl flex items-center justify-between gap-4 py-4">
        <AppLogo width={90} />

        <nav className=" items-center gap-8 hidden lg:flex">
          <HeaderNavLink href="/">{t("Home")}</HeaderNavLink>
          <HeaderNavLink href="/shop">{t("Shop")}</HeaderNavLink>
          <HeaderNavLink href="/builder">{t("Builder")}</HeaderNavLink>
          <HeaderNavLink href="/about">{t("About")}</HeaderNavLink>
        </nav>

        <AppHeaderControl
          user={user}
          wishlistCount={wishlistCount}
          addedToCartCount={addedToCartCount}
          countUnreadNotifications={countUnreadNotifications}
          notifications={notificationsList}
        />
      </div>
    </AppHeaderShell>
  );
}
