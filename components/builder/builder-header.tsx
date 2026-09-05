"use client";

import { X } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function BuilderHeader() {
  const t = useTranslations("CustomBuilder");
  const router = useRouter();

  return (
    <header className="py-5 border-b border-border sticky top-0 z-50 bg-background">
      <div className="container max-w-3xl flex items-center justify-between">
        <h1 className="text-2xl text-foreground">{t("DesignYourBouquet")}</h1>
        <Button
          size="lg"
          aria-label="Close Builder"
          variant="ghost"
          className="cursor-pointer hover:bg-border"
          onClick={() => router.back()}
        >
          <X size={24} />
        </Button>
      </div>
    </header>
  );
}
