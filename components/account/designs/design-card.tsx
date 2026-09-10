import Image from "next/image";
import { Design } from "@/types/account";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";
import { Pencil } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import AddToCart from "./add-to-cart";

export default async function DesignCard({ item }: { item: Design }) {
  const t = await getTranslations("Account.Designs");
  const tCommon = await getTranslations("Common");

  return (
    <Card className="overflow-hidden gap-0 p-0 shadow-[0_6px_20px_rgba(17,24,39,0.08)]">
      <div className="relative h-65">
        <Image
          src={
            item.image_url ||
            item.bouquet.image_url ||
            "/images/home/bouquet-builder/bouquet-builder.webp"
          }
          alt="Sunset Romance"
          fill
          priority
          className="object-cover"
        />

        <Badge className="absolute left-4 top-4 rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold text-primary border border-primary/30">
          {t("CustomBuild")}
        </Badge>
      </div>

      <CardContent className="flex-1 p-4 flex flex-col justify-between gap-4">
        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <h3 className="text-base font-bold leading-relaxed text-foreground">
              {item.bouquet.name}
            </h3>

            <p className="text-[13px] text-muted-foreground leading-relaxed line-clamp-2">
              {item.flowers.map((flower, index) => (
                <span key={index}>
                  {flower.name} {flower.qty} {t("Flower")}
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
        </div>

        <div className="grid grid-cols-2 gap-2 mt-auto">
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
          <AddToCart designId={item.id} />
        </div>
      </CardContent>
    </Card>
  );
}
