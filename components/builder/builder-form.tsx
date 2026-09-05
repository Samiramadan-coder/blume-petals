"use client";

import Step1 from "./step-1";
import Step2 from "./step-2";
import Step3 from "./step-3";
import Step4 from "./step-4";
import { toast } from "sonner";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { T } from "@/constants/shared";
import { Design } from "@/types/account";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { addToCart } from "@/lib/custom-builder";
import { Flower, Product } from "@/types/products";
import { useForm, SubmitHandler, useWatch } from "react-hook-form";
import { BuilderFormData, GiftOptions } from "@/types/builder-page";
import { useRouter } from "@/i18n/navigation";
import { Spinner } from "../ui/spinner";
import { ChevronLeft } from "lucide-react";

const steps = (t: T) => [
  t("Steps.Template"),
  t("Steps.Build"),
  t("Steps.Accessories"),
  t("Steps.Preview"),
];

export default function BuilderForm({
  templates,
  flowers,
  giftOptions,
  design,
}: {
  templates: Product[];
  flowers: Flower[];
  giftOptions: GiftOptions;
  design?: Design;
}) {
  console.log(design);
  const router = useRouter();
  const t = useTranslations("CustomBuilder");
  const tCommon = useTranslations("Common");
  const stepsList = steps(t);
  const [currentStep, setCurrentStep] = useState(0);

  const {
    handleSubmit,
    setValue,
    getValues,
    control,
    register,
    formState: { isSubmitting },
  } = useForm<BuilderFormData>({
    defaultValues: {
      template_id: templates[0].id,
      template_url: templates[0].image_url,
      variant_id: templates[0]?.variants[0]?.id,
      flowersCount: templates[0]?.variants[0]?.max_stems || 0,
      ribbon_id: undefined,
      card_style_id: undefined,
      message_text: "",
      slots: [],
    },
  });

  /* Watch the selected slots in the form */
  const selectedTemplate = useWatch({ control, name: "template_id" });
  const selectedVariant = useWatch({ control, name: "variant_id" });
  const flowersCount = useWatch({ control, name: "flowersCount" });
  const selectedRibbon = useWatch({ control, name: "ribbon_id" });
  const selectedCardStyle = useWatch({ control, name: "card_style_id" });
  const choosedSlots = useWatch({ control, name: "slots" });
  const generated_image_url = useWatch({
    control,
    name: "generated_image_url",
  });

  /* Calculate the total number of chosen flowers from client */
  const choosedFlowersCount = useMemo(() => {
    return choosedSlots.reduce((acc, slot) => acc + slot.qty, 0);
  }, [choosedSlots]);

  /* Calculate the total Price */
  const totalPrice = useMemo(() => {
    const selectedTemplateObj = templates.find(
      (template) => template.id === selectedTemplate,
    );

    const selectedRibbonObj = giftOptions.ribbons.find(
      (ribbon) => ribbon.id === selectedRibbon,
    );

    const selectedCardStyleObj = giftOptions.card_styles.find(
      (cardStyle) => cardStyle.id === selectedCardStyle,
    );

    const selectedSize = selectedTemplateObj?.variants.find(
      (variant) => variant.id === selectedVariant,
    );

    const totalFlowersPrice = choosedSlots.reduce((acc, slot) => {
      return acc + slot.qty * slot.price;
    }, 0);

    return (
      (selectedSize ? +selectedSize.price : 0) +
      totalFlowersPrice +
      (selectedRibbonObj ? +selectedRibbonObj.price : 0) +
      (selectedCardStyleObj ? +selectedCardStyleObj.price : 0)
    );
  }, [
    templates,
    giftOptions.ribbons,
    giftOptions.card_styles,
    choosedSlots,
    selectedTemplate,
    selectedRibbon,
    selectedCardStyle,
    selectedVariant,
  ]);

  /* Handle form submission based on the current step */
  const onSubmit: SubmitHandler<BuilderFormData> = async (data) => {
    // Handle step 0: template selection
    if (currentStep === 0) {
      return setCurrentStep((prev) => prev + 1);
    }

    // Handle step 1: flower selection
    if (currentStep === 1 && choosedFlowersCount < flowersCount) {
      return toast.error(
        t("PleaseChooseFlowers", {
          count: flowersCount - choosedFlowersCount,
        }),
      );
    }

    // Handle step 2: review and confirmation
    if (currentStep === 1 && choosedFlowersCount === flowersCount) {
      return setCurrentStep(2);
    }

    // Handle step 3: final confirmation
    if (currentStep === 2) {
      return setCurrentStep(3);
    }

    const result = await addToCart(data);

    if (result.success) {
      toast.success(t("AddedToCartSuccessfully"));
      router.push("/cart");
    } else {
      toast.error(t("FailedToAddToCart"));
    }
  };

  return (
    <form className="container max-w-220" onSubmit={handleSubmit(onSubmit)}>
      <header className="bg-muted/30 p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-foreground/60">
            {t("Step")} {currentStep + 1} {t("Of")} {stepsList.length}
          </p>

          <div>
            <p className="text-sm font-medium text-primary">
              {stepsList[currentStep]}
            </p>

            <div className="flex items-center justify-end gap-2 mt-2">
              <Badge className="h-6 bg-primary/10 border border-primary/50 text-primary text-sm px-3">
                {tCommon("AED")} {totalPrice}
              </Badge>
              <Badge className="text-foreground h-6 font-semibold text-sm px-3">
                {choosedFlowersCount} / {flowersCount}
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center mt-6">
          <div className="flex items-center justify-center mb-4">
            {stepsList.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 mx-2 rounded-full ${index <= currentStep ? "bg-primary" : "bg-foreground/20"}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2 justify-center">
            {stepsList.map((step, index) => (
              <div
                key={index}
                className={`text-[11px] sm:text-sm ${index === currentStep ? "text-primary" : "text-foreground/60"}`}
              >
                {step}
              </div>
            ))}
          </div>
        </div>
      </header>

      <div className="py-8">
        {currentStep === 0 && (
          <Step1 templates={templates} setValue={setValue} control={control} />
        )}

        {currentStep === 1 && (
          <Step2
            flowers={flowers}
            requiredFlowersCount={flowersCount}
            choosedFlowersCount={choosedFlowersCount}
            choosedSlots={choosedSlots}
            setValue={setValue}
          />
        )}

        {currentStep === 2 && (
          <Step3
            giftOptions={giftOptions}
            control={control}
            register={register}
            setValue={setValue}
            cardStyleId={selectedCardStyle}
          />
        )}

        {currentStep === 3 && (
          <Step4
            getValues={getValues}
            setValue={setValue}
            generated_image_url={generated_image_url}
          />
        )}
      </div>

      <footer className="flex flex-wrap gap-2">
        {currentStep > 0 && (
          <Button
            className="flex-1 h-12! rounded-full sm:text-lg text-foreground px-6"
            type="button"
            aria-label="Go Back"
            onClick={() => setCurrentStep((prev) => prev - 1)}
          >
            <ChevronLeft className="size-4 rtl:rot" />
            {t("Back")}: {stepsList[currentStep - 1]}
          </Button>
        )}

        <Button
          className="flex-1 h-12 rounded-full sm:text-lg text-foreground px-6"
          type="submit"
          disabled={isSubmitting}
          aria-label={
            currentStep === 3 ? "Submit" : `Next: ${stepsList[currentStep + 1]}`
          }
        >
          {isSubmitting && <Spinner />}
          {currentStep === 3
            ? t("Submit")
            : `${t("Next")}: ${stepsList[currentStep + 1]}`}
        </Button>
      </footer>
    </form>
  );
}
