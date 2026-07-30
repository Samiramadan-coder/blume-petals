"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { http } from "@/lib/http";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { FieldError } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import OrderRating from "@/components/account/orders/order-rating";
import FormTextarea from "@/components/reusable/form/form-textarea";
import { OrderItem, RatingFormData, ratingSchema } from "@/types/account";
import { useForm, SubmitHandler, Controller, useWatch } from "react-hook-form";

export default function OrderRate({ items }: { items: OrderItem["items"] }) {
  const t = useTranslations("Account.Orders");
  const formRef = useRef<HTMLFormElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RatingFormData>({
    resolver: zodResolver(ratingSchema(t)),
    defaultValues: { rating: 0, comment: "" },
  });

  // Watch the rating value to conditionally render the comment field
  const rating = useWatch({ control, name: "rating" });

  // Handle form submission
  const onSubmit: SubmitHandler<RatingFormData> = async (data) => {
    try {
      await http.post(
        `/api/v1/products/${items[activeItemIndex].slug}/reviews`,
        data,
      );
      if (activeItemIndex < items.length - 1) {
        setActiveItemIndex(activeItemIndex + 1);
        reset({ rating: 0, comment: "" });
      } else {
        closeBtn.current?.click();
        reset({ rating: 0, comment: "" });
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex-1 uppercase h-11" variant="default">
          {t("RateOrder")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <form
          ref={formRef}
          className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4 space-y-6"
          onSubmit={(e) => void handleSubmit(onSubmit)(e)}
        >
          <Controller
            control={control}
            name="rating"
            render={({ field }) => {
              return (
                <>
                  <OrderRating
                    {...field}
                    value={field.value}
                    onChange={field.onChange}
                  />
                  <FieldError errors={[errors.rating]} />
                </>
              );
            }}
          />

          {rating ? (
            <>
              <FormTextarea
                name="comment"
                register={register}
                label={t("FeedbackLabel")}
                placeholder={t("FeedbackPlaceholder")}
                inputClassName="h-30"
              />
            </>
          ) : null}
        </form>
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
