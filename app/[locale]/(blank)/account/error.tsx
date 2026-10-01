"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, RefreshCcw } from "lucide-react";

type ErrorPageProps = {
  error: Error & { digest?: string };
  unstable_retry: () => void;
};

export default function AccountError({
  error,
  unstable_retry,
}: ErrorPageProps) {
  const t = useTranslations("Common");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Card className="shadow-sm py-10" role="alert">
      <CardContent className="flex flex-col items-center gap-4 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle
            className="size-7 text-destructive"
            strokeWidth={1.7}
            aria-hidden="true"
          />
        </div>

        <h1 className="text-xl font-bold text-foreground">
          {t("ErrorHappened")}
        </h1>

        <p className="max-w-md text-sm text-muted-foreground">
          {t("CantLoadData")}
        </p>

        {error.digest && (
          <p dir="ltr" className="text-xs text-muted-foreground">
            Error ID: {error.digest}
          </p>
        )}

        <Button
          type="button"
          // `unstable_retry` re-fetches the failed server data.
          onClick={() => unstable_retry()}
          className="h-11 rounded-full px-7"
          aria-label="Try Again"
        >
          <RefreshCcw className="me-2 size-4" />
          {t("TryAgain")}
        </Button>
      </CardContent>
    </Card>
  );
}
