"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export default function GoBackBtn() {
  const locale = useLocale();
  const tCommon = useTranslations("Common");
  const router = useRouter();
  const pathname = usePathname();
  const isOrderDetails = /^\/account\/orders\/\d+\/?$/.test(pathname);

  return (
    <Button
      variant="ghost"
      className="px-0 text-primary hover:text-primary hover:bg-transparent text-sm"
      onClick={() => {
        if (isOrderDetails) {
          router.push(`/account/orders`);
        } else {
          router.back();
        }
      }}
      aria-label="Go back"
    >
      {locale === "en" ? (
        <ArrowLeft className="size-5" />
      ) : (
        <ArrowLeft className="size-5 rotate-180" />
      )}
      {tCommon("GoBack")}
    </Button>
  );
}
