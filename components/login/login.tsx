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
import {
  loginForm,
  loginSchema,
  PhoneLoginForm,
  phoneLoginSchema,
} from "@/types/auth";
import { toast } from "sonner";
import { useState } from "react";
import { useLocale } from "next-intl";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { http, ValidationError } from "@/lib/http";
import AuthSubmitBtn from "../auth/auth-submit-btn";
import { Link, useRouter } from "@/i18n/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import { useForm, SubmitHandler } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";

export default function Login() {
  const router = useRouter();
  const locale = useLocale();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<"email" | "phone">("email");

  const {
    register,
    handleSubmit,
    setError: setErrorNormal,
    formState: { errors },
  } = useForm<loginForm>({
    resolver: zodResolver(loginSchema),
  });

  const {
    register: registerPhone,
    handleSubmit: handleSubmitPhone,
    setError: setErrorPhone,
    formState: { errors: errorsPhone },
  } = useForm<PhoneLoginForm>({
    resolver: zodResolver(phoneLoginSchema),
  });

  const onSubmitNormal: SubmitHandler<loginForm> = async (data) => {
    setIsLoading(true);
    try {
      await http.post("/api/v1/auth/login", { ...data, locale });
      toast.success("Login successful");
      router.push("/");
    } catch (err) {
      if (err instanceof ValidationError) {
        Object.entries(err.errors).forEach(([field, messages]) => {
          setErrorNormal(field as keyof loginForm, {
            type: "server",
            message: messages[0],
          });
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitPhone: SubmitHandler<PhoneLoginForm> = async (data) => {
    setIsLoading(true);
    try {
      await http.post("/api/v1/auth/login/phone", { ...data, locale });
      toast.success("Login successful");
      router.push("/");
    } catch (err) {
      if (err instanceof ValidationError) {
        Object.entries(err.errors).forEach(([field, messages]) => {
          setErrorPhone(field as keyof PhoneLoginForm, {
            type: "server",
            message: messages[0],
          });
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-md mx-4">
      <CardContent className="p-8">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-full bg-linear-to-br from-primary to-secondary mx-auto mb-4"></div>
          <h1 className="text-3xl font-playfair font-bold text-foreground">
            Welcome Back
          </h1>
          <p className="text-foreground/60 text-sm mt-2">
            Sign in to your account
          </p>
        </div>

        <div className="mb-6 flex border-b border-border">
          <Button
            variant="ghost"
            className={`flex-1 h-11 rounded-none border-0 ${activeTab === "email" ? "border-b-4 border-primary" : ""}`}
            onClick={() => setActiveTab("email")}
          >
            Email
          </Button>
          <Button
            variant="ghost"
            className={`flex-1 h-11 rounded-none border-0 ${activeTab === "phone" ? "border-b-4 border-primary" : ""}`}
            onClick={() => setActiveTab("phone")}
          >
            Phone Number
          </Button>
        </div>

        {activeTab === "email" && (
          <form
            onSubmit={handleSubmit(onSubmitNormal)}
            className="flex flex-col gap-4"
          >
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

            <div className="flex justify-end">
              <Link href="/forgot-password" className="text-sm text-primary">
                Forgot Password?
              </Link>
            </div>

            <AuthSubmitBtn isLoading={isLoading} label="Sign In" />
          </form>
        )}

        {activeTab === "phone" && (
          <form
            onSubmit={handleSubmitPhone(onSubmitPhone)}
            className="flex flex-col gap-4"
          >
            <Field>
              <FieldLabel htmlFor="phone">Phone</FieldLabel>
              <FieldContent>
                <div className="space-y-1">
                  <InputGroup className="h-11">
                    <InputGroupAddon className="border-e px-4">
                      AE&nbsp;&nbsp;+971
                    </InputGroupAddon>

                    <InputGroupInput
                      type="tel"
                      placeholder="50 123 4567"
                      {...registerPhone("phone")}
                    />
                  </InputGroup>
                  <FieldError errors={[errorsPhone.phone]} />
                </div>
              </FieldContent>
            </Field>

            <AuthSubmitBtn isLoading={isLoading} label="Send OTP" />
          </form>
        )}

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
