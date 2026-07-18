import { T } from "./shared";

export const tabs = (t: T): { label: string; value: string }[] => [
  {
    label: t("Descriptions"),
    value: "description",
  },
  {
    label: t("Reviews"),
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
