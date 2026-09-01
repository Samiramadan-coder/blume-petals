import Image from "next/image";
import { toast } from "sonner";
import { useState } from "react";
import type { UseFormGetValues } from "react-hook-form";
import { Button } from "../ui/button";
import { Flower } from "@/types/products";
import { useTranslations } from "next-intl";
import { UseFormSetValue } from "react-hook-form";
import { Minus, Plus, Sparkle } from "lucide-react";
import { BuilderFormData } from "@/types/builder-page";
import BouquetEditor from "./preview";

export default function Step2({
  flowers,
  requiredFlowersCount,
  choosedFlowersCount,
  choosedSlots,
  setValue,
  getValues,
}: {
  flowers: Flower[];
  requiredFlowersCount: number;
  choosedFlowersCount: number;
  choosedSlots: BuilderFormData["slots"];
  setValue: UseFormSetValue<BuilderFormData>;
  getValues: UseFormGetValues<BuilderFormData>;
}) {
  const tCommon = useTranslations("Common");
  const t = useTranslations("CustomBuilder");
  const [selectedFlowerIndex, setSelectedFlowerIndex] = useState<number | null>(
    null,
  );
  const [hoveredFlowerIndex, setHoveredFlowerIndex] = useState<number | null>(
    null,
  );

  // Handle incrementing or decrementing the count of the selected flower
  function handleFlowerCountControl(
    operation: "increment" | "decrement",
    index: number,
  ) {
    // if (selectedFlowerIndex === null) return;

    // Check if the required number of flowers has been reached
    if (
      operation === "increment" &&
      requiredFlowersCount === choosedFlowersCount
    ) {
      return toast.error(t("YouHaveReachedTheRequiredNumberOfFlowers"));
    }

    // Find if the selected flower is already in the choosed slots
    const selectedFlowerId = flowers[index].id;
    const flower = choosedSlots.find(
      (slot) => slot.variant_id === selectedFlowerId,
    );

    // If the flower is already in the choosed slots, increment its quantity
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

    setValue("slots", [
      ...choosedSlots,
      {
        variant_id: selectedFlowerId,
        qty: 1,
        price: +flowers[index].price,
        name: flowers[index].product_name,
        image_url: flowers[index].image_url,
      },
    ]);
  }

  // Automatically fill the remaining required flowers with available stock
  function handleAutoFill() {
    const remainingCount = requiredFlowersCount - choosedFlowersCount;

    if (remainingCount <= 0) {
      return toast.error(t("YouHaveReachedTheRequiredNumberOfFlowers"));
    }

    // Filter flowers with available stock
    const availableFlowers = flowers.filter(
      (flower) => flower.available_stock > 0,
    );

    if (availableFlowers.length === 0) {
      return toast.error(
        t("NoAvailableFlowersToAutoFill") || "No available flowers to autofill",
      );
    }

    // Create a copy of current slots
    const updatedSlots = [...choosedSlots];
    let remainingToFill = remainingCount;

    // Distribute flowers evenly across available options
    while (remainingToFill > 0) {
      for (const flower of availableFlowers) {
        if (remainingToFill <= 0) break;

        // Find if this flower is already in slots
        const existingSlot = updatedSlots.find(
          (slot) => slot.variant_id === flower.id,
        );

        // Check available stock considering already added quantities
        const currentQty = existingSlot ? existingSlot.qty : 0;
        if (currentQty >= flower.available_stock) continue;

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
        if (remainingToFill <= 0) break;
      }

      // Safety check: if we can't add any more flowers, break the loop
      const totalInSlots = updatedSlots.reduce(
        (sum, slot) => sum + slot.qty,
        0,
      );
      if (totalInSlots === choosedFlowersCount) break;
    }

    setValue("slots", updatedSlots);
    toast.success(t("AutoFillCompleted"));
  }

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      {/* Empty space or preview panel */}
      <div className="p-4 space-y-3 flex-1 bg-linear-to-b from-muted/30 to-background rounded-2xl">
        {choosedSlots.map((slot, index) => (
          <div key={index} className="flex items-center justify-between">
            <p className="text-sm">
              {slot.qty}x <span className="font-semibold">{slot.name}</span>
            </p>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                size="icon"
                variant="outline"
                className="rounded-full"
                onClick={() => {
                  const index = flowers.findIndex(
                    (f) => f.id === slot.variant_id,
                  );
                  handleFlowerCountControl("decrement", index);
                }}
              >
                <Minus />
              </Button>
              <Button
                type="button"
                size="icon"
                variant="outline"
                className="rounded-full"
                onClick={() => {
                  const index = flowers.findIndex(
                    (f) => f.id === slot.variant_id,
                  );
                  handleFlowerCountControl("increment", index);
                }}
              >
                <Plus />
              </Button>
            </div>
          </div>
        ))}

        <div className="mt-auto flex justify-center pt-5">
          <div className="w-55 overflow-hidden rounded-xl">
            <BouquetEditor data={getValues()} />
          </div>
        </div>
      </div>

      {/* Flower selection panel */}
      <div className="p-4 border-2 border-muted bg-white rounded-2xl flex-1">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">{t("ChooseFlower")}</h3>
          {selectedFlowerIndex !== null && (
            <p className="text-muted-foreground text-xs">
              {t("Selected")}: {flowers[selectedFlowerIndex].product_name}
            </p>
          )}
          <p className="text-muted-foreground text-xs"></p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {flowers.map((flower, index) => (
            <Button
              variant="outline"
              type="button"
              key={flower.id}
              disabled={flower.available_stock === 0}
              className={`
              border-2 
              bg-background 
              border-muted 
              h-auto 
              py-3 
              flex 
              flex-col 
              items-center 
              gap-1 
              rounded-2xl 
              ${selectedFlowerIndex === index ? "border-primary bg-primary/20" : ""}
          `}
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
                  className="object-cover max-h-25 rounded-2xl"
                />

                {hoveredFlowerIndex === index && (
                  <div className="absolute z-50 left-1/2 -translate-x-1/2 bottom-full mb-2 pointer-events-none">
                    <div className="bg-white rounded-2xl border-2 border-primary p-2">
                      <Image
                        src={flower.image_url}
                        alt={flower.product_name}
                        width={300}
                        height={300}
                        className="object-cover min-w-30 rounded-xl"
                      />
                    </div>
                  </div>
                )}
              </div>

              <p className="font-semibold text-xs">{flower.product_name}</p>
              <p className="text-muted-foreground text-xs">
                {tCommon("AED")} {flower.price}
              </p>
              <p className="text-muted-foreground text-xs">
                {t("Left")} {flower.available_stock}
              </p>
            </Button>
          ))}
        </div>

        <div className="mt-4 space-y-2">
          {selectedFlowerIndex !== null && (
            <Button
              type="button"
              variant="default"
              className="text-base h-12 text-foreground font-semibold rounded-xl w-full"
              onClick={() =>
                handleFlowerCountControl("increment", selectedFlowerIndex!)
              }
            >
              <Plus />
              {t("AddToBouquet")}
            </Button>
          )}

          {requiredFlowersCount - choosedFlowersCount > 0 && (
            <Button
              variant="outline"
              type="button"
              className="text-base h-12 text-foreground font-semibold rounded-xl w-full"
              onClick={handleAutoFill}
            >
              <Sparkle />
              {t("AutoFillRemaining", {
                count: requiredFlowersCount - choosedFlowersCount,
              })}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
