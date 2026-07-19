"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Rating } from "../ui/rating";
import { Progress } from "../ui/progress";
import { useTranslations } from "next-intl";
import { tabs } from "@/constants/shop-page";
import { Card, CardContent } from "../ui/card";
import { ProductDetails as ProductDetailsType } from "@/types/products";

export default function ProductInfo({
  product,
}: {
  product: ProductDetailsType;
}) {
  const t = useTranslations("Shop");
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="md:col-span-2">
      <div className="mb-6 flex flex-col sm:flex-row gap-2 sm:gap-10 sm:border-b border-border">
        {tabs(t).map((tab) => (
          <Button
            key={tab.value}
            variant="ghost"
            className={cn(
              `
              cursor-pointer 
              font-semibold 
              h-12
              sm:h-16 
              px-2 
              rounded-lg
              sm:rounded-none 
              border-0
              text-base
              text-muted-foreground
              hover:bg-transparent
              bg-primary/10
              sm:bg-transparent
            `,
              activeTab === tab.value
                ? "bg-primary text-white sm:text-muted-foreground sm:bg-transparent sm:border-b-4 border-primary"
                : "",
            )}
            onClick={() => setActiveTab(tab.value)}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      <div>
        {activeTab === "description" && (
          <Description description={product.description} />
        )}
        {activeTab === "reviews" && <Reviews />}
        {activeTab === "delivery" && <Delivery />}
      </div>
    </div>
  );
}

function Description({ description }: { description: string }) {
  const t = useTranslations("Shop");

  return (
    <div className="max-w-2xl space-y-7">
      <div className="space-y-5">
        <h3 className="text-base font-semibold text-foreground">
          {t("ProductDescription")}
        </h3>

        <div
          className="text-sm md:text-base leading-relaxed"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </div>
  );
}

function Reviews() {
  const tCommon = useTranslations("Common");

  const reviewsDetails: {
    rating: number;
    count: number;
    size: number;
    percentage: number;
  }[] = [
    {
      rating: 5,
      count: 35,
      size: 8,
      percentage: 82,
    },
    {
      rating: 4,
      count: 70,
      size: 10,
      percentage: 50,
    },
    {
      rating: 3,
      count: 60,
      size: 12,
      percentage: 40,
    },
    {
      rating: 2,
      count: 15,
      size: 14,
      percentage: 30,
    },
    {
      rating: 1,
      count: 4,
      size: 16,
      percentage: 15,
    },
  ];

  return (
    <p className="text-red-400 mt-4 p-4 text-center text-sm underline italic">
      {tCommon("StillUnderDevelopment")}
    </p>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <div>
        <p className="font-semibold text-foreground mb-6">Rating Breakdown</p>

        <div className="space-y-3">
          {reviewsDetails.map((review) => (
            <div className="flex items-center gap-2" key={review.rating}>
              <div className="min-w-20">
                <Rating rating={review.rating} size={review.size} />
              </div>
              <span className="text-xs">{review.rating}</span>
              <Progress
                value={82}
                className="h-2 w-60 bg-[#e6ddd6] [&>div]:bg-[#cbb682]"
              />
              <span className="text-xs">{review.count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-2 space-y-5">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card className="border border-border p-0" key={index}>
            <CardContent className="p-4">
              <Rating rating={4.5} />
              <p className="text-foreground mb-4 mt-3 leading-relaxed">
                Absolutely stunning and they still look fresh months later. The
                packaging felt so luxurious.
              </p>
              <div className="flex items-center justify-between">
                <p className="font-semibold text-foreground">Mariam A.</p>
                <p className="text-xs text-foreground/50">2 weeks ago</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Delivery() {
  const t = useTranslations("Shop");

  const methods = [
    t("ShippingMethod1"),
    t("ShippingMethod2"),
    t("ShippingMethod3"),
  ];

  return (
    <div className="max-w-2xl space-y-5">
      <div className="space-y-2">
        <h3 className="text-base font-semibold text-foreground">
          {t("EstimatedDeliveryTime")}
        </h3>

        <p className="text-sm text-muted-foreground">{t("workingDays")}</p>
      </div>

      <div className="space-y-3">
        <h4 className="text-base font-semibold text-foreground">
          {t("ShippingMethods")}
        </h4>

        <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          {methods.map((method) => (
            <li key={method}>{method}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
