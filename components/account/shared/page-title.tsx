"use client";

import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";

export default function PageTitle({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  const locale = useLocale();

  return (
    <div className="flex items-center justify-between gap-4">
      <h1
        className={cn("text-xl md:text-3xl font-bold text-foreground", {
          "font-heading": locale === "en",
        })}
      >
        {title}
      </h1>
      {children}
    </div>
  );
}
