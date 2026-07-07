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
import { updateProfile } from "@/lib/account-actions";
import { useLocale, useTranslations } from "next-intl";
import FormInput from "../../reusable/form/form-input";
import { Account, accountSchema } from "@/types/account";
import { Field, FieldContent, FieldLabel } from "../../ui/field";
import { useForm, SubmitHandler, Controller, useWatch } from "react-hook-form";

export default function ProfileForm({ user }: { user: User }) {
  const locale = useLocale();
  const t = useTranslations("Account.Profile");
  const [editMode, setEditMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<Account>({
    resolver: zodResolver(accountSchema(t)),
    defaultValues: {
      name: user.name,
      email: user.email,
      phone: user.phone,
      photo_path: user?.photo_path || "",
      locale: locale,
    },
  });

  const onSubmit: SubmitHandler<Account> = async (data) => {
    const result = await updateProfile(data);

    if (result.success) {
      toast.success(t("SaveChanges"));
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
  };

  const name = useWatch({
    control,
    name: "name",
  });

  return (
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
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              name="name"
              register={register}
              errors={errors}
              required
              placeholder={t("FullNamePlaceholder")}
              inputClassName="disabled:bg-primary/30 disabled:opacity-100"
              label={t("FullName")}
              disabled={!editMode}
            />

            <FormInput
              name="email"
              register={register}
              errors={errors}
              required
              placeholder={t("EmailPlaceholder")}
              inputClassName="disabled:bg-primary/30 disabled:opacity-100"
              label={t("Email")}
              disabled={!editMode}
            />

            <FormInput
              name="phone"
              register={register}
              errors={errors}
              required
              placeholder={t("PhonePlaceholder")}
              inputClassName="disabled:bg-primary/30 disabled:opacity-100"
              label={t("Phone")}
              disabled={!editMode}
              prefix={editMode ? "AE +971" : undefined}
            />

            <Separator />

            <Controller
              control={control}
              name="photo_path"
              render={({ field }) => {
                const selectedPhoto = field.value as string | Blob | null;
                const profilePhotoUrl =
                  typeof selectedPhoto === "string"
                    ? selectedPhoto
                    : selectedPhoto instanceof Blob
                      ? URL.createObjectURL(selectedPhoto)
                      : null;

                return (
                  <Field>
                    <FieldLabel htmlFor="photo_path">
                      {t("ProfilePhoto")}
                    </FieldLabel>
                    <FieldContent>
                      <div className="flex items-center gap-4">
                        {profilePhotoUrl ? (
                          <div className="w-20 h-20 rounded-full overflow-hidden shadow-sm">
                            <Image
                              src={profilePhotoUrl}
                              height={400}
                              width={400}
                              className="h-35 w-full object-cover"
                              alt="Profile Photo"
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
                  {isSubmitting ? <Spinner /> : t("SaveChanges")}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditMode(false)}
                  className="h-12 border-2 border-primary text-foreground cursor-pointer flex-1"
                >
                  {t("Cancel")}
                </Button>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
