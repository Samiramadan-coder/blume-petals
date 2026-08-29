"use client";

import Step1 from "./step-1";
import Step2 from "./step-2";
import Step3 from "./step-3";
import Step4 from "./step-4";
import { useState } from "react";
import { Button } from "../ui/button";
import { T } from "@/constants/shared";
import { useTranslations } from "next-intl";
import { Flower, Product } from "@/types/products";
import { BuilderFormData } from "@/types/builder-page";
import { useForm, SubmitHandler } from "react-hook-form";

const steps = (t: T) => [
  t("Steps.Template"),
  t("Steps.Build"),
  t("Steps.Accessories"),
  t("Steps.Preview"),
];

export default function BuilderForm({
  templates,
  flowers,
}: {
  templates: Product[];
  flowers: Flower[];
}) {
  const t = useTranslations("CustomBuilder");
  const stepsList = steps(t);
  const [currentStep, setCurrentStep] = useState(0);

  const { handleSubmit, setValue, control } = useForm<BuilderFormData>({
    defaultValues: {
      variant_id: templates[0]?.variants[0]?.id,
    },
  });

  const onSubmit: SubmitHandler<BuilderFormData> = (data) => {
    if (currentStep === 0) {
      return setCurrentStep((prev) => prev + 1);
    }

    if (currentStep === 1) {
      // logic for step 2
    }
  };

  return (
    <form className="container max-w-3xl" onSubmit={handleSubmit(onSubmit)}>
      <header className="bg-border p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-foreground/60">
            {t("Step")} {currentStep + 1} {t("Of")} {stepsList.length}
          </p>
          <p className="text-sm font-medium text-primary">
            {stepsList[currentStep]}
          </p>
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

          <div className="flex items-center justify-center">
            {stepsList.map((step, index) => (
              <div
                key={index}
                className={`text-sm mx-2 ${index === currentStep ? "text-primary" : "text-foreground/60"}`}
              >
                {step}
              </div>
            ))}
          </div>
        </div>
      </header>

      <div className="py-6">
        {currentStep === 0 && (
          <Step1 templates={templates} setValue={setValue} control={control} />
        )}
        {currentStep === 1 && <Step2 flowers={flowers} control={control} />}
        {currentStep === 2 && <Step3 />}
        {currentStep === 3 && <Step4 />}
      </div>

      <footer className="flex gap-2">
        {currentStep > 0 && (
          <Button
            className="flex-1 h-12 rounded-full text-lg text-foreground"
            type="button"
            onClick={() => setCurrentStep((prev) => prev - 1)}
          >
            {t("Back")}: {stepsList[currentStep - 1]}
          </Button>
        )}
        <Button
          className="flex-1 h-12 rounded-full text-lg text-foreground"
          type="submit"
        >
          {currentStep === 3
            ? t("Submit")
            : `${t("Next")}: ${stepsList[currentStep + 1]}`}
        </Button>
      </footer>
    </form>
  );
}
