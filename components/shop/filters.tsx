"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { useState } from "react";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { Checkbox } from "../ui/checkbox";
import { Occasion } from "@/types/landing";
import { Separator } from "../ui/separator";
import { useTranslations } from "next-intl";
import { sizes } from "@/constants/shop-page";
import { Card, CardContent } from "../ui/card";
import { Field, FieldGroup } from "../ui/field";
import {
  parseAsInteger,
  parseAsNativeArrayOf,
  parseAsString,
  useQueryStates,
} from "nuqs";

export default function Filters({ occasions }: { occasions: Occasion[] }) {
  const t = useTranslations("Shop");

  const [query, setQuery] = useQueryStates(
    {
      price_min: parseAsInteger.withDefault(0),
      price_max: parseAsInteger.withDefault(500),
      size: parseAsNativeArrayOf(parseAsString).withDefault([]),
      occasion: parseAsNativeArrayOf(parseAsString).withDefault([]),
      in_stock_only: parseAsString,
      page: parseAsString,
    },
    {
      history: "push",
      scroll: false,
      shallow: false,
    },
  );

  const [minDraft, setMinDraft] = useState<number[] | null>(null);
  const [maxDraft, setMaxDraft] = useState<number[] | null>(null);
  const min = minDraft ?? [query.price_min];
  const max = maxDraft ?? [query.price_max];
  const selectedSizes = query.size;
  const isOnStock = query.in_stock_only === "1";
  const selectedOccasions = query.occasion;

  return (
    <Card className="shadow-[0_6px_20px_rgba(17,24,39,0.08)]">
      <CardContent>
        {/* Price Range */}
        <Accordion type="single" collapsible defaultValue="price_range">
          <AccordionItem value="price_range">
            <AccordionTrigger className="hover:text-primary hover:no-underline text-base">
              {t("PriceRange")}
            </AccordionTrigger>
            <AccordionContent className="p-2 space-y-4">
              <div>
                <p className="text-foreground/60 text-sm font-semibold">
                  {t("Min")}: {t("AED")} {min[0]}
                </p>
                <Slider
                  value={min}
                  onValueChange={(value) => {
                    setMinDraft(value);
                  }}
                  onValueCommit={(value) => {
                    const nextMin = value[0];
                    const nextMax = Math.max(max[0], nextMin);

                    setMinDraft(null);
                    setMaxDraft(null);

                    void setQuery({
                      price_min: nextMin,
                      price_max: nextMax,
                      page: "1",
                    });
                  }}
                  max={500}
                  step={1}
                  className="mx-auto w-full max-w-xs"
                />
              </div>

              <div>
                <p className="text-foreground/60 text-sm font-semibold">
                  {t("Max")}: {t("AED")} {max[0]}
                </p>
                <Slider
                  max={500}
                  value={max}
                  onValueChange={(value) => {
                    setMaxDraft(value);
                  }}
                  onValueCommit={(value) => {
                    const nextMax = value[0] < min[0] ? min[0] + 1 : value[0];

                    setMaxDraft(null);

                    void setQuery({
                      price_min: min[0],
                      price_max: nextMax,
                      page: "1",
                    });
                  }}
                  step={1}
                  className="mx-auto w-full max-w-xs"
                />
              </div>

              <p className="text-primary text-sm font-semibold">
                {t("AED")} {min[0]} - {t("AED")} {max[0]}
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Separator className="my-2" />

        {/* Size */}
        <Accordion type="single" collapsible>
          <AccordionItem value="size">
            <AccordionTrigger className="hover:text-primary hover:no-underline text-base">
              {t("Size")}
            </AccordionTrigger>
            <AccordionContent className="space-y-3">
              {sizes(t).map((size) => (
                <FieldGroup key={size.id} className="max-w-sm">
                  <Field orientation="horizontal">
                    <Checkbox
                      id={size.id}
                      name={size.id}
                      checked={selectedSizes.includes(size.id)}
                      onCheckedChange={(checked) => {
                        const nextSizes =
                          checked === true
                            ? [...selectedSizes, size.id]
                            : selectedSizes.filter(
                                (selectedSize) => selectedSize !== size.id,
                              );

                        void setQuery({
                          size: nextSizes.length > 0 ? nextSizes : null,
                          page: "1",
                        });
                      }}
                    />
                    <Label htmlFor={size.id} className="text-foreground/70">
                      {size.label}
                    </Label>
                  </Field>
                </FieldGroup>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Separator className="my-2" />

        {/* In Stock */}
        <FieldGroup className="max-w-sm my-4">
          <Field orientation="horizontal">
            <Checkbox
              id="in_stock_only"
              name="in_stock_only"
              onCheckedChange={(checked) => {
                void setQuery({
                  in_stock_only: checked === true ? "1" : null,
                  page: "1",
                });
              }}
              checked={isOnStock}
            />
            <Label htmlFor="in_stock_only" className="text-base">
              {t("InStockOnly")}
            </Label>
          </Field>
        </FieldGroup>

        <Separator className="my-2" />

        {/* Occasions */}
        <Accordion type="single" collapsible>
          <AccordionItem value="occasion">
            <AccordionTrigger className="hover:text-primary hover:no-underline text-base">
              {t("Occasions")}
            </AccordionTrigger>
            <AccordionContent className="space-y-3">
              {occasions.map((occasion) => (
                <FieldGroup key={occasion.id} className="max-w-sm">
                  <Field orientation="horizontal">
                    <Checkbox
                      id={occasion.slug}
                      name={occasion.name}
                      checked={selectedOccasions.includes(occasion.slug)}
                      onCheckedChange={(checked) => {
                        const nextOccasions =
                          checked === true
                            ? [...selectedOccasions, occasion.slug]
                            : selectedOccasions.filter(
                                (selectedOccasion) =>
                                  selectedOccasion !== occasion.slug,
                              );

                        void setQuery({
                          occasion:
                            nextOccasions.length > 0 ? nextOccasions : null,
                          page: "1",
                        });
                      }}
                    />
                    <Label
                      htmlFor={occasion.slug}
                      className="text-foreground/70 text-sm"
                    >
                      {occasion.name}
                    </Label>
                  </Field>
                </FieldGroup>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
