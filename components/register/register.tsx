"use client";

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

import { toast } from "sonner";
import { useState } from "react";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { http, ValidationError } from "@/lib/http";
import { Link, useRouter } from "@/i18n/navigation";
import AuthSubmitBtn from "../auth/auth-submit-btn";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import { useLocale, useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { useForm, SubmitHandler } from "react-hook-form";
import { RegisterForm, registerSchema } from "@/types/auth";

export default function Register() {
  const t = useTranslations("Register");
  const locale = useLocale();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
    try {
      await http.post("/api/v1/auth/register", { ...data, locale });
      toast.success(t("CreateAccountSuccess"));
      router.push("/login");
    } catch (err) {
      if (err instanceof ValidationError) {
        Object.entries(err.errors).forEach(([field, messages]) => {
          toast.error(messages[0]);
          setError(field as keyof RegisterForm, {
            type: "server",
            message: messages[0],
          });
        });
      } else {
        toast.error(t("CreateAccountError"));
      }
    }
  };

  return (
    <Card className="w-md mx-4">
      <CardContent className="p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="text-center">
            <div className="text-4xl font-bold text-foreground mb-4">𝔹</div>
            <h1 className="text-3xl font-playfair font-bold text-foreground">
              {t("CreateAccountTitle")}
            </h1>
            <p className="text-foreground/60 text-sm mt-2">
              {t("JoinMessage")}
            </p>
          </div>

          <Field>
            <FieldLabel htmlFor="fullName">{t("FullNameLabel")}</FieldLabel>
            <FieldContent>
              <div className="space-y-1">
                <Input
                  {...register("name")}
                  placeholder={t("FullNamePlaceholder")}
                  className="h-11"
                />
                <FieldError errors={[errors.name]} />
              </div>
            </FieldContent>
          </Field>

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
                <FieldError errors={[errors.phone]} />
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

          <Field>
            <FieldLabel htmlFor="confirmPassword">
              {t("ConfirmPasswordLabel")}
            </FieldLabel>
            <FieldContent>
              <div className="space-y-1">
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    className="h-11"
                    {...register("password_confirmation")}
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
                <FieldError errors={[errors.password_confirmation]} />
              </div>
            </FieldContent>
          </Field>

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
          <Button variant="outline" className="flex-1 h-11">
            <FcGoogle size={20} className="mr-2" />
            {t("Google")}
          </Button>

          <Button variant="outline" className="flex-1 h-11">
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
      </CardContent>
    </Card>
  );
}
