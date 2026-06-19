"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const nextLocale = locale === "ar" ? "en" : "ar";

  return (
    <Button
      variant="outline"
      onClick={() => router.replace(pathname, { locale: nextLocale })}
    >
      {locale === "ar" ? "English" : "العربية"}
    </Button>
  );
}
