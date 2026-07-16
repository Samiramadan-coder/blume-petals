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
import { Separator } from "../ui/separator";
import { useTranslations } from "next-intl";
import { sizes } from "@/constants/shop-page";
import { Card, CardContent } from "../ui/card";
import { Field, FieldGroup } from "../ui/field";

const occasions = [
  { id: "valentine", label: "Valentine" },
  { id: "birthday", label: "Birthday" },
  { id: "wedding", label: "Wedding" },
  { id: "eid", label: "Eid" },
  { id: "anniversary", label: "Anniversary" },
  { id: "mothers-day", label: "Mother' Day" },
  { id: "graduation", label: "Graduation" },
  { id: "add-ons", label: "Add-ons" },
];

export default function Filters() {
  const t = useTranslations("Shop");
  const [min, setMin] = useState([0]);
  const [max, setMax] = useState([500]);
  const [isOnStock, setIsOnStock] = useState(0);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);

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
                  onValueChange={setMin}
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
                  onValueChange={setMax}
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
                        setSelectedSizes((prev) =>
                          checked
                            ? [...prev, size.id]
                            : selectedSizes.filter(
                                (selectedSize) => selectedSize !== size.id,
                              ),
                        );
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
              value={isOnStock}
              onCheckedChange={(checked) => setIsOnStock(checked ? 1 : 0)}
              checked={Boolean(isOnStock)}
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
                      id={occasion.id}
                      name={occasion.id}
                      checked={selectedOccasions.includes(occasion.id)}
                      onCheckedChange={(checked) =>
                        setSelectedOccasions((prev) =>
                          checked
                            ? [...prev, occasion.id]
                            : selectedOccasions.filter(
                                (selectedOccasion) =>
                                  selectedOccasion !== occasion.id,
                              ),
                        )
                      }
                    />
                    <Label
                      htmlFor={occasion.id}
                      className="text-foreground/70 text-sm"
                    >
                      {occasion.label}
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
