import { Suspense } from "react";
import { http } from "@/lib/http";
import { Bell } from "lucide-react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Pagination } from "@/types/shared";
import { Badge } from "@/components/ui/badge";
import { getTranslations } from "next-intl/server";
import { redirect, unstable_rethrow } from "next/navigation";
import { Notification } from "@/types/notifications";
import FilterControl from "@/components/notifications/filter-control";
import PaginationTemplate from "@/components/reusable/pagination-template";
import NotificationsError from "@/components/notifications/notifications-error";
import NotificationItem from "@/components/reusable/app-header/notification-item";
import NotificationsPageSkeleton from "@/components/notifications/notification-page-skeleton";

type SearchParams = {
  page?: string;
  type?: string;
};

type NotificationsResponse = {
  data: {
    items: Notification[];
    pagination: Pagination;
    unread_count: number;
  };
};

const NOTIFICATION_TYPES = ["order", "promo", "system"];

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Notifications");

  return {
    title: t("Title"),
    // Private, per-user page: keep it out of search results.
    robots: { index: false, follow: false },
  };
}

async function getNotifications(page: number, type: string) {
  const { data } = await http.get<NotificationsResponse>(
    "/api/v1/notifications",
    {
      next: {
        tags: ["notifications-list"],
      },
      params: {
        per_page: 10,
        page,
        type,
      },
    },
  );

  return data;
}

async function NotificationsData({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const t = await getTranslations("Notifications");

  // Hand-edited URLs shouldn't reach the API as invalid values.
  const requestedPage = Number(searchParams.page);
  const page =
    Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const type =
    searchParams.type && NOTIFICATION_TYPES.includes(searchParams.type)
      ? searchParams.type
      : "";

  let response: NotificationsResponse;

  try {
    response = await getNotifications(page, type);

    // Past the last page (e.g. the last item on it was just deleted): show
    // the last page instead of an empty list with no way back.
    const { items, pagination } = response.data;

    if (items.length === 0 && page > pagination.last_page) {
      response = await getNotifications(pagination.last_page, type);
    }
  } catch (error) {
    // Let the 401 redirect from `http` through.
    unstable_rethrow(error);
    console.error("Failed to fetch notifications", error);

    // Rendered inline instead of thrown to error.tsx: an error thrown from
    // inside this streamed Suspense boundary crashes the router on hard loads.
    return <NotificationsError />;
  }

  const { items, pagination, unread_count } = response.data;

  return (
    <>
      <p className="text-sm font-semibold flex items-center gap-2">
        <Badge className="min-w-7 h-7 px-1.5 text-white font-bold">
          {unread_count}
        </Badge>
        <span>{t("Unread")}</span>
      </p>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
          <Bell
            className="mb-3 size-8 text-muted-foreground"
            aria-hidden="true"
          />
          <p className="text-sm font-medium text-muted-foreground">
            {t("NoNotifications")}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((notification) => (
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
            currentPage={pagination.current_page}
            totalPages={pagination.last_page}
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
  // Redirect before anything streams, so signed-out visitors (and crawlers)
  // get a real redirect instead of a 200 with a skeleton.
  if (!(await cookies()).has("token")) redirect("/login");

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
