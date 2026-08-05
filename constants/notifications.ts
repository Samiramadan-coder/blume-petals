import { T } from "./shared";

export const tabs = (t: T) => [
  {
    label: t("Filters.All"),
    value: "all",
  },
  {
    label: t("Filters.Orders"),
    value: "orders",
  },
  {
    label: t("Filters.Promotions"),
    value: "promotions",
  },
  {
    label: t("Filters.System"),
    value: "system",
  },
];
