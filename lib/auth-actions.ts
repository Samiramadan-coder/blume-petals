"use server";

import {
  ForgotPasswordForm,
  LoginForm,
  LoginResponse,
  PhoneLoginForm,
  RegisterFormWithEmail,
  RegisterFormWithPhone,
  ResetPasswordForm,
} from "@/types/auth";
import { http, ValidationError } from "./http";

/**
 * Register a new user and return serializable field errors for the client form.
 */
type RegisterResult =
  | { success: true }
  | {
      success: false;
      errors?: Partial<Record<keyof RegisterFormWithEmail, string>>;
    };

export async function registerUserWithEmail(
  data: RegisterFormWithEmail,
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
      ) as Partial<Record<keyof RegisterFormWithEmail, string>>;

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
  } catch (err) {
    if (err instanceof ValidationError) {
      const errors = Object.fromEntries(
        Object.entries(err.errors).map(([field, messages]) => [
          field,
          messages[0] ?? "Invalid value",
        ]),
      ) as Partial<Record<keyof LoginForm, string>>;
      return { success: false, errors };
    }

    return { success: false };
  }
}

/**
 * Forgot password
 */
type ForgotPasswordResult =
  | { success: true }
  | {
      success: false;
      errors?: Partial<Record<keyof ForgotPasswordForm, string>>;
    };

export async function forgotPassword(
  data: ForgotPasswordForm,
): Promise<ForgotPasswordResult> {
  try {
    await http.post("/api/v1/auth/password/forgot", data);
    return { success: true };
  } catch (err) {
    if (err instanceof ValidationError) {
      const errors = Object.fromEntries(
        Object.entries(err.errors).map(([field, messages]) => [
          field,
          messages[0] ?? "Invalid value",
        ]),
      ) as Partial<Record<keyof ForgotPasswordForm, string>>;
      return { success: false, errors };
    }
    return { success: false };
  }
}

/**
 * Reset password
 */
type ResetPasswordResult =
  | { success: true }
  | {
      success: false;
      errors?: Partial<Record<keyof ResetPasswordForm, string>>;
    };

export async function resetPassword(
  data: ResetPasswordForm,
): Promise<ResetPasswordResult> {
  try {
    await http.post("/api/v1/auth/password/reset", {
      ...data,
      code: "test",
    });
    return { success: true };
  } catch (err) {
    console.log("Error resetting password:", err);
    if (err instanceof ValidationError) {
      const errors = Object.fromEntries(
        Object.entries(err.errors).map(([field, messages]) => [
          field,
          messages[0] ?? "Invalid value",
        ]),
      ) as Partial<Record<keyof ResetPasswordForm, string>>;
      return { success: false, errors };
    }

    return { success: false };
  }
}
