import { T } from "./shared";

export const tabs = (
  t: T,
  reviewsCount: number,
): { label: string; value: string }[] => [
  {
    label: t("Descriptions"),
    value: "description",
  },
  {
    label: t("Reviews") + ` (${reviewsCount})`,
    value: "reviews",
  },
  {
    label: t("EstimatedDelivery"),
    value: "delivery",
  },
];
