import PageTitle from "../shared/page-title";
import { getTranslations } from "next-intl/server";
import DesignCard from "./design-card";

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
        {[...Array(3)].map((_, index) => (
          <DesignCard key={index} />
        ))}
      </div>
    </div>
  );
}
