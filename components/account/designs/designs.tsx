import { Plus } from "lucide-react";
import DesignCard from "./design-card";
import { Link } from "@/i18n/navigation";
import { Design } from "@/types/account";
import { Pagination } from "@/types/shared";
import PageTitle from "../shared/page-title";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";
import PaginationTemplate from "@/components/reusable/pagination-template";

export default async function Designs({
  items,
  pagination,
}: {
  items: Design[];
  pagination: Pagination;
}) {
  const t = await getTranslations("Account.Designs");

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <PageTitle title={t("Title")} />
        <span className="text-muted-foreground text-xs">
          {pagination.total} {t("SavedDesigns")}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <DesignCard key={index} item={item} />
        ))}

        <div className="sm:col-span-2 md:col-span-3">
          <PaginationTemplate
            currentPage={pagination.current_page}
            totalPages={pagination.last_page}
          />
        </div>

        <div className="col-span-1 sm:col-span-2 md:col-span-3">
          <Link href="/builder">
            <Button
              variant="outline"
              className="border-2 bg-white cursor-pointer w-70 h-70 border-dashed flex-col"
              aria-label="Create New Design"
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
