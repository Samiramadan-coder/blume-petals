import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";
import { Flower } from "@/types/products";
import { useTranslations } from "next-intl";
import { Control, Controller } from "react-hook-form";
import { BuilderFormData } from "@/types/builder-page";
import { Sparkle } from "lucide-react";

export default function Step2({
  flowers,
  control,
}: {
  flowers: Flower[];
  control: Control<BuilderFormData>;
}) {
  const tCommon = useTranslations("Common");
  const t = useTranslations("CustomBuilder");
  const [selectedFlowerIndex, setSelectedFlowerIndex] = useState<number | null>(
    null,
  );

  return (
    <Controller
      control={control}
      name="slots"
      render={({ field }) => {
        const { value, onChange } = field;

        return (
          <>
            <div className="p-4 border-2 border-muted bg-white rounded-2xl">
              <h3 className="text-lg font-semibold mb-4">
                {t("ChooseFlower")}
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-150 overflow-auto">
                {flowers.map((flower, index) => (
                  <Button
                    variant="outline"
                    type="button"
                    key={flower.id}
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

                    <p className="font-semibold text-sm">
                      {flower.product_name}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {tCommon("AED")} {flower.price}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {t("Left")} {flower.available_stock}
                    </p>
                  </Button>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-4 px-8">
                {selectedFlowerIndex !== null && (
                  <Button
                    type="button"
                    variant="default"
                    className="text-base h-12 text-foreground font-semibold rounded-xl flex-1"
                  >
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
                    count: flowers.length - (selectedFlowerIndex ?? 0),
                  })}
                </Button>
              </div>
            </div>
          </>
        );
      }}
    />
  );
}
