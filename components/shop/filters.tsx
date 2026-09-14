"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

import {
  parseAsInteger,
  parseAsNativeArrayOf,
  parseAsString,
  throttle,
  useQueryStates,
} from "nuqs";

import { useState, useTransition } from "react";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "../ui/card";
import { Field, FieldGroup } from "../ui/field";
import { FiltersOptions } from "@/types/products";

export default function Filters({ filters }: { filters: FiltersOptions }) {
  const t = useTranslations("Shop");

  const [isPending, startTransition] = useTransition();

  const [query, setQuery] = useQueryStates(
    {
      price_min: parseAsInteger.withDefault(0),
      price_max: parseAsInteger.withDefault(filters.price_range.max),
      size: parseAsNativeArrayOf(parseAsString).withDefault([]),
      occasion: parseAsNativeArrayOf(parseAsString).withDefault([]),
      in_stock: parseAsString,
      page: parseAsInteger.withDefault(1),
    },
    {
      history: "replace",
      scroll: false,
      shallow: false,
      startTransition,
      limitUrlUpdates: throttle(500),
    },
  );

  const [minDraft, setMinDraft] = useState<number[] | null>(null);

  const [maxDraft, setMaxDraft] = useState<number[] | null>(null);

  const min = minDraft ?? [query.price_min];
  const max = maxDraft ?? [query.price_max];

  const selectedSizes = query.size;

  const selectedOccasions = query.occasion;

  const isOnStock = query.in_stock === "1";

  return (
    <Card
      className={`me-8 shadow-sm transition-opacity ${
        isPending ? "opacity-70" : ""
      }`}
    >
      <CardContent>
        {/* Price Range */}
        <Accordion type="single" collapsible defaultValue="price_range">
          <AccordionItem value="price_range">
            <AccordionTrigger className="text-base font-semibold hover:text-primary hover:no-underline">
              {t("PriceRange")}
            </AccordionTrigger>

            <AccordionContent className="space-y-5 p-2">
              <div>
                <p className="text-xs font-semibold text-muted-foreground">
                  {t("Min")}: {t("AED")} {min[0]}
                </p>

                <Slider
                  value={min}
                  max={filters.price_range.max}
                  step={1}
                  className="mx-auto w-full max-w-xs"
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
                      page: 1,
                    });
                  }}
                />
              </div>

              <div>
                <p className="text-xs font-semibold text-muted-foreground">
                  {t("Max")}: {t("AED")} {max[0]}
                </p>

                <Slider
                  value={max}
                  max={filters.price_range.max}
                  step={1}
                  className="mx-auto w-full max-w-xs"
                  onValueChange={(value) => {
                    setMaxDraft(value);
                  }}
                  onValueCommit={(value) => {
                    const nextMax = value[0] < min[0] ? min[0] + 1 : value[0];

                    setMaxDraft(null);

                    void setQuery({
                      price_min: min[0],
                      price_max: nextMax,
                      page: 1,
                    });
                  }}
                />
              </div>

              <p className="text-sm font-semibold text-primary">
                {t("AED")} {min[0]} - {t("AED")} {max[0]}
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Separator className="my-2" />

        {/* Size */}
        <Accordion type="single" collapsible>
          <AccordionItem value="size">
            <AccordionTrigger className="text-base font-semibold hover:text-primary hover:no-underline">
              {t("Size")}
            </AccordionTrigger>

            <AccordionContent className="space-y-3">
              {filters.sizes.map((size) => {
                const checked = selectedSizes.includes(size);

                return (
                  <FieldGroup key={size} className="max-w-sm">
                    <Field orientation="horizontal">
                      <Checkbox
                        id={size}
                        name={size}
                        checked={checked}
                        onCheckedChange={(value) => {
                          const nextSizes =
                            value === true
                              ? [
                                  ...selectedSizes.filter(
                                    (item) => item !== size,
                                  ),
                                  size,
                                ]
                              : selectedSizes.filter((item) => item !== size);

                          void setQuery({
                            size: nextSizes.length > 0 ? nextSizes : null,
                            page: 1,
                          });
                        }}
                      />

                      <Label htmlFor={size} className="text-foreground/70">
                        {size}
                      </Label>
                    </Field>
                  </FieldGroup>
                );
              })}
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Separator className="my-2" />

        {/* In Stock */}
        <FieldGroup className="my-4 max-w-sm">
          <Field orientation="horizontal">
            <Checkbox
              id="in_stock"
              name="in_stock"
              checked={isOnStock}
              onCheckedChange={(checked) => {
                void setQuery({
                  in_stock: checked === true ? "1" : null,
                  page: 1,
                });
              }}
            />

            <Label htmlFor="in_stock" className="text-base font-semibold">
              {t("InStockOnly")}
            </Label>
          </Field>
        </FieldGroup>

        <Separator className="my-2" />

        {/* Occasions */}
        <Accordion type="single" collapsible>
          <AccordionItem value="occasion">
            <AccordionTrigger className="text-base font-semibold hover:text-primary hover:no-underline">
              {t("Occasions")}
            </AccordionTrigger>

            <AccordionContent className="space-y-3">
              {filters.occasions.map((occasion) => {
                const checked = selectedOccasions.includes(occasion.slug);

                return (
                  <FieldGroup key={occasion.id} className="max-w-sm">
                    <Field orientation="horizontal">
                      <Checkbox
                        id={occasion.slug}
                        name={occasion.name}
                        checked={checked}
                        onCheckedChange={(value) => {
                          const nextOccasions =
                            value === true
                              ? [
                                  ...selectedOccasions.filter(
                                    (item) => item !== occasion.slug,
                                  ),
                                  occasion.slug,
                                ]
                              : selectedOccasions.filter(
                                  (item) => item !== occasion.slug,
                                );

                          void setQuery({
                            occasion:
                              nextOccasions.length > 0 ? nextOccasions : null,
                            page: 1,
                          });
                        }}
                      />

                      <Label
                        htmlFor={occasion.slug}
                        className="text-sm text-foreground/70"
                      >
                        {occasion.name}
                      </Label>
                    </Field>
                  </FieldGroup>
                );
              })}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
