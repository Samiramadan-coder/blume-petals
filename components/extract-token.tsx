"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { getFcmToken } from "@/lib/get-fcm-token";

export default function EnableNotificationsButton() {
  const [loading, setLoading] = useState(false);

  async function handleEnableNotifications() {
    try {
      setLoading(true);

      const token = await getFcmToken();

      if (!token) {
        console.log("Notification permission was not granted");
        return;
      }

      // console.log("FCM token:", token);

      // بعد معرفة endpoint الباك إند:
      // await http.post("/api/v1/admin/fcm-token", {
      //   token,
      //   device_type: "web",
      // });
    } catch (error) {
      console.error("Failed to enable notifications:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      type="button"
      onClick={handleEnableNotifications}
      disabled={loading}
    >
      {loading ? "Enabling..." : "Enable notifications"}
    </Button>
  );
}
