import Image from "next/image";
import { Heart, Van } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Rating } from "@/components/ui/rating";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import ProductDetails from "@/components/shop/product-details";
import SimilarProducts from "@/components/shop/similar-products";
import { http } from "@/lib/http";
import { ProductDetails as ProductDetailsType } from "@/types/products";
import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";

const sizes = ["S", "M", "L", "XL"];

export default async function ProductPage({
  params,
}: {
  params: { "product-slug": string };
}) {
  const t = await getTranslations("Shop");
  const pageParams = await params;
  const { data, ok } = await http.get<{
    data: { product: ProductDetailsType };
  }>(`/api/v1/products/${pageParams["product-slug"]}`);

  if (!ok) {
    throw new Error("Failed to fetch product");
  }

  const primaryImage = data.data.product.images.find(
    (image) => image.is_primary,
  );

  const secondaryImages = data.data.product.images.filter(
    (image) => !image.is_primary,
  );

  // console.log("data", data.data.product);
  // const productSlug = await params["product-slug"];
  // console.log("productSlug", pageParams["product-slug"]);
  return (
    <main className="container max-w-7xl py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Images */}
        <div className="grid grid-cols-4 gap-6">
          <div className="space-y-4">
            {secondaryImages.map((image, index) => (
              <div className="relative" key={index}>
                <Image
                  src={image.url}
                  alt={data.data.product.name}
                  width={500}
                  height={500}
                  className="aspect-square w-full object-cover rounded-xl"
                />
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
                className="aspect-square w-full object-cover rounded-xl"
              />
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
            {data.data.product.name}
          </h1>
          <Rating
            rating={+data.data.product.rating_avg}
            count={data.data.product.rating_count}
          />
          <p className="text-4xl font-bold text-primary">
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
                    `rounded-full w-14 h-14 boredr border-2 border-border cursor-pointer hover:bg-primary`,
                    {
                      "bg-primary text-white hover:text-white font-semibold":
                        size === data.data.product.variants[0].size, // Assuming the first variant is the default selected size
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
              className="h-30"
            />
          </div>

          <Card className="bg-secondary/10 border-l-4 border-secondary rounded-lg p-4">
            <CardContent className="flex items-center gap-3 p-0">
              <Van />
              <div>
                <p className="font-semibold text-foreground">
                  {t("EstimatedDelivery")}
                </p>
                <p className="text-sm text-foreground/60">5-7 business days</p>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-wrap gap-3">
            <div className="border-2 border-primary flex-1 rounded-lg flex">
              <Button variant="ghost" className="h-full w-10">
                -
              </Button>
              <Input
                className="h-full text-center border-0"
                type="number"
                defaultValue={10}
              />
              <Button variant="ghost" className="h-full w-10">
                +
              </Button>
            </div>

            <Button
              variant="outline"
              className="flex-1 cursor-pointer border-2 border-primary p-5 text-primary font-semibold hover:text-primary"
            >
              <Heart />
              {t("AddToWishlist")}
            </Button>
            <Button
              variant="ghost"
              className="flex-1 cursor-pointer text-white border-2 border-secondary p-5 bg-secondary hover:bg-secondary hover:text-white font-semibold"
            >
              <Heart />
              {t("AddToCart")}
            </Button>
          </div>
        </div>

        {/* Product Details */}
        <ProductDetails />

        {/* Similar Products */}
        <SimilarProducts />
      </div>
    </main>
  );
}
