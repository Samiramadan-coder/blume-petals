import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { getTranslations } from "next-intl/server";

export default async function ProductSortSelect() {
  const t = await getTranslations("Shop");

  return (
    <Select>
      <SelectTrigger className="w-full max-w-42 border-border py-5">
        <SelectValue placeholder={t("Filters")} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="featured">{t("Featured")}</SelectItem>
          <SelectItem value="newest">{t("Newest")}</SelectItem>
          <SelectItem value="price-low-to-high">
            {t("PriceLowToHigh")}
          </SelectItem>
          <SelectItem value="price-high-to-low">
            {t("PriceHighToLow")}
          </SelectItem>
          <SelectItem value="top-rated">{t("TopRated")}</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
