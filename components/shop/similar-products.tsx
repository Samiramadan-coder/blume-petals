import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { Product } from "@/types/products";
import CardItem from "./card-item";

export default async function SimilarProducts({
  products,
}: {
  products: Product[];
}) {
  const locale = await getLocale();
  const t = await getTranslations("Shop");
  const tCommon = await getTranslations("Common");

  return (
    <div className="md:col-span-2">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <p
          className={cn(`text-2xl md:text-4xl font-bold text-foreground`, {
            "font-heading": locale === "en",
          })}
        >
          {t("SimilarProducts")}
        </p>
        <Link href="/shop" className="text-primary">
          {tCommon("ViewAll")}
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {products.map((product) => (
          <CardItem key={product.id} item={product} />
        ))}
      </div>
    </div>
  );
}
