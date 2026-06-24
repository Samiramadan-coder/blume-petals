"use client";

import { Button } from "../ui/button";
import { useState } from "react";
import { Check } from "lucide-react";

const features = [
  "Premium artificial silk flowers",
  "Lasts 1-3 years without wilting",
  "Handcrafted by professional florists",
  "Luxury packaging included",
  "Perfect for gifting or home decoration",
];

const methods = [
  "Standard Delivery: 5-7 business days",
  "Express Delivery: 2-3 business days (Additional fee applies)",
  "Same-day delivery available for selected areas",
];

const tabs = ["description", "reviews", "delivery"] as const;

export default function ProductDetails() {
  const [activeTab, setActiveTab] = useState<
    "description" | "reviews" | "delivery"
  >("description");

  return (
    <div className="col-span-2">
      <div className="mb-6 flex border-b border-border">
        {tabs.map((tab) => (
          <Button
            key={tab}
            variant="ghost"
            className={`cursor-pointer font-semibold h-14 px-10 rounded-none border-0 ${activeTab === tab ? "border-b-4 border-primary" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Button>
        ))}
      </div>

      <div>
        {activeTab === "description" && (
          <section className="max-w-2xl space-y-7">
            <div className="space-y-5">
              <h3 className="text-base font-semibold text-foreground">
                Product Description
              </h3>

              <p className="text-sm leading-7 text-muted-foreground">
                Our preserved arrangements are meticulously handcrafted using
                premium artificial silk flowers that maintain their luxurious
                appearance for 1-3 years. Perfect for those seeking a timeless
                gift that never wilts. Each arrangement is carefully curated
                with attention to detail and finished with our signature gold
                accent packaging.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-base font-semibold text-foreground">
                Features
              </h4>

              <ul className="space-y-3">
                {features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <Check className="mt-0.5 size-4 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {activeTab === "reviews" && <div>2</div>}

        {activeTab === "delivery" && (
          <section className="max-w-2xl space-y-5">
            <div className="space-y-2">
              <h3 className="text-base font-semibold text-foreground">
                Estimated Delivery Time
              </h3>

              <p className="text-sm text-muted-foreground">
                5-7 business days from order confirmation
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-base font-semibold text-foreground">
                Shipping Methods
              </h4>

              <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                {methods.map((method) => (
                  <li key={method}>{method}</li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
