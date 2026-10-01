"use client";

import {
  deleteNotification,
  markNotificationAsRead,
} from "@/lib/notifications";
import { toast } from "sonner";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { DialogDelete } from "../delete-dialoge";
import { cn, formatSmartDate } from "@/lib/utils";
import { CircleCheck, Trash2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Notification } from "@/types/notifications";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useNotifications } from "@/providers/notifications-provider";

const subscribeToNothing = () => () => {};

export default function NotificationItem({
  notification,
  showActions = false,
  isPopup = true,
}: {
  notification: Notification;
  showActions?: boolean;
  isPopup?: boolean;
}) {
  const locale = useLocale();
  const t = useTranslations("Notifications");
  const tCommon = useTranslations("Common");
  const tActions = useTranslations("Actions");
  const { refreshUnreadCount } = useNotifications();
  const [isRead, setIsRead] = useState(notification.read);
  const [loadingDelete, setLoadingDelete] = useState(false);

  // The date is formatted in the viewer's timezone, which the server doesn't
  // know. Keep the server text through hydration, then swap in the local one.
  const isHydrated = useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );

  const isOrder = notification.type.includes("order");
  const Title = isPopup ? "h4" : "h2";

  async function markRead() {
    setIsRead(true);

    const ok = await markNotificationAsRead(notification.id);

    if (!ok) {
      setIsRead(notification.read);
      toast.error(tCommon("ErrorHappened"));
      return;
    }

    await refreshUnreadCount();
  }

  async function remove() {
    setLoadingDelete(true);

    const ok = await deleteNotification(notification.id);

    if (ok) {
      await refreshUnreadCount();
    } else {
      toast.error(tCommon("ErrorHappened"));
    }

    setLoadingDelete(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsRead(notification.read);
  }, [notification.read]);

  return (
    <div
      className={cn(
        "relative flex items-start gap-3 rounded-none px-5 py-4 text-start",
        "transition-colors hover:bg-primary/20",
        isRead ? "bg-white" : "bg-primary/10",
      )}
    >
      <div
        aria-hidden="true"
        className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/20"
      >
        {isOrder && "🚚"}
        {notification.type === "promo" && "🎁"}
        {notification.type === "system" && "⭐"}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <Title
            className={cn("min-w-0 font-semibold text-foreground wrap-anywhere", {
              "text-sm": isPopup,
              "text-base": !isPopup,
            })}
          >
            {isOrder && notification.link ? (
              // The link stretches over the whole item (::after), so the item
              // is clickable without nesting the action buttons inside an <a>.
              <Link
                href={notification.link}
                className="outline-none after:absolute after:inset-0 focus-visible:after:ring-3 focus-visible:after:ring-ring/50 focus-visible:after:ring-inset"
              >
                {notification.title}
              </Link>
            ) : (
              notification.title
            )}
          </Title>

          <div className="flex shrink-0 items-center gap-2">
            <time
              key={isHydrated ? "local" : "server"}
              dateTime={notification.created_at}
              suppressHydrationWarning
              className="text-[11px] font-semibold whitespace-nowrap text-muted-foreground"
            >
              {formatSmartDate(
                notification.created_at,
                locale === "en" ? "en-US" : "ar-EG",
              )}
            </time>
            {!isRead && (
              <span className="size-2 rounded-full bg-primary">
                <span className="sr-only">{t("UnreadLabel")}</span>
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between gap-2">
          <p
            className={cn("mt-1 min-w-0 text-muted-foreground wrap-anywhere", {
              "text-xs": isPopup,
              "text-sm": !isPopup,
            })}
          >
            {notification.body}
          </p>

          {showActions && (
            // Sits above the stretched link so the buttons stay clickable.
            <div className="relative z-10 flex shrink-0 justify-end gap-2">
              {!isRead && (
                <Button
                  size="icon"
                  aria-label={t("MarkAsRead")}
                  variant="ghost"
                  className="hover:bg-transparent"
                  onClick={markRead}
                >
                  <CircleCheck className="size-5 text-primary" />
                </Button>
              )}
              <DialogDelete
                loading={loadingDelete}
                title={t("DeleteTitle")}
                description={t("DeleteDescription")}
                confirmLabel={tActions("Delete")}
                onConfirm={remove}
                trigger={
                  <Button
                    size="icon"
                    variant="ghost"
                    aria-label={t("Delete")}
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
