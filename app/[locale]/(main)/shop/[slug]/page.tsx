import { Suspense } from "react";
import { http } from "@/lib/http";
import { cookies } from "next/headers";
import ProductInfo from "@/components/shop/product-info";
import ProductImages from "@/components/shop/product-images";
import ProductAddOns from "@/components/shop/product-add-ons";
import SimilarProducts from "@/components/shop/similar-products";
import ProductVariants from "@/components/shop/product-variants";
import { ProductDetails as ProductDetailsType } from "@/types/products";
import ProductPageSkeleton from "@/components/shop/skeleton/product-details-skeleton";

type Params = { slug: string };
type SearchParams = { addOnsPage: string; reviewPage: string };

async function Product({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { slug } = params;
  const cookie = await cookies();
  const token = cookie.get("token")?.value;
  const { addOnsPage, reviewPage } = searchParams;

  const { data, ok } = await http.get<{
    data: {
      product: ProductDetailsType;
    };
  }>(`/api/v1/products/${slug}`);

  if (!ok) {
    throw new Error("Failed to fetch product");
  }

  console.log("Product data:", data); // Log the entire response for debugging

  const product = data.data.product;
  const { images, similar } = product;

  return (
    <main className="container max-w-7xl py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <ProductImages productImages={images} />
        <ProductVariants productDetails={product} token={token} />
        <ProductAddOns currentAddOnsPage={addOnsPage} />
        <ProductInfo product={product} reviewCurrentPage={reviewPage} />
        <SimilarProducts products={similar} />
      </div>
    </main>
  );
}

export default async function ProductPage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
}) {
  return (
    <Suspense fallback={<ProductPageSkeleton />}>
      <Product params={await params} searchParams={await searchParams} />
    </Suspense>
  );
}
