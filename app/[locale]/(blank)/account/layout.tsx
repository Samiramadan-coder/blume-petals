import { http } from "@/lib/http";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { UserResponse } from "@/components/reusable/app-header";
import SidebarNavItem from "@/components/account/sidebar-nav-item";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { links } from "@/constants/account";
import { getTranslations, getLocale } from "next-intl/server";
import LogoutBtn from "@/components/reusable/logout-btn";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getTranslations("Account");

  const { data } = await http.get<UserResponse>("/api/v1/auth/me");

  return (
    <div className="container max-w-7xl py-8 md:py-16">
      <div className="grid items-start grid-cols-1 md:grid-cols-4 gap-4 lg:gap-8">
        <div className="block md:hidden">
          <BackToHomeButton />
        </div>

        <Card className="shadow-sm py-6">
          <CardContent className="flex flex-col items-center gap-4 px-6">
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-xl font-semibold">
                {data.data.user.name.slice(0, 2).toUpperCase()}
              </div>
              <h3 className="font-semibold text-foreground text-lg">
                {data.data.user.name}
              </h3>
            </div>

            <Separator />

            <nav className="space-y-1">
              {links(t).map((link) => {
                return (
                  <SidebarNavItem
                    key={link.href}
                    href={link.href}
                    label={link.label}
                  />
                );
              })}
            </nav>

            <Separator />

            <LogoutBtn />
          </CardContent>
        </Card>

        <div className="md:col-span-3">
          <div className="hidden md:block mb-6">
            <BackToHomeButton />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

async function BackToHomeButton() {
  const t = await getTranslations("Account");
  const locale = await getLocale();

  return (
    <Link href="/">
      <Button
        variant="ghost"
        className="cursor-pointer text-primary hover:text-primary hover:bg-primary/20 h-10"
      >
        {locale === "ar" ? <ArrowRight /> : <ArrowLeft />}
        {t("BackToHome")}
      </Button>
    </Link>
  );
}
