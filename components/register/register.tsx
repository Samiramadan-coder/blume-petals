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
import { useState } from "react";
import { useLocale } from "next-intl";
import { Spinner } from "../ui/spinner";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { http, ValidationError } from "@/lib/http";
import { Link, useRouter } from "@/i18n/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { useForm, SubmitHandler } from "react-hook-form";
import { RegisterForm, registerSchema } from "@/types/auth";
import { toast } from "sonner";

export default function Register() {
  const locale = useLocale();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
    setIsLoading(true);
    try {
      await http.post("/api/v1/auth/register", { ...data, locale });
      toast.success("Account created successfully. Please login.");
      router.push("/login");
    } catch (err) {
      if (err instanceof ValidationError) {
        Object.entries(err.errors).forEach(([field, messages]) => {
          setError(field as keyof RegisterForm, {
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
                  {...register("name")}
                  placeholder="Full Name"
                  className="h-11"
                />
                <FieldError errors={[errors.name]} />
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
                <FieldError errors={[errors.email]} />
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
                <FieldError errors={[errors.phone]} />
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
            className="h-11 text-foreground font-semibold bg-primary cursor-pointer"
          >
            {isLoading ? <Spinner className="mr-2" /> : "Create Account"}
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
