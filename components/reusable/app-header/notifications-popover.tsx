"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "@/lib/notifications";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { tabs } from "@/constants/notifications";
import { Notification } from "@/types/notifications";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, CircleAlert, Gift, Truck } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNotifications } from "@/providers/notifications-provider";

export default function NotificationsPopover({
  textColor,
}: {
  textColor: string;
}) {
  const { unreadCount } = useNotifications();
  const t = useTranslations("Notifications");
  const [activeTab, setActiveTab] = useState("all");
  const [notifications, setNotifications] = useState<Notification[]>([]);

  async function markAllAsRead() {
    await markAllNotificationsAsRead();
  }

  async function markRead(notificationId: string) {
    await markNotificationAsRead(notificationId);
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "relative cursor-pointer bg-transparent",
            "hover:bg-transparent",
            "focus:bg-transparent",
            "active:bg-transparent",
            "data-[state=open]:bg-transparent",
            "data-[state=open]:hover:bg-transparent",
            "data-[state=open]:text-inherit",
            "focus-visible:ring-0 focus-visible:ring-offset-0",
          )}
          aria-label="Open notifications"
        >
          <Bell className={cn("size-5 text-white/92", textColor)} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 grid size-4 place-content-center rounded-full bg-primary text-[10px] font-semibold text-foreground">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>

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
          <h3 className="text-sm font-semibold text-foreground">
            {t("Title")}
          </h3>
          <Button
            onClick={markAllAsRead}
            variant="ghost"
            disabled={unreadCount === 0}
            className="text-primary text-xs hover:bg-transparent hover:text-primary"
          >
            {t("MarkAllAsRead")}
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 border-b px-4 py-3">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full bg-transparent"
          >
            <TabsList className="bg-transparent gap-2 h-auto">
              {tabs.map((tab) => (
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
        <ScrollArea className="h-80">
          {notifications.length === 0 ? (
            <div className="flex h-70 flex-col items-center justify-center px-6 text-center">
              <Bell className="mb-3 size-8 text-muted-foreground" />
              <p className="text-sm font-medium text-muted-foreground">
                {t("NoNotifications")}
              </p>
            </div>
          ) : (
            notifications.map((notification) => (
              <Button
                key={notification.id}
                onClick={() => markRead(notification.id)}
                className={cn(
                  "flex w-full h-auto items-start gap-3 rounded-none px-5 py-4 text-left",
                  "transition-colors hover:bg-primary/20",
                  notification.read ? "bg-white" : "bg-primary/20",
                )}
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  {notification.type === "orders" && (
                    <Truck className="size-4 text-[#5f6fa8]" />
                  )}
                  {notification.type === "promotions" && (
                    <Gift className="size-4 text-[#e38da9]" />
                  )}
                  {notification.type === "system" && (
                    <CircleAlert className="size-4 text-[#b096c6]" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="text-sm font-semibold text-foreground">
                      {notification.title}
                    </h4>

                    <div className="flex shrink-0 items-center gap-2">
                      <span className="text-[11px] whitespace-nowrap text-muted-foreground">
                        {notification.created_at.split("T")[0]}{" "}
                      </span>

                      {!notification.read && (
                        <span className="size-2 rounded-full bg-primary" />
                      )}
                    </div>
                  </div>

                  <p className="mt-1 max-w-61.25 text-[13px] leading-5 text-muted-foreground">
                    {notification.body}
                  </p>
                </div>
              </Button>
            ))
          )}
        </ScrollArea>

        {/* Footer */}
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
      </PopoverContent>
    </Popover>
  );
}
