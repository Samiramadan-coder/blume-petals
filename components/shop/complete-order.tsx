"use client";

import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Link } from "@/i18n/navigation";
import { Truck, Store } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useCart } from "@/providers/cart-provider";
import NoDataFounded from "../reusable/no-data-founded";
import AddresssPreview from "./complete-order/address-preview";
import OrderFinalDetails from "./complete-order/order-final-details";
import PickupLocationsPreview from "./complete-order/pickup-location-preview";

const formatMoney = (value: number) => value.toFixed(2);

export default function CompleteOrder({
  couponCode,
  discount: couponDiscount,
}: {
  couponCode: string | null;
  discount: number;
}) {
  const cart = useCart();
  const { addresses, pickupLocations, countries } = cart;
  const locale = useLocale();
  const t = useTranslations("Shop");
  // The cart is emptied as soon as the order is created, while this page is
  // still showing (waiting for the payment redirect). Keep what was ordered
  // so the summary doesn't collapse to zero in that window.
  const [{ items, summary }] = useState({
    items: cart.items,
    summary: cart.summary,
  });
  const [notes, setNotes] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState<"delivery" | "pickup">(
    "delivery",
  );
  const [selectedAddressId, setSelectedAddress] = useState<string | undefined>(
    addresses[0]?.id.toString(),
  );
  const [selectedPickupLocation, setSelectedPickupLocation] = useState<
    string | null
  >(pickupLocations[0]?.id.toString() || null);

  // Falls back to the first address when nothing valid is selected, e.g. when
  // the first address was just added from this page.
  const selectedAddress = addresses.some(
    (a) => a.id.toString() === selectedAddressId,
  )
    ? selectedAddressId
    : addresses[0]?.id.toString();

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

  const total = summary ? +summary.total : 0;
  // The discount arrives through the URL, so keep it within the cart total.
  const discount = Math.min(Math.max(couponDiscount, 0), total);

  // Final total calculation
  // The final total is calculated by subtracting the discount from the total and adding the delivery fee.
  // This ensures that the user sees the correct amount they need to pay based on their selections.
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

  if (items.length === 0) {
    return (
      <div className="space-y-4">
        <NoDataFounded label={t("EmptyCartState")} />
        <Button asChild className="h-11 rounded-full px-7">
          <Link href="/shop">{t("Title")}</Link>
        </Button>
      </div>
    );
  }

  const methodClassName =
    "bg-white flex-1 border-2 border-border rounded-lg h-30 flex flex-col md:flex-row gap-2 items-center justify-center cursor-pointer outline-none transition-colors motion-reduce:transition-none focus-visible:ring-3 focus-visible:ring-ring/50";

  return (
    <>
      <h1
        id="delivery-method-heading"
        className={cn("mb-6 font-semibold text-xl md:text-3xl", {
          "font-heading": locale === "en",
        })}
      >
        {t("HowToReceiveOrder")}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-10">
        <div>
          <div
            role="group"
            aria-labelledby="delivery-method-heading"
            className="flex items-center gap-4"
          >
            <button
              type="button"
              aria-pressed={deliveryMethod === "delivery"}
              onClick={() => setDeliveryMethod("delivery")}
              className={cn(
                methodClassName,
                deliveryMethod === "delivery" && "border-primary bg-primary/10",
              )}
            >
              <Truck
                className={deliveryMethod === "delivery" ? "text-primary" : ""}
              />
              <span className="block text-center">
                <span className="block font-semibold">{t("Delivery")}</span>
                {deliveryFee ? (
                  <span className="block text-sm text-primary mt-1">
                    {t("AED")} {formatMoney(deliveryFee)}
                  </span>
                ) : null}
              </span>
            </button>

            <button
              type="button"
              aria-pressed={deliveryMethod === "pickup"}
              onClick={() => setDeliveryMethod("pickup")}
              className={cn(
                methodClassName,
                deliveryMethod === "pickup" && "border-primary bg-primary/10",
              )}
            >
              <Store
                className={deliveryMethod === "pickup" ? "text-primary" : ""}
              />
              <span className="block text-center">
                <span className="block font-semibold">{t("Pickup")}</span>
                <span className="block text-sm text-primary mt-1">
                  {t("Free")}
                </span>
              </span>
            </button>
          </div>

          <div className="mt-6 space-y-6">
            {deliveryMethod === "delivery" && (
              <AddresssPreview
                countries={countries}
                addresses={addresses}
                selectedAddress={selectedAddress ?? ""}
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
              <label
                htmlFor="order-notes"
                className="block mb-2 text-foreground font-semibold"
              >
                {t("OrderNotes")}
              </label>
              <Textarea
                id="order-notes"
                className="bg-white h-40"
                placeholder={t("OrderNotesPlaceholder")}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>
        </div>

        <OrderFinalDetails
          items={items}
          total={formatMoney(total)}
          discount={discount ? formatMoney(discount) : null}
          deliveryFee={formatMoney(deliveryFee)}
          finalTotal={formatMoney(finalTotal)}
          deliveryMethod={deliveryMethod}
          showButton={showButton}
          couponCode={couponCode}
          addressId={selectedAddress ?? null}
          pickupLocationId={selectedPickupLocation}
          note={notes}
        />
      </div>
    </>
  );
}
