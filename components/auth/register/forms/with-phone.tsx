import { toast } from "sonner";
import { useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import { Dialog } from "@/components/ui/dialog";
import { OTPDialog } from "../../shared/otp-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { generateRegisterOtp } from "@/lib/auth-actions";
import AuthSubmitBtn from "../../shared/auth-submit-btn";
import FormInput from "@/components/reusable/form/form-input";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { RegisterFormWithPhone, registerSchemawithPhone } from "@/types/auth";

export default function RegisterWithPhone() {
  const locale = useLocale();
  const t = useTranslations("Register");
  const tFields = useTranslations("Fields");
  const [openOTP, setOpenOTP] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

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
        ref={formRef}
        onSubmit={(e) => void handleSubmit(onSubmit)(e)}
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
          <OTPDialog
            endPoint="/api/v1/auth/otp/verify"
            subtitle={t("OtpSentToPhone")}
            extraData={{ phone, device_name: "web", purpose: "login" }}
            resendOTP={() => formRef?.current?.requestSubmit?.()}
            loadingResendOTP={isSubmitting}
          />
        </Dialog>
      )}
    </>
  );
}
