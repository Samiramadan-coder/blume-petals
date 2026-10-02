import CompleteOrder from "@/components/shop/complete-order";

type SearchParams = {
  coupon_code?: string;
  discount?: string;
};

export default async function CartOrderPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const pageSearchParams = await searchParams;

  // Extract the applied coupon code and its discount from search params.
  // The subtotal is not taken from the URL; it comes from the cart itself.
  const couponCode = pageSearchParams.coupon_code || null;
  const discount =
    couponCode && pageSearchParams.discount ? +pageSearchParams.discount : 0;

  return (
    <main>
      <div className="container max-w-7xl py-14 min-h-[50vh]">
        <CompleteOrder
          couponCode={couponCode}
          discount={Number.isFinite(discount) ? discount : 0}
        />
      </div>
    </main>
  );
}
