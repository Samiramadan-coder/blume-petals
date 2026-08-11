import { T } from "./shared";

export const tabs = (t: T) => [
  {
    label: t("Filters.All"),
    value: "all",
  },
  {
    label: t("Filters.Orders"),
    value: "order",
  },
  {
    label: t("Filters.Promotions"),
    value: "promo",
  },
  {
    label: t("Filters.System"),
    value: "system",
  },
];
