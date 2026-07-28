"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Separator } from "../ui/separator";
import { Card, CardContent } from "../ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { validateCouponCodeAction } from "@/lib/shop-actions";
import { CouponFormValues, couponSchema, Summary } from "@/types/products";
import { FieldError } from "../ui/field";
import { toast } from "sonner";
import { Link } from "@/i18n/navigation";

export default function ValidateCoupon({ summary }: { summary: Summary }) {
  const t = useTranslations("Shop");
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [currentSummary, setCurrentSummary] = useState<
    Summary & { discount?: string }
  >({ ...summary });

  const {
    register,
    setError,
    getValues,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CouponFormValues>({
    defaultValues: { coupon_code: "" },
    resolver: zodResolver(couponSchema(t)),
  });

  const onSubmit: SubmitHandler<CouponFormValues> = async (data) => {
    const result = await validateCouponCodeAction(data.coupon_code);

    if (result.success) {
      setIsCouponApplied(true);
      setCurrentSummary((prev) => ({
        ...prev,
        total: result.coupon.total,
        discount: result.coupon.discount,
        type: result.coupon.type,
      }));
      return;
    }

    if (result.success === false && result.errors) {
      Object.entries(result.errors).forEach(([field, message]) => {
        if (!message) return;
        toast.error(message);
        setError(field as keyof CouponFormValues, {
          type: "server",
          message,
        });
      });
      return;
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex-1">
            <Input
              {...register("coupon_code")}
              placeholder={t("PromoCodePlaceholder")}
              className="h-12 rounded-full border-border bg-white px-4 shadow-none placeholder:text-zinc-400 focus-visible:ring-primary"
            />
          </div>

          <Button
            type="submit"
            className="h-12 rounded-full bg-primary px-7 font-semibold text-white hover:bg-[#bfa664]"
          >
            {isSubmitting ? <Spinner /> : t("Apply")}
          </Button>
        </div>

        <FieldError errors={[errors.coupon_code]} />
      </form>

      <Card className="rounded-xl border-0 bg-white shadow-[0_6px_20px_rgba(17,24,39,0.08)]">
        <CardContent className="space-y-5 p-6">
          <div className="flex items-center justify-between">
            <span className="text-zinc-500">{t("Subtotal")}</span>

            <span className="font-semibold text-muted-foreground">
              {t("AED")} {currentSummary.subtotal}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">{t("VatRate")}</span>
            <span className="font-semibold text-muted-foreground">
              % {currentSummary.vat_rate}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">{t("VatTotal")}</span>
            <span className="font-semibold text-muted-foreground">
              {t("AED")} {currentSummary.vat_total}
            </span>
          </div>

          {isCouponApplied && (
            <div className="flex bg-red-400 text-white p-2 rounded-md items-center text-base italic justify-between font-semibold">
              <span>{t("Discount")}</span>
              <span>
                {t("AED")} {currentSummary.discount}
              </span>
            </div>
          )}

          <Separator className="bg-border" />

          <div className="flex items-center justify-between gap-4">
            <span className="text-lg font-semibold">{t("Total")}</span>
            <span className="text-3xl font-semibold text-primary">
              {t("AED")} {currentSummary.total}
            </span>
          </div>
        </CardContent>
      </Card>

      <Link
        href={`/cart/order?new_total_fee=${currentSummary.total}&coupon_code=${getValues("coupon_code")}`}
        className="w-full"
      >
        <Button className="h-16 w-full rounded-full bg-primary text-lg font-semibold text-white hover:bg-[#bfa664]">
          {t("ProceedToCheckout")} · {currentSummary.total}
        </Button>
      </Link>
    </>
  );
}
