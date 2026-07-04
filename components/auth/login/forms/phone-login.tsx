import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import {
  LoginResponse,
  OTPForm,
  otpSchema,
  PhoneLoginForm,
  phoneLoginSchema,
} from "@/types/auth";

import { toast } from "sonner";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { FieldError } from "@/components/ui/field";
import { http, ValidationError } from "@/lib/http";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthSubmitBtn from "@/components/auth/shared/auth-submit-btn";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import FormInput from "@/components/reusable/form/form-input";
import { saveToken } from "@/lib/actions";

export default function PhoneLogin() {
  const t = useTranslations("Login");
  const [openOTP, setOpenOTP] = useState(false);
  const [phone, setPhone] = useState("");

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<PhoneLoginForm>({
    resolver: zodResolver(phoneLoginSchema(t)),
  });

  const onSubmit: SubmitHandler<PhoneLoginForm> = async (data) => {
    try {
      await http.post("/api/v1/auth/otp/request", {
        ...data,
        purpose: "login",
      });

      setPhone(data.phone);
      setOpenOTP(true);
      toast.success(t("OTPSentSuccess"));
    } catch (err) {
      if (err instanceof ValidationError) {
        Object.entries(err.errors).forEach(([field, messages]) => {
          toast.error(messages[0]);
          setError(field as keyof PhoneLoginForm, {
            type: "server",
            message: messages[0],
          });
        });
      } else {
        toast.error(t("OTPSentFailed"));
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormInput
          register={register}
          name="phone"
          errors={errors}
          label={t("PhoneLabel")}
          placeholder={t("PhonePlaceholder")}
          prefix="AE +971"
          required
        />

        <AuthSubmitBtn isLoading={isSubmitting} label={t("SendOTP")} />
      </form>

      <Dialog open={openOTP} onOpenChange={setOpenOTP}>
        <OTPVerificationDialog
          phone={phone}
          onClose={() => setOpenOTP(false)}
        />
      </Dialog>
    </>
  );
}

// OTP Verification Dialog Component
function OTPVerificationDialog({
  phone,
  onClose,
}: {
  phone: string;
  onClose: () => void;
}) {
  const t = useTranslations("Login");
  const router = useRouter();

  const {
    handleSubmit,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm<OTPForm>({
    resolver: zodResolver(otpSchema(t)),
  });

  const onSubmit: SubmitHandler<OTPForm> = async (data) => {
    try {
      const { data: response } = await http.post<LoginResponse>(
        "/api/v1/auth/otp/verify",
        {
          phone,
          ...data,
          purpose: "login",
        },
      );

      await saveToken(response.data.token);
      toast.success(t("SignInSuccess"));
      router.push("/");
    } catch (err) {
      if (err instanceof ValidationError) {
        Object.entries(err.errors).forEach(([field, messages]) => {
          toast.error(messages[0]);
          setError(field as keyof OTPForm, {
            type: "server",
            message: messages[0],
          });
        });
      } else {
        toast.error(t("InvalidOTP"));
      }
    }
  };

  return (
    <DialogContent className="sm:max-w-sm">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-4"
      >
        <DialogHeader>
          <DialogTitle className="text-center">{t("EnterOTP")}</DialogTitle>
          <DialogDescription className="text-center text-sm">
            {t("OTPDescription")}
          </DialogDescription>
        </DialogHeader>

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
        <AuthSubmitBtn isLoading={isSubmitting} label={t("VerifyOTP")} />
      </form>
    </DialogContent>
  );
}
