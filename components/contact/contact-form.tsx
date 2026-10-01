"use client";

import * as motion from "motion/react-client";

import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

import { useForm, type SubmitHandler } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Card, CardContent } from "../ui/card";

import FormInput from "../reusable/form/form-input";
import FormTextarea from "../reusable/form/form-textarea";
import AuthSubmitBtn from "../auth/shared/auth-submit-btn";

import { type ContactFormData, contactFormSchema } from "@/types/contact";

import { sendContactForm } from "@/lib/contact";
import { reveal } from "@/lib/motion";

export default function ContactForm() {
  const router = useRouter();
  const t = useTranslations("Contact");

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema(t)),
  });

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    const result = await sendContactForm(data);

    if (result.success) {
      toast.success(t("SendedSuccessfully"));
      router.push("/");
      return;
    }

    if (result.errors) {
      Object.entries(result.errors).forEach(([field, message]) => {
        if (!message) return;

        toast.error(message);

        setError(field as keyof ContactFormData, {
          type: "server",
          message,
        });
      });

      return;
    }

    toast.error(t("SendError"));
  };

  return (
    <motion.div {...reveal({ x: 10, amount: 0.15 })}>
      <Card className="mt-8 rounded-lg py-8 shadow-sm">
        <CardContent className="px-4 sm:px-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
          >
            <motion.div
              {...reveal({ x: -10, delay: 0.06 })}
            >
              <FormInput
                name="email"
                register={register}
                errors={errors}
                label={t("Fields.Email.Label")}
                placeholder={t("Fields.Email.Placeholder")}
                autoComplete="email"
                inputMode="email"
                required
              />
            </motion.div>

            <motion.div
              {...reveal({ x: 10, delay: 0.12 })}
            >
              <FormInput
                name="phone"
                register={register}
                errors={errors}
                label={t("Fields.Phone.Label")}
                placeholder={t("Fields.Phone.Placeholder")}
                prefix="AE +971"
                autoComplete="tel-national"
                inputMode="tel"
                required
              />
            </motion.div>

            <motion.div
              {...reveal({ x: -10, delay: 0.18 })}
              className="md:col-span-2"
            >
              <FormTextarea
                name="message"
                inputClassName="h-50"
                register={register}
                errors={errors}
                label={t("Fields.Message.Label")}
                placeholder={t("Fields.Message.Placeholder")}
                required
              />
            </motion.div>

            <motion.div
              {...reveal({ y: 8, delay: 0.24 })}
              className="text-center md:col-span-2"
            >
              <AuthSubmitBtn
                isLoading={isSubmitting}
                label={t("SendMessage")}
              />
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
