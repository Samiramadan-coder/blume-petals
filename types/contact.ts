import z from "zod";
import { T } from "@/constants/shared";

export const contactFormSchema = (t: T) =>
  z.object({
    email: z.email(t("Fields.Email.Invalid")),

    phone: z
      .string()
      .trim()
      .regex(/^5[024568]\d{7}$/, t("Fields.Phone.Invalid")),

    message: z
      .string()
      .min(1, t("Fields.Message.Required"))
      .min(10, t("Fields.Message.MinLength")),
  });

export type ContactFormData = z.infer<ReturnType<typeof contactFormSchema>>;
