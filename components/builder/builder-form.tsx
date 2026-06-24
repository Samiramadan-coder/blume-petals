"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import Step1 from "./step-1";
import Step2 from "./step-2";
import Step3 from "./step-3";
import Step4 from "./step-4";

const steps = ["Template", "Build", "Accessories", "Preview"];

interface FormData {
  name: string;
}

export default function BuilderForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const { register, handleSubmit } = useForm<FormData>();
  const isLastStep = currentStep === steps.length - 1;

  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (!isLastStep) {
      return setCurrentStep((prev) => prev + 1);
    }
    console.log(data);
  };

  return (
    <form className="container max-w-5xl" onSubmit={handleSubmit(onSubmit)}>
      <header className="bg-border p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-foreground/60">
            STEP {currentStep + 1} OF {steps.length}
          </p>
          <p className="text-sm font-medium text-primary">
            {steps[currentStep]}
          </p>
        </div>

        <div className="flex flex-col items-center mt-6">
          <div className="flex items-center justify-center mb-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`w-3 h-3 mx-2 rounded-full ${index <= currentStep ? "bg-primary" : "bg-foreground/20"}`}
              ></div>
            ))}
          </div>

          <div className="flex items-center justify-center">
            {steps.map((step, index) => (
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

      <div className="py-4">
        {currentStep === 0 && <Step1 />}
        {currentStep === 1 && <Step2 />}
        {currentStep === 2 && <Step3 />}
        {currentStep === 3 && <Step4 />}
      </div>

      <footer className="flex gap-2">
        {currentStep > 0 && (
          <Button
            className="flex-1 h-12 rounded-full"
            type="button"
            onClick={() => setCurrentStep((prev) => prev - 1)}
          >
            Back
          </Button>
        )}
        <Button className="flex-1 h-12 rounded-full" type="submit">
          {isLastStep ? "Submit" : "Next"}
        </Button>
      </footer>
    </form>
  );
}
