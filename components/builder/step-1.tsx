import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { bouquetShapes } from "@/constants/builder-page";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { BuilderFormData } from "@/types/builder-page";
import { Check } from "lucide-react";

export default function Step1({
  setValue,
  watch,
}: {
  setValue: UseFormSetValue<BuilderFormData>;
  watch: UseFormWatch<BuilderFormData>;
}) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-foreground/60 text-base text-center">
        Pick a bouquet shape to start with
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bouquetShapes.map((shape) => (
          <Card key={shape.label} className="bg-transparent p-0">
            <CardContent className="p-0">
              <div
                className={`group cursor-pointer relative overflow-hidden rounded-[24px] ${watch("bouquetShape") === shape.value ? "border-2 border-primary" : ""}`}
                onClick={() => setValue("bouquetShape", shape.value)}
              >
                <Image
                  src={shape.image}
                  alt={shape.label}
                  width={500}
                  height={500}
                  className="aspect-square w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {watch("bouquetShape") === shape.value && (
                  <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-primary grid place-items-center">
                    <Check className="text-white" />
                  </div>
                )}
              </div>
            </CardContent>
            <div>
              <p className="font-semibold text-center text-base text-foreground">
                {shape.label}
              </p>
              <p className="text-sm mt-2 text-foreground/60 text-center">
                From AED {shape.price}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
