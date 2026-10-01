"use client";

import { useTransition } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCcw } from "lucide-react";

export default function NotificationsError() {
  const router = useRouter();
  const t = useTranslations("Common");
  const [isRetrying, startRetry] = useTransition();

  return (
    <div
      role="alert"
      className="flex flex-col items-center gap-4 px-6 py-16 text-center"
    >
      <div className="flex size-16 items-center justify-center rounded-full bg-destructive/10">
        <AlertTriangle
          className="size-7 text-destructive"
          strokeWidth={1.7}
          aria-hidden="true"
        />
      </div>

      <p className="max-w-md text-sm text-muted-foreground">
        {t("CantLoadData")}
      </p>

      <Button
        type="button"
        disabled={isRetrying}
        onClick={() => startRetry(() => router.refresh())}
        className="h-11 rounded-full px-7"
      >
        <RefreshCcw className="me-2 size-4" />
        {t("TryAgain")}
      </Button>
    </div>
  );
}
