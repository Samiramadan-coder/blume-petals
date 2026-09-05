"use client";

import { toast } from "sonner";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import * as motion from "motion/react-client";
import type { Flower } from "@/types/products";
import type { UseFormSetValue } from "react-hook-form";
import type { BuilderFormData } from "@/types/builder-page";
import { Flower2, Minus, Plus, Sparkle } from "lucide-react";

export default function Step2({
  flowers,
  requiredFlowersCount,
  choosedFlowersCount,
  choosedSlots,
  setValue,
}: {
  flowers: Flower[];
  requiredFlowersCount: number;
  choosedFlowersCount: number;
  choosedSlots: BuilderFormData["slots"];
  setValue: UseFormSetValue<BuilderFormData>;
}) {
  const tCommon = useTranslations("Common");
  const t = useTranslations("CustomBuilder");
  const [selectedFlowerIndex, setSelectedFlowerIndex] = useState<number | null>(
    null,
  );
  const [hoveredFlowerIndex, setHoveredFlowerIndex] = useState<number | null>(
    null,
  );

  // Handle flower count control (increment/decrement)
  function handleFlowerCountControl(
    operation: "increment" | "decrement",
    index: number,
  ) {
    const selectedFlower = flowers[index];

    if (!selectedFlower) return;

    if (
      operation === "increment" &&
      requiredFlowersCount === choosedFlowersCount
    ) {
      return toast.error(t("YouHaveReachedTheRequiredNumberOfFlowers"));
    }

    const selectedFlowerId = selectedFlower.id;

    const flower = choosedSlots.find(
      (slot) => slot.variant_id === selectedFlowerId,
    );

    if (flower) {
      if (operation === "decrement" && flower.qty === 1) {
        return setValue(
          "slots",
          choosedSlots.filter((slot) => slot.variant_id !== selectedFlowerId),
        );
      }

      const preparedSlots = choosedSlots.map((slot) =>
        slot.variant_id === selectedFlowerId
          ? {
              ...slot,
              qty: operation === "increment" ? slot.qty + 1 : slot.qty - 1,
            }
          : slot,
      );

      return setValue("slots", preparedSlots);
    }

    if (operation === "decrement") return;

    setValue("slots", [
      ...choosedSlots,
      {
        variant_id: selectedFlowerId,
        qty: 1,
        price: +selectedFlower.price,
        name: selectedFlower.product_name,
        image_url: selectedFlower.image_url,
      },
    ]);
  }

  // Handle Auto fill
  function handleAutoFill() {
    const remainingCount = requiredFlowersCount - choosedFlowersCount;

    if (remainingCount <= 0) {
      return toast.error(t("YouHaveReachedTheRequiredNumberOfFlowers"));
    }

    const availableFlowers = flowers.filter(
      (flower) => flower.available_stock > 0,
    );

    if (availableFlowers.length === 0) {
      return toast.error(
        t("NoAvailableFlowersToAutoFill") || "No available flowers to autofill",
      );
    }

    const updatedSlots = choosedSlots.map((slot) => ({
      ...slot,
    }));

    let remainingToFill = remainingCount;

    while (remainingToFill > 0) {
      let addedInPass = 0;

      for (const flower of availableFlowers) {
        if (remainingToFill <= 0) break;

        const existingSlot = updatedSlots.find(
          (slot) => slot.variant_id === flower.id,
        );

        const currentQty = existingSlot?.qty ?? 0;

        if (currentQty >= flower.available_stock) {
          continue;
        }

        if (existingSlot) {
          existingSlot.qty += 1;
        } else {
          updatedSlots.push({
            variant_id: flower.id,
            qty: 1,
            price: +flower.price,
            name: flower.product_name,
            image_url: flower.image_url,
          });
        }

        remainingToFill--;
        addedInPass++;
      }

      if (addedInPass === 0) break;
    }

    setValue("slots", updatedSlots);

    toast.success(t("AutoFillCompleted"));
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row items-start">
      {/* Chosen flowers list */}
      {choosedFlowersCount > 0 && (
        <motion.div
          initial={{
            opacity: 0,
            x: -10,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.55,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="w-full sm:w-85 space-y-3 rounded-lg bg-muted/30 p-4"
        >
          <div className="space-y-2">
            {choosedSlots.map((slot, index) => (
              <motion.div
                key={slot.variant_id}
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
                  delay: index * 0.035,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex items-center justify-between gap-3"
              >
                <div className="text-sm flex items-center gap-2">
                  <Flower2 className="size-4 text-primary" />
                  <span className="text-xs font-semibold">
                    {slot.qty}x
                  </span>{" "}
                  <span className="underline italic">{slot.name}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    aria-label={`Decrement count for ${slot.name}`}
                    size="icon"
                    variant="outline"
                    className="rounded-full size-7"
                    onClick={() => {
                      const flowerIndex = flowers.findIndex(
                        (flower) => flower.id === slot.variant_id,
                      );
                      handleFlowerCountControl("decrement", flowerIndex);
                    }}
                  >
                    <Minus className="size-3" />
                  </Button>

                  <Button
                    type="button"
                    size="icon"
                    aria-label={`Increment count for ${slot.name}`}
                    variant="outline"
                    className="rounded-full size-7"
                    onClick={() => {
                      const flowerIndex = flowers.findIndex(
                        (flower) => flower.id === slot.variant_id,
                      );
                      handleFlowerCountControl("increment", flowerIndex);
                    }}
                  >
                    <Plus className="size-3" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Flower selection section */}
      <motion.div
        initial={{
          opacity: 0,
          x: 10,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 0.55,
          delay: 0.04,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="w-full flex-1 rounded-lg border-2 border-muted bg-white p-4"
      >
        <div className="mb-4">
          <h3 className="text-lg font-semibold">{t("ChooseFlower")}</h3>

          {selectedFlowerIndex !== null && (
            <p className="text-xs text-muted-foreground">
              {t("Selected")}: {flowers[selectedFlowerIndex]?.product_name}
            </p>
          )}
        </div>

        <div
          className={`grid grid-cols-2 gap-2 ${choosedFlowersCount === 0 ? "lg:grid-cols-3" : ""}`}
        >
          {flowers.map((flower, index) => {
            const isSelected = selectedFlowerIndex === index;

            return (
              <motion.div
                key={flower.id}
                initial={{
                  opacity: 0,
                  x: index % 2 === 0 ? -6 : 6,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.035,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Button
                  variant="outline"
                  type="button"
                  aria-label={`Select flower ${flower.product_name}`}
                  aria-pressed={isSelected}
                  disabled={flower.available_stock === 0}
                  className={cn(
                    "h-auto w-full flex-col items-center gap-1 rounded-lg border border-muted bg-background py-3 hover:bg-background",
                    isSelected &&
                      "border-primary bg-primary/20 hover:bg-primary/20",
                  )}
                  onClick={() => setSelectedFlowerIndex(index)}
                >
                  <div
                    className="relative"
                    onMouseEnter={() => setHoveredFlowerIndex(index)}
                    onMouseLeave={() => setHoveredFlowerIndex(null)}
                  >
                    <Image
                      src={flower.image_url}
                      alt={flower.product_name}
                      width={100}
                      height={100}
                      className="max-h-30 rounded-2xl object-cover"
                    />

                    {hoveredFlowerIndex === index && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: 4,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          duration: 0.2,
                        }}
                        className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2"
                      >
                        <div className="rounded-2xl border-2 border-primary bg-white p-2 shadow-lg">
                          <Image
                            src={flower.image_url}
                            alt={flower.product_name}
                            width={300}
                            height={300}
                            className="min-w-30 rounded-xl object-cover"
                          />
                        </div>
                      </motion.div>
                    )}
                  </div>

                  <p className="text-xs font-semibold">{flower.product_name}</p>

                  <p className="text-xs text-muted-foreground">
                    {tCommon("AED")} {flower.price}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {t("Left")} {flower.available_stock}
                  </p>
                </Button>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-4 space-y-2">
          {selectedFlowerIndex !== null && (
            <motion.div
              initial={{
                opacity: 0,
                y: 5,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Button
                type="button"
                variant="default"
                aria-label="Add selected flower to bouquet"
                className="h-12 w-full rounded-xl text-base font-semibold text-foreground"
                onClick={() =>
                  handleFlowerCountControl("increment", selectedFlowerIndex)
                }
              >
                <Plus />
                {t("AddToBouquet")}
              </Button>
            </motion.div>
          )}

          {requiredFlowersCount - choosedFlowersCount > 0 && (
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.35,
                delay: 0.05,
              }}
            >
              <Button
                variant="outline"
                type="button"
                aria-label="Auto fill remaining flowers"
                className="h-12 w-full rounded-xl text-base font-semibold text-foreground"
                onClick={handleAutoFill}
              >
                <Sparkle />

                {t("AutoFillRemaining", {
                  count: requiredFlowersCount - choosedFlowersCount,
                })}
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
