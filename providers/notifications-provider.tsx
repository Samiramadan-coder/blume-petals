"use client";

import {
  useState,
  useEffect,
  useContext,
  useCallback,
  createContext,
  type ReactNode,
} from "react";
import { http } from "@/lib/http";
import { onMessage } from "firebase/messaging";
import { getFirebaseMessaging } from "@/lib/firebase";
import { getFcmToken } from "@/lib/get-fcm-token";

type NotificationsContextValue = {
  unreadCount: number;
  refreshUnreadCount: () => Promise<number>;
};

const NotificationsContext = createContext<NotificationsContextValue | null>(
  null,
);

export function NotificationsProvider({
  children,
  isAuthenticated,
}: {
  children: ReactNode;
  isAuthenticated: boolean;
}) {
  const [unreadCount, setUnreadCount] = useState(0);

  /**
   * Refresh the unread notifications count from the server and update the state.
   * This function is memoized using useCallback to prevent unnecessary re-renders.
   * It fetches the unread notifications count from the API and updates the state.
   * If the API call fails, it simply returns without updating the state.
   */
  const refreshUnreadCount = useCallback(async () => {
    if (!isAuthenticated) return 0;

    // Register FCM token for the user if not already registered
    const token = await getFcmToken();

    if (!token) {
      console.log("Notification permission was not granted");
      return 0;
    }

    await http.post("/api/v1/device-tokens", {
      token,
      platform: "web",
    });

    // Fetch the unread notifications count from the server
    const { data, ok } = await http.get<{
      data: {
        unread_count: number;
      };
    }>("/api/v1/notifications/unread-count");

    if (!ok) return 0;

    return data.data.unread_count;
  }, [isAuthenticated]);

  /**
   * Effect hook to refresh the unread notifications count when the component mounts.
   * It calls the refreshUnreadCount function to fetch the latest unread notifications count.
   * The effect runs only once when the component mounts, as indicated by the empty dependency array.
   */
  useEffect(() => {
    void refreshUnreadCount().then((count) => {
      setUnreadCount(count);
    });
  }, [refreshUnreadCount]);

  /**
   * Effect hook to listen for incoming notifications using Firebase Messaging.
   * It sets up a listener for new messages and refreshes the unread notifications count when a new notification is received.
   * The effect runs only once when the component mounts, as indicated by the empty dependency array.
   * It also cleans up the listener when the component unmounts to prevent memory leaks.
   */
  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    async function listenForNotifications() {
      const messaging = await getFirebaseMessaging();

      if (!messaging) {
        return;
      }

      unsubscribe = onMessage(messaging, async (payload) => {
        console.log("New notification:", payload);
        await refreshUnreadCount();
      });
    }

    void listenForNotifications();

    return () => {
      unsubscribe?.();
    };
  }, [refreshUnreadCount]);

  return (
    <NotificationsContext.Provider
      value={{
        unreadCount,
        refreshUnreadCount,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationsContext);

  if (!context) {
    throw new Error(
      "useNotifications must be used inside NotificationsProvider",
    );
  }

  return context;
}
