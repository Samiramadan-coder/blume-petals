"use client";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "../ui/field";
import { toast } from "sonner";
import { useState } from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { Address } from "@/types/account";
import { Textarea } from "../ui/textarea";
import { useTranslations } from "next-intl";
import { checkoutOrderAction } from "@/lib/shop-actions";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useRouter } from "@/i18n/navigation";
import { Spinner } from "../ui/spinner";

export default function CompleteOrder({
  addresses,
  total,
}: {
  addresses: Address[];
  total: number;
}) {
  const router = useRouter();
  const t = useTranslations("Shop");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(
    addresses[0]?.id.toString(),
  );

  const finalTotal =
    total +
    +(
      addresses.find((a) => a.id.toString() === selectedAddress)?.city
        .delivery_fee || 0
    );

  async function handleContinueToPayment() {
    setLoading(true);
    const result = await checkoutOrderAction(selectedAddress, notes);
    setLoading(false);

    if (result.success) {
      toast.success(t("OrderPlacedSuccessfully"));
      router.push("/");
      return;
    }

    toast.error(t("OrderPlacementFailed"));
  }

  return (
    <>
      <div>
        <h3 className="mb-2 text-primary font-semibold">
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

      <div>
        <h3 className="mb-2 text-primary font-semibold">{t("OrderNotes")}</h3>
        <Textarea
          className="bg-white h-40"
          placeholder={t("OrderNotesPlaceholder")}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <div>
        <h3 className="mb-2 text-primary font-semibold">
          {t("PaymentDetails")}
        </h3>
        <p>
          {t("ItemsFee")}:{" "}
          <span className="underline italic text-muted-foreground font-bold">
            {total} {t("AED")}
          </span>
        </p>
        <p className="my-1">
          {t("DeliveryFee")}:{" "}
          <span className="underline italic text-muted-foreground font-bold">
            {addresses.find((a) => a.id.toString() === selectedAddress)?.city
              .delivery_fee || 0}{" "}
            {t("AED")}
          </span>
        </p>
        <p>
          <span className="text-foreground">{t("TotalAmount")}: </span>
          <span className="underline italic text-muted-foreground font-bold">
            {finalTotal} {t("AED")}
          </span>
        </p>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <Button
          onClick={handleContinueToPayment}
          className="h-14 border-2 px-6 text-base bg-green-200 text-green-700 hover:bg-green-300 hover:text-green-800"
        >
          {t("ContinueToPayment")} ({finalTotal} {t("AED")})
          {loading ? <Spinner /> : <ArrowRight className="rtl:rotate-180" />}
        </Button>
      </div>
    </>
  );
}
