import { Card, CardContent } from "../ui/card";
import { Clock3, SlidersHorizontal, PackageCheck } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function OurPerform() {
  const t = await getTranslations("AboutOurPromise");

  return (
    <div className="bg-[#faf8f5]">
      <div className="container max-w-7xl">
        <div className="py-20">
          <p className="text-xs font-semibold uppercase mb-3 tracking-[0.3em] text-primary text-center">
            {t("Eyebrow")}
          </p>

          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-balance leading-tight text-foreground mb-8 text-center">
            {t("Title")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border border-border shadow-sm p-8">
              <CardContent className="flex flex-col items-center gap-4">
                <div className="bg-border w-14 h-14 rounded-full grid place-items-center">
                  <Clock3 className="w-6 h-6 text-foreground" />
                </div>
                <h4 className="text-center font-heading text-xl font-bold text-foreground">
                  {t("Cards.Last.Title")}
                </h4>
                <p className="text-center text-sm text-foreground/60 leading-relaxed">
                  {t("Cards.Last.Description")}
                </p>
              </CardContent>
            </Card>

            <Card className="border border-border shadow-sm p-8">
              <CardContent className="flex flex-col items-center gap-4">
                <div className="bg-border w-14 h-14 rounded-full grid place-items-center">
                  <SlidersHorizontal className="w-6 h-6 text-foreground" />
                </div>
                <h4 className="text-center font-heading text-xl font-bold text-foreground">
                  {t("Cards.Customizable.Title")}
                </h4>
                <p className="text-center text-sm text-foreground/60 leading-relaxed">
                  {t("Cards.Customizable.Description")}
                </p>
              </CardContent>
            </Card>

            <Card className="border border-border shadow-sm p-8">
              <CardContent className="flex flex-col items-center gap-4">
                <div className="bg-border w-14 h-14 rounded-full grid place-items-center">
                  <PackageCheck className="w-6 h-6 text-foreground" />
                </div>
                <h4 className="text-center font-heading text-xl font-bold text-foreground">
                  {t("Cards.Delivery.Title")}
                </h4>
                <p className="text-center text-sm text-foreground/60 leading-relaxed">
                  {t("Cards.Delivery.Description")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
