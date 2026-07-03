"use client";

import { useState } from "react";
import { FaApple } from "react-icons/fa";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { FcGoogle } from "react-icons/fc";
import PhoneLogin from "./forms/phone-login";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import NormalLoginForm from "./forms/normal-login-form";
import AuthCard from "../shared/auth-card";

export default function Login() {
  const t = useTranslations("Login");
  const [activeTab, setActiveTab] = useState<"email" | "phone">("email");

  return (
    <AuthCard>
      <div className="text-center mb-8">
        <div className="w-12 h-12 rounded-full bg-linear-to-br from-primary to-secondary mx-auto mb-4"></div>
        <h1 className="text-3xl font-playfair font-bold text-foreground">
          {t("WelcomeBack")}
        </h1>
        <p className="text-foreground/60 text-sm mt-2">
          {t("SignInDescription")}
        </p>
      </div>

      <div className="mb-8 mx-4 flex border-b border-border">
        <Button
          variant="ghost"
          className={`flex-1 h-11 rounded-none cursor-pointer border-0 ${activeTab === "email" ? "border-b-4 border-primary" : ""}`}
          onClick={() => setActiveTab("email")}
        >
          {t("EmailTab")}
        </Button>
        <Button
          variant="ghost"
          className={`flex-1 h-11 rounded-none cursor-pointer border-0 ${activeTab === "phone" ? "border-b-4 border-primary" : ""}`}
          onClick={() => setActiveTab("phone")}
        >
          {t("PhoneTab")}
        </Button>
      </div>

      {activeTab === "email" && <NormalLoginForm />}

      {activeTab === "phone" && <PhoneLogin />}

      <div className="my-6 relative">
        <Separator />
        <p className="absolute left-1/2 -top-2 -translate-x-1/2 text-center text-xs text-foreground/60 bg-white px-2">
          {t("OrContinueWith")}
        </p>
      </div>

      <div className="flex gap-4">
        <Button variant="outline" className="flex-1 h-11">
          <FcGoogle size={20} className="mr-2" />
          {t("Google")}
        </Button>

        <Button variant="outline" className="flex-1 h-11">
          <FaApple size={20} className="mr-2" />
          {t("Apple")}
        </Button>
      </div>

      <p className="text-xs text-foreground/60 text-center mt-4">
        {t("NoAccount")}{" "}
        <Link href="/register" className="text-primary">
          {t("SignUp")}
        </Link>
      </p>
    </AuthCard>
  );
}
