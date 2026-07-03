import AppLogo from "./app-logo";
import HeaderNavLink from "./app-header/header-nav-link";
import { getTranslations } from "next-intl/server";
import AppHeaderShell from "./app-header/app-header-shell";
import AppHeaderControl from "./app-header/app-header-control";
import { cookies } from "next/headers";
import { User } from "@/types/shared";
import { http } from "@/lib/http";
import { getTokenHeaders } from "@/lib/actions";

export default async function AppHeader() {
  const cookieStore = await cookies();
  const t = await getTranslations("AppHeader");
  const isAuthenticated = cookieStore.get("token");

  let user: User | null = null;

  if (isAuthenticated) {
    try {
      const { data } = await http.get<{
        data: { user: User };
      }>("/api/v1/auth/me", { headers: await getTokenHeaders() });

      user = data.data.user;
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
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

        <AppHeaderControl user={user} />
      </div>
    </AppHeaderShell>
  );
}
