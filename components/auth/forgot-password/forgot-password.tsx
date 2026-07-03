"use client";

import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { toast } from "sonner";
import { Link } from "@/i18n/navigation";
import AuthCard from "../shared/auth-card";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight, LockIcon } from "lucide-react";
import { http, ValidationError } from "@/lib/http";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthSubmitBtn from "../shared/auth-submit-btn";
import { useForm, SubmitHandler } from "react-hook-form";
import { ForgotPasswordForm, forgotPasswordSchema } from "@/types/auth";
import { useLocale } from "next-intl";

export default function ForgotPassword() {
  const t = useTranslations("ForgotPassword");
  const locale = useLocale();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit: SubmitHandler<ForgotPasswordForm> = async (data) => {
    try {
      await http.post("/api/v1/auth/password/forgot", data);
      toast.success(t("ResetLinkSent"));
    } catch (err) {
      if (err instanceof ValidationError) {
        Object.entries(err.errors).forEach(([field, messages]) => {
          toast.error(messages[0]);
          setError(field as keyof ForgotPasswordForm, {
            type: "server",
            message: messages[0],
          });
        });
      } else {
        toast.error(t("SomethingWrong"));
      }
    }
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

        <Field>
          <FieldLabel htmlFor="email">{t("EmailLabel")}</FieldLabel>
          <FieldContent>
            <div className="space-y-1">
              <Input
                {...register("email")}
                placeholder={t("EmailPlaceholder")}
                className="h-11"
              />
              <FieldError errors={[errors.email]} />
            </div>
          </FieldContent>
        </Field>

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
