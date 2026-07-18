import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { getTranslations } from "next-intl/server";

export default async function SimilarProducts() {
  const t = await getTranslations("Shop");
  const tCommon = await getTranslations("Common");

  return (
    <div className="md:col-span-2">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <p className="font-heading text-3xl md:text-4xl font-bold text-foreground">
          {t("SimilarProducts")}
        </p>
        <Link href="/shop" className="text-primary">
          {tCommon("ViewAll")}
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card
            className="group border-transparent bg-transparent shadow-none py-0"
            key={index}
          >
            <CardContent className="p-0">
              <div className="overflow-hidden rounded-[24px]">
                <Image
                  src="/images/home/how-it-works/1.png"
                  alt="Eternal Rose Box"
                  width={500}
                  height={500}
                  className="aspect-square w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="mt-6">
                <h3 className="font-heading font-semibold text-lg text-foreground">
                  Eternal Rose Box
                </h3>

                <div className="flex items-center justify-between mt-2">
                  <p className="text-lg font-bold text-primary">AED 420</p>
                  <div className="flex items-center gap-1">
                    <span className="text-primary">★</span>
                    <span className="text-sm text-foreground/60">4.9</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
