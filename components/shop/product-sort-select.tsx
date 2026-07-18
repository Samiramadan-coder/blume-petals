"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useTranslations } from "next-intl";
import { parseAsString, useQueryStates } from "nuqs";

export default function ProductSortSelect() {
  const t = useTranslations("Shop");
  const [query, setQuery] = useQueryStates(
    {
      sort: parseAsString,
      page: parseAsString,
    },
    { history: "push", scroll: false, shallow: false },
  );

  const sort = query.sort ?? "";

  return (
    <Select
      value={sort}
      onValueChange={(value) => {
        void setQuery({ sort: value, page: "1" });
      }}
    >
      <SelectTrigger className="w-full max-w-48 border-border text-sm font-semibold py-5">
        <SelectValue placeholder={t("Filters")} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="newest">{t("Newest")}</SelectItem>
          <SelectItem value="best_selling">{t("BestSelling")}</SelectItem>
          <SelectItem value="price_asc">{t("PriceLowToHigh")}</SelectItem>
          <SelectItem value="price_desc">{t("PriceHighToLow")}</SelectItem>
          <SelectItem value="rating">{t("TopRated")}</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
