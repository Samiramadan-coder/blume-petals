"use server";

import {
  LoginForm,
  LoginResponse,
  PhoneLoginForm,
  RegisterForm,
} from "@/types/auth";
import { http, ValidationError } from "./http";

/**
 * Register a new user and return serializable field errors for the client form.
 */
type RegisterResult =
  | { success: true }
  | { success: false; errors?: Partial<Record<keyof RegisterForm, string>> };

export async function registerUser(
  data: RegisterForm,
): Promise<RegisterResult> {
  try {
    await http.post("/api/v1/auth/register", data);
    return { success: true };
  } catch (err) {
    if (err instanceof ValidationError) {
      const errors = Object.fromEntries(
        Object.entries(err.errors).map(([field, messages]) => [
          field,
          messages[0] ?? "Invalid value",
        ]),
      ) as Partial<Record<keyof RegisterForm, string>>;

      return { success: false, errors };
    }

    return { success: false };
  }
}

/**
 * Register Otp
 */
type GenerateRegisterOtpResult =
  | { success: true }
  | { success: false; errors?: Partial<Record<keyof PhoneLoginForm, string>> };

export async function generateRegisterOtp(
  data: PhoneLoginForm,
): Promise<GenerateRegisterOtpResult> {
  try {
    await http.post("/api/v1/auth/otp/request", data);
    return { success: true };
  } catch (err) {
    if (err instanceof ValidationError) {
      const errors = Object.fromEntries(
        Object.entries(err.errors).map(([field, messages]) => [
          field,
          messages[0] ?? "Invalid value",
        ]),
      ) as Partial<Record<keyof PhoneLoginForm, string>>;
      console.log("Validation errors:", err);
      return { success: false, errors };
    }

    console.error("Error generating OTP:", err);
    return { success: false };
  }
}

/**
 * login
 */
type LoginResult =
  | { success: true; token: string }
  | { success: false; errors?: Partial<Record<keyof LoginForm, string>> };

export async function loginUser(data: LoginForm): Promise<LoginResult> {
  try {
    const { data: response } = await http.post<LoginResponse>(
      "/api/v1/auth/login",
      data,
    );

    return { success: true, token: response.data.token };
    // await saveToken(response.data.token);
    // toast.success(t("SignInSuccess"));
    // router.push("/");
  } catch (err) {
    if (err instanceof ValidationError) {
      const errors = Object.fromEntries(
        Object.entries(err.errors).map(([field, messages]) => [
          field,
          messages[0] ?? "Invalid value",
        ]),
      ) as Partial<Record<keyof LoginForm, string>>;
      return { success: false, errors };
      // Object.entries(err.errors).forEach(([field, messages]) => {
      //   toast.error(messages[0]);
      //   setError(field as keyof LoginForm, {
      //     type: "server",
      //     message: messages[0],
      //   });
      // });
    }

    return { success: false };
  }
}
