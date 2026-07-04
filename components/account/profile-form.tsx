"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import Image from "next/image";
import { http } from "@/lib/http";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { User } from "@/types/shared";
import { Spinner } from "../ui/spinner";
import { useRef, useState } from "react";
import { Separator } from "../ui/separator";
import { Pencil, Upload } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { Account, accountSchema } from "@/types/account";
import { Field, FieldContent, FieldError, FieldLabel } from "../ui/field";
import { useForm, SubmitHandler, Controller, useWatch } from "react-hook-form";

export default function ProfileForm({ user }: { user: User }) {
  const [editMode, setEditMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<Account>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
  });

  const onSubmit: SubmitHandler<Account> = async (data) => {
    try {
      await http.put("/api/v1/auth/me", data);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const name = useWatch({
    control,
    name: "name",
  });

  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold text-foreground font-heading">
          My Profile
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
          <p className="text-xs text-foreground/60 mt-1">orders</p>
        </div>

        <div className="border border-border bg-primary/10 p-4 grid place-content-center text-center rounded-full">
          <p className="text-lg font-semibold text-primary">5</p>
          <p className="text-xs text-foreground/60 mt-1">Saved</p>
        </div>

        <div className="border border-border bg-primary/10 p-4 grid place-content-center text-center rounded-full">
          <p className="text-lg font-semibold text-primary">3</p>
          <p className="text-xs text-foreground/60 mt-1">Design</p>
        </div>
      </div>

      <Card className="shadow-sm">
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <FieldContent>
                <div className="space-y-1">
                  <Input
                    {...register("name")}
                    placeholder={"Full Name"}
                    className="h-11 disabled:bg-primary/30 disabled:opacity-100"
                    disabled={!editMode}
                  />
                  <FieldError errors={[errors.name]} />
                </div>
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <FieldContent>
                <div className="space-y-1">
                  <Input
                    {...register("email")}
                    placeholder={"Email"}
                    className="h-11 disabled:bg-primary/30 disabled:opacity-100"
                    disabled={!editMode}
                  />
                  <FieldError errors={[errors.email]} />
                </div>
              </FieldContent>
            </Field>

            {editMode ? (
              <Field>
                <FieldLabel htmlFor="phone">Phone</FieldLabel>
                <FieldContent>
                  <div className="space-y-1">
                    <InputGroup className="h-11">
                      <InputGroupAddon className="border-e px-4">
                        AE&nbsp;&nbsp;+971
                      </InputGroupAddon>

                      <InputGroupInput
                        type="tel"
                        placeholder={"Phone"}
                        {...register("phone")}
                        disabled={!editMode}
                      />
                    </InputGroup>
                    <FieldError errors={[errors.phone]} />
                  </div>
                </FieldContent>
              </Field>
            ) : (
              <Field>
                <FieldLabel htmlFor="phone">Phone</FieldLabel>
                <FieldContent>
                  <div className="space-y-1">
                    <Input
                      {...register("phone")}
                      placeholder={"Phone"}
                      className="h-11 disabled:bg-primary/30 disabled:opacity-100"
                      disabled={!editMode}
                    />
                    <FieldError errors={[errors.phone]} />
                  </div>
                </FieldContent>
              </Field>
            )}

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
                    <FieldLabel htmlFor="photo_path">Profile Photo</FieldLabel>
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
                            Change Photo
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
                  {isSubmitting ? <Spinner /> : "Save Changes"}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditMode(false)}
                  className="h-12 border-2 border-primary text-foreground cursor-pointer flex-1"
                >
                  Cancel
                </Button>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </>
  );
}
