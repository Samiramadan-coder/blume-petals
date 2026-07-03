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
export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const phoneLoginSchema = z.object({
  phone: z.string().min(10, "Invalid phone number"),
});

export const otpSchema = z.object({
  code: z.string().length(6, "OTP must be 6 digits"),
});

export type loginForm = z.infer<typeof loginSchema>;
export type PhoneLoginForm = z.infer<typeof phoneLoginSchema>;
export type OTPForm = z.infer<typeof otpSchema>;

/**
 * Forgot password form validation schema using Zod
 * This schema validates the user input for the forgot password form.
 */
export const forgotPasswordSchema = z.object({
  email: z.email("Invalid email address"),
});

export type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

/**
 * Reset password form validation schema using Zod
 * This schema validates the user input for the reset password form.
 */
export const resetPasswordSchema = z
  .object({
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    password_confirmation: z
      .string()
      .min(8, "Confirm Password must be at least 8 characters"),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.password_confirmation) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["password"],
      });

      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["password_confirmation"],
      });
    }
  });

export type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;
