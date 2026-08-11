"use client";

import { cn, formatSmartDate } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Notification } from "@/types/notifications";
import {
  deleteNotification,
  markNotificationAsRead,
} from "@/lib/notifications";
import { CircleCheck, Trash2 } from "lucide-react";
import { DialogDelete } from "../delete-dialoge";
import { useLocale } from "next-intl";

export default function NotificationItem({
  notification,
  showActions = false,
}: {
  notification: Notification;
  showActions?: boolean;
}) {
  const locale = useLocale();
  const [isRead, setIsRead] = useState(notification.read);
  const [loadingDelete, setLoadingDelete] = useState(false);

  async function markRead(notificationId: string) {
    setIsRead(true);
    await markNotificationAsRead(notificationId);
  }

  return (
    <div
      key={notification.id}
      className={cn(
        "flex items-start gap-3 rounded-none px-5 py-4 text-left",
        "transition-colors hover:bg-primary/20",
        isRead ? "bg-white" : "bg-primary/20",
      )}
    >
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/20">
        {notification.type.includes("order") && "🚚"}
        {notification.type === "promo" && "🎁"}
        {notification.type === "system" && "⭐"}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <h4 className="text-sm font-semibold text-foreground">
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
            className="mt-1 text-muted-foreground text-[13px]"
            dangerouslySetInnerHTML={{ __html: notification.body }}
          ></p>

          {showActions && (
            <div className="flex justify-end gap-2">
              {!isRead && (
                <Button
                  size="icon"
                  variant="ghost"
                  className="hover:bg-transparent"
                  onClick={() => markRead(notification.id)}
                >
                  <CircleCheck className="size-4 text-green-400" />
                </Button>
              )}
              <DialogDelete
                loading={loadingDelete}
                onConfirm={async () => {
                  setLoadingDelete(true);
                  await deleteNotification(notification.id);
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
