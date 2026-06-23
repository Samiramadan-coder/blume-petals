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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Link } from "@/i18n/navigation";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

const registerSchema = z
  .object({
    fullName: z.string().min(2, "Full Name is required"),
    email: z.email("Invalid email address"),
    phone: z.string().min(10, "Phone number is required"),
    password: z.string().min(8, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(8, "Confirm Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
    console.log(data);
  };

  return (
    <Card className="w-md">
      <CardContent className="p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="text-center">
            <div className="text-4xl font-bold text-foreground mb-4">𝔹</div>
            <h1 className="text-3xl font-playfair font-bold text-foreground">
              Create Account
            </h1>
            <p className="text-foreground/60 text-sm mt-2">
              Join Blúme Petals today
            </p>
          </div>

          <Field>
            <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
            <FieldContent>
              <div className="space-y-1">
                <Input
                  {...register("fullName")}
                  placeholder="Full Name"
                  className="h-11"
                />
                {errors.fullName && (
                  <ErrorMsg>{errors.fullName.message}</ErrorMsg>
                )}
              </div>
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <FieldContent>
              <div className="space-y-1">
                <Input
                  {...register("email")}
                  placeholder="Email"
                  className="h-11"
                />
                {errors.email && <ErrorMsg>{errors.email.message}</ErrorMsg>}
              </div>
            </FieldContent>
          </Field>

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
                {errors.phone && <ErrorMsg>{errors.phone.message}</ErrorMsg>}
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

          <Field>
            <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
            <FieldContent>
              <div className="space-y-1">
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    className="h-11"
                    {...register("confirmPassword")}
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
                {errors.confirmPassword && (
                  <ErrorMsg>{errors.confirmPassword.message}</ErrorMsg>
                )}
              </div>
            </FieldContent>
          </Field>

          <p className="text-xs text-foreground/60 text-center">
            By registering you agree to our{" "}
            <Link href="" className="text-primary">
              Terms & Conditions
            </Link>{" "}
            and{" "}
            <Link href="" className="text-primary">
              Privacy Policy
            </Link>
          </p>

          <Button
            variant="ghost"
            type="submit"
            className="h-11 text-foreground font-semibold bg-primary"
          >
            Create Account
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
          Already have an account?{" "}
          <Link href="/login" className="text-primary">
            Sign In
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
