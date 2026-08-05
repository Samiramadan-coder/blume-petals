import NotificationItem from "@/components/reusable/app-header/notification-item";
import { http } from "@/lib/http";
import { Notification } from "@/types/notifications";
import { Pagination } from "@/types/shared";
import { Bell } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function NotificationsPage() {
  const t = await getTranslations("Notifications");

  const { data, ok } = await http.get<{
    data: {
      items: Notification[];
      pagination: Pagination;
    };
  }>("/api/v1/notifications", {
    params: {
      page: 1,
      per_page: 10,
    },
  });

  if (!ok) {
    throw new Error("Failed to fetch notifications");
  }

  return (
    <main className="">
      <div className="container max-w-7xl py-20 min-h-[50vh]">
        {data.data.items.length === 0 ? (
          <div className="min-h-full flex flex-col items-center justify-center px-6 text-center">
            <Bell className="mb-3 size-8 text-muted-foreground" />
            <p className="text-sm font-medium text-muted-foreground">
              {t("NoNotifications")}
            </p>
          </div>
        ) : (
          data.data.items.map((notification) => (
            <div
              key={notification.id}
              className="mb-4 border rounded-md overflow-hidden"
            >
              <NotificationItem
                notification={notification}
                showActions={true}
              />
            </div>
          ))
        )}
      </div>
    </main>
  );
}
