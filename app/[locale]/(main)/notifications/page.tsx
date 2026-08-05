import { Suspense } from "react";
import { http } from "@/lib/http";
import { Bell } from "lucide-react";
import { Pagination } from "@/types/shared";
import { getTranslations } from "next-intl/server";
import { Notification } from "@/types/notifications";
import PaginationTemplate from "@/components/reusable/pagination-template";
import NotificationItem from "@/components/reusable/app-header/notification-item";
import NotificationsPageSkeleton from "@/components/notifications/notification-page-skeleton";
import FilterControl from "@/components/notifications/filter-control";

type SearchParams = {
  page?: string;
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
    };
  }>("/api/v1/notifications", {
    next: {
      tags: ["notifications-list"],
    },
    params: {
      page: searchParams.page ?? 1,
      per_page: 5,
    },
  });

  if (!ok) {
    throw new Error("Failed to fetch notifications");
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">{t("Title")}</h1>

      {data.data.items.length === 0 ? (
        <div className="min-h-full flex flex-col items-center justify-center px-6 text-center">
          <Bell className="mb-3 size-8 text-muted-foreground" />
          <p className="text-sm font-medium text-muted-foreground">
            {t("NoNotifications")}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <FilterControl />

          {data.data.items.map((notification) => (
            <div
              key={notification.id}
              className="border rounded-md overflow-hidden"
            >
              <NotificationItem
                notification={notification}
                showActions={true}
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
  const pageSearchParams = await searchParams;

  return (
    <main>
      <div className="container max-w-7xl py-20 min-h-[50vh]">
        <Suspense
          key={pageSearchParams.page ?? 1}
          fallback={<NotificationsPageSkeleton />}
        >
          <NotificationsData searchParams={pageSearchParams} />
        </Suspense>
      </div>
    </main>
  );
}
