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
