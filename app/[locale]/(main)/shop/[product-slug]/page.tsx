import Image from "next/image";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import { http } from "@/lib/http";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Van } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Rating } from "@/components/ui/rating";
import { getTranslations } from "next-intl/server";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import AddToCartBtn from "@/components/shop/add-to-cart-btn";
import ProductDetails from "@/components/shop/product-details";
import SimilarProducts from "@/components/shop/similar-products";
import AddToFavoriteBtn from "@/components/shop/add-to-favorite-btn";
import { ProductDetails as ProductDetailsType } from "@/types/products";
import ProductPageSkeleton from "@/components/shop/product-details-skeleton";
import { cookies } from "next/headers";

const sizes = ["S", "M", "L", "XL"];

type ParamsType = {
  "product-slug": string;
  locale: string;
};

async function Product({ params }: { params: ParamsType }) {
  const t = await getTranslations("Shop");
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

        {/* Product Details */}
        <div className="space-y-6">
          <h1
            className={cn("text-3xl md:text-5xl font-bold text-foreground", {
              "font-heading": params.locale === "en",
            })}
          >
            {data.data.product.name}
          </h1>
          <Rating
            rating={+data.data.product.rating_avg}
            count={data.data.product.rating_count}
          />
          <p className="text-2xl md:text-4xl font-bold text-primary">
            {t("AED")} {data.data.product.price_from}
          </p>
          <div
            className="text-foreground/70 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: data.data.product.description }}
          />
          <div className="space-y-3">
            <p className="font-semibold text-foreground mb-3">{t("Size")}</p>
            <div className="flex gap-3 flex-wrap">
              {sizes.map((size) => (
                <Button
                  variant="outline"
                  key={size}
                  className={cn(
                    `rounded-full w-14 h-14 boredr border-2 border-border cursor-pointer hover:bg-transparent`,
                    {
                      "bg-primary font-semibold":
                        size === data.data.product.variants[0].size,
                    },
                  )}
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <p className="font-semibold text-foreground mb-3">
              {t("PersonalMessage")}
            </p>
            <Textarea
              placeholder={t("PersonalMessagePlaceholder")}
              className="h-40"
            />
          </div>

          <Card className="bg-secondary/10 border-l-4 border-secondary rounded-lg p-3">
            <CardContent className="flex items-center gap-4 p-0">
              <Van className="size-6 text-secondary" />
              <div>
                <p className="font-semibold text-base text-foreground">
                  {t("EstimatedDelivery")}
                </p>
                <p className="text-sm text-foreground/60 mt-1">
                  {t("ShippingMethod1")}
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-wrap gap-3">
            <div className="border-2 border-primary flex-1 rounded-lg flex">
              <Button variant="ghost" className="h-full w-10">
                <Minus />
              </Button>
              <Input
                className="h-full text-center border-0 text-base"
                type="number"
                defaultValue={1}
              />
              <Button variant="ghost" className="h-full w-10">
                <Plus />
              </Button>
            </div>

            <AddToFavoriteBtn
              product={data.data.product}
              isLoggedIn={!!token}
              version="wishlist-page"
            />

            <AddToCartBtn
              item={data.data.product}
              version="product-page"
              isLoggedIn={!!token}
            />
          </div>
        </div>

        {/* Product Details */}
        <ProductDetails product={data.data.product} />

        {/* Similar Products */}
        <SimilarProducts />
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
