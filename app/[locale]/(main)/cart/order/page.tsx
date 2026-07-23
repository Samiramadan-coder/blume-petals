import { http } from "@/lib/http";
import { Address, Country } from "@/types/account";
import { getTranslations } from "next-intl/server";
import { CartItem, Summary } from "@/types/products";
import GoBackBtn from "@/components/shop/go-back-btn";
import CompleteOrder from "@/components/shop/complete-order";
import AddressForm from "@/components/account/addresses/address-form";

export default async function CartPage() {
  const t = await getTranslations("Shop");

  // Fetch cart data
  const { data: cartData, ok } = await http.get<{
    data: {
      cart: {
        items: CartItem[];
        summary: Summary;
      };
    };
  }>("/api/v1/cart");

  // Fetch addresses data
  const { data: addresses, ok: ok2 } = await http.get<{
    data: { items: Address[] };
  }>(`/api/v1/addresses`);

  const { data: countries, ok: ok3 } = await http.get<{
    data: { items: Country[] };
  }>("/api/v1/countries");

  if (!ok || !ok2 || !ok3) {
    throw new Error("Failed to fetch cart, addresses, or countries");
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
                total={+cartData.data.cart.summary.total}
              />
            </>
          )}
        </div>
      </div>
    </main>
  );
}
