"use client";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "../ui/field";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { useTranslations } from "next-intl";
import { Separator } from "../ui/separator";
import { useRouter } from "@/i18n/navigation";
import { Card, CardContent } from "../ui/card";
import { PickupLocation } from "@/types/products";
import { Address, Country } from "@/types/account";
import { checkoutOrderAction } from "@/lib/shop-actions";
import AddressForm from "../account/addresses/address-form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

export default function CompleteOrder({
  countries,
  pickupLocations,
  addresses,
  total,
  couponCode,
  discount,
}: {
  countries: Country[];
  pickupLocations: PickupLocation[];
  addresses: Address[];
  total: number;
  couponCode: string | null;
  discount?: number;
}) {
  const t = useTranslations("Shop");
  const [notes, setNotes] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState<"delivery" | "pickup">(
    "delivery",
  );
  const [selectedAddress, setSelectedAddress] = useState(
    addresses[0]?.id.toString(),
  );
  const [selectedPickupLocation, setSelectedPickupLocation] = useState<
    string | null
  >(pickupLocations[0]?.id.toString() || null);

  // Delivery fee calculation based on selected address and delivery method
  // If the delivery method is "pickup", the delivery fee is 0. Otherwise,
  // it finds the selected address and retrieves its delivery fee.
  const deliveryFee = useMemo(() => {
    if (deliveryMethod === "pickup") return 0;

    const selectedAddressObj = addresses.find(
      (a) => a.id.toString() === selectedAddress,
    );

    return selectedAddressObj ? +selectedAddressObj?.city.delivery_fee : 0;
  }, [addresses, deliveryMethod, selectedAddress]);

  // Final total calculation
  // It adds the delivery fee to the total amount to get the final total.
  const finalTotal = useMemo(() => {
    return total + deliveryFee;
  }, [total, deliveryFee]);

  // Show Button Or Not
  // The button to continue to payment is shown only if the delivery method is "pickup" and a pickup location is selected,
  // or if the delivery method is "delivery" and an address is selected.
  // This ensures that the user has made a valid selection before proceeding to payment.
  const showButton = useMemo(() => {
    return Boolean(
      (deliveryMethod === "pickup" && selectedPickupLocation) ||
      (deliveryMethod === "delivery" && selectedAddress),
    );
  }, [deliveryMethod, selectedAddress, selectedPickupLocation]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      <div className="md:col-span-2">
        <div className="flex items-center gap-4">
          <div
            onClick={() => setDeliveryMethod("delivery")}
            className={cn(
              "bg-white flex-1 border-2 border-border rounded-lg h-30 flex items-center justify-center cursor-pointer",
              deliveryMethod === "delivery" && "border-primary bg-primary/10",
            )}
          >
            <div className="text-center">
              <p className="font-semibold">Delivery</p>
              {deliveryFee ? (
                <p className="text-sm text-primary mt-1">
                  {t("AED")} {deliveryFee}
                </p>
              ) : null}
            </div>
          </div>

          <div
            onClick={() => setDeliveryMethod("pickup")}
            className={cn(
              "bg-white flex-1 border-2 border-border rounded-lg h-30 flex items-center justify-center cursor-pointer",
              deliveryMethod === "pickup" && "border-primary bg-primary/10",
            )}
          >
            <div className="text-center">
              <p className="font-semibold">Pickup From Store</p>
              <p className="text-sm text-primary mt-1">Free</p>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-6">
          {deliveryMethod === "delivery" && (
            <AddresssPreview
              countries={countries}
              addresses={addresses}
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
            />
          )}

          {deliveryMethod === "pickup" && (
            <PickupLocationsPreview
              pickupLocations={pickupLocations}
              selectedPickupLocation={selectedPickupLocation}
              setSelectedPickupLocation={setSelectedPickupLocation}
            />
          )}

          <div>
            <h3 className="mb-2 text-foreground font-semibold">
              {t("OrderNotes")}
            </h3>
            <Textarea
              className="bg-white h-40"
              placeholder={t("OrderNotesPlaceholder")}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>
      </div>

      <OrderFinalDetails
        total={total}
        discount={discount}
        deliveryFee={deliveryFee}
        finalTotal={finalTotal}
        deliveryMethod={deliveryMethod}
        showButton={showButton}
        couponCode={couponCode}
        addressId={selectedAddress}
        pickupLocationId={selectedPickupLocation}
        note={notes}
      />
    </div>
  );
}

/**
 * AddresssPreview component displays a list of addresses for the user to select from.
 * It uses a RadioGroup to allow the user to select one address at a time.
 * The selected address is highlighted, and the delivery fee for that address is displayed.
 */
const AddresssPreview = ({
  countries,
  addresses,
  selectedAddress,
  setSelectedAddress,
}: {
  countries: Country[];
  addresses: Address[];
  selectedAddress: string;
  setSelectedAddress: (value: string) => void;
}) => {
  const t = useTranslations("Shop");

  return (
    <>
      <AddressForm countries={countries} />

      <div>
        <h3 className="mb-2 text-foreground font-semibold">
          {t("ShippingAddress")}
        </h3>
        <RadioGroup
          value={selectedAddress}
          onValueChange={setSelectedAddress}
          className="w-full"
        >
          {addresses.map((address, index) => (
            <FieldLabel
              htmlFor={address.id.toString()}
              className="bg-white p-4 cursor-pointer"
              key={index}
            >
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>
                    <span className="text-foreground">Address: </span>
                    <span className="underline italic text-muted-foreground font-bold">
                      {address.city.name}, {address.country.name},{" "}
                      {address.area}, {address.street}, {address.building},{" "}
                      {address.apartment}
                    </span>
                  </FieldTitle>
                  <FieldDescription>
                    <span className="text-foreground">Delivery Fee: </span>
                    <span className="underline italic text-muted-foreground font-bold">
                      {address.city.delivery_fee} {t("AED")}
                    </span>
                  </FieldDescription>
                </FieldContent>
                <RadioGroupItem
                  value={address.id.toString()}
                  id={address.id.toString()}
                />
              </Field>
            </FieldLabel>
          ))}
        </RadioGroup>
      </div>
    </>
  );
};

/**
 * PickupLocationsPreview component is a placeholder for displaying pickup locations.
 * Currently, it does not render any content. This component can be expanded in the future
 * to display available pickup locations for the user to choose from.
 */
const PickupLocationsPreview = ({
  pickupLocations,
  selectedPickupLocation,
  setSelectedPickupLocation,
}: {
  pickupLocations: PickupLocation[];
  selectedPickupLocation: string | null;
  setSelectedPickupLocation: (value: string) => void;
}) => {
  return (
    <div>
      <h3 className="mb-2 text-foreground font-semibold">Pickup Locations</h3>
      <RadioGroup
        value={selectedPickupLocation || undefined}
        onValueChange={setSelectedPickupLocation}
        className="w-full"
      >
        {pickupLocations.map((location) => (
          <FieldLabel
            htmlFor={location.id.toString()}
            className="bg-white p-4 cursor-pointer"
            key={location.id}
          >
            <Field orientation="horizontal">
              <FieldContent>
                <FieldTitle>
                  <span className="text-foreground">{location.name}</span>
                </FieldTitle>
                <FieldDescription className="flex gap-1">
                  <span className="text-foreground">Address: </span>
                  <div
                    className="underline italic text-muted-foreground font-bold"
                    dangerouslySetInnerHTML={{ __html: location.address }}
                  />
                </FieldDescription>
                <FieldDescription>
                  <span className="text-foreground">Hours: </span>
                  <span className="underline italic text-muted-foreground font-bold">
                    {location.hours}
                  </span>
                </FieldDescription>
                <FieldDescription>
                  <span className="text-foreground">Ready in: </span>
                  <span className="underline italic text-muted-foreground font-bold">
                    {location.ready_in}
                  </span>
                </FieldDescription>
              </FieldContent>
              <RadioGroupItem
                value={location.id.toString()}
                id={location.id.toString()}
              />
            </Field>
          </FieldLabel>
        ))}
      </RadioGroup>
    </div>
  );
};

/**
 * OrderFinalDetails component displays the final order summary including subtotal, discount, delivery fee, and total.
 * It also provides a button to continue to payment, which triggers the checkout process.
 * The component takes in props for total, discount, delivery fee, final total, delivery method, and whether to show the button.
 */
const OrderFinalDetails = ({
  total,
  discount,
  deliveryFee,
  finalTotal,
  deliveryMethod,
  showButton,
  couponCode,
  addressId,
  pickupLocationId,
  note,
}: {
  total: number;
  discount?: number;
  deliveryFee: number;
  finalTotal: number;
  deliveryMethod: "delivery" | "pickup";
  showButton: boolean;
  couponCode: string | null;
  addressId: string | null;
  pickupLocationId: string | null;
  note: string;
}) => {
  const router = useRouter();
  const t = useTranslations("Shop");
  const [loading, setLoading] = useState(false);

  async function handleContinueToPayment() {
    setLoading(true);

    const formData: { [key: string]: string } = {
      customer_notes: note,
    };

    if (deliveryMethod === "delivery" && addressId) {
      formData.address_id = addressId;
    }

    if (deliveryMethod === "pickup" && pickupLocationId) {
      formData.fulfillment_method = "pickup";
      formData.pickup_location_id = pickupLocationId;
    }

    if (couponCode) {
      formData.coupon_code = couponCode;
    }

    const result = await checkoutOrderAction(formData);

    setLoading(false);

    if (result.success) {
      toast.success(t("OrderPlacedSuccessfully"));
      router.push("/");
      return;
    }

    toast.error(t("OrderPlacementFailed"));
  }

  return (
    <div className="space-y-6">
      <Card className="rounded-xl border-0 bg-white shadow-sm">
        <CardContent className="space-y-5 p-6">
          <div className="flex items-center justify-between">
            <span className="text-zinc-500">{t("Subtotal")}</span>
            <span className="font-semibold text-muted-foreground">
              {t("AED")} {total + (discount || 0)}
            </span>
          </div>

          {discount ? (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">{t("Discount")}</span>
              <span className="font-semibold text-muted-foreground">
                - {t("AED")} {discount || 0}
              </span>
            </div>
          ) : null}

          {deliveryMethod === "delivery" ? (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">{t("DeliveryFee")}</span>
              <span className="font-semibold text-muted-foreground">
                {t("AED")} {deliveryFee}
              </span>
            </div>
          ) : null}

          <Separator className="bg-border" />
          <div className="flex items-center justify-between gap-4">
            <span className="text-lg font-semibold">{t("Total")}</span>
            <span className="text-3xl font-semibold text-primary">
              {t("AED")} {finalTotal}
            </span>
          </div>
        </CardContent>
      </Card>

      {showButton ? (
        <Button
          onClick={handleContinueToPayment}
          className="h-14 w-full border-2 px-6 text-base bg-primary text-white"
        >
          {t("ContinueToPayment")} ({finalTotal} {t("AED")})
          {loading ? <Spinner /> : <ArrowRight className="rtl:rotate-180" />}
        </Button>
      ) : null}
    </div>
  );
};
