import { toast } from "sonner";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { Dialog } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { generateRegisterOtp } from "@/lib/auth-actions";
import AuthSubmitBtn from "../../shared/auth-submit-btn";
import FormInput from "@/components/reusable/form/form-input";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { OTPVerificationDialog } from "../../shared/otp-verification-dialog";
import { RegisterFormWithPhone, registerSchemawithPhone } from "@/types/auth";

export default function RegisterWithPhone() {
  const locale = useLocale();
  const t = useTranslations("Register");
  const tFields = useTranslations("Fields");
  const [openOTP, setOpenOTP] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormWithPhone>({
    resolver: zodResolver(registerSchemawithPhone(tFields)),
    defaultValues: {
      name: "",
      phone: "",
      locale: locale,
    },
  });

  const onSubmit: SubmitHandler<RegisterFormWithPhone> = async (data) => {
    const result = await generateRegisterOtp(data);

    if (result.success) {
      setOpenOTP(true);
      toast.success(tFields("Messages.OTPSentSuccess"));
      return;
    }

    toast.error(tFields("Errors.CreateAccountError"));
  };

  const phone = useWatch({
    control,
    name: "phone",
  });

  return (
    <>
      <form
        onSubmit={(e) => {
          void handleSubmit(onSubmit)(e);
        }}
        className="flex flex-col gap-4"
      >
        <FormInput
          register={register}
          name="name"
          errors={errors}
          label={tFields("Labels.FullName")}
          placeholder={tFields("Placeholders.FullName")}
          required
        />

        <FormInput
          register={register}
          name="phone"
          errors={errors}
          label={tFields("Labels.Phone")}
          placeholder={tFields("Placeholders.Phone")}
          required
          prefix="AE +971"
        />

        <p className="text-xs text-foreground/60 text-center">
          {t("AgreeText")}{" "}
          <Link href="" className="text-primary">
            {t("TermsConditions")}
          </Link>{" "}
          {t("And", { defaultValue: "and" })}{" "}
          <Link href="" className="text-primary">
            {t("PrivacyPolicy")}
          </Link>
        </p>

        <AuthSubmitBtn
          isLoading={isSubmitting}
          label={t("CreateAccountButton")}
        />
      </form>

      {openOTP && (
        <Dialog open={openOTP} onOpenChange={setOpenOTP}>
          <OTPVerificationDialog phone={phone} />
        </Dialog>
      )}
    </>
  );
}
