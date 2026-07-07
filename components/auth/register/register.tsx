"use client";

import { toast } from "sonner";
import { useState } from "react";
import { FaApple } from "react-icons/fa";
import { Eye, EyeOff } from "lucide-react";
import AuthCard from "../shared/auth-card";
import { Button } from "@/components/ui/button";
import { generateRegisterOtp, registerUserWithEmail } from "@/lib/auth-actions";
import { Link, useRouter } from "@/i18n/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import { useLocale, useTranslations } from "next-intl";
import { useForm, SubmitHandler, useWatch } from "react-hook-form";
import FormInput from "@/components/reusable/form/form-input";
import AuthSubmitBtn from "@/components/auth/shared/auth-submit-btn";
import {
  RegisterFormWithEmail,
  RegisterFormWithPhone,
  registerSchemawithEmail,
  registerSchemawithPhone,
} from "@/types/auth";
import GoogleLoginButton from "@/components/reusable/form/sign-in-with-google";
import { Dialog } from "@/components/ui/dialog";
import { OTPVerificationDialog } from "../shared/otp-verification-dialog";

export default function Register() {
  const t = useTranslations("Register");
  const tLogin = useTranslations("Login");
  const [activeTab, setActiveTab] = useState<"email" | "phone">("email");

  return (
    <>
      <AuthCard>
        <div className="text-center mb-6">
          <div className="text-4xl font-bold text-foreground mb-4">𝔹</div>
          <h1 className="text-3xl font-playfair font-bold text-foreground">
            {t("CreateAccountTitle")}
          </h1>
          <p className="text-foreground/60 text-sm mt-2">{t("JoinMessage")}</p>
        </div>

        <div className="mb-8 mx-4 flex border-b border-border">
          <Button
            variant="ghost"
            className={`flex-1 h-11 rounded-none cursor-pointer border-0 ${activeTab === "email" ? "border-b-4 border-primary" : ""}`}
            onClick={() => setActiveTab("email")}
            type="button"
          >
            {tLogin("EmailTab")}
          </Button>
          <Button
            variant="ghost"
            className={`flex-1 h-11 rounded-none cursor-pointer border-0 ${activeTab === "phone" ? "border-b-4 border-primary" : ""}`}
            onClick={() => setActiveTab("phone")}
            type="button"
          >
            {tLogin("PhoneTab")}
          </Button>
        </div>

        {activeTab === "email" && <RegisterWithEmail />}

        {activeTab === "phone" && <RegisterWithPhone />}

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
    </>
  );
}

function RegisterWithEmail() {
  const t = useTranslations("Register");
  const tFields = useTranslations("Fields");
  const locale = useLocale();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
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
    },
  });

  const onSubmit: SubmitHandler<RegisterFormWithEmail> = async (data) => {
    const result = await registerUserWithEmail(data);

    if (result.success) {
      toast.success(tFields("Messages.CreateAccountSuccess"));
      router.push("/login");
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
    <form
      onSubmit={(e) => {
        void handleSubmit(onSubmit)(e);
      }}
      className="flex flex-col gap-4"
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
  );
}

/**
 * RegisterWithPhone
 */
function RegisterWithPhone() {
  const t = useTranslations("Register");
  const tFields = useTranslations("Fields");
  const locale = useLocale();
  const [openOTP, setOpenOTP] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormWithPhone>({
    resolver: zodResolver(registerSchemawithPhone(tFields)),
    defaultValues: {
      name: "",
      phone: "",
      locale: locale,
    },
  });

  const onSubmit: SubmitHandler<RegisterFormWithPhone> = async (data) => {
    const result = await generateRegisterOtp(data);

    if (result.success) {
      setOpenOTP(true);
      toast.success(tFields("Messages.OTPSentSuccess"));
      return;
    }

    toast.error(tFields("Errors.CreateAccountError"));
  };

  const phone = useWatch({
    control,
    name: "phone",
  });

  return (
    <>
      <form
        onSubmit={(e) => {
          void handleSubmit(onSubmit)(e);
        }}
        className="flex flex-col gap-4"
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
          name="phone"
          errors={errors}
          label={tFields("Labels.Phone")}
          placeholder={tFields("Placeholders.Phone")}
          required
          prefix="AE +971"
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

      {openOTP && (
        <Dialog open={openOTP} onOpenChange={setOpenOTP}>
          <OTPVerificationDialog phone={phone} />
        </Dialog>
      )}
    </>
  );
}
