import Image from "next/image";
import { Product } from "@/types/products";
import { Card, CardContent } from "../ui/card";
import { getTranslations } from "next-intl/server";
import AddOnCardAddVariantToCart from "./add-on-card-add-variant-to-cart";
import { cookies } from "next/headers";

export default async function AddOnCard({ item }: { item: Product }) {
  const tShop = await getTranslations("Shop");
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;

  return (
    <Card className="h-full group overflow-hidden border border-border rounded-2xl bg-white p-0 shadow-[0_10px_30px_rgba(61,46,0,0.04)] hover:shadow-[0_10px_30px_rgba(61,46,0,0.08)]">
      <CardContent className="p-0">
        <div className="overflow-hidden relative aspect-5/5">
          <Image
            src={item.image_url}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 16vw"
          />
        </div>

        <div className="flex flex-col p-4">
          <p className="text-sm font-semibold leading-snug mb-1.5 text-foreground">
            {item.name.slice(0, 15)}...
          </p>
          <p className="text-sm font-bold text-foreground mb-3">
            {tShop("AED")} {item.price_from}
          </p>
          <AddOnCardAddVariantToCart item={item} isLoggedIn={!!token} />
        </div>
      </CardContent>
    </Card>
  );
}
