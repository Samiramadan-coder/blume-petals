import { getTranslations } from "next-intl/server";
import AppFooter from "@/components/reusable/app-footer";
import AppHeader from "@/components/reusable/app-header";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getTranslations("AppHeader");

  return (
    <div>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:inset-s-4 focus:top-4 focus:z-60 focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus:shadow-md"
      >
        {t("SkipToContent")}
      </a>
      <AppHeader />
      {/* Pages render their own <main>; this wrapper is only the skip-link target. */}
      <div id="main-content" tabIndex={-1} className="outline-none">
        {children}
      </div>
      <AppFooter />
    </div>
  );
}
