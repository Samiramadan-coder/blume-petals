"use client";

import Image from "next/image";
import { http, ValidationError } from "@/lib/http";
import { Button } from "../ui/button";
import { User } from "@/types/shared";
import { Spinner } from "../ui/spinner";
import { useRef, useState } from "react";
import { Separator } from "../ui/separator";
import { Pencil, Upload } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { toast } from "sonner";
import FormInput from "../reusable/form/form-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Account, accountSchema } from "@/types/account";
import { Field, FieldContent, FieldLabel } from "../ui/field";
import { useForm, SubmitHandler, Controller, useWatch } from "react-hook-form";
import { useTranslations } from "next-intl";

export default function ProfileForm({ user }: { user: User }) {
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
    },
  });

  const onSubmit: SubmitHandler<Account> = async (data) => {
    try {
      await http.put("/api/v1/auth/me", data);
      toast.success(t("SaveChanges"));
    } catch (error) {
      if (error instanceof ValidationError) {
        Object.entries(error.errors).forEach(([field, messages]) => {
          toast.error(messages[0]);
          setError(field as keyof Account, {
            type: "server",
            message: messages[0],
          });
        });
      } else {
        console.error("Failed to update profile:", error);
        toast.error("Error updating profile");
      }
    }
  };

  const name = useWatch({
    control,
    name: "name",
  });

  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-6">
        <h1 className="text-xl md:text-3xl font-bold text-foreground font-heading">
          {t("Title")}
        </h1>

        <Button
          className="cursor-pointer"
          variant="ghost"
          onClick={() => setEditMode(!editMode)}
        >
          <Pencil className="text-primary size-5" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
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

      <Card className="shadow-sm">
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
    </>
  );
}
