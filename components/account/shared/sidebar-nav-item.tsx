"use client";

import { usePathname } from "@/i18n/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export default function SidebarNavItem({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        "h-11 w-full border-0 justify-start rounded-xl px-4 text-sm font-medium text-muted-foreground hover:bg-primary/20 hover:text-foreground",
        isActive &&
          "bg-primary/20 text-foreground border-s-2 border-primary hover:bg-primary/20 hover:text-foreground",
      )}
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
}
