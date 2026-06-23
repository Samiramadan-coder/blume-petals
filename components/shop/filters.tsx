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

export default function Filters() {
  const [min, setMin] = useState([0]);
  const [max, setMax] = useState([500]);

  return (
    <Card className="border border-border shadow-sm sticky top-24">
      <CardContent>
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
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Separator className="my-2" />

        <Accordion type="single" collapsible defaultValue="size">
          <AccordionItem value="size">
            <AccordionTrigger className="hover:text-primary hover:no-underline">
              Size
            </AccordionTrigger>

            <AccordionContent className="space-y-3">
              <FieldGroup className="max-w-sm">
                <Field orientation="horizontal">
                  <Checkbox id="small" name="small" />
                  <Label htmlFor="small" className="text-foreground/50">
                    S
                  </Label>
                </Field>
              </FieldGroup>

              <FieldGroup className="max-w-sm">
                <Field orientation="horizontal">
                  <Checkbox id="medium" name="medium" />
                  <Label htmlFor="medium" className="text-foreground/50">
                    M
                  </Label>
                </Field>
              </FieldGroup>

              <FieldGroup className="max-w-sm">
                <Field orientation="horizontal">
                  <Checkbox id="large" name="large" />
                  <Label htmlFor="large" className="text-foreground/50">
                    L
                  </Label>
                </Field>
              </FieldGroup>

              <FieldGroup className="max-w-sm">
                <Field orientation="horizontal">
                  <Checkbox id="extra_large" name="extra_large" />
                  <Label htmlFor="extra_large" className="text-foreground/50">
                    XL
                  </Label>
                </Field>
              </FieldGroup>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Separator className="my-2" />

        <FieldGroup className="max-w-sm my-4">
          <Field orientation="horizontal">
            <Checkbox id="in_stock_only" name="in_stock_only" />
            <Label htmlFor="in_stock_only">In Stock Only</Label>
          </Field>
        </FieldGroup>

        <Separator className="my-2" />

        <Accordion type="single" collapsible defaultValue="occasion">
          <AccordionItem value="occasion">
            <AccordionTrigger className="hover:text-primary hover:no-underline">
              Occasion
            </AccordionTrigger>
            <AccordionContent className="space-y-3">
              <FieldGroup className="max-w-sm">
                <Field orientation="horizontal">
                  <Checkbox id="valentine" name="valentine" />
                  <Label htmlFor="valentine" className="text-foreground/50">
                    Valentine
                  </Label>
                </Field>
              </FieldGroup>

              <FieldGroup className="max-w-sm">
                <Field orientation="horizontal">
                  <Checkbox id="birthday" name="birthday" />
                  <Label htmlFor="birthday" className="text-foreground/50">
                    Birthday
                  </Label>
                </Field>
              </FieldGroup>

              <FieldGroup className="max-w-sm">
                <Field orientation="horizontal">
                  <Checkbox id="wedding" name="wedding" />
                  <Label htmlFor="wedding" className="text-foreground/50">
                    Wedding
                  </Label>
                </Field>
              </FieldGroup>

              <FieldGroup className="max-w-sm">
                <Field orientation="horizontal">
                  <Checkbox id="eid" name="eid" />
                  <Label htmlFor="eid" className="text-foreground/50">
                    Eid
                  </Label>
                </Field>
              </FieldGroup>

              <FieldGroup className="max-w-sm">
                <Field orientation="horizontal">
                  <Checkbox id="anniversary" name="anniversary" />
                  <Label htmlFor="anniversary" className="text-foreground/50">
                    Anniversary
                  </Label>
                </Field>
              </FieldGroup>

              <FieldGroup className="max-w-sm">
                <Field orientation="horizontal">
                  <Checkbox id="mothers-day" name="mothers-day" />
                  <Label htmlFor="mothers-day" className="text-foreground/50">
                    Mother&apos;s Day
                  </Label>
                </Field>
              </FieldGroup>

              <FieldGroup className="max-w-sm">
                <Field orientation="horizontal">
                  <Checkbox id="graduation" name="graduation" />
                  <Label htmlFor="graduation" className="text-foreground/50">
                    Graduation
                  </Label>
                </Field>
              </FieldGroup>

              <FieldGroup className="max-w-sm">
                <Field orientation="horizontal">
                  <Checkbox id="add-ons" name="add-ons" />
                  <Label htmlFor="add-ons" className="text-foreground/50">
                    Add-ons
                  </Label>
                </Field>
              </FieldGroup>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
