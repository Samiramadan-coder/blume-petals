"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Home, RefreshCcw } from "lucide-react";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations("Common");
  const previousUrlRef = useRef<string | null>(null);

  const currentUrlSignature = `${pathname}?${searchParams.toString()}`;

  useEffect(() => {
    console.error(error);
  }, [error]);

  useEffect(() => {
    if (previousUrlRef.current === null) {
      previousUrlRef.current = currentUrlSignature;

      return;
    }

    if (previousUrlRef.current !== currentUrlSignature) {
      previousUrlRef.current = currentUrlSignature;
      reset();
    }
  }, [currentUrlSignature, reset]);

  return (
    <main className="container flex min-h-[70vh] max-w-7xl items-center justify-center px-5 py-16">
      <div className="w-full max-w-xl rounded-3xl bg-background px-6 py-12 text-center shadow-[0_0_30px_0_rgba(202,132,156,0.2)] sm:px-10">
        <div className="mx-auto mb-7 flex size-20 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle
            className="size-9 text-destructive"
            strokeWidth={1.7}
          />
        </div>

        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          {t("ErrorHappened")}
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
          {t("CantLoadData")}
        </p>

        {error.digest && (
          <p dir="ltr" className="mt-4 text-xs text-muted-foreground">
            Error ID: {error.digest}
          </p>
        )}

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            type="button"
            onClick={reset}
            className="h-11 rounded-full px-7"
          >
            <RefreshCcw className="me-2 size-4" />
            {t("TryAgain")}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/")}
            className="h-11 rounded-full px-7"
          >
            <Home className="me-2 size-4" />
            {t("GoBack")}
          </Button>
        </div>
      </div>
    </main>
  );
}
