import AppLogo from "./app-logo";
import HeaderNavLink from "./app-header/header-nav-link";
import { getTranslations } from "next-intl/server";
import AppHeaderShell from "./app-header/app-header-shell";
import AppHeaderControl from "./app-header/app-header-control";
import { cookies } from "next/headers";
import { Pagination, User } from "@/types/shared";
import { http } from "@/lib/http";

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

  if (isAuthenticated) {
    const { data: userData } = await http.get<UserResponse>("/api/v1/auth/me", {
      cache: "force-cache",
      next: { tags: ["user"] },
    });

    user = userData.data.user;

    const { data: wishlistData } = await http.get<{
      data: { pagination: Pagination };
    }>("/api/v1/favorites", {
      cache: "force-cache",
      next: { tags: ["wishlist-count"] },
    });

    wishlistCount = wishlistData.data.pagination.total;

    const { data: cartData } = await http.get<{
      data: { cart: { items: [] } };
    }>("/api/v1/cart", {
      cache: "force-cache",
      next: { tags: ["cart-count"] },
    });

    addedToCartCount = cartData.data.cart.items.length;
  }

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

        <AppHeaderControl
          user={user}
          wishlistCount={wishlistCount}
          addedToCartCount={addedToCartCount}
        />
      </div>
    </AppHeaderShell>
  );
}
