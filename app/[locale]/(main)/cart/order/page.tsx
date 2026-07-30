import { cn } from "@/lib/utils";
import { http } from "@/lib/http";
import { PickupLocation } from "@/types/products";
import { Address, Country } from "@/types/account";
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

  // Fetch addresses data
  const { data: addresses, ok: ok1 } = await http.get<{
    data: { items: Address[] };
  }>(`/api/v1/addresses`);

  // Fetch countries data
  const { data: countries, ok: ok2 } = await http.get<{
    data: { items: Country[] };
  }>("/api/v1/countries");

  // Fetch Pickup Locations
  const { data: pickupLocations, ok: ok3 } = await http.get<{
    data: { items: PickupLocation[] };
  }>(`/api/v1/pickup-locations`);

  if (!ok1 || !ok2 || !ok3) {
    throw new Error(
      "Failed to fetch addresses, countries, or pickup locations",
    );
  }

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
          countries={countries.data.items}
          pickupLocations={pickupLocations.data.items}
          addresses={addresses.data.items}
          total={total}
          couponCode={couponCode}
          discount={discount}
        />
      </div>
    </main>
  );
}
