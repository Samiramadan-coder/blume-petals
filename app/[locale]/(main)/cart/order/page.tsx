import { http } from "@/lib/http";
import { PickupLocation } from "@/types/products";
import { Address, Country } from "@/types/account";
import GoBackBtn from "@/components/shop/go-back-btn";
import CompleteOrder from "@/components/shop/complete-order";

type SearchParams = {
  new_total_fee?: string;
  coupon_applied?: string;
  coupon_code?: string;
  discount?: string;
};

export default async function CartPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
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
  const total = pageSearchParams.new_total_fee
    ? +pageSearchParams.new_total_fee
    : 0;

  return (
    <main>
      <div className="container max-w-7xl py-20 min-h-[50vh]">
        <GoBackBtn />

        <div className="md:col-span-2 space-y-6 mt-6">
          <CompleteOrder
            countries={countries.data.items}
            pickupLocations={pickupLocations.data.items}
            addresses={addresses.data.items}
            total={total}
            couponCode={couponCode}
            discount={discount}
          />
        </div>
      </div>
    </main>
  );
}
