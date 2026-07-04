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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import { useRef } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { useRouter } from "@/i18n/navigation";
import { http, ValidationError } from "@/lib/http";
import FormInput from "../reusable/form/form-input";
import { zodResolver } from "@hookform/resolvers/zod";
import FormSelect from "../reusable/form/form-select";
import FormSwitch from "../reusable/form/form-switch";
import { Field, FieldContent, FieldLabel } from "../ui/field";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

export default function AddressForm({
  address,
  trigger,
}: {
  address?: Address;
  trigger?: React.ReactNode;
}) {
  const router = useRouter();
  const closeBtn = useRef<HTMLButtonElement>(null);
  const addresses: AddressLabel[] = ["Home", "Work", "Other"];

  const {
    register,
    control,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddressFormBody>({
    resolver: zodResolver(addressSchema),
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
      latitude: address?.latitude ? +address.latitude : 10,
      longitude: address?.longitude ? +address.longitude : 10,
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
        address ? "Address updated successfully" : "Address added successfully",
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
        toast.error(
          address ? "Error in updating address" : "Error in adding address",
        );
      }
    }
  };

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
            className="cursor-pointer border border-primary text-primary hover:text-primary font-semibold h-10 w-45"
          >
            <Plus />
            Add New Address
          </Button>
        )}
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-lg"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Add New Address</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            void handleSubmit(onSubmit)(e);
          }}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1 md:col-span-2">
              <Controller
                control={control}
                name="label"
                render={({ field }) => {
                  const { value, onChange } = field;

                  return (
                    <Field>
                      <FieldLabel htmlFor="photo_path">
                        Address Label
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
                              {address}
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
                placeholder="Enter Full Name"
                register={register}
                errors={errors}
                label="Full Name"
                required
              />
            </div>

            <div className="md:col-span-1">
              <FormInput
                name="recipient_phone"
                placeholder="Enter Phone Number"
                register={register}
                errors={errors}
                label="Phone Number"
                prefix="AE +971"
                required
              />
            </div>

            <div className="col-span-1 md:col-span-2">
              <FormInput
                name="street"
                placeholder="e.g 123 Sheikh Zayed Road, Dubai"
                register={register}
                errors={errors}
                label="Street/Building/Villa"
                required
              />
            </div>

            <div className="col-span-1 md:col-span-2">
              <FormInput
                name="area"
                placeholder="e.g Downtown Dubai"
                register={register}
                errors={errors}
                label="Area/District"
                required
              />
            </div>

            <div className="md:col-span-1">
              <FormSelect
                control={control}
                label="City"
                name="city"
                options={[{ label: "Dubai", value: "Dubai" }]}
                required
              />
            </div>

            <div className="md:col-span-1">
              <FormSelect
                control={control}
                label="Emirates"
                name="emirate"
                options={[{ label: "Dubai", value: "Dubai" }]}
                required
              />
            </div>

            <div className="md:col-span-1">
              <FormInput
                name="building"
                placeholder="e.g Building Name"
                register={register}
                errors={errors}
                label="Building Name"
                required
              />
            </div>

            <div className="md:col-span-1">
              <FormInput
                name="landmark"
                placeholder="e.g Near Mall of the Emirates"
                register={register}
                errors={errors}
                label="Landmark"
                required
              />
            </div>

            <div className="md:col-span-1">
              <FormSwitch
                name="is_default"
                label="Set as Default Address"
                control={control}
              />
            </div>

            <div className="col-span-1 md:col-span-2">
              <Button
                className="w-full h-11 cursor-pointer"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Spinner />
                ) : address ? (
                  "Update Address"
                ) : (
                  "Save Address"
                )}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
