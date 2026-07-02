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
  OTPForm,
  otpSchema,
  PhoneLoginForm,
  phoneLoginSchema,
} from "@/types/auth";

import { toast } from "sonner";
import { useState } from "react";
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
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

export default function Login() {
  const [activeTab, setActiveTab] = useState<"email" | "phone">("email");

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
            className={`flex-1 h-11 rounded-none cursor-pointer border-0 ${activeTab === "email" ? "border-b-4 border-primary" : ""}`}
            onClick={() => setActiveTab("email")}
          >
            Email
          </Button>
          <Button
            variant="ghost"
            className={`flex-1 h-11 rounded-none cursor-pointer border-0 ${activeTab === "phone" ? "border-b-4 border-primary" : ""}`}
            onClick={() => setActiveTab("phone")}
          >
            Phone Number
          </Button>
        </div>

        {activeTab === "email" && <NormalLoginForm />}

        {activeTab === "phone" && <PhoneLogin />}

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

// Normal login form component
function NormalLoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<loginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<loginForm> = async (data) => {
    setIsLoading(true);
    try {
      await http.post("/api/v1/auth/login", data);
      toast.success("Login successful");
      router.push("/");
    } catch (err) {
      if (err instanceof ValidationError) {
        Object.entries(err.errors).forEach(([field, messages]) => {
          setError(field as keyof loginForm, {
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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
  );
}

// Login form component for phone number login
function PhoneLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [openOTP, setOpenOTP] = useState(false);
  const [phone, setPhone] = useState("");

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors: errorsPhone },
  } = useForm<PhoneLoginForm>({
    resolver: zodResolver(phoneLoginSchema),
  });

  const onSubmit: SubmitHandler<PhoneLoginForm> = async (data) => {
    setIsLoading(true);
    try {
      await http.post("/api/v1/auth/otp/request", {
        ...data,
        purpose: "login",
      });

      setPhone(data.phone);
      setOpenOTP(true);
      toast.success("OTP sent successfully. Please check your phone.");
    } catch (err) {
      if (err instanceof ValidationError) {
        Object.entries(err.errors).forEach(([field, messages]) => {
          setError(field as keyof PhoneLoginForm, {
            type: "server",
            message: messages[0],
          });
        });
      } else {
        toast.error("Failed to send OTP");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
                  {...register("phone")}
                />
              </InputGroup>
              <FieldError errors={[errorsPhone.phone]} />
            </div>
          </FieldContent>
        </Field>

        <AuthSubmitBtn isLoading={isLoading} label="Send OTP" />
      </form>

      <Dialog open={openOTP} onOpenChange={setOpenOTP}>
        <OTPVerificationDialog
          phone={phone}
          onClose={() => setOpenOTP(false)}
        />
      </Dialog>
    </>
  );
}

// OTP verification dialog component
function OTPVerificationDialog({
  phone,
  onClose,
}: {
  phone: string;
  onClose: () => void;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm<OTPForm>({
    resolver: zodResolver(otpSchema),
  });

  const onSubmit: SubmitHandler<OTPForm> = async (data) => {
    setIsLoading(true);
    try {
      await http.post("/api/v1/auth/otp/verify", {
        phone,
        ...data,
        purpose: "login",
      });

      toast.success("Login successful");
      onClose();
      router.push("/");
    } catch (err) {
      if (err instanceof ValidationError) {
        Object.entries(err.errors).forEach(([field, messages]) => {
          setError(field as keyof OTPForm, {
            type: "server",
            message: messages[0],
          });
        });
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DialogContent className="sm:max-w-sm">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-4"
      >
        <DialogHeader>
          <DialogTitle className="text-center">Enter OTP</DialogTitle>
          <DialogDescription className="text-center text-sm">
            We sent a 6-digit code to your phone
          </DialogDescription>
        </DialogHeader>

        <Controller
          control={control}
          name="code"
          render={({ field }) => (
            <InputOTP
              maxLength={6}
              value={field.value}
              onChange={field.onChange}
              pattern={REGEXP_ONLY_DIGITS}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          )}
        />

        <FieldError errors={[errors.code]} />
        <AuthSubmitBtn isLoading={isLoading} label="Verify OTP" />
      </form>
    </DialogContent>
  );
}
