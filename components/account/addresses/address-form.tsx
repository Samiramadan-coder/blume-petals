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
import { Button } from "../../ui/button";
import { badgeVariants } from "../../ui/badge";
import { Spinner } from "../../ui/spinner";
import { useTranslations } from "next-intl";
import { saveAddress } from "@/lib/account-actions";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../../reusable/form/form-input";
import FormSelect from "../../reusable/form/form-select";
import FormSwitch from "../../reusable/form/form-switch";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { Field, FieldContent, FieldLabel } from "../../ui/field";
import LocationPicker from "../../reusable/form/location-picker";

const addressLabels: AddressLabel[] = ["Home", "Work", "Other"];

function getFormValues(address?: Address): AddressFormBody {
  return {
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
  };
}

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
  const form = useRef<HTMLFormElement>(null);
  const [open, setOpen] = useState(false);
  const [cities, setCities] = useState<City[]>([]);

  const {
    reset,
    register,
    control,
    setError,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddressFormBody>({
    resolver: zodResolver(addressSchema(tFields)),
    defaultValues: getFormValues(address),
  });

  const onOpenChange = (nextOpen: boolean) => {
    // Always start from the current address (or a blank form) so values left
    // over from a previous add/edit are never submitted.
    if (nextOpen) reset(getFormValues(address));
    setOpen(nextOpen);
  };

  const onSubmit = async (data: AddressFormBody) => {
    let result: Awaited<ReturnType<typeof saveAddress>>;

    try {
      result = await saveAddress(address ?? null, data);
    } catch {
      toast.error(t("ErrorUploading"));
      return;
    }

    if (result.success) {
      toast.success(
        address ? t("UpdatedSuccessfully") : t("AddedSuccessfully"),
      );
      setOpen(false);
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

  const countryCities = cities.filter(
    (city) => city.country_id === watchCountryId,
  );
  const hasCities = countryCities.length > 0;

  // Cities are only needed while the dialog is open; fetching them on mount
  // fired one request per saved address on every page load.
  useEffect(() => {
    if (!open || !watchCountryId || hasCities) return;

    let ignore = false;

    (async () => {
      try {
        const { data } = await http.get<{ data: { items: City[] } }>(
          `/api/v1/countries/${watchCountryId}/cities`,
        );

        if (!ignore) setCities(data.data.items);
      } catch (error) {
        console.error("Failed to fetch cities:", error);
      }
    })();

    return () => {
      ignore = true;
    };
  }, [open, watchCountryId, hasCities]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <Button
            variant="outline"
            aria-label="Add New Address"
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
                      <FieldLabel id="address-label">
                        {tFields("Labels.AddressLabel")}
                      </FieldLabel>
                      <FieldContent>
                        <div
                          role="group"
                          aria-labelledby="address-label"
                          className="flex items-center gap-3"
                        >
                          {addressLabels.map((label) => (
                            <button
                              key={label}
                              type="button"
                              data-slot="badge"
                              aria-pressed={value === label}
                              onClick={() => onChange(label)}
                              className={cn(
                                badgeVariants(),
                                `h-9 w-20 bg-primary/40 text-foreground text-sm cursor-pointer`,
                                {
                                  "bg-primary text-foreground": value === label,
                                },
                              )}
                            >
                              {t(label)}
                            </button>
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
                onTrackValueChange={() => {
                  setValue("city_id", 0);
                }}
                placeholder={tFields("Placeholders.Country")}
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
                placeholder={tFields("Placeholders.City")}
                name="city_id"
                options={countryCities.map((city) => ({
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
            aria-label="Save Address"
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
