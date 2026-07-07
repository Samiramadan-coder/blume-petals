import { toast } from "sonner";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Dialog } from "@/components/ui/dialog";
import { http, ValidationError } from "@/lib/http";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import FormInput from "@/components/reusable/form/form-input";
import { PhoneLoginForm, phoneLoginSchema } from "@/types/auth";
import AuthSubmitBtn from "@/components/auth/shared/auth-submit-btn";
import { OTPVerificationDialog } from "../../shared/otp-verification-dialog";

export default function PhoneLogin() {
  const t = useTranslations("Login");
  const tFields = useTranslations("Fields");
  const [openOTP, setOpenOTP] = useState(false);
  const [phone, setPhone] = useState("");

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<PhoneLoginForm>({
    resolver: zodResolver(phoneLoginSchema(tFields)),
    defaultValues: {
      phone: "",
    },
  });

  const onSubmit: SubmitHandler<PhoneLoginForm> = async (data) => {
    try {
      await http.post("/api/v1/auth/otp/request", {
        ...data,
        purpose: "login",
      });

      setPhone(data.phone);
      setOpenOTP(true);
      toast.success(t("OTPSentSuccess"));
    } catch (err) {
      if (err instanceof ValidationError) {
        Object.entries(err.errors).forEach(([field, messages]) => {
          toast.error(messages[0]);
          setError(field as keyof PhoneLoginForm, {
            type: "server",
            message: messages[0],
          });
        });
      } else {
        toast.error(t("OTPSentFailed"));
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
          <OTPVerificationDialog phone={phone} />
        </Dialog>
      )}
    </>
  );
}
