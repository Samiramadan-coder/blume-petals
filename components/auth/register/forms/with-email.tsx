import { toast } from "sonner";
import { useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { OTPDialog } from "../../shared/otp-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import AuthSubmitBtn from "../../shared/auth-submit-btn";
import { registerUserWithEmail } from "@/lib/auth-actions";
import FormInput from "@/components/reusable/form/form-input";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { RegisterFormWithEmail, registerSchemawithEmail } from "@/types/auth";

export default function RegisterWithEmail() {
  const locale = useLocale();
  const t = useTranslations("Register");
  const tCommon = useTranslations("Common");
  const tFields = useTranslations("Fields");
  const [openOTP, setOpenOTP] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormWithEmail>({
    resolver: zodResolver(registerSchemawithEmail(tFields)),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      locale: locale,
      device_name: "web",
    },
  });

  // Watch the email field to pass it to the OTP dialog
  const email = useWatch({ control, name: "email" });

  // Handle form submission
  const onSubmit: SubmitHandler<RegisterFormWithEmail> = async (data) => {
    const result = await registerUserWithEmail(data);

    if (result.success) {
      toast.success(tCommon("OtpSentEmail"));
      setOpenOTP(true);
      return;
    }

    if (result.errors && result.errors) {
      Object.entries(result.errors).forEach(([field, message]) => {
        if (!message) return;
        setError(field as keyof RegisterFormWithEmail, {
          type: "server",
          message,
        });
      });

      return;
    }

    toast.error(tFields("Errors.CreateAccountError"));
  };

  return (
    <>
      <form
        onSubmit={(e) => void handleSubmit(onSubmit)(e)}
        className="flex flex-col gap-4"
        ref={formRef}
      >
        <FormInput
          register={register}
          name="name"
          errors={errors}
          label={tFields("Labels.FullName")}
          placeholder={tFields("Placeholders.FullName")}
          required
        />

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
              className="w-8 h-8 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <EyeOff className="size-5" />
              ) : (
                <Eye className="size-5" />
              )}
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
              className="w-8 h-8 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <EyeOff className="size-5" />
              ) : (
                <Eye className="size-5" />
              )}
            </Button>
          }
        />

        <p className="text-xs text-foreground/60 text-center">
          {t("AgreeText")}{" "}
          <Link href="" className="text-primary font-semibold">
            {t("TermsConditions")}
          </Link>{" "}
          {t("And", { defaultValue: "and" })}{" "}
          <Link href="" className="text-primary font-semibold">
            {t("PrivacyPolicy")}
          </Link>
        </p>

        <AuthSubmitBtn
          isLoading={isSubmitting}
          label={t("CreateAccountButton")}
        />
      </form>

      {openOTP && (
        <Dialog open={openOTP} onOpenChange={setOpenOTP}>
          <OTPDialog
            endPoint="/api/v1/auth/register/verify"
            subtitle={t("OtpSentToEmail")}
            extraData={{ email, device_name: "web" }}
            resendOTP={() => formRef?.current?.requestSubmit?.()}
            loadingResendOTP={isSubmitting}
          />
        </Dialog>
      )}
    </>
  );
}
