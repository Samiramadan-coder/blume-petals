"use client";

import { toast } from "sonner";
import { useLocale } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import AuthCard from "../shared/auth-card";
import { useTranslations } from "next-intl";
import { forgotPassword } from "@/lib/auth-actions";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthSubmitBtn from "../shared/auth-submit-btn";
import { useForm, SubmitHandler } from "react-hook-form";
import FormInput from "@/components/reusable/form/form-input";
import { ArrowLeft, ArrowRight, LockIcon } from "lucide-react";
import { ForgotPasswordForm, forgotPasswordSchema } from "@/types/auth";

export default function ForgotPassword() {
  const t = useTranslations("ForgotPassword");
  const tFields = useTranslations("Fields");
  const locale = useLocale();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema(tFields)),
  });

  const onSubmit: SubmitHandler<ForgotPasswordForm> = async (data) => {
    const result = await forgotPassword(data);

    if (result.success) {
      toast.success(tFields("Messages.ResetLinkSent"));
      router.push("/reset-password");
      return;
    }

    if (result.success === false && result.errors) {
      Object.entries(result.errors).forEach(([field, message]) => {
        if (!message) return;
        toast.error(message);
        setError(field as keyof ForgotPasswordForm, {
          type: "server",
          message,
        });
      });
      return;
    }

    toast.error(tFields("Errors.SomethingWrong"));
  };

  return (
    <AuthCard>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="text-center">
          <div className="w-14 h-14 rounded-full bg-border grid place-items-center mx-auto mb-4">
            <LockIcon size={24} className="text-primary" />
          </div>
          <h1 className="text-3xl font-playfair font-bold text-foreground">
            {t("Title")}
          </h1>
          <p className="text-foreground/60 text-sm mt-2">{t("Description")}</p>
        </div>

        <FormInput
          register={register}
          name="email"
          errors={errors}
          label={tFields("Labels.Email")}
          placeholder={tFields("Placeholders.Email")}
          required
        />

        <AuthSubmitBtn isLoading={isSubmitting} label={t("SendResetLink")} />
      </form>

      <div className="flex justify-center mt-4">
        <Link href="/login" className="text-primary flex items-center">
          {locale === "ar" ? (
            <ArrowRight className="ml-2" size={16} />
          ) : (
            <ArrowLeft className="mr-2" size={16} />
          )}
          {t("BackToSignIn")}
        </Link>
      </div>
    </AuthCard>
  );
}
