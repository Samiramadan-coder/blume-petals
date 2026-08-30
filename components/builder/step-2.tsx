import Image from "next/image";
import { toast } from "sonner";
import { useState } from "react";
import { Button } from "../ui/button";
import { Flower } from "@/types/products";
import { useTranslations } from "next-intl";
import { Plus, Sparkle } from "lucide-react";
import { UseFormSetValue } from "react-hook-form";
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

  return (
    <div className="p-6 border-2 border-muted bg-white rounded-2xl">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">{t("ChooseFlower")}</h3>
        {selectedFlowerIndex !== null && (
          <p className="text-muted-foreground text-xs">
            {t("Selected")}: {flowers[selectedFlowerIndex].product_name}
          </p>
        )}
        <p className="text-muted-foreground text-xs"></p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-150 overflow-auto">
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
              py-5 
              flex 
              flex-col 
              items-center 
              gap-2 
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
              className="object-cover max-h-25 rounded-2xl"
            />

            <p className="font-semibold text-sm">{flower.product_name}</p>
            <p className="text-muted-foreground text-xs">
              {tCommon("AED")} {flower.price}
            </p>
            <p className="text-muted-foreground text-xs">
              {t("Left")} {flower.available_stock}
            </p>
          </Button>
        ))}
      </div>

      <div className="mt-8 flex items-center gap-4 px-8">
        {selectedFlowerIndex !== null && (
          <Button
            type="button"
            variant="default"
            className="text-base h-12 text-foreground font-semibold rounded-xl flex-1"
            onClick={() => {
              // Check if the required number of flowers has been reached
              if (requiredFlowersCount === choosedFlowersCount) {
                return toast.error(
                  t("YouHaveReachedTheRequiredNumberOfFlowers"),
                );
              }

              // Find if the selected flower is already in the choosed slots
              const selectedFlowerId = flowers[selectedFlowerIndex].id;
              const flower = choosedSlots.find(
                (slot) => slot.variant_id === selectedFlowerId,
              );

              // If the flower is already in the choosed slots, increment its quantity
              if (flower) {
                const preparedSlots = choosedSlots.map((slot) =>
                  slot.variant_id === selectedFlowerId
                    ? { ...slot, qty: slot.qty + 1 }
                    : slot,
                );
                return setValue("slots", preparedSlots);
              }

              // If the flower is not already in the choosed slots, add it with quantity 1
              setValue("slots", [
                ...choosedSlots,
                { variant_id: selectedFlowerId, qty: 1 },
              ]);
            }}
          >
            <Plus />
            {t("AddToBouquet")}
          </Button>
        )}

        <Button
          variant="outline"
          type="button"
          className="text-base h-12 text-foreground font-semibold rounded-xl flex-1"
        >
          <Sparkle />
          {t("AutoFillRemaining", {
            count: requiredFlowersCount - choosedFlowersCount,
          })}
        </Button>
      </div>
    </div>
  );
}
