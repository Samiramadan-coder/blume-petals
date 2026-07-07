import z from "zod";
import { User } from "./shared";

type T = (key: string) => string;

/**
 * Register form validation schema using Zod
 * This schema validates the user input for the registration form.
 */
export const registerSchemawithEmail = (t: T) =>
  z
    .object({
      name: z
        .string()
        .min(1, t("Errors.FullNameIsRequired"))
        .min(2, t("Errors.FullNameIsTooShort")),
      email: z.email(t("Errors.EmailIsInvalid")),
      password: z
        .string()
        .min(1, t("Errors.PasswordIsRequired"))
        .min(8, t("Errors.PasswordIsTooShort")),
      password_confirmation: z
        .string()
        .min(1, t("Errors.PasswordConfirmationIsRequired"))
        .min(8, t("Errors.PasswordConfirmationIsTooShort")),
      locale: z.string(),
    })
    .superRefine((data, ctx) => {
      if (data.password !== data.password_confirmation) {
        ctx.addIssue({
          code: "custom",
          message: t("Errors.PasswordsDoNotMatch"),
          path: ["password"],
        });

        ctx.addIssue({
          code: "custom",
          message: t("Errors.PasswordsDoNotMatch"),
          path: ["password_confirmation"],
        });
      }
    });

export const registerSchemawithPhone = (t: T) =>
  z.object({
    name: z
      .string()
      .min(1, t("Errors.FullNameIsRequired"))
      .min(2, t("Errors.FullNameIsTooShort")),
    phone: z
      .string()
      .trim()
      .regex(/^5[024568]\d{7}$/, t("Errors.PhoneIsInvalid")),
    locale: z.string(),
  });

export type RegisterFormWithEmail = z.infer<
  ReturnType<typeof registerSchemawithEmail>
>;

export type RegisterFormWithPhone = z.infer<
  ReturnType<typeof registerSchemawithPhone>
>;

/**
 * Login form validation schema using Zod
 * This schema validates the user input for the login form.
 */
export const loginSchema = (t: T) =>
  z.object({
    email: z.email(t("Errors.EmailIsInvalid")),
    password: z
      .string()
      .min(1, t("Errors.PasswordIsRequired"))
      .min(8, t("Errors.PasswordIsTooShort")),
  });

export const phoneLoginSchema = (t: T) =>
  z.object({
    phone: z
      .string()
      .trim()
      .regex(/^5[024568]\d{7}$/, t("Errors.PhoneIsInvalid")),
    purpose: z.string().optional(),
  });

export const otpSchema = (t: T) =>
  z.object({
    code: z
      .string()
      .min(1, t("Errors.OTPIsRequired"))
      .length(6, t("Errors.InvalidOTP")),
  });

export type LoginForm = z.infer<ReturnType<typeof loginSchema>>;

export type PhoneLoginForm = z.infer<ReturnType<typeof phoneLoginSchema>>;

export type OTPForm = z.infer<ReturnType<typeof otpSchema>>;

export type LoginResponse = {
  data: { token: string; user: User };
  success: boolean;
};

/**
 * Forgot password form validation schema using Zod
 * This schema validates the user input for the forgot password form.
 */
export const forgotPasswordSchema = (t: T) =>
  z.object({
    email: z.email(t("Errors.EmailIsInvalid")),
  });

export type ForgotPasswordForm = z.infer<
  ReturnType<typeof forgotPasswordSchema>
>;

/**
 * Reset password form validation schema using Zod
 * This schema validates the user input for the reset password form.
 */
export const resetPasswordSchema = (t: T) =>
  z
    .object({
      email: z.email(t("Errors.EmailIsInvalid")),
      code: z.string().min(1, t("Errors.OTPIsRequired")),
      password: z
        .string()
        .min(1, t("Errors.PasswordIsRequired"))
        .min(8, t("Errors.PasswordIsTooShort")),
      password_confirmation: z
        .string()
        .min(1, t("Errors.PasswordConfirmationIsRequired"))
        .min(8, t("Errors.PasswordConfirmationIsTooShort")),
    })
    .superRefine((data, ctx) => {
      if (data.password !== data.password_confirmation) {
        ctx.addIssue({
          code: "custom",
          message: t("Errors.PasswordsDoNotMatch"),
          path: ["password"],
        });

        ctx.addIssue({
          code: "custom",
          message: t("Errors.PasswordsDoNotMatch"),
          path: ["password_confirmation"],
        });
      }
    });

export type ResetPasswordForm = z.infer<ReturnType<typeof resetPasswordSchema>>;
