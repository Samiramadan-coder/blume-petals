import {
  Product as ProductType,
  ProductDetails as ProductDetailsType,
} from "@/types/products";
import { Suspense } from "react";
import { http } from "@/lib/http";
import { cookies } from "next/headers";
import { Pagination } from "@/types/shared";
import ProductInfo from "@/components/shop/product-info";
import ProductImages from "@/components/shop/product-images";
import ProductAddOns from "@/components/shop/product-add-ons";
import SimilarProducts from "@/components/shop/similar-products";
import ProductVariants from "@/components/shop/product-variants";
import ProductPageSkeleton from "@/components/shop/product-details-skeleton";

type Params = { slug: string };
type SearchParams = { page: string; reviewPage: string };

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
  const { page, reviewPage } = searchParams;

  // Fetch product details from the API using the slug from the URL parameters
  // The API response is expected to contain a product object with details, images, and similar products
  const { data: productsData, ok: ok1 } = await http.get<{
    data: {
      product: ProductDetailsType;
    };
  }>(`/api/v1/products/${slug}`);

  // Fetch product add-ons from the API using the slug from the URL parameters
  // The API response is expected to contain a list of add-ons and pagination information
  const { data: addOnsData, ok: ok2 } = await http.get<{
    data: {
      items: ProductType[];
      pagination: Pagination;
    };
  }>(`/api/v1/products?category_type=addon`, {
    params: {
      per_page: 2,
      page: page || "1",
    },
  });

  // Fetch product reviews from the API using the slug from the URL parameters
  // The API response is expected to contain a list of reviews and pagination information
  const { data: reviewsData, ok: ok3 } = await http.get<{
    data: {
      items: ProductDetailsType["reviews"];
      pagination: Pagination;
    };
  }>(`/api/v1/products/${slug}/reviews`, {
    params: {
      per_page: 8,
      page: reviewPage || "1",
    },
  });

  // If either of the API requests fails,
  // throw an error to indicate that the product or reviews could not be fetched
  if (!ok1 || !ok3 || !ok2) {
    throw new Error("Failed to fetch product or reviews");
  }

  const product = productsData.data.product;
  const { images, similar } = product;

  return (
    <main className="container max-w-7xl py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <ProductImages productImages={images} />
        <ProductVariants productDetails={product} token={token} />
        <ProductAddOns
          addOns={addOnsData.data.items}
          pagination={addOnsData.data.pagination}
        />
        <ProductInfo
          product={product}
          reviews={reviewsData.data.items}
          pagination={reviewsData.data.pagination}
        />
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
