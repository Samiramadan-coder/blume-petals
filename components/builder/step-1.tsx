import Image from "next/image";
import { Check } from "lucide-react";
import { Product } from "@/types/products";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "../ui/card";
import { BuilderFormData } from "@/types/builder-page";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { Button } from "../ui/button";

export default function Step1({
  setValue,
  watch,
  templates,
}: {
  setValue: UseFormSetValue<BuilderFormData>;
  watch: UseFormWatch<BuilderFormData>;
  templates: Product[];
}) {
  const t = useTranslations("CustomBuilder");
  const tCommon = useTranslations("Common");
  const choosedTemplate = templates.find(
    (template) => template.id === watch("template_id"),
  );

  return (
    <div className="flex flex-col gap-8">
      <p className="text-foreground/60 text-base text-center">{t("Pick")}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((shape) => (
          <Card key={shape.id} className="bg-transparent p-0">
            <CardContent className="p-0">
              <div
                className={`
                  group 
                  cursor-pointer 
                  relative 
                  overflow-hidden 
                  rounded-[24px] 
                  ${watch("template_id") === shape.id ? "border-2 border-primary" : ""}
                `}
                onClick={() => setValue("template_id", shape.id)}
              >
                <Image
                  src={shape.image_url}
                  alt={shape.name}
                  width={500}
                  height={500}
                  className="
                    aspect-square 
                    w-full 
                    object-cover 
                    group-hover:scale-105 
                    transition-transform 
                    duration-300
                  "
                />
                {watch("template_id") === shape.id && (
                  <div
                    className="
                    absolute 
                    top-2 
                    right-2 
                    w-8 
                    h-8 
                    rounded-full 
                    bg-primary 
                    grid 
                    place-items-center
                  "
                  >
                    <Check className="text-white" />
                  </div>
                )}
              </div>
            </CardContent>
            <div>
              <p className="font-semibold text-center text-base text-foreground">
                {shape.name}
              </p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="col-span-1 md:col-span-2 lg:col-span-4">
          <p className="text-sm font-semibold text-foreground uppercase">
            {t("Size")}
          </p>
        </div>

        {choosedTemplate?.variants.map((size) => (
          <Button
            type="button"
            key={size.id}
            variant="outline"
            className="
              border-2 
              border-muted 
              h-auto! 
              flex 
              flex-col 
              py-4 
              rounded-xl 
              hover:bg-transparent
            "
          >
            <p className="font-semibold">{size.size}</p>
            <p className="text-primary">
              {tCommon("AED")}: {size.price}
            </p>
            <p className="text-xs text-muted-foreground">
              {size.max_stems} {t("Flowers")}
            </p>
          </Button>
          // <Card key={size.id} className="bg-transparent p-0">
          //   <CardContent className="p-0">
          //     <div
          //       className={`
          //         group
          //         cursor-pointer
          //         relative
          //         overflow-hidden
          //         rounded-[24px]
          //         border
          //         border-border
          //         p-4
          //         flex
          //         flex-col
          //         items-center
          //         justify-center
          //         ${watch("size") === size.id ? "border-2 border-primary" : ""}
          //       `}
          //       onClick={() => setValue("size", size.id)}
          //     >
          //       <p className="font-semibold text-lg text-foreground">
          //         {size.size}
          //       </p>
          //       <p className="text-sm mt-2 text-foreground/60 text-center">
          //         From AED {size.price}
          //       </p>
          //       <p className="text-sm mt-1 text-foreground/60 text-center">
          //         {size.max_stems} flowers
          //       </p>
          //     </div>
          //   </CardContent>
          // </Card>
        ))}
      </div>
    </div>
  );
}
