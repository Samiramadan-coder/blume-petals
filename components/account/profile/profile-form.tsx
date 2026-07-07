"use client";

import Image from "next/image";
import { toast } from "sonner";
import { User } from "@/types/shared";
import { Button } from "../../ui/button";
import { useRef, useState } from "react";
import { Spinner } from "../../ui/spinner";
import PageTitle from "../shared/page-title";
import { Pencil, Upload } from "lucide-react";
import { Separator } from "../../ui/separator";
import { Card, CardContent } from "../../ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  getOTPPhoneChange,
  postOTPPhoneChange,
  updateProfile,
} from "@/lib/account-actions";
import { useLocale, useTranslations } from "next-intl";
import FormInput from "../../reusable/form/form-input";
import { Account, accountSchema, OTPForm, otpSchema } from "@/types/account";
import { Field, FieldContent, FieldError, FieldLabel } from "../../ui/field";
import { useForm, SubmitHandler, Controller, useWatch } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import AuthSubmitBtn from "@/components/auth/shared/auth-submit-btn";

export default function ProfileForm({ user }: { user: User }) {
  const locale = useLocale();
  const t = useTranslations("Account.Profile");
  const tFields = useTranslations("Fields");
  const tActions = useTranslations("Actions");
  const [openOTP, setOpenOTP] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [oldPhone, setOldPhone] = useState(user.phone);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<Account>({
    resolver: zodResolver(accountSchema(tFields)),
    defaultValues: {
      name: user.name,
      email: user.email,
      phone: user.phone,
      photo_url: user?.photo_url || "",
      locale: locale,
    },
  });

  const onSubmit: SubmitHandler<Account> = async (data) => {
    if (data.phone !== oldPhone) {
      const result = await getOTPPhoneChange(data.phone);

      if (result.success) {
        setOpenOTP(true);
        setOldPhone(data.phone);
        return;
      }

      if (result.success === false) {
        toast.error(t("Errors.OTPRequestFailed"));
        return;
      }
    } else {
      const result = await updateProfile(data);

      if (result.success) {
        toast.success(t("UpdatedSuccessfully"));
        setEditMode(false);
        return;
      }

      if (result.success === false && result.errors) {
        Object.entries(result.errors).forEach(([field, message]) => {
          toast.error(message);
          setError(field as keyof Account, {
            type: "server",
            message,
          });
        });
        return;
      }

      toast.error("Error updating profile");
    }
  };

  const name = useWatch({
    control,
    name: "name",
  });

  const phone = useWatch({
    control,
    name: "phone",
  });

  return (
    <>
      <div className="space-y-6">
        <PageTitle title={t("Title")}>
          <Button
            className="cursor-pointer"
            variant="ghost"
            onClick={() => setEditMode(!editMode)}
          >
            <Pencil className="text-primary size-5" />
          </Button>
        </PageTitle>

        <div className="grid grid-cols-3 gap-2 md:gap-6 mb-6">
          <div className="border border-border bg-primary/10 p-4 grid place-content-center text-center rounded-full">
            <p className="text-lg font-semibold text-primary">12</p>
            <p className="text-xs text-foreground/60 mt-1">{t("Orders")}</p>
          </div>

          <div className="border border-border bg-primary/10 p-4 grid place-content-center text-center rounded-full">
            <p className="text-lg font-semibold text-primary">5</p>
            <p className="text-xs text-foreground/60 mt-1">{t("Saved")}</p>
          </div>

          <div className="border border-border bg-primary/10 p-4 grid place-content-center text-center rounded-full">
            <p className="text-lg font-semibold text-primary">3</p>
            <p className="text-xs text-foreground/60 mt-1">{t("Design")}</p>
          </div>
        </div>

        <Card className="shadow-[0_6px_20px_rgba(17,24,39,0.08)] py-6">
          <CardContent className="px-6">
            <form
              className="space-y-6"
              onSubmit={handleSubmit(onSubmit)}
              ref={formRef}
            >
              <FormInput
                name="name"
                register={register}
                errors={errors}
                required
                placeholder={tFields("Placeholders.FullName")}
                inputClassName="disabled:bg-primary/30 disabled:opacity-100"
                label={tFields("Labels.FullName")}
                disabled={!editMode}
              />

              <FormInput
                name="email"
                register={register}
                errors={errors}
                required
                placeholder={tFields("Placeholders.Email")}
                inputClassName="disabled:bg-primary/30 disabled:opacity-100"
                label={tFields("Labels.Email")}
                disabled={!editMode}
              />

              <FormInput
                name="phone"
                register={register}
                errors={errors}
                required
                placeholder={tFields("Placeholders.Phone")}
                inputClassName="disabled:bg-primary/30 disabled:opacity-100"
                label={tFields("Labels.Phone")}
                disabled={!editMode}
                prefix={editMode ? "AE +971" : undefined}
              />

              <Separator />

              <Controller
                control={control}
                name="photo_url"
                render={({ field }) => {
                  const selectedPhoto = field.value as string | File | null;
                  const profilePhotoUrl =
                    typeof selectedPhoto === "string"
                      ? selectedPhoto
                      : selectedPhoto instanceof File
                        ? URL.createObjectURL(selectedPhoto)
                        : null;

                  return (
                    <Field>
                      <FieldLabel htmlFor="photo_path">
                        {tFields("Labels.ProfilePhoto")}
                      </FieldLabel>
                      <FieldContent>
                        <div className="flex items-center gap-4">
                          {profilePhotoUrl ? (
                            <div className="w-20 h-20 rounded-full overflow-hidden shadow-sm">
                              <Image
                                src={profilePhotoUrl}
                                height={400}
                                width={400}
                                className="h-full w-full object-cover object-center"
                                alt="Profile Photo"
                                priority
                              />
                            </div>
                          ) : (
                            <div className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center text-xl font-semibold">
                              {name.slice(0, 2).toUpperCase()}
                            </div>
                          )}

                          {editMode && (
                            <Button
                              variant="outline"
                              type="button"
                              className="cursor-pointer h-12 w-38 border-2 border-primary text-primary hover:text-primary"
                              onClick={() => fileInputRef.current?.click()}
                            >
                              <Upload />
                              {t("ChangePhoto")}
                            </Button>
                          )}
                        </div>

                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          ref={fileInputRef}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            field.onChange(file);
                            e.target.value = "";
                          }}
                        />
                      </FieldContent>
                    </Field>
                  );
                }}
              />

              {editMode && (
                <div className="flex items-center gap-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-12 text-white cursor-pointer flex-1"
                  >
                    {isSubmitting ? <Spinner /> : tActions("SaveChanges")}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setEditMode(false)}
                    className="h-12 border-2 border-primary text-foreground cursor-pointer flex-1"
                  >
                    {tActions("Cancel")}
                  </Button>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>

      {openOTP && (
        <Dialog open={openOTP} onOpenChange={setOpenOTP}>
          <OTPVerificationDialog
            phone={phone}
            onResubmit={() => {
              setOpenOTP(false);
              formRef.current?.requestSubmit();
            }}
          />
        </Dialog>
      )}
    </>
  );
}

// OTP Verification Dialog Component
function OTPVerificationDialog({
  phone,
  onResubmit,
}: {
  phone: string;
  onResubmit: () => void;
}) {
  const t = useTranslations("Login");
  const tFields = useTranslations("Fields");

  const {
    handleSubmit,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm<OTPForm>({
    resolver: zodResolver(otpSchema(tFields)),
    defaultValues: {
      code: "",
      phone: phone,
    },
  });

  const onSubmit: SubmitHandler<OTPForm> = async (data) => {
    const result = await postOTPPhoneChange(data);

    if (result.success) {
      onResubmit();
      return;
    }

    if (result.success === false && result.errors) {
      Object.entries(result.errors).forEach(([field, message]) => {
        toast.error(message);
        setError(field as keyof OTPForm, {
          type: "server",
          message,
        });
      });
      return;
    }

    toast.error(t("InvalidOTP"));
  };

  return (
    <DialogContent className="sm:max-w-sm">
      {phone}
      <form
        onSubmit={handleSubmit(onSubmit, (errors) => {
          console.log(errors);
        })}
        className="flex flex-col items-center gap-4"
      >
        <DialogHeader>
          <DialogTitle className="text-center">{t("EnterOTP")}</DialogTitle>
          <DialogDescription className="text-center text-sm">
            {t("OTPDescription")}
          </DialogDescription>
        </DialogHeader>

        <Controller
          control={control}
          name="code"
          render={({ field }) => (
            <InputOTP
              maxLength={6}
              value={field.value}
              onChange={field.onChange}
              pattern={REGEXP_ONLY_DIGITS}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          )}
        />

        <FieldError errors={[errors.code]} />
        <AuthSubmitBtn isLoading={isSubmitting} label={t("VerifyOTP")} />
      </form>
    </DialogContent>
  );
}
