"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { useState } from "react";
import { Input } from "../ui/input";
import { Pencil } from "lucide-react";
import { Button } from "../ui/button";
import { User } from "@/types/shared";
import { useForm, SubmitHandler } from "react-hook-form";
import { Card, CardContent } from "../ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { Account, accountSchema } from "@/types/account";
import { Field, FieldContent, FieldError, FieldLabel } from "../ui/field";
import { Spinner } from "../ui/spinner";
import { http } from "@/lib/http";

export default function ProfileForm({ user }: { user: User }) {
  const [editMode, setEditMode] = useState(false);
  console.log(user);

  const {
    register,
    handleSubmit,
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
    await http.put("/api/v1/auth/me", data);
  };

  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-8">
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
                    className="h-11"
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
                    className="h-11"
                    disabled={!editMode}
                  />
                  <FieldError errors={[errors.email]} />
                </div>
              </FieldContent>
            </Field>

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
