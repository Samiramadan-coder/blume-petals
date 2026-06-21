"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "../ui/separator";

export function LocaleSwitcher({ textColor }: { textColor?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const nextLocale = locale === "ar" ? "en" : "ar";

  return (
    <Button
      variant="outline"
      className="bg-transparent border-border rounded-sm text-sm font-semibold hover:bg-transparent cursor-pointer"
      onClick={() => router.replace(pathname, { locale: nextLocale })}
    >
      <span className={`inline-block w-6 ${textColor}`}>EN</span>
      <Separator orientation="vertical" className="h-4 my-auto" />
      <span className={`inline-block w-6 ${textColor}`}>عربي</span>
    </Button>
  );
}
