"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMsg from "@/components/forms/error-msg";
import { Button } from "@/components/ui/button";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    console.log(data);
  };

  return (
    <Card className="w-md">
      <CardContent className="p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-linear-to-br from-primary to-secondary mx-auto mb-4"></div>
            <h1 className="text-3xl font-playfair font-bold text-foreground">
              Welcome Back
            </h1>
            <p className="text-foreground/60 text-sm mt-2">
              Sign in to your account
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
                {errors.password && (
                  <ErrorMsg>{errors.password.message}</ErrorMsg>
                )}
              </div>
            </FieldContent>
          </Field>

          <div className="flex justify-end">
            <Link href="/forgot-password" className="text-sm text-primary">
              Forgot Password?
            </Link>
          </div>

          <Button
            variant="ghost"
            type="submit"
            className="h-11 text-foreground font-semibold bg-primary"
          >
            Sign In
          </Button>
        </form>

        <div className="my-6 relative">
          <Separator />
          <p className="absolute left-1/2 -top-2 -translate-x-1/2 text-center text-xs text-foreground/60 bg-white px-2">
            Or continue with
          </p>
        </div>

        <div className="flex gap-4">
          <Button variant="outline" className="flex-1 h-11">
            <FcGoogle size={20} className="mr-2" />
            Google
          </Button>

          <Button variant="outline" className="flex-1 h-11">
            <FaApple size={20} className="mr-2" />
            Apple
          </Button>
        </div>

        <p className="text-xs text-foreground/60 text-center mt-4">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-primary">
            Sign Up
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
