"use client";

import { toast } from "sonner";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { Link } from "@/i18n/navigation";
import { FieldError } from "../ui/field";
import { useTranslations } from "next-intl";
import { Separator } from "../ui/separator";
import { Card, CardContent } from "../ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { validateCouponCodeAction } from "@/lib/shop-actions";
import { CouponFormValues, couponSchema, Summary } from "@/types/products";

export default function ValidateCoupon({ summary }: { summary: Summary }) {
  const t = useTranslations("Shop");
  const tCommon = useTranslations("Common");
  // Only a code the API accepted is carried to checkout; whatever is typed
  // in the input but not applied (or rejected) must not reach the order.
  const [appliedCode, setAppliedCode] = useState<string | null>(null);
  const [currentSummary, setCurrentSummary] = useState<
    Summary & {
      discount: string;
    }
  >({
    ...summary,
    discount: "",
  });

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CouponFormValues>({
    defaultValues: { coupon_code: "" },
    resolver: zodResolver(couponSchema(t)),
  });

  const onSubmit: SubmitHandler<CouponFormValues> = async (data) => {
    // `handleSubmit` does not block a second submit while one is in flight.
    if (isSubmitting) return;

    let result: Awaited<ReturnType<typeof validateCouponCodeAction>>;

    try {
      result = await validateCouponCodeAction(data.coupon_code);
    } catch {
      toast.error(tCommon("ErrorHappened"));
      return;
    }

    if (result.success) {
      setAppliedCode(result.coupon.code ?? data.coupon_code);
      setCurrentSummary((prev) => ({
        ...prev,
        total: result.coupon.total,
        discount: result.coupon.discount,
        type: result.coupon.type,
      }));
      return;
    }

    if (result.errors) {
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

    toast.error(tCommon("ErrorHappened"));
  };

  const checkoutQuery = appliedCode
    ? {
        coupon_code: appliedCode,
        discount: currentSummary.discount,
      }
    : undefined;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex-1">
            <Input
              {...register("coupon_code")}
              aria-label={t("PromoCode")}
              aria-invalid={errors.coupon_code ? true : undefined}
              aria-describedby={
                errors.coupon_code ? "coupon-code-error" : undefined
              }
              autoComplete="off"
              placeholder={t("PromoCodePlaceholder")}
              className="h-12 rounded-full border-border bg-white px-4 shadow-none placeholder:text-muted-foreground"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className="h-12 text-base rounded-full bg-primary px-7 font-semibold text-white hover:bg-primary hover:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100"
          >
            {isSubmitting ? <Spinner /> : t("Apply")}
          </Button>
        </div>

        <FieldError id="coupon-code-error" errors={[errors.coupon_code]} />
      </form>

      <Card className="rounded-xl border-0 bg-white">
        <CardContent className="space-y-5 p-6">
          <div className="flex items-center justify-between text-base">
            <span className="text-muted-foreground">{t("Subtotal")}</span>
            <span className="font-semibold text-foreground">
              {t("AED")} {currentSummary.subtotal}
            </span>
          </div>

          {/* <div className="flex items-center justify-between">
            <span className="text-muted-foreground">{t("VatRate")}</span>
            <span className="font-semibold text-muted-foreground">
              % {currentSummary.vat_rate}
            </span>
          </div> */}

          {/* <div className="flex items-center justify-between">
            <span className="text-muted-foreground">{t("VatTotal")}</span>
            <span className="font-semibold text-muted-foreground">
              {t("AED")} {currentSummary.vat_total}
            </span>
          </div> */}

          {appliedCode && (
            <div className="flex bg-red-400 text-white p-2 rounded-md items-center text-base italic justify-between font-semibold animate-in fade-in duration-300 motion-reduce:animate-none">
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

      <Button
        asChild
        className="h-16 w-full rounded-full bg-primary text-lg font-semibold text-white hover:bg-primary hover:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100"
      >
        <Link href={{ pathname: "/cart/order", query: checkoutQuery }}>
          {t("ProceedToCheckout")} · {currentSummary.total}
        </Link>
      </Button>
    </>
  );
}
