import {
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

import { toast } from "sonner";
import { saveToken } from "@/lib/actions";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import AuthSubmitBtn from "./auth-submit-btn";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { FieldError } from "@/components/ui/field";
import { http, ValidationError } from "@/lib/http";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginResponse, OTPForm, otpSchema } from "@/types/auth";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

export function OTPVerificationDialog({ phone }: { phone: string }) {
  const t = useTranslations("Login");
  const tFields = useTranslations("Fields");
  const router = useRouter();

  const {
    handleSubmit,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm<OTPForm>({
    resolver: zodResolver(otpSchema(tFields)),
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
      toast.success(tFields("Messages.SignInSuccess"));
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
        toast.error(tFields("Errors.InvalidOTP"));
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
          <DialogTitle className="text-center mb-2">
            {t("EnterOTP")}
          </DialogTitle>
          <DialogDescription className="text-center text-sm flex flex-col gap-1">
            <span>{t("OTPDescription")}</span>
            <span className="text-secondary">
              +971{phone.slice(0, 2)}****{phone.slice(-2)}
            </span>
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
