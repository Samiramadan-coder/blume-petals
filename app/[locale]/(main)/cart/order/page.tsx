import { cn } from "@/lib/utils";
import CompleteOrder from "@/components/shop/complete-order";
import { getLocale, getTranslations } from "next-intl/server";

type SearchParams = {
  total?: string;
  coupon_applied?: string;
  coupon_code?: string;
  discount?: string;
};

export default async function CartPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const locale = await getLocale();
  const t = await getTranslations("Shop");
  const pageSearchParams = await searchParams;

  // Extract coupon code, discount, and total from search params
  const couponCode = pageSearchParams.coupon_code ?? null;
  const discount = pageSearchParams.discount ? +pageSearchParams.discount : 0;
  const total = pageSearchParams.total ? +pageSearchParams.total : 0;

  return (
    <main>
      <div className="container max-w-7xl py-14 min-h-[50vh]">
        <h1
          className={cn("mb-6 font-semibold text-xl md:text-3xl", {
            "font-heading": locale === "en",
          })}
        >
          {t("HowToReceiveOrder")}
        </h1>

        <CompleteOrder
          total={total}
          couponCode={couponCode}
          discount={discount}
        />
      </div>
    </main>
  );
}
