import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import {
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
import { http, ValidationError } from "@/lib/http";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthSubmitBtn from "@/components/auth/auth-submit-btn";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

export default function PhoneLogin() {
  const t = useTranslations("Login");
  const [isLoading, setIsLoading] = useState(false);
  const [openOTP, setOpenOTP] = useState(false);
  const [phone, setPhone] = useState("");

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors: errorsPhone },
  } = useForm<PhoneLoginForm>({
    resolver: zodResolver(phoneLoginSchema),
  });

  const onSubmit: SubmitHandler<PhoneLoginForm> = async (data) => {
    setIsLoading(true);
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
          setError(field as keyof PhoneLoginForm, {
            type: "server",
            message: messages[0],
          });
        });
      } else {
        toast.error(t("OTPSentFailed"));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Field>
          <FieldLabel htmlFor="phone">{t("PhoneLabel")}</FieldLabel>
          <FieldContent>
            <div className="space-y-1">
              <InputGroup className="h-11">
                <InputGroupAddon className="border-e px-4">
                  AE&nbsp;&nbsp;+971
                </InputGroupAddon>

                <InputGroupInput
                  type="tel"
                  placeholder={t("PhonePlaceholder")}
                  {...register("phone")}
                />
              </InputGroup>
              <FieldError errors={[errorsPhone.phone]} />
            </div>
          </FieldContent>
        </Field>

        <AuthSubmitBtn isLoading={isLoading} label={t("SendOTP")} />
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

function OTPVerificationDialog({
  phone,
  onClose,
}: {
  phone: string;
  onClose: () => void;
}) {
  const t = useTranslations("Login");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm<OTPForm>({
    resolver: zodResolver(otpSchema),
  });

  const onSubmit: SubmitHandler<OTPForm> = async (data) => {
    setIsLoading(true);
    try {
      await http.post("/api/v1/auth/otp/verify", {
        phone,
        ...data,
        purpose: "login",
      });

      toast.success(t("SignInSuccess"));
      onClose();
      router.push("/");
    } catch (err) {
      if (err instanceof ValidationError) {
        Object.entries(err.errors).forEach(([field, messages]) => {
          setError(field as keyof OTPForm, {
            type: "server",
            message: messages[0],
          });
        });
      } else {
        toast.error(t("InvalidOTP"));
      }
    } finally {
      setIsLoading(false);
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
        <AuthSubmitBtn isLoading={isLoading} label={t("VerifyOTP")} />
      </form>
    </DialogContent>
  );
}
