"use server";

import { PhoneLoginForm, RegisterForm } from "@/types/auth";
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
      return { success: false, errors };
    }

    console.error("Error generating OTP:", err);
    return { success: false };
  }
}
