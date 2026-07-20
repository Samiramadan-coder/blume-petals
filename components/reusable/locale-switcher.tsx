"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

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
      <Globe className={textColor} />
      <span className={textColor}>{locale === "ar" ? "EN" : "AR"}</span>
    </Button>
  );
}
