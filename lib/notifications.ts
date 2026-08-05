"use server";

import { http } from "./http";
import { updateTag } from "next/cache";

// Mark all notifications as read
export async function markAllNotificationsAsRead(): Promise<void> {
  try {
    await http.post("/api/v1/notifications/read-all");
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
    updateTag("notifications-list");
  } catch (error) {
    console.error(
      `Failed to mark notification ${notificationId} as read`,
      error,
    );
  }
}

// Delete a single notification
export async function deleteNotification(
  notificationId: string,
): Promise<void> {
  try {
    await http.delete(`/api/v1/notifications/${notificationId}`);
    updateTag("notifications-list");
  } catch (error) {
    console.error(`Failed to delete notification ${notificationId}`, error);
  }
}
