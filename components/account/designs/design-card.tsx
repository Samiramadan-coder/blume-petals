import Image from "next/image";
import { Design } from "@/types/account";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";
import { Pencil, ShoppingCart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";

export default async function DesignCard({ item }: { item: Design }) {
  const t = await getTranslations("Account.Designs");
  const tCommon = await getTranslations("Common");

  return (
    <Card className="overflow-hidden p-0 shadow-[0_6px_20px_rgba(17,24,39,0.08)]">
      <div className="relative h-70">
        <Image
          src={
            item.bouquet.image_url ||
            "/images/home/bouquet-builder/bouquet-builder.webp"
          }
          alt="Sunset Romance"
          fill
          priority
          className="object-cover"
          sizes="294px"
        />

        <Badge className="absolute left-4 top-4 rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold text-primary border border-primary/30">
          {t("CustomBuild")}
        </Badge>
      </div>

      <CardContent className="space-y-4 p-4">
        <div className="space-y-1">
          <h3 className="text-base font-bold leading-none text-foreground">
            {item.bouquet.name}
          </h3>

          <p className="text-sm text-muted-foreground">
            {item.flowers.map((flower, index) => (
              <span key={index}>
                {flower.qty} {flower.name}
                {index < item.flowers.length - 1 && " · "}
              </span>
            ))}
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-xl font-bold text-primary">
            {tCommon("AED")} {item.unit_price}
          </p>

          <p className="text-sm text-muted-foreground">
            {t("Saved")} {formatDate(item.created_at)}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button
            asChild
            variant="outline"
            aria-label="Edit Design"
            className="h-10 rounded-[10px] border-primary bg-white text-primary hover:bg-primary/10 hover:text-primary"
          >
            <Link href={`/builder?designId=${item.id}`}>
              <Pencil className="size-4" />
              {t("Edit")}
            </Link>
          </Button>

          <Button
            className="h-10 rounded-[10px] bg-primary text-white hover:bg-primary/90"
            aria-label="Add to Cart"
          >
            <ShoppingCart className="size-4" />
            {t("AddToCart")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
