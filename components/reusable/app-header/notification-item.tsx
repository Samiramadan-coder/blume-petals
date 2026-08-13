"use client";

import {
  deleteNotification,
  markNotificationAsRead,
} from "@/lib/notifications";
import { useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { DialogDelete } from "../delete-dialoge";
import { cn, formatSmartDate } from "@/lib/utils";
import { CircleCheck, Trash2 } from "lucide-react";
import { Notification } from "@/types/notifications";
import { useNotifications } from "@/providers/notifications-provider";

export default function NotificationItem({
  notification,
  showActions = false,
  isPopup = true,
}: {
  notification: Notification;
  showActions?: boolean;
  isPopup?: boolean;
}) {
  if (notification.type.includes("order")) {
    return (
      <Link href={notification.link} className="w-full">
        <NotificationContent
          notification={notification}
          showActions={showActions}
          isPopup={isPopup}
        />
      </Link>
    );
  }

  return (
    <NotificationContent
      notification={notification}
      showActions={showActions}
      isPopup={isPopup}
    />
  );
}

function NotificationContent({
  notification,
  showActions,
  isPopup,
}: {
  notification: Notification;
  showActions: boolean;
  isPopup: boolean;
}) {
  const locale = useLocale();
  const { refreshUnreadCount } = useNotifications();
  const [isRead, setIsRead] = useState(notification.read);
  const [loadingDelete, setLoadingDelete] = useState(false);

  async function markRead(notificationId: string) {
    setIsRead(true);
    await markNotificationAsRead(notificationId);
    await refreshUnreadCount();
  }
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-none px-5 py-4 text-left",
        "transition-colors hover:bg-primary/20",
        isRead ? "bg-white" : "bg-primary/10",
      )}
    >
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/20">
        {notification.type.includes("order") && "🚚"}
        {notification.type === "promo" && "🎁"}
        {notification.type === "system" && "⭐"}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <h4
            className={cn("text-sm font-semibold text-foreground", {
              "text-sm": isPopup,
              "text-base": !isPopup,
            })}
          >
            {notification.title}
          </h4>

          <div className="flex shrink-0 items-center gap-2">
            <span className="text-[11px] font-semibold whitespace-nowrap text-muted-foreground">
              {formatSmartDate(
                notification.created_at,
                locale === "en" ? "en-US" : "ar-EG",
              )}{" "}
            </span>
            {!isRead && <span className="size-2 rounded-full bg-primary" />}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p
            className={cn("mt-1 text-muted-foreground", {
              "text-xs": isPopup,
              "text-sm": !isPopup,
            })}
          >
            {notification.body}
          </p>

          {showActions && (
            <div className="flex justify-end gap-2">
              {!isRead && (
                <Button
                  size="icon"
                  variant="ghost"
                  className="hover:bg-transparent"
                  onClick={() => markRead(notification.id)}
                >
                  <CircleCheck className="size-5 text-primary" />
                </Button>
              )}
              <DialogDelete
                loading={loadingDelete}
                onConfirm={async () => {
                  setLoadingDelete(true);
                  await deleteNotification(notification.id);
                  await refreshUnreadCount();
                  setLoadingDelete(false);
                }}
                trigger={
                  <Button
                    size="icon"
                    variant="ghost"
                    className="hover:bg-transparent"
                  >
                    <Trash2 className="size-4 text-red-400" />
                  </Button>
                }
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
