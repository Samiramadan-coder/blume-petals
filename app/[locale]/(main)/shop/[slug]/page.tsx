import { Suspense } from "react";
import { http } from "@/lib/http";
import { cookies } from "next/headers";
import { AppSettings } from "@/types/landing";
import ProductInfo from "@/components/shop/product-info";
import ProductImages from "@/components/shop/product-images";
import ProductAddOns from "@/components/shop/product-add-ons";
import SimilarProducts from "@/components/shop/similar-products";
import ProductVariants from "@/components/shop/product-variants";
import { ProductDetails as ProductDetailsType } from "@/types/products";
import ProductPageSkeleton from "@/components/shop/skeleton/product-details-skeleton";

type Params = { slug: string };
type SearchParams = { addOnsPage: string; reviewPage: string };

// Generate metadata for the product page based on the product slug
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;

  const { data: productData, ok: ok1 } = await http.get<{
    data: {
      product: ProductDetailsType;
    };
  }>(`/api/v1/products/${slug}`);

  if (!ok1) {
    throw new Error("Failed to fetch product details");
  }

  return {
    title: productData?.data?.product?.name,
    description: productData?.data?.product?.description,
  };
}

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

  // Fetch product details from the API
  const { data: productData, ok: ok1 } = await http.get<{
    data: {
      product: ProductDetailsType;
    };
  }>(`/api/v1/products/${slug}`);

  // Fetch app settings from the API
  const { data: appSettings, ok: ok2 } = await http.get<{
    data: AppSettings;
  }>(`/api/v1/settings`);

  if (!ok1 || !ok2) {
    throw new Error("Failed to fetch product or app settings");
  }

  const product = productData.data.product;
  const { images, similar } = product;

  return (
    <main className="container max-w-7xl py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <ProductImages productImages={images} />
        <ProductVariants productDetails={product} token={token} />
        {appSettings.data.showAddition && (
          <ProductAddOns currentAddOnsPage={addOnsPage} />
        )}
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
