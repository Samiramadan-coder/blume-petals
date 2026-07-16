import { toast } from "sonner";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Dialog } from "@/components/ui/dialog";
import { OTPDialog } from "../../shared/otp-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateRegisterOtp } from "@/lib/auth-actions";
import FormInput from "@/components/reusable/form/form-input";
import { PhoneLoginForm, phoneLoginSchema } from "@/types/auth";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import AuthSubmitBtn from "@/components/auth/shared/auth-submit-btn";

export default function PhoneLogin() {
  const t = useTranslations("Login");
  const tFields = useTranslations("Fields");
  const [openOTP, setOpenOTP] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm<PhoneLoginForm>({
    resolver: zodResolver(phoneLoginSchema(tFields)),
    defaultValues: {
      phone: "",
      purpose: "login",
    },
  });

  const phone = useWatch({
    control,
    name: "phone",
  });

  const onSubmit: SubmitHandler<PhoneLoginForm> = async (data) => {
    const result = await generateRegisterOtp(data);

    if (result.success) {
      setOpenOTP(true);
      toast.success(tFields("Messages.OTPSentSuccess"));
      return;
    }

    if (result.success === false && result.errors) {
      Object.entries(result.errors).forEach(([field, message]) => {
        if (!message) return;
        toast.error(message);
        setError(field as keyof PhoneLoginForm, {
          type: "server",
          message,
        });
      });
      return;
    }

    toast.error(tFields("Errors.OTPSentFailed"));
  };

  return (
    <>
      <form
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormInput
          register={register}
          name="phone"
          errors={errors}
          label={tFields("Labels.Phone")}
          placeholder={tFields("Placeholders.Phone")}
          prefix="AE +971"
          required
        />

        <AuthSubmitBtn isLoading={isSubmitting} label={t("SendOTP")} />
      </form>

      {openOTP && (
        <Dialog open={openOTP} onOpenChange={setOpenOTP}>
          <OTPDialog
            endPoint="/api/v1/auth/otp/verify"
            subtitle={t("OtpSentToPhone")}
            extraData={{ phone, device_name: "web" }}
            resendOTP={() => formRef?.current?.requestSubmit?.()}
            loadingResendOTP={isSubmitting}
          />
        </Dialog>
      )}
    </>
  );
}
