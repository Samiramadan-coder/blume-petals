"use server";

import { updateTag } from "next/cache";
import { http } from "./http";

// Mark all notifications as read
type MarkAllNotificationsAsReadResponse = {
  success: boolean;
};

export async function markAllNotificationsAsRead(): Promise<MarkAllNotificationsAsReadResponse> {
  try {
    await http.post("/api/v1/notifications/read-all");
    updateTag("notifications-count");
    updateTag("notifications-list");
    return { success: true };
  } catch (error) {
    console.error("Failed to mark all notifications as read", error);
    return { success: false };
  }
}

// Mark a single notification as read
type MarkNotificationAsReadResponse = {
  success: boolean;
};

export async function markNotificationAsRead(
  notificationId: string,
): Promise<MarkNotificationAsReadResponse> {
  try {
    await http.post(`/api/v1/notifications/${notificationId}/read`);
    updateTag("notifications-count");
    updateTag("notifications-list");
    return { success: true };
  } catch (error) {
    console.error(
      `Failed to mark notification ${notificationId} as read`,
      error,
    );
    return { success: false };
  }
}
