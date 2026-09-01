import AppLogo from "./app-logo";
import { http } from "@/lib/http";
import { cookies } from "next/headers";
import { Pagination, User } from "@/types/shared";
import { getTranslations } from "next-intl/server";
import HeaderNavLink from "./app-header/header-nav-link";
import AppHeaderShell from "./app-header/app-header-shell";
import AppHeaderControl from "./app-header/app-header-control";

export interface UserResponse {
  data: {
    stats: {
      designs: number;
      orders: number;
      saved: number;
    };
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
  }

  return (
    <AppHeaderShell>
      <div className="container max-w-7xl flex items-center justify-between gap-4 py-3">
        <AppLogo width={90} />

        <nav className=" items-center gap-8 hidden lg:flex">
          <HeaderNavLink href="/">{t("Home")}</HeaderNavLink>
          <HeaderNavLink href="/shop">{t("Shop")}</HeaderNavLink>
          <HeaderNavLink href="/builder">{t("Builder")}</HeaderNavLink>
          <HeaderNavLink href="/about">{t("About")}</HeaderNavLink>
          <HeaderNavLink href="/contact">{t("Contact")}</HeaderNavLink>
        </nav>

        <AppHeaderControl
          user={user}
          wishlistCount={wishlistCount}
          cartCount={addedToCartCount}
        />
      </div>
    </AppHeaderShell>
  );
}
