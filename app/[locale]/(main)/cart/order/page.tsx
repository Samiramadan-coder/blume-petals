import { http } from "@/lib/http";
import { Address, Country } from "@/types/account";
import { getTranslations } from "next-intl/server";
import GoBackBtn from "@/components/shop/go-back-btn";
import CompleteOrder from "@/components/shop/complete-order";
import AddressForm from "@/components/account/addresses/address-form";

type SearchParams = {
  new_total_fee?: string;
  coupon_applied?: string;
  coupon_code?: string;
};

export default async function CartPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const pageSearchParams = await searchParams;
  const t = await getTranslations("Shop");

  // Fetch addresses data
  const { data: addresses, ok: ok2 } = await http.get<{
    data: { items: Address[] };
  }>(`/api/v1/addresses`);

  const { data: countries, ok: ok3 } = await http.get<{
    data: { items: Country[] };
  }>("/api/v1/countries");

  if (!ok2 || !ok3) {
    throw new Error("Failed to fetch addresses or countries");
  }

  return (
    <main>
      <div className="container max-w-7xl py-20 min-h-[50vh]">
        <GoBackBtn />

        <div className="md:col-span-2 space-y-6 mt-6">
          {addresses.data.items.length === 0 ? (
            <>
              <p className="text-sm text-muted-foreground font-semibold">
                {t("DontHaveAddress")}
              </p>
              <AddressForm countries={countries.data.items} />
            </>
          ) : (
            <>
              <AddressForm countries={countries.data.items} />

              <CompleteOrder
                addresses={addresses.data.items}
                total={+(pageSearchParams.new_total_fee ?? "0")}
                couponCode={pageSearchParams.coupon_code ?? null}
              />
            </>
          )}
        </div>
      </div>
    </main>
  );
}
