import PageTitle from "../shared/page-title";
import { getTranslations } from "next-intl/server";
import DesignCard from "./design-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "@/i18n/navigation";

export default async function Designs() {
  const t = await getTranslations("Account.Designs");

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <PageTitle title={t("Title")} />
        <span className="text-muted-foreground text-xs">
          3 {t("SavedDesigns")}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <DesignCard key={index} />
        ))}

        <div className="col-span-1 sm:col-span-2 md:col-span-3">
          <Link href="/builder">
            <Button
              variant="outline"
              className="border-2 bg-white cursor-pointer w-70 h-70 border-dashed flex-col"
            >
              <Plus className="size-9 text-primary" />
              {t("CreateNewDesign")}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
