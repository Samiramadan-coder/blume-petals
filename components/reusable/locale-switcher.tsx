"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export function LocaleSwitcher({ textColor }: { textColor?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const nextLocale = locale === "ar" ? "en" : "ar";

  return (
    <Button
      variant="ghost"
      className="bg-transparent hover:bg-transparent cursor-pointer h-auto w-auto"
      onClick={() => router.replace(pathname, { locale: nextLocale })}
      aria-label="switcher"
    >
      <span className={`inline-block text-xs font-semibold ${textColor}`}>
        EN
      </span>
      <span className={`mx-0.5 ${textColor}`}>|</span>
      <span
        className={`inline-block text-sx font-semibold relative bottom-0.5 ${textColor}`}
      >
        عربي
      </span>
    </Button>
  );
}
