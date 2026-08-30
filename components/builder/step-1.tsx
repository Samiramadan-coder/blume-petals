import Image from "next/image";
import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "../ui/button";
import { Product } from "@/types/products";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "../ui/card";
import { BuilderFormData } from "@/types/builder-page";
import { Control, UseFormSetValue, Controller } from "react-hook-form";

export default function Step1({
  setValue,
  control,
  templates,
  setSelectedTemplate,
}: {
  templates: Product[];
  control: Control<BuilderFormData>;
  setValue: UseFormSetValue<BuilderFormData>;
  setSelectedTemplate: (id: number) => void;
}) {
  const tCommon = useTranslations("Common");
  const t = useTranslations("CustomBuilder");
  const [selectedTemplateId, setSelectedTemplateId] = useState(
    templates[0]?.id,
  );
  const choosedTemplate = templates.find(
    (template) => template.id === selectedTemplateId,
  );

  return (
    <div className="flex flex-col gap-8">
      <p className="text-foreground/60 text-base text-center">{t("Pick")}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <Card key={template.id} className="bg-transparent p-0">
            <CardContent className="p-0">
              <div
                className={`
                  group 
                  cursor-pointer 
                  relative 
                  overflow-hidden 
                  rounded-[24px] 
                  ${selectedTemplateId === template.id ? "border-2 border-primary" : ""}
                `}
                onClick={() => {
                  setSelectedTemplateId(template.id);
                  setSelectedTemplate(template.id);
                  setValue("variant_id", template.variants[0]?.id);
                  setValue("slots", []);
                }}
              >
                <Image
                  src={template.image_url}
                  alt={template.name}
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
                {selectedTemplateId === template.id && (
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
                {template.name}
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

        <Controller
          control={control}
          name="variant_id"
          render={({ field }) => {
            const { value, onChange } = field;

            return (
              <>
                {choosedTemplate?.variants.map((size) => (
                  <Button
                    type="button"
                    key={size.id}
                    variant="outline"
                    onClick={() => {
                      onChange(size.id);
                      // setRequiredFlowersCount(size.max_stems);
                    }}
                    className={`
                      border-2 
                      border-muted 
                      h-auto! 
                      flex 
                      flex-col 
                      py-5 
                      rounded-xl 
                      hover:bg-transparent
                      bg-white
                      ${value === size.id ? "border-primary bg-primary/20" : ""}
                    `}
                  >
                    <p className="font-semibold">{size.size}</p>
                    <p className="text-primary">
                      {tCommon("AED")}: {size.price}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {size.max_stems} {t("Flowers")}
                    </p>
                  </Button>
                ))}
              </>
            );
          }}
        />
      </div>
    </div>
  );
}
