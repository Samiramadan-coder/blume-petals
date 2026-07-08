import { toast } from "sonner";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useRouter } from "@/i18n/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import AuthSubmitBtn from "../../shared/auth-submit-btn";
import { registerUserWithEmail } from "@/lib/auth-actions";
import FormInput from "@/components/reusable/form/form-input";
import { RegisterFormWithEmail, registerSchemawithEmail } from "@/types/auth";

export default function RegisterWithEmail() {
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
