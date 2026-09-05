"use client";

import {
  Controller,
  type Control,
  type UseFormSetValue,
} from "react-hook-form";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import * as motion from "motion/react-client";
import { Card, CardContent } from "../ui/card";
import type { Product } from "@/types/products";
import type { BuilderFormData } from "@/types/builder-page";

export default function Step1({
  setValue,
  control,
  templates,
}: {
  templates: Product[];
  control: Control<BuilderFormData>;
  setValue: UseFormSetValue<BuilderFormData>;
}) {
  const tCommon = useTranslations("Common");
  const t = useTranslations("CustomBuilder");
  const [selectedTemplateId, setSelectedTemplateId] = useState(
    templates[0]?.id,
  );
  const choosedTemplate = templates.find(
    (template) => template.id === selectedTemplateId,
  );

  return (
    <div className="flex flex-col gap-8">
      <motion.p
        initial={{
          opacity: 0,
          x: -6,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 0.45,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="text-center text-base text-foreground/60"
      >
        {t("Pick")}
      </motion.p>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((template, index) => {
          const isSelected = selectedTemplateId === template.id;

          return (
            <motion.div
              key={template.id}
              initial={{
                opacity: 0,
                x: index % 2 === 0 ? -8 : 8,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Card className="h-full bg-transparent p-0 shadow-none">
                <CardContent className="p-0">
                  <button
                    type="button"
                    aria-label={`Select ${template.name}`}
                    aria-pressed={isSelected}
                    onClick={() => {
                      setSelectedTemplateId(template.id);
                      setValue("template_id", template.id);
                      setValue("template_url", template.image_url);
                      setValue("variant_id", template.variants[0]?.id);
                      setValue("slots", []);
                    }}
                    className={cn(
                      "group relative block w-full cursor-pointer overflow-hidden rounded-[24px] border-2 text-start transition-colors duration-300",
                      isSelected ? "border-primary" : "border-muted",
                    )}
                  >
                    <Image
                      src={template.image_url}
                      alt={template.name}
                      width={500}
                      height={500}
                      className="aspect-square w-full object-cover"
                    />

                    {isSelected && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          scale: 0.8,
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                        }}
                        transition={{
                          duration: 0.25,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="absolute right-2 top-2 grid size-8 place-items-center rounded-full bg-primary"
                      >
                        <Check className="size-4 text-white" />
                      </motion.div>
                    )}
                  </button>
                </CardContent>

                <div className="pb-4 pt-3">
                  <p className="text-center text-base font-semibold text-foreground">
                    {template.name}
                  </p>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

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
          delay: 0.08,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4"
      >
        <div className="col-span-1 md:col-span-2 lg:col-span-4">
          <p className="text-sm font-semibold uppercase text-foreground">
            {t("Size")}
          </p>
        </div>

        <Controller
          control={control}
          name="variant_id"
          render={({ field }) => {
            const { value, onChange } = field;

            return (
              <>
                {choosedTemplate?.variants.map((size, index) => {
                  const isSelected = value === size.id;

                  return (
                    <motion.div
                      key={size.id}
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
                    >
                      <Button
                        type="button"
                        aria-label={`Select size ${size.size}`}
                        aria-pressed={isSelected}
                        variant="outline"
                        onClick={() => {
                          onChange(size.id);

                          setValue("flowersCount", size.max_stems);
                        }}
                        className={cn(
                          "h-auto! w-full flex-col rounded-xl border-2 border-muted bg-white py-5 hover:bg-white",
                          isSelected &&
                            "border-primary bg-primary/20 hover:bg-primary/20",
                        )}
                      >
                        <p className="font-semibold">{size.size}</p>

                        <p className="text-primary">
                          {tCommon("AED")}: {size.price}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          {size.max_stems} {t("Flowers")}
                        </p>
                      </Button>
                    </motion.div>
                  );
                })}
              </>
            );
          }}
        />
      </motion.div>
    </div>
  );
}
