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

export const sizes = (t: T) => [
  {
    id: "S",
    label: t("Small"),
  },
  {
    id: "M",
    label: t("Medium"),
  },
  {
    id: "L",
    label: t("Large"),
  },
  {
    id: "XL",
    label: t("XLarge"),
  },
];
