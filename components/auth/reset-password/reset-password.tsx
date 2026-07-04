"use client";

import { toast } from "sonner";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Eye, EyeOff } from "lucide-react";
import AuthCard from "../shared/auth-card";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { http, ValidationError } from "@/lib/http";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import FormInput from "@/components/reusable/form/form-input";
import AuthSubmitBtn from "@/components/auth/shared/auth-submit-btn";
import { ResetPasswordForm, resetPasswordSchema } from "@/types/auth";

export default function ResetPassword() {
  const t = useTranslations("ResetPassword");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema(t)),
  });

  const onSubmit: SubmitHandler<ResetPasswordForm> = async (data) => {
    try {
      await http.post("/api/v1/auth/password/reset", {
        ...data,
        token: "test",
      });
      toast.success(t("ResetSuccess"));
      router.push("/login");
    } catch (err) {
      if (err instanceof ValidationError) {
        Object.entries(err.errors).forEach(([field, messages]) => {
          toast.error(messages[0]);
          setError(field as keyof ResetPasswordForm, {
            type: "server",
            message: messages[0],
          });
        });
      } else {
        toast.error(t("ResetError"));
      }
    }
  };

  return (
    <AuthCard>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="text-center">
          <h1 className="text-3xl font-playfair font-bold text-foreground">
            {t("Title")}
          </h1>
        </div>

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
              className="h-8 w-8"
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
              className="h-8 w-8"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </Button>
          }
        />

        <AuthSubmitBtn
          isLoading={isSubmitting}
          label={t("ResetPasswordButton")}
        />
      </form>
    </AuthCard>
  );
}
