"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { http } from "@/lib/http";
import { Bell } from "lucide-react";
import { Pagination } from "@/types/shared";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { tabs } from "@/constants/notifications";
import { Spinner } from "@/components/ui/spinner";
import NotificationItem from "./notification-item";
import { Notification } from "@/types/notifications";
import { useCallback, useEffect, useState } from "react";
import { PopoverClose, PopoverContent } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { markAllNotificationsAsRead } from "@/lib/notifications";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNotifications } from "@/providers/notifications-provider";

export default function NotificationsContent() {
  const { unreadCount } = useNotifications();
  const t = useTranslations("Notifications");
  const [activeTab, setActiveTab] = useState("all");
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);

  const getNotifications = useCallback(async (targetPage: number) => {
    const { data } = await http.get<{
      data: {
        items: Notification[];
        pagination: Pagination;
      };
    }>("/api/v1/notifications", {
      params: {
        page: targetPage,
        per_page: 10,
      },
    });

    return data.data;
  }, []);

  useEffect(() => {
    let cancelled = false;

    getNotifications(page).then((data) => {
      if (cancelled) return;
      setHasMore(data.pagination.has_more);
      setNotifications((prev) => [...prev, ...data.items]);
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [getNotifications, page]);

  // Mark all notifications as read
  async function markAllAsRead() {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true })),
    );
    await markAllNotificationsAsRead();
  }

  return (
    <PopoverContent
      align="end"
      sideOffset={12}
      collisionPadding={16}
      className={cn(
        "w-[calc(100vw-32px)] max-w-[384px] overflow-hidden p-0 gap-0",
        "rounded-2xl border border-none! bg-white",
        "shadow-none!",
      )}
    >
      {/* Header */}
      <div className="flex h-13 items-center justify-between border-b px-5">
        <h3 className="text-sm font-semibold text-foreground">{t("Title")}</h3>

        {unreadCount > 0 && (
          <Button
            onClick={markAllAsRead}
            variant="ghost"
            className="text-primary text-xs hover:bg-transparent hover:text-primary"
          >
            {t("MarkAllAsRead")}
          </Button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b px-4 py-3">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full bg-transparent"
        >
          <TabsList className="bg-transparent gap-2 h-auto">
            {tabs(t).map((tab) => (
              <TabsTrigger
                className="cursor-pointer data-[state=active]:shadow-none! data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                key={tab.value}
                value={tab.value}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Notifications */}
      <ScrollArea className="h-90">
        {notifications.length === 0 && !loading ? (
          <div className="flex h-70 flex-col items-center justify-center px-6 text-center">
            <Bell className="mb-3 size-8 text-muted-foreground" />
            <p className="text-sm font-medium text-muted-foreground">
              {t("NoNotifications")}
            </p>
          </div>
        ) : (
          <>
            {notifications.map((notification) => (
              <NotificationItem
                notification={notification}
                key={notification.id}
              />
            ))}

            {hasMore && (
              <div className="flex items-center justify-center py-4">
                {loading ? (
                  <Spinner className="size-5 text-primary" />
                ) : (
                  <Button
                    variant="ghost"
                    className="text-primary font-bold text-xs hover:bg-transparent hover:text-primary"
                    onClick={() => {
                      setLoading(true);
                      setPage(page + 1);
                    }}
                  >
                    {t("LoadMore")}
                  </Button>
                )}
              </div>
            )}
          </>
        )}
      </ScrollArea>

      {/* Footer */}
      <PopoverClose asChild>
        <Link
          href="/notifications"
          className={cn(
            "flex h-13 items-center justify-center border-t",
            "text-xs font-semibold text-primary",
            "transition-colors hover:bg-primary/20",
          )}
        >
          {t("ViewAllNotifications")}
        </Link>
      </PopoverClose>
    </PopoverContent>
  );
}
