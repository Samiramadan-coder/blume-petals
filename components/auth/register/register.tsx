"use client";

import { toast } from "sonner";
import { useState } from "react";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff } from "lucide-react";
import AuthCard from "../shared/auth-card";
import { Button } from "@/components/ui/button";
import { http, ValidationError } from "@/lib/http";
import { Link, useRouter } from "@/i18n/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import { useLocale, useTranslations } from "next-intl";
import { useForm, SubmitHandler } from "react-hook-form";
import { RegisterForm, registerSchema } from "@/types/auth";
import FormInput from "@/components/reusable/form/form-input";
import AuthSubmitBtn from "@/components/auth/shared/auth-submit-btn";

export default function Register() {
  const t = useTranslations("Register");
  const locale = useLocale();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema(t)),
  });

  const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
    try {
      await http.post("/api/v1/auth/register", { ...data, locale });
      toast.success(t("CreateAccountSuccess"));
      router.push("/login");
    } catch (err) {
      if (err instanceof ValidationError) {
        Object.entries(err.errors).forEach(([field, messages]) => {
          toast.error(messages[0]);
          setError(field as keyof RegisterForm, {
            type: "server",
            message: messages[0],
          });
        });
      } else {
        toast.error(t("CreateAccountError"));
      }
    }
  };

  return (
    <AuthCard>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="text-center">
          <div className="text-4xl font-bold text-foreground mb-4">𝔹</div>
          <h1 className="text-3xl font-playfair font-bold text-foreground">
            {t("CreateAccountTitle")}
          </h1>
          <p className="text-foreground/60 text-sm mt-2">{t("JoinMessage")}</p>
        </div>

        <FormInput
          register={register}
          name="name"
          errors={errors}
          label={t("FullNameLabel")}
          placeholder={t("FullNamePlaceholder")}
          required
        />

        <FormInput
          register={register}
          name="email"
          errors={errors}
          label={t("EmailLabel")}
          placeholder={t("EmailPlaceholder")}
          required
        />

        <FormInput
          register={register}
          name="phone"
          errors={errors}
          label={t("PhoneLabel")}
          placeholder={t("PhonePlaceholder")}
          required
          prefix="AE +971"
        />

        <FormInput
          register={register}
          name="password"
          errors={errors}
          label={t("PasswordLabel")}
          placeholder={t("PasswordPlaceholder")}
          required
          type={showPassword ? "text" : "password"}
          suffix={
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="w-8 h-8"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </Button>
          }
        />

        <FormInput
          register={register}
          name="password_confirmation"
          errors={errors}
          label={t("ConfirmPasswordLabel")}
          placeholder={t("ConfirmPasswordPlaceholder")}
          required
          type={showPassword ? "text" : "password"}
          suffix={
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="w-8 h-8"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </Button>
          }
        />

        <p className="text-xs text-foreground/60 text-center">
          {t("AgreeText")}{" "}
          <Link href="" className="text-primary">
            {t("TermsConditions")}
          </Link>{" "}
          {t("And", { defaultValue: "and" })}{" "}
          <Link href="" className="text-primary">
            {t("PrivacyPolicy")}
          </Link>
        </p>

        <AuthSubmitBtn
          isLoading={isSubmitting}
          label={t("CreateAccountButton")}
        />
      </form>

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
        {t("AlreadyHaveAccount")}{" "}
        <Link href="/login" className="text-primary">
          {t("SignIn")}
        </Link>
      </p>
    </AuthCard>
  );
}
