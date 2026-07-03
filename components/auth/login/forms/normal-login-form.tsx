import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { toast } from "sonner";
import { useState } from "react";
import { saveToken } from "@/lib/actions";
import { Eye, EyeOff } from "lucide-react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { http, ValidationError } from "@/lib/http";
import { Link, useRouter } from "@/i18n/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
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
      <Field>
        <FieldLabel htmlFor="email">{t("EmailLabel")}</FieldLabel>
        <FieldContent>
          <div className="space-y-1">
            <Input
              {...register("email")}
              placeholder={t("EmailPlaceholder")}
              className="h-11"
            />
            <FieldError errors={[errors.email]} />
          </div>
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel htmlFor="password">{t("PasswordLabel")}</FieldLabel>
        <FieldContent>
          <div className="space-y-1">
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                className="h-11"
                {...register("password")}
              />

              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute inset-e-2 top-1/2 h-8 w-8 -translate-y-1/2"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </Button>
            </div>
            <FieldError errors={[errors.password]} />
          </div>
        </FieldContent>
      </Field>

      <div className="flex justify-end">
        <Link href="/forgot-password" className="text-sm text-primary">
          {t("ForgotPassword")}
        </Link>
      </div>

      <AuthSubmitBtn isLoading={isSubmitting} label={t("SignInButton")} />
    </form>
  );
}
