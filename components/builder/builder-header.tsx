"use client";

import { useRouter } from "@/i18n/navigation";

import { X } from "lucide-react";

import { Button } from "../ui/button";

export default function BuilderHeader() {
  const router = useRouter();

  return (
    <header className="py-5 border-b border-border sticky top-0 z-50 bg-background">
      <div className="container max-w-5xl flex items-center justify-between">
        <h1 className="text-2xl text-foreground">Design Your Bouquet</h1>
        <Button
          size="lg"
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
