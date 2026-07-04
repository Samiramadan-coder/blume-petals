import { toast } from "sonner";
import { useState } from "react";
import { saveToken } from "@/lib/actions";
import { Eye, EyeOff } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { http, ValidationError } from "@/lib/http";
import { Link, useRouter } from "@/i18n/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import FormInput from "@/components/reusable/form/form-input";
import AuthSubmitBtn from "@/components/auth/shared/auth-submit-btn";
import { LoginForm, LoginResponse, loginSchema } from "@/types/auth";

export default function NormalLoginForm() {
  const t = useTranslations("Login");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema(t)),
  });

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    try {
      const { data: response } = await http.post<LoginResponse>(
        "/api/v1/auth/login",
        data,
      );

      await saveToken(response.data.token);
      toast.success(t("SignInSuccess"));
      router.push("/");
    } catch (err) {
      if (err instanceof ValidationError) {
        Object.entries(err.errors).forEach(([field, messages]) => {
          toast.error(messages[0]);
          setError(field as keyof LoginForm, {
            type: "server",
            message: messages[0],
          });
        });
      } else {
        toast.error(t("SignInError"));
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <FormInput
        name="email"
        register={register}
        errors={errors}
        label={t("EmailLabel")}
        placeholder={t("EmailPlaceholder")}
        required
      />

      <FormInput
        name="password"
        register={register}
        errors={errors}
        label={t("PasswordLabel")}
        placeholder={t("PasswordPlaceholder")}
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
