// Registration form validation schema using Zod
import z from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(2, "Full Name is required"),
    email: z.email("Invalid email address"),
    phone: z.string().min(10, "Phone number is required"),
    password: z.string().min(8, "Password must be at least 6 characters"),
    password_confirmation: z
      .string()
      .min(8, "Confirm Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

export type RegisterForm = z.infer<typeof registerSchema>;

// Login form validation schema using Zod
export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 6 characters"),
});

export const phoneLoginSchema = z.object({
  phone: z.string().min(10, "Invalid phone number"),
});

export type loginForm = z.infer<typeof loginSchema>;
export type PhoneLoginForm = z.infer<typeof phoneLoginSchema>;
