"use server";

import { http } from "./http";
import { updateTag } from "next/cache";

// Each action resolves to whether the API call succeeded, so callers can
// roll back optimistic UI and tell the user.

// Mark all notifications as read
export async function markAllNotificationsAsRead(): Promise<boolean> {
  try {
    await http.post("/api/v1/notifications/read-all");
    updateTag("notifications-list");
    return true;
  } catch (error) {
    console.error("Failed to mark all notifications as read", error);
    return false;
  }
}

// Mark a single notification as read
export async function markNotificationAsRead(
  notificationId: string,
): Promise<boolean> {
  try {
    await http.post(`/api/v1/notifications/${notificationId}/read`);
    updateTag("notifications-list");
    return true;
  } catch (error) {
    console.error(
      `Failed to mark notification ${notificationId} as read`,
      error,
    );
    return false;
  }
}

// Delete a single notification
export async function deleteNotification(
  notificationId: string,
): Promise<boolean> {
  try {
    await http.delete(`/api/v1/notifications/${notificationId}`);
    updateTag("notifications-list");
    return true;
  } catch (error) {
    console.error(`Failed to delete notification ${notificationId}`, error);
    return false;
  }
}
