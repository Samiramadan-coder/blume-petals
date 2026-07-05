"use client";

import {
  Address,
  AddressFormBody,
  AddressLabel,
  addressSchema,
} from "@/types/account";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";

import { useRef } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Badge } from "../../ui/badge";
import { Plus } from "lucide-react";
import { Button } from "../../ui/button";
import { Spinner } from "../../ui/spinner";
import { useRouter } from "@/i18n/navigation";
import { http, ValidationError } from "@/lib/http";
import FormInput from "../../reusable/form/form-input";
import { zodResolver } from "@hookform/resolvers/zod";
import FormSelect from "../../reusable/form/form-select";
import FormSwitch from "../../reusable/form/form-switch";
import { Field, FieldContent, FieldLabel } from "../../ui/field";
import { Controller, SubmitHandler, useForm, useWatch } from "react-hook-form";
import { useTranslations } from "next-intl";
import LocationPicker from "../../reusable/form/location-picker";

export default function AddressForm({
  address,
  trigger,
  buttonClassName,
}: {
  address?: Address;
  trigger?: React.ReactNode;
  buttonClassName?: string;
}) {
  const t = useTranslations("Account.Address");
  const router = useRouter();
  const closeBtn = useRef<HTMLButtonElement>(null);
  const addresses: AddressLabel[] = ["Home", "Work", "Other"];
  const form = useRef<HTMLFormElement>(null);

  const {
    register,
    control,
    setError,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddressFormBody>({
    resolver: zodResolver(addressSchema(t)),
    defaultValues: {
      label: address?.label || "Work",
      recipient_name: address?.recipient_name || "",
      recipient_phone: address?.recipient_phone || "",
      street: address?.street || "",
      area: address?.area || "",
      city: address?.city || "Dubai",
      emirate: address?.emirate || "Dubai",
      building: address?.building || "",
      landmark: address?.landmark || "",
      latitude: address?.latitude ? +address.latitude : 25.2048,
      longitude: address?.longitude ? +address.longitude : 55.2708,
      is_default: address?.is_default || false,
    },
  });

  const onSubmit: SubmitHandler<AddressFormBody> = async (data) => {
    try {
      await http[address ? "put" : "post"](
        `/api/v1/addresses${address ? `/${address.id}` : ""}`,
        data,
      );
      toast.success(
        address ? t("UpdatedSuccessfully") : t("AddedSuccessfully"),
      );
      closeBtn.current?.click();
      router.refresh();
    } catch (err) {
      if (err instanceof ValidationError) {
        Object.entries(err.errors).forEach(([field, messages]) => {
          toast.error(messages[0]);
          setError(field as keyof AddressFormBody, {
            type: "server",
            message: messages[0],
          });
        });
      } else {
        toast.error(t("ErrorUploading"));
      }
    }
  };

  const watchLatitude = useWatch({
    control,
    name: "latitude",
  });

  const watchLongitude = useWatch({
    control,
    name: "longitude",
  });

  return (
    <Dialog>
      <DialogClose asChild>
        <Button className="hidden" ref={closeBtn}></Button>
      </DialogClose>

      <DialogTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <Button
            variant="outline"
            className={cn(
              "cursor-pointer border border-primary text-primary hover:text-primary font-semibold h-10 w-45",
              buttonClassName,
            )}
          >
            <Plus />
            {t("AddNewAddress")}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-2xl"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>
            {address ? t("EditAddress") : t("AddNewAddress")}
          </DialogTitle>
        </DialogHeader>

        <form
          ref={form}
          onSubmit={(e) => {
            void handleSubmit(onSubmit)(e);
          }}
          className="space-y-6 -mx-4 no-scrollbar max-h-[80vh] overflow-y-auto px-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1 md:col-span-2">
              <Controller
                control={control}
                name="latitude"
                render={() => (
                  <LocationPicker
                    value={{
                      latitude: watchLatitude,
                      longitude: watchLongitude,
                    }}
                    onChange={(location) => {
                      setValue("latitude", location.latitude);
                      setValue("longitude", location.longitude);
                    }}
                  />
                )}
              />
            </div>

            <div className="col-span-1 md:col-span-2">
              <Controller
                control={control}
                name="label"
                render={({ field }) => {
                  const { value, onChange } = field;

                  return (
                    <Field>
                      <FieldLabel htmlFor="photo_path">
                        {t("AddressLabel")}
                      </FieldLabel>
                      <FieldContent>
                        <div className="flex items-center gap-3">
                          {addresses.map((address) => (
                            <Badge
                              key={address}
                              onClick={() => onChange(address)}
                              className={cn(
                                `h-9 w-20 bg-primary/40 text-foreground text-sm cursor-pointer`,
                                {
                                  "bg-primary text-foreground":
                                    value === address,
                                },
                              )}
                            >
                              {t(address)}
                            </Badge>
                          ))}
                        </div>
                      </FieldContent>
                    </Field>
                  );
                }}
              />
            </div>

            <div className="md:col-span-1">
              <FormInput
                name="recipient_name"
                placeholder={t("RecipientNamePlaceholder")}
                register={register}
                errors={errors}
                label={t("RecipientName")}
                required
              />
            </div>

            <div className="md:col-span-1">
              <FormInput
                name="recipient_phone"
                placeholder={t("RecipientPhonePlaceholder")}
                register={register}
                errors={errors}
                label={t("RecipientPhone")}
                prefix="AE +971"
                required
              />
            </div>

            <div className="col-span-1 md:col-span-2">
              <FormInput
                name="street"
                placeholder={t("StreetPlaceholder")}
                register={register}
                errors={errors}
                label={t("Street")}
                required
              />
            </div>

            <div className="col-span-1 md:col-span-2">
              <FormInput
                name="area"
                placeholder={t("AreaPlaceholder")}
                register={register}
                errors={errors}
                label={t("Area")}
                required
              />
            </div>

            <div className="md:col-span-1">
              <FormSelect
                control={control}
                label={t("City")}
                name="city"
                options={[{ label: "Dubai", value: "Dubai" }]}
                required
              />
            </div>

            <div className="md:col-span-1">
              <FormSelect
                control={control}
                label={t("Emirate")}
                name="emirate"
                options={[{ label: "Dubai", value: "Dubai" }]}
                required
              />
            </div>

            <div className="md:col-span-1">
              <FormInput
                name="building"
                placeholder={t("BuildingPlaceholder")}
                register={register}
                errors={errors}
                label={t("Building")}
                required
              />
            </div>

            <div className="md:col-span-1">
              <FormInput
                name="landmark"
                placeholder={t("LandmarkPlaceholder")}
                register={register}
                errors={errors}
                label={t("Landmark")}
                required
              />
            </div>

            <div className="md:col-span-1">
              <FormSwitch
                name="is_default"
                label={t("IsDefault")}
                control={control}
              />
            </div>
          </div>
        </form>
        <DialogFooter>
          <Button
            className="w-full h-11 cursor-pointer"
            onClick={() => form.current?.requestSubmit()}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Spinner />
            ) : address ? (
              t("SaveAddress")
            ) : (
              t("SaveAddress")
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
