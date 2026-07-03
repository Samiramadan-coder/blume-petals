"use client";

import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

import { toast } from "sonner";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import AuthCard from "../shared/auth-card";
import { Input } from "@/components/ui/input";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { http, ValidationError } from "@/lib/http";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import AuthSubmitBtn from "@/components/auth/shared/auth-submit-btn";
import { ResetPasswordForm, resetPasswordSchema } from "@/types/auth";

export default function ResetPassword() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit: SubmitHandler<ResetPasswordForm> = async (data) => {
    try {
      await http.post("/api/v1/auth/password/reset", {
        ...data,
        token: "test",
      });
      toast.success(
        "Password reset successful. Please log in with your new password.",
      );
      router.push("/login");
    } catch (err) {
      if (err instanceof ValidationError) {
        Object.entries(err.errors).forEach(([field, messages]) => {
          toast.error(messages[0]);
          setError(field as keyof ResetPasswordForm, {
            type: "server",
            message: messages[0],
          });
        });
      } else {
        toast.error(
          "An error occurred while resetting the password. Please try again.",
        );
      }
    }
  };

  return (
    <AuthCard>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="text-center">
          <h1 className="text-3xl font-playfair font-bold text-foreground">
            Reset Password
          </h1>
        </div>

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <FieldContent>
            <div className="space-y-1">
              <Input
                {...register("email")}
                placeholder="Enter your email"
                className="h-11"
              />
              <FieldError errors={[errors.email]} />
            </div>
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
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
          <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
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

        <AuthSubmitBtn isLoading={isSubmitting} label="Reset Password" />
      </form>
    </AuthCard>
  );
}
