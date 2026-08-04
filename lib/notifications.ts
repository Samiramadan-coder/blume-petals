"use server";

import { http } from "./http";
import { updateTag } from "next/cache";

// Mark all notifications as read
export async function markAllNotificationsAsRead(): Promise<void> {
  try {
    await http.post("/api/v1/notifications/read-all");
    updateTag("notifications-count");
    updateTag("notifications-list");
  } catch (error) {
    console.error("Failed to mark all notifications as read", error);
  }
}

// Mark a single notification as read
export async function markNotificationAsRead(
  notificationId: string,
): Promise<void> {
  try {
    await http.post(`/api/v1/notifications/${notificationId}/read`);
    updateTag("notifications-count");
    updateTag("notifications-list");
  } catch (error) {
    console.error(
      `Failed to mark notification ${notificationId} as read`,
      error,
    );
  }
}
