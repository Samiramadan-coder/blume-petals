import { Suspense } from "react";
import { http } from "@/lib/http";
import { cookies } from "next/headers";
import ProductInfo from "@/components/shop/product-info";
import ProductImages from "@/components/shop/product-images";
import SimilarProducts from "@/components/shop/similar-products";
import ProductVariants from "@/components/shop/product-variants";
import { ProductDetails as ProductDetailsType } from "@/types/products";
import ProductPageSkeleton from "@/components/shop/product-details-skeleton";
import ProductAddOns from "@/components/shop/product-add-ons";

type ParamsType = {
  "product-slug": string;
  locale: string;
};

type SearchParamsType = {
  page: string;
};

async function Product({
  params,
  searchParams,
}: {
  params: ParamsType;
  searchParams: SearchParamsType;
}) {
  const cookie = await cookies();
  const token = cookie.get("token")?.value;

  // Fetch product details from the API using the product slug from the URL parameters
  const { data, ok } = await http.get<{
    data: { product: ProductDetailsType };
  }>(`/api/v1/products/${params["product-slug"]}`);

  if (!ok) {
    throw new Error("Failed to fetch product");
  }

  return (
    <main className="container max-w-7xl py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <ProductImages productImages={data.data.product.images} />
        <ProductVariants productDetails={data.data.product} token={token} />
        <ProductAddOns page={searchParams.page} />
        <ProductInfo product={data.data.product} />
        <SimilarProducts products={data.data.product.similar} />
      </div>
    </main>
  );
}

export default async function ProductPage({
  params,
  searchParams,
}: {
  params: ParamsType;
  searchParams: SearchParamsType;
}) {
  return (
    <Suspense fallback={<ProductPageSkeleton />}>
      <Product params={await params} searchParams={await searchParams} />
    </Suspense>
  );
}
