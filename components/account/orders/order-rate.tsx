"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { rateOrder } from "@/lib/account-actions";
import { FieldError } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import OrderRating from "@/components/account/orders/order-rating";
import FormTextarea from "@/components/reusable/form/form-textarea";
import { OrderItem, RatingFormData, ratingSchema } from "@/types/account";
import { useForm, SubmitHandler, Controller, useWatch } from "react-hook-form";

export default function OrderRate({
  items,
  orderId,
}: {
  items: OrderItem["items"];
  orderId: number;
}) {
  const t = useTranslations("Account.Orders");
  const formRef = useRef<HTMLFormElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const [generalRating, setGeneralRating] = useState(0);

  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RatingFormData>({
    resolver: zodResolver(ratingSchema(t)),
    defaultValues: {
      reviews: items.map((item) => ({
        rating: 0,
        product_slug: item.slug,
      })),
    },
  });

  // Watch the rating value to conditionally render the comment field
  const reviews = useWatch({ control, name: "reviews" });

  // Handle form submission
  const onSubmit: SubmitHandler<RatingFormData> = async (data) => {
    const result = await rateOrder(orderId, data);

    if (result.success) {
      toast.success(t("SuccessfullyRated"));
      return closeBtn.current?.click();
    }

    toast.error(t("FailedToRate"));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex-1 uppercase h-11" variant="default">
          {t("RateOrder")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <h3 className="text-2xl text-center font-medium text-foreground">
          {t("OrderExperience")}
        </h3>

        {generalRating === 0 && items.length > 1 ? (
          <OrderRating
            value={generalRating}
            onChange={(value) => {
              setValue(
                "reviews",
                items.map((item) => ({
                  rating: value,
                  product_slug: item.slug,
                })),
              );
              setGeneralRating(value);
            }}
          />
        ) : (
          <form
            ref={formRef}
            className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4 space-y-6"
            onSubmit={(e) => void handleSubmit(onSubmit)(e)}
          >
            {reviews.map((_, index) => (
              <Controller
                key={index}
                control={control}
                name={`reviews.${index}.rating`}
                render={({ field }) => {
                  return (
                    <>
                      <p className="text-sm text-foreground/60 text-center">
                        {index + 1}- {items[index].name}
                      </p>
                      <OrderRating
                        {...field}
                        value={field.value}
                        onChange={field.onChange}
                      />
                      <FieldError errors={[errors.reviews?.[index]?.rating]} />
                    </>
                  );
                }}
              />
            ))}

            <FormTextarea
              name="reviews.0.comment"
              register={register}
              label={t("FeedbackLabel")}
              placeholder={t("FeedbackPlaceholder")}
              inputClassName="h-30"
            />
          </form>
        )}

        <DialogFooter>
          <Button
            onClick={() => formRef.current?.requestSubmit()}
            className="h-10 cursor-pointer"
          >
            {isSubmitting ? <Spinner /> : t("SubmitRating")}
          </Button>
          <DialogClose asChild>
            <Button
              variant="outline"
              ref={closeBtn}
              className="h-10 cursor-pointer"
            >
              {t("MaybeLater")}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
