import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "@/i18n/navigation";
import { checkoutOrderAction } from "@/lib/shop-actions";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";

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
              {t("AED")} {total}
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
}
