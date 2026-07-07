import { toast } from "sonner";
import { useState } from "react";
import { saveToken } from "@/lib/actions";
import { Eye, EyeOff } from "lucide-react";
import { useTranslations } from "next-intl";
import { loginUser } from "@/lib/auth-actions";
import { Button } from "@/components/ui/button";
import { Link, useRouter } from "@/i18n/navigation";
import { LoginForm, loginSchema } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import FormInput from "@/components/reusable/form/form-input";
import AuthSubmitBtn from "@/components/auth/shared/auth-submit-btn";

export default function NormalLoginForm() {
  const t = useTranslations("Login");
  const tFields = useTranslations("Fields");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema(tFields)),
  });

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    const result = await loginUser(data);

    if (result.success) {
      await saveToken(result.token);
      toast.success(t("SignInSuccess"));
      router.push("/");
      return;
    }

    if (result.success === false && result.errors) {
      Object.entries(result.errors).forEach(([field, message]) => {
        if (!message) return;
        toast.error(message);
        setError(field as keyof LoginForm, {
          type: "server",
          message,
        });
      });
      return;
    }

    toast.error(t("SignInError"));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <FormInput
        name="email"
        register={register}
        errors={errors}
        label={tFields("Labels.Email")}
        placeholder={tFields("Placeholders.Email")}
        required
      />

      <FormInput
        name="password"
        register={register}
        errors={errors}
        label={tFields("Labels.Password")}
        placeholder={tFields("Placeholders.Password")}
        type={showPassword ? "text" : "password"}
        required
        suffix={
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </Button>
        }
      />

      <div className="flex justify-end">
        <Link href="/forgot-password" className="text-sm text-primary">
          {t("ForgotPassword")}
        </Link>
      </div>

      <AuthSubmitBtn isLoading={isSubmitting} label={t("SignInButton")} />
    </form>
  );
}
