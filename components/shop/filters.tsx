"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Card, CardContent } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Field, FieldGroup } from "../ui/field";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Slider } from "../ui/slider";

const sizes = [
  { id: "small", label: "S" },
  { id: "medium", label: "M" },
  { id: "large", label: "L" },
  { id: "extra_large", label: "XL" },
];

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
  const [min, setMin] = useState([0]);
  const [max, setMax] = useState([500]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [isOnStock, setIsOnStock] = useState(0);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);

  return (
    <Card className="border border-border shadow-sm sticky top-24">
      <CardContent>
        {/* Price Range */}
        <Accordion type="single" collapsible defaultValue="price_range">
          <AccordionItem value="price_range">
            <AccordionTrigger className="hover:text-primary hover:no-underline">
              Price Range
            </AccordionTrigger>
            <AccordionContent className="p-2 space-y-4">
              <div>
                <p className="text-foreground/60 text-xs font-semibold">
                  Min: AED {min[0]}
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
                <p className="text-foreground/60 text-xs font-semibold">
                  Max: AED {max[0]}
                </p>
                <Slider
                  max={500}
                  value={max}
                  onValueChange={setMax}
                  step={1}
                  className="mx-auto w-full max-w-xs"
                />
              </div>

              <p className="text-primary font-semibold">
                AED {min[0]} - AED {max[0]}
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Separator className="my-2" />

        {/* Size */}
        <Accordion type="single" collapsible>
          <AccordionItem value="size">
            <AccordionTrigger className="hover:text-primary hover:no-underline">
              Size
            </AccordionTrigger>
            <AccordionContent className="space-y-3">
              {sizes.map((size) => (
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
                    <Label htmlFor={size.id} className="text-foreground/50">
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
            <Label htmlFor="in_stock_only">In Stock Only</Label>
          </Field>
        </FieldGroup>

        <Separator className="my-2" />

        {/* Occasions */}
        <Accordion type="single" collapsible>
          <AccordionItem value="occasion">
            <AccordionTrigger className="hover:text-primary hover:no-underline">
              Occasion
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
                    <Label htmlFor={occasion.id} className="text-foreground/50">
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
