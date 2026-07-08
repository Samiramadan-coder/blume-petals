"use client";

import { useState } from "react";
import { FaApple } from "react-icons/fa";
import { Link } from "@/i18n/navigation";
import AuthCard from "../shared/auth-card";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import RegisterWithEmail from "./forms/with-email";
import RegisterWithPhone from "./forms/with-phone";
import { Separator } from "@/components/ui/separator";
import GoogleLoginButton from "@/components/reusable/form/sign-in-with-google";

export default function Register() {
  const t = useTranslations("Register");
  const tFields = useTranslations("Fields");
  const [activeTab, setActiveTab] = useState<"email" | "phone">("email");

  return (
    <>
      <AuthCard>
        <div className="text-center mb-6">
          <div className="text-4xl font-bold text-foreground mb-4">𝔹</div>
          <h1 className="text-3xl font-playfair font-bold text-foreground">
            {t("CreateAccountTitle")}
          </h1>
          <p className="text-foreground/60 text-sm mt-2">{t("JoinMessage")}</p>
        </div>

        <div className="mb-8 flex border-b border-border">
          <Button
            variant="ghost"
            className={`text-base flex-1 h-11 rounded-none cursor-pointer border-0 ${activeTab === "email" ? "border-b-4 border-primary text-primary" : "text-muted-foreground"}`}
            onClick={() => setActiveTab("email")}
            type="button"
          >
            {tFields("Labels.Email")}
          </Button>
          <Button
            variant="ghost"
            className={`text-base flex-1 h-11 rounded-none cursor-pointer border-0 ${activeTab === "phone" ? "border-b-4 border-primary text-primary" : "text-muted-foreground"}`}
            onClick={() => setActiveTab("phone")}
            type="button"
          >
            {tFields("Labels.Phone")}
          </Button>
        </div>

        {activeTab === "email" && <RegisterWithEmail />}
        {activeTab === "phone" && <RegisterWithPhone />}

        <div className="my-8 relative">
          <Separator />
          <p className="absolute left-1/2 -top-2 -translate-x-1/2 text-center text-xs text-foreground/60 bg-white px-2">
            {t("OrContinueWith")}
          </p>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <GoogleLoginButton />
          </div>

          <Button
            variant="outline"
            className="flex-1 h-10 rounded-xs bg-white cursor-pointer"
          >
            <FaApple size={20} className="mr-2" />
            {t("Apple")}
          </Button>
        </div>

        <p className="text-sm text-foreground/60 text-center mt-4">
          {t("AlreadyHaveAccount")}{" "}
          <Link href="/login" className="text-primary">
            {t("SignIn")}
          </Link>
        </p>
      </AuthCard>
    </>
  );
}
