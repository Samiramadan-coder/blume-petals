"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { Switch } from "../ui/switch";
import {
  Control,
  Controller,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { useLocale, useTranslations } from "next-intl";
import { BuilderFormData, GiftOptions } from "@/types/builder-page";
import FormTextarea from "../reusable/form/form-textarea";

export default function Step3({
  giftOptions,
  control,
  register,
  setValue,
}: {
  giftOptions: GiftOptions;
  control: Control<BuilderFormData>;
  register: UseFormRegister<BuilderFormData>;
  setValue: UseFormSetValue<BuilderFormData>;
}) {
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const tCommon = useTranslations("Common");
  const t = useTranslations("CustomBuilder");

  return (
    <div className="space-y-6">
      <div>
        <Controller
          control={control}
          name="ribbon_id"
          render={({ field }) => {
            const { value, onChange } = field;
            const choosedRibbon = giftOptions.ribbons.find(
              (ribbon) => ribbon.id === value,
            );

            return (
              <>
                <div className="flex items-center justify-between">
                  <p
                    className={cn(
                      "text-lg font-semibold",
                      locale === "en" ? "font-heading" : "",
                    )}
                  >
                    {t("RibbonColor")}
                  </p>
                  <p className="text-primary">
                    {tCommon("AED")} {choosedRibbon?.price}
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 mt-4">
                  {giftOptions.ribbons.map((ribbon) => (
                    <div
                      key={ribbon.id}
                      className="flex flex-col items-center gap-4"
                      onClick={() => onChange(ribbon.id)}
                    >
                      <div
                        style={{
                          backgroundColor: ribbon.color_hex,
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                          cursor: "pointer",
                        }}
                      >
                        {ribbon.id === value && (
                          <div className="w-full h-full border-2 border-primary rounded-full grid place-content-center">
                            <Check />
                          </div>
                        )}
                      </div>
                      <div>{ribbon.name}</div>
                    </div>
                  ))}
                </div>
              </>
            );
          }}
        />
      </div>

      <div>
        <Controller
          control={control}
          name="card_style_id"
          render={({ field }) => {
            const { value, onChange } = field;
            const choosedCardStyle = giftOptions.card_styles.find(
              (cardStyle) => cardStyle.id === value,
            );

            return (
              <>
                <div className="flex items-center justify-between">
                  <div>
                    <p
                      className={cn(
                        "text-lg font-semibold",
                        locale === "en" ? "font-heading" : "",
                      )}
                    >
                      {t("AddCard")}
                    </p>
                    {choosedCardStyle && (
                      <p className="text-primary">
                        {tCommon("AED")} {choosedCardStyle?.price}
                      </p>
                    )}
                  </div>

                  <Switch
                    checked={open}
                    onCheckedChange={(value) => {
                      if (value) {
                        onChange(giftOptions.card_styles[0]?.id);
                      } else {
                        onChange(undefined);
                        setValue("message_text", "");
                      }
                      setOpen(value);
                    }}
                  />
                </div>

                {open && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                      {giftOptions.card_styles.map((cardStyle) => (
                        <div
                          key={cardStyle.id}
                          className={cn(
                            "border-2 border-muted rounded-xl overflow-hidden",
                            choosedCardStyle?.id === cardStyle.id
                              ? "border-primary"
                              : "",
                          )}
                          onClick={() => onChange(cardStyle.id)}
                        >
                          <div className="w-full h-50 relative bg-white">
                            {cardStyle.image_url && (
                              <Image
                                src={cardStyle.image_url}
                                alt={cardStyle.name}
                                width={50}
                                height={50}
                              />
                            )}
                          </div>
                          <div className="p-4">
                            <div className="font-semibold">
                              {cardStyle.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {cardStyle.description}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4">
                      <p
                        className={cn(
                          "uppercase mb-2 font-semibold",
                          locale === "en" ? "font-heading" : "",
                        )}
                      >
                        {t("YourCardMessage")}
                      </p>
                      <FormTextarea
                        register={register}
                        name="message_text"
                        inputClassName="h-40 bg-white"
                        placeholder={t("CardMessagePlaceholder")}
                      />
                    </div>
                  </>
                )}
              </>
            );
          }}
        />
      </div>
    </div>
  );
}
