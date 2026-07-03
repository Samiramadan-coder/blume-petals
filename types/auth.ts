import z from "zod";

type T = (key: string) => string;

/**
 * Register form validation schema using Zod
 * This schema validates the user input for the registration form.
 */
export const registerSchema = (t: T) =>
  z
    .object({
      name: z.string().min(2, t("nameIsRequired")),
      email: z.email(t("emailIsInvalid")),
      phone: z.string().min(10, t("phoneIsRequired")),
      password: z.string().min(8, t("passwordIsRequired")),
      password_confirmation: z
        .string()
        .min(8, t("passwordConfirmationIsRequired")),
    })
    .superRefine((data, ctx) => {
      if (data.password !== data.password_confirmation) {
        ctx.addIssue({
          code: "custom",
          message: t("passwordsDoNotMatch"),
          path: ["password"],
        });

        ctx.addIssue({
          code: "custom",
          message: t("passwordsDoNotMatch"),
          path: ["password_confirmation"],
        });
      }
    });

export type RegisterForm = z.infer<ReturnType<typeof registerSchema>>;

/**
 * Login form validation schema using Zod
 * This schema validates the user input for the login form.
 */
export const loginSchema = (t: T) =>
  z.object({
    email: z.email(t("invalidEmail")),
    password: z.string().min(8, t("invalidPassword")),
  });

export const phoneLoginSchema = (t: T) =>
  z.object({
    phone: z.string().min(10, t("invalidPhone")),
  });

export const otpSchema = (t: T) =>
  z.object({
    code: z.string().length(6, t("invalidOTP")),
  });

export type LoginForm = z.infer<ReturnType<typeof loginSchema>>;

export type PhoneLoginForm = z.infer<ReturnType<typeof phoneLoginSchema>>;

export type OTPForm = z.infer<ReturnType<typeof otpSchema>>;

export type LoginResponse = {
  data: { token: string };
  success: boolean;
};

/**
 * Forgot password form validation schema using Zod
 * This schema validates the user input for the forgot password form.
 */
export const forgotPasswordSchema = (t: T) =>
  z.object({
    email: z.email(t("invalidEmail")),
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
      email: z.email(t("invalidEmail")),
      password: z.string().min(8, t("invalidPassword")),
      password_confirmation: z
        .string()
        .min(8, t("invalidPasswordConfirmation")),
    })
    .superRefine((data, ctx) => {
      if (data.password !== data.password_confirmation) {
        ctx.addIssue({
          code: "custom",
          message: t("passwordsDoNotMatch"),
          path: ["password"],
        });

        ctx.addIssue({
          code: "custom",
          message: t("passwordsDoNotMatch"),
          path: ["password_confirmation"],
        });
      }
    });

export type ResetPasswordForm = z.infer<ReturnType<typeof resetPasswordSchema>>;
