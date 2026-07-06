"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRef } from "react";
import Image from "next/image";
import { Upload } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { FieldError } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { RatingFormData, ratingSchema } from "@/types/account";
import OrderRating from "@/components/account/orders/order-rating";
import FormTextarea from "@/components/reusable/form/form-textarea";
import { useForm, SubmitHandler, Controller, useWatch } from "react-hook-form";

export default function OrderRate() {
  const t = useTranslations("Account.Orders");
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RatingFormData>({
    resolver: zodResolver(ratingSchema(t)),
    defaultValues: {
      rating: 0,
      feedback: "",
      photos: [],
    },
  });

  const onSubmit: SubmitHandler<RatingFormData> = (data) => {
    console.log("Rating submitted:", data.rating);
  };

  const rating = useWatch({
    control,
    name: "rating",
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="flex-1 cursor-pointer bg-white h-11 border-2 border-primary text-primary hover:bg-primary hover:text-white"
          variant="outline"
        >
          {t("RateOrder")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex gap-4">
            <Image
              src="/images/home/bouquet-builder/bouquet-builder.png"
              alt="Product Image"
              width={60}
              height={60}
              className="rounded-md"
            />
            <p className="py-1 flex flex-col gap-1">
              <span className="font-bold text-sm">
                Golden Hour Preserved Roses
              </span>
              <span className="text-muted-foreground text-xs">#BP-2847</span>
            </p>
          </DialogTitle>
        </DialogHeader>
        <form
          ref={formRef}
          className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4 space-y-6"
          onSubmit={handleSubmit(onSubmit)}
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
                name="feedback"
                register={register}
                label={t("FeedbackLabel")}
                placeholder={t("FeedbackPlaceholder")}
                inputClassName="h-30"
              />

              <Controller
                control={control}
                name="photos"
                render={({ field }) => {
                  const photos = field.value || [];

                  return (
                    <>
                      <p className="font-semibold text-sm mb-2">
                        {t("AddPhotosLabel")}
                      </p>
                      <Button
                        variant="outline"
                        type="button"
                        className="cursor-pointer h-10 w-38 border border-border text-foreground hover:text-foreground"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload />
                        {t("AddPhotosButton")}
                      </Button>

                      <div>
                        {photos.map((photo, index) => (
                          <div
                            key={index}
                            className="relative inline-block mr-2"
                          >
                            <div>
                              <Image
                                src={URL.createObjectURL(photo)}
                                alt={`Photo ${index + 1}`}
                                width={60}
                                height={60}
                                className="rounded-md"
                              />
                            </div>
                            <Button
                              variant="destructive"
                              size="icon"
                              className="absolute cursor-pointer top-0 right-0 -translate-y-1/2 translate-x-1/2 rounded-full p-1"
                              onClick={() => {
                                const updatedPhotos = [...photos];
                                updatedPhotos.splice(index, 1);
                                field.onChange(updatedPhotos);
                              }}
                            >
                              &times;
                            </Button>
                          </div>
                        ))}
                      </div>

                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          field.onChange([...(field.value || []), file]);
                          e.target.value = "";
                        }}
                      />
                    </>
                  );
                }}
              />
            </>
          ) : null}
        </form>
        <DialogFooter>
          <Button
            onClick={() => formRef.current?.requestSubmit()}
            className="h-10 cursor-pointer"
          >
            {t("SubmitRating")}
          </Button>
          <DialogClose asChild>
            <Button variant="outline" className="h-10 cursor-pointer">
              {t("MaybeLater")}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
