"use client";

import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { toast } from "sonner";
import { Link } from "@/i18n/navigation";
import { Input } from "@/components/ui/input";
import { ArrowLeft, LockIcon } from "lucide-react";
import { http, ValidationError } from "@/lib/http";
import AuthSubmitBtn from "../auth-submit-btn";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { useForm, SubmitHandler } from "react-hook-form";
import { ForgotPasswordForm, forgotPasswordSchema } from "@/types/auth";

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit: SubmitHandler<ForgotPasswordForm> = async (data) => {
    try {
      await http.post("/api/v1/auth/password/forgot", data);
      toast.success("Reset link sent to your email.");
    } catch (err) {
      if (err instanceof ValidationError) {
        Object.entries(err.errors).forEach(([field, messages]) => {
          toast.error(messages[0]);
          setError(field as keyof ForgotPasswordForm, {
            type: "server",
            message: messages[0],
          });
        });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <Card className="w-md mx-4">
      <CardContent className="p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="text-center">
            <div className="w-14 h-14 rounded-full bg-border grid place-items-center mx-auto mb-4">
              <LockIcon size={24} className="text-primary" />
            </div>
            <h1 className="text-3xl font-playfair font-bold text-foreground">
              Forgot Password?
            </h1>
            <p className="text-foreground/60 text-sm mt-2">
              Enter your email and we&apos;ll send you a reset link.
            </p>
          </div>

          <Field>
            <FieldLabel htmlFor="email">Email Address</FieldLabel>
            <FieldContent>
              <div className="space-y-1">
                <Input
                  {...register("email")}
                  placeholder="Email Address"
                  className="h-11"
                />
                <FieldError errors={[errors.email]} />
              </div>
            </FieldContent>
          </Field>

          <AuthSubmitBtn isLoading={isSubmitting} label="Send Reset Link" />

          {/* <Button
            variant="ghost"
            type="submit"
            className="h-11 text-foreground font-semibold bg-primary hover:bg-primary cursor-pointer"
          >
            <FaEnvelope />
            Send Reset Link
          </Button> */}
        </form>

        <div className="flex justify-center mt-4">
          <Link href="/login" className="text-primary flex items-center">
            <ArrowLeft className="mr-2" size={16} />
            Back to Sign In
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
