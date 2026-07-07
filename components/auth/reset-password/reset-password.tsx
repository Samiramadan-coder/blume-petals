"use client";

import { toast } from "sonner";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Eye, EyeOff } from "lucide-react";
import AuthCard from "../shared/auth-card";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { resetPassword } from "@/lib/auth-actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import FormInput from "@/components/reusable/form/form-input";
import AuthSubmitBtn from "@/components/auth/shared/auth-submit-btn";
import { ResetPasswordForm, resetPasswordSchema } from "@/types/auth";

export default function ResetPassword() {
  const t = useTranslations("ResetPassword");
  const tFields = useTranslations("Fields");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema(tFields)),
  });

  const onSubmit: SubmitHandler<ResetPasswordForm> = async (data) => {
    const result = await resetPassword(data);

    if (result.success) {
      toast.success(tFields("Messages.ResetSuccess"));
      router.push("/login");
      return;
    }

    if (result.success === false && result.errors) {
      Object.entries(result.errors).forEach(([field, message]) => {
        if (!message) return;
        toast.error(message);
        setError(field as keyof ResetPasswordForm, {
          type: "server",
          message,
        });
      });
      return;
    }
    toast.error(tFields("Errors.ResetError"));
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
          label={tFields("Labels.Email")}
          placeholder={tFields("Placeholders.Email")}
          required
        />

        <FormInput
          register={register}
          name="code"
          errors={errors}
          label={tFields("Labels.OTP")}
          placeholder={tFields("Placeholders.OTP")}
          required
        />

        <FormInput
          register={register}
          name="password"
          errors={errors}
          label={tFields("Labels.Password")}
          placeholder={tFields("Placeholders.Password")}
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
          label={tFields("Labels.ConfirmPassword")}
          placeholder={tFields("Placeholders.ConfirmPassword")}
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
