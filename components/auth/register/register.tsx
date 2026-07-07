"use client";

import { toast } from "sonner";
import { useRef, useState } from "react";
import { FaApple } from "react-icons/fa";
import { Eye, EyeOff } from "lucide-react";
import AuthCard from "../shared/auth-card";
import { Button } from "@/components/ui/button";
import { generateRegisterOtp, registerUser } from "@/lib/auth-actions";
import { Link, useRouter } from "@/i18n/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import { useLocale, useTranslations } from "next-intl";
import { useForm, SubmitHandler, useWatch } from "react-hook-form";
import { RegisterForm, registerSchema } from "@/types/auth";
import FormInput from "@/components/reusable/form/form-input";
import AuthSubmitBtn from "@/components/auth/shared/auth-submit-btn";
import GoogleLoginButton from "@/components/reusable/form/sign-in-with-google";
import { Dialog } from "@/components/ui/dialog";
import { OTPVerificationDialog } from "../shared/otp-verification-dialog";

export default function Register() {
  const t = useTranslations("Register");
  const tFields = useTranslations("Fields");
  const tLogin = useTranslations("Login");
  const locale = useLocale();
  const router = useRouter();
  const [openOTP, setOpenOTP] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const isPhoneVerified = useRef(false);
  const form = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema(tFields)),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      password_confirmation: "",
      locale: locale,
    },
  });

  const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
    if (!isPhoneVerified.current) {
      const result = await generateRegisterOtp({ phone: data.phone });

      if (result.success) {
        setOpenOTP(true);
        toast.success(tLogin("OTPSentSuccess"));
        return;
      }
    }

    isPhoneVerified.current = false;

    const result = await registerUser(data);

    if (result.success) {
      toast.success(t("CreateAccountSuccess"));
      router.push("/login");
      return;
    }

    if (result.errors && result.errors) {
      Object.entries(result.errors).forEach(([field, message]) => {
        if (!message) return;
        setError(field as keyof RegisterForm, {
          type: "server",
          message,
        });
      });

      return;
    }

    toast.error(t("CreateAccountError"));
  };

  const phone = useWatch({
    control,
    name: "phone",
  });

  return (
    <>
      <AuthCard>
        <form
          ref={form}
          onSubmit={(e) => {
            void handleSubmit(onSubmit)(e);
          }}
          className="flex flex-col gap-4"
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-foreground mb-4">𝔹</div>
            <h1 className="text-3xl font-playfair font-bold text-foreground">
              {t("CreateAccountTitle")}
            </h1>
            <p className="text-foreground/60 text-sm mt-2">
              {t("JoinMessage")}
            </p>
          </div>

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
            name="phone"
            errors={errors}
            label={tFields("Labels.Phone")}
            placeholder={tFields("Placeholders.Phone")}
            required
            prefix="AE +971"
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
            label={tFields("Labels.ConfirmPassword")}
            placeholder={tFields("Placeholders.ConfirmPassword")}
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
          <div className="flex-1">
            <GoogleLoginButton />
          </div>

          <Button
            variant="outline"
            className="flex-1 h-10 rounded-xs bg-white cursor-pointer"
          >
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

      {openOTP && (
        <Dialog open={openOTP} onOpenChange={setOpenOTP}>
          <OTPVerificationDialog
            phone={phone}
            srcForm="register"
            onFinish={() => {
              setOpenOTP(false);
              isPhoneVerified.current = true;
              form.current?.requestSubmit();
            }}
          />
        </Dialog>
      )}
    </>
  );
}
