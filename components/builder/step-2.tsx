import Image from "next/image";
import { toast } from "sonner";
import { useState } from "react";
import { Button } from "../ui/button";
import { Flower } from "@/types/products";
import { useTranslations } from "next-intl";
import { UseFormSetValue } from "react-hook-form";
import { Minus, Plus, Sparkle } from "lucide-react";
import { BuilderFormData } from "@/types/builder-page";

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

  function handleFlowerCountControl(operation: "increment" | "decrement") {
    if (selectedFlowerIndex === null) return;

    // Check if the required number of flowers has been reached
    if (
      operation === "increment" &&
      requiredFlowersCount === choosedFlowersCount
    ) {
      return toast.error(t("YouHaveReachedTheRequiredNumberOfFlowers"));
    }

    // Find if the selected flower is already in the choosed slots
    const selectedFlowerId = flowers[selectedFlowerIndex].id;
    const selectedFlower = flowers[selectedFlowerIndex];
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
        price: +selectedFlower.price,
        name: selectedFlower.product_name,
      },
    ]);
  }

  return (
    <div className="flex gap-2">
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
                onClick={() => handleFlowerCountControl("decrement")}
              >
                <Minus />
              </Button>
              <Button
                type="button"
                size="icon"
                variant="outline"
                className="rounded-full"
                onClick={() => handleFlowerCountControl("increment")}
              >
                <Plus />
              </Button>
            </div>
          </div>
        ))}
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
              <Image
                src={flower.image_url}
                alt={flower.product_name}
                width={100}
                height={100}
                className="object-cover rounded-2xl"
              />

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
              onClick={() => handleFlowerCountControl("increment")}
            >
              <Plus />
              {t("AddToBouquet")}
            </Button>
          )}

          <Button
            variant="outline"
            type="button"
            className="text-base h-12 text-foreground font-semibold rounded-xl w-full"
          >
            <Sparkle />
            {t("AutoFillRemaining", {
              count: requiredFlowersCount - choosedFlowersCount,
            })}
          </Button>
        </div>
      </div>
    </div>
  );
}
