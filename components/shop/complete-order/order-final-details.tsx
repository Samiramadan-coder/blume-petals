import { toast } from "sonner";
import { useRef, useState } from "react";
import { MoveRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { CartItem } from "@/types/products";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { checkoutOrderAction, completePaymentAction } from "@/lib/shop-actions";

export default function OrderFinalDetails({
  items,
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
  items: CartItem[];
  total: string;
  discount: string | null;
  deliveryFee: string;
  finalTotal: string;
  deliveryMethod: "delivery" | "pickup";
  showButton: boolean;
  couponCode: string | null;
  addressId: string | null;
  pickupLocationId: string | null;
  note: string;
}) {
  const router = useRouter();
  const t = useTranslations("Shop");
  const [pending, setPending] = useState<"online" | "cod" | null>(null);
  // Set once the order exists but its payment link could not be created, so
  // a retry asks for the link again instead of placing a second order.
  const [unpaidOrderId, setUnpaidOrderId] = useState<number | null>(null);
  // `pending` only disables the buttons on the next render; this blocks a
  // second click that lands before it.
  const submitting = useRef(false);

  function buildOrderData(paymentMethod?: "cod") {
    const formData: { [key: string]: string } = {
      customer_notes: note,
    };

    if (paymentMethod) {
      formData.payment_method = paymentMethod;
    }

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

    return formData;
  }

  async function handleContinueToPayment() {
    if (submitting.current) return;
    submitting.current = true;
    setPending("online");

    try {
      let orderId = unpaidOrderId;

      if (orderId === null) {
        const result = await checkoutOrderAction(buildOrderData());

        if (!result.success) {
          toast.error(result.message ?? t("OrderPlacementFailed"));
          return;
        }

        orderId = result.orderId;
        setUnpaidOrderId(orderId);
      }

      const paymentResult = await completePaymentAction(orderId);

      if (paymentResult.success) {
        // Stay disabled while the browser leaves for the payment page.
        window.location.href = paymentResult.paymentUrl;
        return;
      }

      toast.error(t("PaymentFailed"));
    } catch {
      toast.error(t("OrderPlacementFailed"));
    }

    submitting.current = false;
    setPending(null);
  }

  async function handlePaymentOnDelivery() {
    if (submitting.current) return;
    submitting.current = true;
    setPending("cod");

    try {
      const result = await checkoutOrderAction(buildOrderData("cod"));

      if (result.success) {
        toast.success(t("OrderPlacedSuccessfully"));
        // Stay disabled until the orders page replaces this one.
        router.push("/account/orders");
        return;
      }

      toast.error(result.message ?? t("OrderPlacementFailed"));
    } catch {
      toast.error(t("OrderPlacementFailed"));
    }

    submitting.current = false;
    setPending(null);
  }

  return (
    <div className="space-y-6">
      <Card className="rounded-xl border-0 bg-white shadow-sm">
        <CardContent className="space-y-5 p-6">
          <h2 className="text-lg font-semibold">{t("OrderSummary")}</h2>

          <div>
            {items.map((item) => (
              <p
                key={item.id}
                className="flex items-center justify-between gap-4 text-muted-foreground"
              >
                <span>
                  {item.product.name} x{item.qty}
                </span>
                <span className="shrink-0">
                  {t("AED")} {item.line_total}
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
                - {t("AED")} {discount}
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
            disabled={!showButton || pending !== null}
            aria-busy={pending === "online"}
            onClick={handleContinueToPayment}
            className="h-14 w-full border-2 px-6 text-base bg-primary text-white"
          >
            {t("ContinueToPayment")} ({finalTotal} {t("AED")})
            {pending === "online" ? (
              <Spinner />
            ) : (
              <MoveRight className="rtl:rotate-180" />
            )}
          </Button>

          <Button
            disabled={!showButton || pending !== null || unpaidOrderId !== null}
            aria-busy={pending === "cod"}
            onClick={handlePaymentOnDelivery}
            className="h-14 w-full border-2 px-6 text-base bg-secondary text-foreground"
          >
            {t("PaymentOnDelivery")} ({finalTotal} {t("AED")})
            {pending === "cod" ? (
              <Spinner />
            ) : (
              <MoveRight className="rtl:rotate-180" />
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
