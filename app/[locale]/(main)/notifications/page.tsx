import { Suspense } from "react";
import { http } from "@/lib/http";
import { Bell } from "lucide-react";
import { Pagination } from "@/types/shared";
import { getTranslations } from "next-intl/server";
import { Notification } from "@/types/notifications";
import FilterControl from "@/components/notifications/filter-control";
import PaginationTemplate from "@/components/reusable/pagination-template";
import NotificationItem from "@/components/reusable/app-header/notification-item";
import NotificationsPageSkeleton from "@/components/notifications/notification-page-skeleton";
import { Badge } from "@/components/ui/badge";

type SearchParams = {
  page?: string;
  type?: string;
};

async function NotificationsData({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const t = await getTranslations("Notifications");

  const { data, ok } = await http.get<{
    data: {
      items: Notification[];
      pagination: Pagination;
      unread_count: number;
    };
  }>("/api/v1/notifications", {
    next: {
      tags: ["notifications-list"],
    },
    params: {
      page: searchParams.page ?? 1,
      per_page: 10,
      type: searchParams.type ?? "",
    },
  });

  if (!ok) {
    throw new Error("Failed to fetch notifications");
  }

  return (
    <>
      <p className="text-sm font-semibold flex items-center gap-2">
        <Badge className="w-6 h-6 text-foreground">
          {data.data.unread_count}
        </Badge>
        <span>{t("Unread")}</span>
      </p>

      {data.data.items.length === 0 ? (
        <div className="min-h-full flex flex-col items-center justify-center px-6 text-center">
          <Bell className="mb-3 size-8 text-muted-foreground" />
          <p className="text-sm font-medium text-muted-foreground">
            {t("NoNotifications")}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.data.items.map((notification) => (
            <div
              key={notification.id}
              className="border border-primary/20 rounded-md overflow-hidden"
            >
              <NotificationItem
                notification={notification}
                showActions={true}
                isPopup={false}
              />
            </div>
          ))}

          <PaginationTemplate
            currentPage={data.data.pagination.current_page}
            totalPages={data.data.pagination.last_page}
          />
        </div>
      )}
    </>
  );
}

export default async function NotificationsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const t = await getTranslations("Notifications");
  const pageSearchParams = await searchParams;

  return (
    <main>
      <div className="container max-w-5xl py-20 min-h-[50vh]">
        <div className="space-y-6">
          <div className="space-y-4">
            <h1 className="text-2xl font-bold">{t("Title")}</h1>
            <FilterControl />
          </div>

          <Suspense
            key={JSON.stringify(pageSearchParams)}
            fallback={<NotificationsPageSkeleton />}
          >
            <NotificationsData searchParams={pageSearchParams} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
