import Image from "next/image";
import { Suspense } from "react";
import { http } from "@/lib/http";
import { cookies } from "next/headers";
import ProductInfo from "@/components/shop/product-info";
import SimilarProducts from "@/components/shop/similar-products";
import ProductVariants from "@/components/shop/product-variants";
import { ProductDetails as ProductDetailsType } from "@/types/products";
import ProductPageSkeleton from "@/components/shop/product-details-skeleton";

type ParamsType = {
  "product-slug": string;
  locale: string;
};

async function Product({ params }: { params: ParamsType }) {
  const cookie = await cookies();
  const token = cookie.get("token")?.value;

  // Fetch product details from the API using the product slug from the URL parameters
  const { data, ok } = await http.get<{
    data: { product: ProductDetailsType };
  }>(`/api/v1/products/${params["product-slug"]}`);

  if (!ok) {
    throw new Error("Failed to fetch product");
  }

  const primaryImage = data.data.product.images.find(
    (image) => image.is_primary,
  );

  const imagesLength = data.data.product.images.length;

  return (
    <main className="container max-w-7xl py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Images */}
        <div className="grid grid-cols-4 gap-4">
          <div className="space-y-4">
            {data.data.product.images.slice(0, 4).map((image, index) => (
              <div
                className="relative rounded-xl overflow-hidden border-2 border-border"
                key={index}
              >
                <Image
                  src={image.url}
                  alt={data.data.product.name}
                  width={500}
                  height={500}
                  className="aspect-square w-full object-cover"
                />

                {imagesLength > 4 && index === 3 && (
                  <div className="absolute inset-0 text-white text-2xl bg-black/40 cursor-pointer grid place-content-center">
                    + {imagesLength - 4}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="col-span-3 relative">
            {primaryImage && (
              <Image
                src={primaryImage?.url}
                alt={data.data.product.name}
                width={500}
                height={500}
                className="aspect-square w-full object-cover rounded-xl border-2 border-border"
              />
            )}
          </div>
        </div>

        {/* Product Variants */}
        <ProductVariants productDetails={data.data.product} token={token} />

        {/* Product Details */}
        <ProductInfo product={data.data.product} />

        {/* Similar Products */}
        <SimilarProducts products={data.data.product.similar} />
      </div>
    </main>
  );
}

export default async function ProductPage({ params }: { params: ParamsType }) {
  return (
    <Suspense fallback={<ProductPageSkeleton />}>
      <Product params={await params} />
    </Suspense>
  );
}
