"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { Switch } from "../ui/switch";
import * as motion from "motion/react-client";

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
      <motion.div
        initial={{
          opacity: 0,
          x: -8,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
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

                <div className="mt-4 flex flex-wrap gap-4">
                  {giftOptions.ribbons.map((ribbon, index) => (
                    <motion.div
                      key={ribbon.id}
                      initial={{
                        opacity: 0,
                        x: index % 2 === 0 ? -6 : 6,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.04,
                        ease: [0.16, 1, 0.3, 1],
                      }}
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
                          <motion.div
                            initial={{
                              opacity: 0,
                              scale: 0.85,
                            }}
                            animate={{
                              opacity: 1,
                              scale: 1,
                            }}
                            transition={{
                              duration: 0.2,
                            }}
                            className="grid h-full w-full place-content-center rounded-full border-2 border-primary"
                          >
                            <Check />
                          </motion.div>
                        )}
                      </div>

                      <div>{ribbon.name}</div>
                    </motion.div>
                  ))}
                </div>
              </>
            );
          }}
        />
      </motion.div>

      <motion.div
        initial={{
          opacity: 0,
          x: 8,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 0.5,
          delay: 0.05,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
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
                  <motion.div
                    initial={{
                      opacity: 0,
                      x: 6,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      duration: 0.45,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                      {giftOptions.card_styles.map((cardStyle, index) => (
                        <motion.div
                          key={cardStyle.id}
                          initial={{
                            opacity: 0,
                            x: index % 2 === 0 ? -6 : 6,
                          }}
                          animate={{
                            opacity: 1,
                            x: 0,
                          }}
                          transition={{
                            duration: 0.4,
                            delay: index * 0.04,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className={cn(
                            "overflow-hidden rounded-xl border-2 border-muted",
                            choosedCardStyle?.id === cardStyle.id
                              ? "border-primary"
                              : "",
                          )}
                          onClick={() => onChange(cardStyle.id)}
                        >
                          <div className="relative h-50 w-full bg-white">
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
                        </motion.div>
                      ))}
                    </div>

                    <motion.div
                      initial={{
                        opacity: 0,
                        x: -6,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        duration: 0.4,
                        delay: 0.08,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="mt-4"
                    >
                      <p
                        className={cn(
                          "mb-2 font-semibold uppercase",
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
                    </motion.div>
                  </motion.div>
                )}
              </>
            );
          }}
        />
      </motion.div>
    </div>
  );
}
