import { Tab } from "@/types/shop-page";
import { T } from "./shared";

export const tabs: {
  label: string;
  value: Tab;
}[] = [
  {
    label: "Description",
    value: "description",
  },
  {
    label: "Reviews",
    value: "reviews",
  },
  {
    label: "Delivery",
    value: "delivery",
  },
];

export const sizes = (t: T) => [
  {
    id: "small",
    label: t("Small"),
  },
  {
    id: "medium",
    label: t("Medium"),
  },
  {
    id: "large",
    label: t("Large"),
  },
  {
    id: "extra_large",
    label: t("XLarge"),
  },
];
