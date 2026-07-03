import { http } from "@/lib/http";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { UserResponse } from "@/components/reusable/app-header";
import SidebarNavItem from "@/components/account/sidebar-nav-item";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import LogoutBtn from "@/components/account/logout-btn";

const links: {
  label: string;
  href: string;
}[] = [
  {
    label: "My Profile",
    href: "/account/profile",
  },
  {
    label: "My Orders",
    href: "/account/orders",
  },
  {
    label: "My Designs",
    href: "/account/designs",
  },
  {
    label: "Saved Addresses",
    href: "/account/addresses",
  },
  {
    label: "Settings",
    href: "/account/settings",
  },
];

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await http.get<UserResponse>("/api/v1/auth/me");

  return (
    <div className="container max-w-7xl py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
              {links.map((link) => {
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

        <div className="col-span-3">
          <Link href="/" className="mb-4">
            <Button
              variant="ghost"
              className="cursor-pointer text-primary hover:text-primary hover:bg-primary/20 h-10"
            >
              <ArrowLeft />
              Back To Home
            </Button>
          </Link>
          {children}
        </div>
      </div>
    </div>
  );
}
