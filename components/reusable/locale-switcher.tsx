"use client";

import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useRouter, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export function LocaleSwitcher({ textColor }: { textColor?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const nextLocale = locale === "ar" ? "en" : "ar";

  function handleLocaleChange() {
    const query = Array.from(new Set(searchParams.keys())).reduce<
      Record<string, string | string[]>
    >((result, key) => {
      const values = searchParams.getAll(key);

      result[key] = values.length > 1 ? values : values[0];

      return result;
    }, {});

    router.replace(
      {
        pathname,
        query,
      },
      {
        locale: nextLocale,
      },
    );
  }

  return (
    <Button
      type="button"
      variant="ghost"
      className="h-auto w-auto cursor-pointer bg-transparent hover:bg-transparent"
      onClick={handleLocaleChange}
      aria-label="Switch language"
    >
      <Globe className={textColor} />

      <span className={textColor}>{locale === "ar" ? "EN" : "AR"}</span>
    </Button>
  );
}
