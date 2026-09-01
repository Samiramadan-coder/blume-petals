import { toast } from "sonner";
import { useState } from "react";
import { MoveRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useCart } from "@/providers/cart-provider";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { checkoutOrderAction, completePaymentAction } from "@/lib/shop-actions";

export default function OrderFinalDetails({
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
}) {
  const { items } = useCart();
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
      const paymentResult = await completePaymentAction(result.orderId);

      if (paymentResult.success) {
        window.location.href = paymentResult.paymentUrl;
        return;
      }

      if (!paymentResult.success) {
        toast.error(t("PaymentFailed"));
        return;
      }

      return;
    }

    toast.error(t("OrderPlacementFailed"));
  }

  return (
    <div className="space-y-6">
      <Card className="rounded-xl border-0 bg-white shadow-sm">
        <CardContent className="space-y-5 p-6">
          <h3 className="text-lg font-semibold">{t("OrderSummary")}</h3>

          <div>
            {items.map((item, index) => (
              <p
                key={index}
                className="flex items-center justify-between text-muted-foreground"
              >
                <span>
                  {item.product.name} x{item.qty}
                </span>
                <span>
                  {t("AED")} {item.unit_price}
                </span>
              </p>
            ))}
          </div>

          <Separator className="bg-border" />

          <div className="flex items-center text-base justify-between">
            <span className="text-muted-foreground">{t("Subtotal")}</span>
            <span className="font-semibold text-foreground">
              {t("AED")} {total}
            </span>
          </div>

          {discount ? (
            <div className="flex items-center text-base justify-between">
              <span className="text-muted-foreground">{t("Discount")}</span>
              <span className="font-semibold text-foreground">
                - {t("AED")} {discount || 0}
              </span>
            </div>
          ) : null}

          {deliveryMethod === "delivery" ? (
            <div className="flex items-center text-base justify-between">
              <span className="text-muted-foreground">{t("DeliveryFee")}</span>
              <span className="font-semibold text-foreground">
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

          <Button
            disabled={!showButton || loading}
            onClick={handleContinueToPayment}
            className="h-14 w-full border-2 px-6 text-base bg-primary text-white"
            aria-label="Continue to payment"
          >
            {t("ContinueToPayment")} ({finalTotal} {t("AED")})
            {loading ? <Spinner /> : <MoveRight className="rtl:rotate-180" />}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
