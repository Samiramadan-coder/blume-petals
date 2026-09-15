"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import z from "zod";
import { toast } from "sonner";
import { useLocale } from "next-intl";
import { T } from "@/constants/shared";
import { useRef, useState } from "react";
import AuthCard from "../shared/auth-card";
import { useTranslations } from "next-intl";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Button } from "@/components/ui/button";
import { FieldError } from "@/components/ui/field";
import { forgotPassword } from "@/lib/auth-actions";
import { Link, useRouter } from "@/i18n/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import AppLogo from "@/components/reusable/app-logo";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthSubmitBtn from "../shared/auth-submit-btn";
import FormInput from "@/components/reusable/form/form-input";
import { useForm, SubmitHandler, Controller, useWatch } from "react-hook-form";
import { ForgotPasswordForm, forgotPasswordSchema } from "@/types/auth";

export default function ForgotPassword() {
  const locale = useLocale();
  const tFields = useTranslations("Fields");
  const t = useTranslations("ForgotPassword");
  const [isOTPOpen, setIsOTPOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema(tFields)),
  });

  // Watch the email field value to use it elsewhere in the component
  const email = useWatch({ control: control, name: "email" });

  const onSubmit: SubmitHandler<ForgotPasswordForm> = async (data) => {
    const result = await forgotPassword(data);

    if (result.success) {
      toast.success(tFields("Messages.ResetLinkSent"));
      setIsOTPOpen(true);
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
    <>
      <AuthCard>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <AppLogo width={110} />
            </div>
            <h1 className="text-2xl md:text-3xl font-playfair font-bold text-foreground">
              {t("Title")}
            </h1>
            <p className="text-foreground/60 text-sm mt-2">
              {t("Description")}
            </p>
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

      <Dialog open={isOTPOpen}>
        <OTPInputField email={email} />
      </Dialog>
    </>
  );
}

// OTPInputField component for entering the verification code
const otpFormSchema = (t: T) =>
  z.object({
    code: z.string().min(6, t("CodeMustBe6Digits")),
  });

type OTPForm = z.infer<ReturnType<typeof otpFormSchema>>;

function OTPInputField({ email }: { email: string }) {
  const router = useRouter();
  const t = useTranslations("ForgotPassword");

  const form = useRef<HTMLFormElement | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OTPForm>({
    defaultValues: { code: "" },
    resolver: zodResolver(otpFormSchema(t)),
  });

  const onSubmit: SubmitHandler<OTPForm> = (data) => {
    router.push(`/reset-password?code=${data.code}&email=${email}`);
  };

  return (
    <DialogContent className="sm:max-w-sm">
      <DialogHeader>
        <DialogTitle>{t("VerificationCode")}</DialogTitle>
        <DialogDescription>{t("EnterVerificationCode")}</DialogDescription>
      </DialogHeader>
      <form
        ref={form}
        className="flex flex-col gap-2 items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          control={control}
          name="code"
          render={({ field }) => (
            <InputOTP
              maxLength={6}
              value={field.value}
              onChange={field.onChange}
              pattern={REGEXP_ONLY_DIGITS}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          )}
        />

        <FieldError errors={[errors.code]} />
      </form>
      <DialogFooter>
        <Button
          type="submit"
          className="px-4 text-foreground font-semibold rounded-sm h-10"
          onClick={() => form.current?.requestSubmit()}
        >
          {t("Verify")}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
