import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Flower2, Home, ShoppingBag } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

export default async function NotFound() {
  const locale = await getLocale();
  const t = await getTranslations("NotFound");

  return (
    <main className="relative isolate overflow-hidden bg-linear-to-br from-muted via-background to-background">
      <div
        aria-hidden="true"
        className="absolute -top-24 inset-s-1/2 -z-10 size-96 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl rtl:translate-x-1/2"
      />

      <div className="container flex min-h-[75vh] max-w-7xl items-center justify-center px-5 py-20">
        <div className="w-full max-w-2xl text-center animate-in fade-in slide-in-from-bottom-2 duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] fill-mode-both motion-reduce:animate-none">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            {t("Eyebrow")}
          </p>

          {/* The digits are decorative; the heading below carries the message. */}
          <p
            dir="ltr"
            aria-hidden="true"
            className="mt-6 flex items-center justify-center gap-2 font-heading text-[7rem] font-bold leading-none text-foreground sm:gap-4 sm:text-[11rem]"
          >
            4
            <span className="flex size-24 items-center justify-center rounded-full bg-background shadow-[0_0_40px_0_rgba(202,132,156,0.35)] sm:size-36">
              <Flower2
                className="size-14 text-primary motion-safe:animate-[spin_18s_linear_infinite] sm:size-20"
                strokeWidth={1.3}
              />
            </span>
            4
          </p>

          <h1
            className={cn(
              "mt-8 text-3xl font-bold text-foreground sm:text-4xl",
              { "font-heading": locale === "en" },
            )}
          >
            {t("Title")}
          </h1>

          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
            {t("Description")}
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild className="h-11 rounded-full px-7">
              <Link href="/">
                <Home className="me-2 size-4" />
                {t("BackHome")}
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="h-11 rounded-full px-7"
            >
              <Link href="/shop">
                <ShoppingBag className="me-2 size-4" />
                {t("BrowseShop")}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
