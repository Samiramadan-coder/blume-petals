"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent } from "../ui/card";
import FormInput from "../reusable/form/form-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import FormTextarea from "../reusable/form/form-textarea";
import AuthSubmitBtn from "../auth/shared/auth-submit-btn";
import { ContactFormData, contactFormSchema } from "@/types/contact";
import { sendContactForm } from "@/lib/contact";
import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";

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
    <Card className="shadow-sm mt-8 rounded-lg py-8">
      <CardContent className="px-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <FormInput
            name="email"
            register={register}
            errors={errors}
            label={t("Fields.Email.Label")}
            placeholder={t("Fields.Email.Placeholder")}
            required
          />

          <FormInput
            register={register}
            name="phone"
            errors={errors}
            label={t("Fields.Phone.Label")}
            placeholder={t("Fields.Phone.Placeholder")}
            prefix="AE +971"
            required
          />

          <FormTextarea
            name="message"
            className="md:col-span-2"
            inputClassName="h-50"
            register={register}
            errors={errors}
            label={t("Fields.Message.Label")}
            placeholder={t("Fields.Message.Placeholder")}
            required
          />

          <div className="md:col-span-2 text-center">
            <AuthSubmitBtn isLoading={isSubmitting} label={t("SendMessage")} />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
