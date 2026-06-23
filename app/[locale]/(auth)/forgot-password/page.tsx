"use client";

import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import ErrorMsg from "@/components/forms/error-msg";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { useForm, SubmitHandler } from "react-hook-form";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { ArrowLeft } from "lucide-react";
import { FaEnvelope } from "react-icons/fa";

const forgotPasswordSchema = z.object({
  email: z.email("Invalid email address"),
});

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit: SubmitHandler<ForgotPasswordForm> = async (data) => {
    console.log(data);
  };

  return (
    <Card className="w-md">
      <CardContent className="p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-linear-to-br from-primary to-secondary mx-auto mb-4"></div>
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
                {errors.email && <ErrorMsg>{errors.email.message}</ErrorMsg>}
              </div>
            </FieldContent>
          </Field>

          <Button
            variant="ghost"
            type="submit"
            className="h-11 text-foreground font-semibold bg-primary hover:bg-primary cursor-pointer"
          >
            <FaEnvelope />
            Send Reset Link
          </Button>
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
