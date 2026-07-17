"use client";

import { toast } from "sonner";
import { Link } from "@/i18n/navigation";
import AuthCard from "../shared/auth-card";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import PhoneLogin from "./forms/phone-login";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import AppleLoginButton from "../shared/apple-signin";
import NormalLoginForm from "./forms/normal-login-form";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import GoogleLoginButton from "@/components/reusable/form/sign-in-with-google";

export default function Login() {
  const t = useTranslations("Login");
  const tFields = useTranslations("Fields");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<"email" | "phone">("email");

  useEffect(() => {
    const error = searchParams.get("error");

    if (!error) return;

    toast.error(tFields("Errors.SignInError"));
    router.replace(pathname);
  }, [pathname, router, searchParams, tFields]);

  return (
    <AuthCard>
      <div className="text-center mb-6 md:mb-8">
        <div className="w-12 h-12 rounded-full bg-linear-to-br from-primary to-secondary mx-auto mb-4"></div>
        <h1 className="text-2xl md:text-3xl font-playfair font-bold text-foreground">
          {t("WelcomeBack")}
        </h1>
        <p className="text-foreground/60 text-sm mt-2">
          {t("SignInDescription")}
        </p>
      </div>

      <div className="mb-8 flex border-b border-border">
        <Button
          variant="ghost"
          className={`text-base flex-1 h-12 rounded-none cursor-pointer border-0 ${activeTab === "email" ? "border-b-4 border-primary text-primary" : "text-muted-foreground"}`}
          onClick={() => setActiveTab("email")}
        >
          {tFields("Labels.Email")}
        </Button>
        <Button
          variant="ghost"
          className={`text-base flex-1 h-12 rounded-none cursor-pointer border-0 ${activeTab === "phone" ? "border-b-4 border-primary text-primary" : "text-muted-foreground"}`}
          onClick={() => setActiveTab("phone")}
        >
          {tFields("Labels.Phone")}
        </Button>
      </div>

      {activeTab === "email" && <NormalLoginForm />}

      {activeTab === "phone" && <PhoneLogin />}

      <div className="my-6 md:my-8 relative">
        <Separator />
        <p className="absolute left-1/2 -top-2 -translate-x-1/2 text-center text-xs text-foreground/60 bg-white px-2">
          {t("OrContinueWith")}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 md:gap-4">
        <div>
          <GoogleLoginButton />
        </div>

        <AppleLoginButton />
      </div>

      <p className="text-sm text-foreground/60 text-center mt-4">
        {t("NoAccount")}{" "}
        <Link href="/register" className="text-primary">
          {t("CreateOne")}
        </Link>
      </p>
    </AuthCard>
  );
}
