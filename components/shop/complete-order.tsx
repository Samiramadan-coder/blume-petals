"use client";

import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";
import { Textarea } from "../ui/textarea";
import { useTranslations } from "next-intl";
import { PickupLocation } from "@/types/products";
import { Address, Country } from "@/types/account";
import AddresssPreview from "./complete-order/address-preview";
import PickupLocationsPreview from "./complete-order/pickup-location-preview";
import OrderFinalDetails from "./complete-order/order-final-details";

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
  discount: number;
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
  const finalTotal = total - discount + deliveryFee;

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
              <p className="font-semibold">{t("Delivery")}</p>
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
              <p className="font-semibold">{t("Pickup")}</p>
              <p className="text-sm text-primary mt-1">{t("Free")}</p>
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
