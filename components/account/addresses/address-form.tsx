"use client";

import {
  Address,
  AddressFormBody,
  AddressLabel,
  addressSchema,
  City,
  Country,
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

import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { http } from "@/lib/http";
import { Plus } from "lucide-react";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Spinner } from "../../ui/spinner";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { saveAddress } from "@/lib/account-actions";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../../reusable/form/form-input";
import FormSelect from "../../reusable/form/form-select";
import FormSwitch from "../../reusable/form/form-switch";
import { Controller, useForm, useWatch } from "react-hook-form";
import { Field, FieldContent, FieldLabel } from "../../ui/field";
import LocationPicker from "../../reusable/form/location-picker";

export default function AddressForm({
  address,
  trigger,
  buttonClassName,
  countries,
}: {
  address?: Address;
  trigger?: React.ReactNode;
  buttonClassName?: string;
  countries: Country[];
}) {
  const t = useTranslations("Account.Address");
  const tFields = useTranslations("Fields");
  const closeBtn = useRef<HTMLButtonElement>(null);
  const addresses: AddressLabel[] = ["Home", "Work", "Other"];
  const form = useRef<HTMLFormElement>(null);
  const [cities, setCities] = useState<City[]>([]);

  const {
    register,
    control,
    setError,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddressFormBody>({
    resolver: zodResolver(addressSchema(tFields)),
    defaultValues: {
      label: address?.label || "Home",
      recipient_name: address?.recipient_name || "",
      recipient_phone: address?.recipient_phone || "",
      street: address?.street || "",
      area: address?.area || "",
      city_id: address?.city.id || 0,
      country_id: address?.country.id || 0,
      building: address?.building || "",
      landmark: address?.landmark || "",
      latitude: address?.latitude ? +address.latitude : 25.2048,
      longitude: address?.longitude ? +address.longitude : 55.2708,
      is_default: address?.is_default || false,
    },
  });

  const onSubmit = async (data: AddressFormBody) => {
    const result = await saveAddress(address ?? null, data);

    if (result.success) {
      toast.success(
        address ? t("UpdatedSuccessfully") : t("AddedSuccessfully"),
      );
      closeBtn.current?.click();
      return;
    }

    if (result.errors) {
      Object.entries(result.errors).forEach(([field, message]) => {
        if (!message) return;
        setError(field as keyof AddressFormBody, {
          type: "server",
          message,
        });
      });
      return;
    }

    toast.error(t("ErrorUploading"));
  };

  const watchLatitude = useWatch({
    control,
    name: "latitude",
  });

  const watchLongitude = useWatch({
    control,
    name: "longitude",
  });

  const watchCountryId = useWatch({
    control,
    name: "country_id",
  });

  useEffect(() => {
    if (!watchCountryId) return;

    async function getListOfCities(countryId: number) {
      try {
        const { data, ok } = await http.get<{ data: { items: City[] } }>(
          `/api/v1/countries/${countryId}/cities`,
        );

        if (!ok) {
          throw new Error("Failed to fetch cities");
        }

        setCities(data.data.items);
      } catch (error) {
        console.error("Failed to fetch cities:", error);
      }
    }

    (async () => {
      await getListOfCities(watchCountryId);
    })();
  }, [setValue, watchCountryId]);

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
                        {tFields("Labels.AddressLabel")}
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
                placeholder={tFields("Placeholders.FullName")}
                register={register}
                errors={errors}
                label={tFields("Labels.FullName")}
                required
              />
            </div>

            <div className="md:col-span-1">
              <FormInput
                name="recipient_phone"
                placeholder={tFields("Placeholders.Phone")}
                register={register}
                errors={errors}
                label={tFields("Labels.Phone")}
                prefix="AE +971"
                required
              />
            </div>

            <div className="col-span-1 md:col-span-2">
              <FormInput
                name="street"
                placeholder={tFields("Placeholders.Street")}
                register={register}
                errors={errors}
                label={tFields("Labels.Street")}
                required
              />
            </div>

            <div className="col-span-1 md:col-span-2">
              <FormInput
                name="area"
                placeholder={tFields("Placeholders.Area")}
                register={register}
                errors={errors}
                label={tFields("Labels.Area")}
                required
              />
            </div>

            <div className="md:col-span-1">
              <FormSelect
                control={control}
                label={tFields("Labels.Country")}
                name="country_id"
                options={countries.map((country) => ({
                  label: country.name,
                  value: country.id,
                }))}
                required
              />
            </div>

            <div className="md:col-span-1">
              <FormSelect
                control={control}
                label={tFields("Labels.City")}
                name="city_id"
                options={cities.map((city) => ({
                  label: city.name,
                  value: city.id,
                }))}
                required
              />
            </div>

            <div className="md:col-span-1">
              <FormInput
                name="building"
                placeholder={tFields("Placeholders.Building")}
                register={register}
                errors={errors}
                label={tFields("Labels.Building")}
                required
              />
            </div>

            <div className="md:col-span-1">
              <FormInput
                name="landmark"
                placeholder={tFields("Placeholders.Landmark")}
                register={register}
                errors={errors}
                label={tFields("Labels.Landmark")}
                required
              />
            </div>

            <div className="md:col-span-1">
              <FormSwitch
                name="is_default"
                label={tFields("Labels.IsDefault")}
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
