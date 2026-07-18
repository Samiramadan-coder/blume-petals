"use client";

import { useQueryParam } from "@/hooks/use-search-params";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ProductSortSelect() {
  const t = useTranslations("Shop");
  const searchParams = useSearchParams();
  const { setQueryParams } = useQueryParam();
  const [sort, setSort] = useState<string>(searchParams.get("sort") || "");

  return (
    <Select
      value={sort}
      onValueChange={(value) => {
        setSort(value);
        setQueryParams({ sort: value, page: "1" });
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
