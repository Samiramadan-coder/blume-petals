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
import { getFcmToken } from "@/lib/get-fcm-token";
import { getFirebaseMessaging } from "@/lib/firebase";

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
   * get FCM token and register it with the server if the user is authenticated.
   * This function is called when the component mounts and whenever the isAuthenticated prop changes.
   * It ensures that the FCM token is registered with the server for push notifications.
   */
  useEffect(() => {
    if (!isAuthenticated) return;
    void getFcmToken().then((token) => {
      if (token) {
        http.post("/api/v1/device-tokens", {
          token,
          platform: "web",
        });
      }
    });
  }, [isAuthenticated]);

  /**
   * Refresh the unread notifications count from the server and update the state.
   * This function is memoized using useCallback to prevent unnecessary re-renders.
   * It fetches the unread notifications count from the API and updates the state.
   * If the API call fails, it simply returns without updating the state.
   */
  const refreshUnreadCount = useCallback(async () => {
    if (!isAuthenticated) {
      setUnreadCount(0);
      return 0;
    }

    const { data, ok } = await http.get<{
      data: { unread_count: number };
    }>("/api/v1/notifications/unread-count");

    if (!ok) return 0;

    const count = data.data.unread_count;
    setUnreadCount(count);
    return count;
  }, [isAuthenticated]);

  /**
   * Effect hook to refresh the unread notifications count when the component mounts.
   * It calls the refreshUnreadCount function to fetch the latest unread notifications count.
   * The effect runs only once when the component mounts, as indicated by the empty dependency array.
   */
  useEffect(() => {
    if (!isAuthenticated) return;

    async function fetchInitialCount() {
      const { data, ok } = await http.get<{
        data: { unread_count: number };
      }>("/api/v1/notifications/unread-count");

      if (ok) {
        setUnreadCount(data.data.unread_count);
      }
    }

    void fetchInitialCount();
  }, [isAuthenticated]);

  /**
   * Effect hook to listen for incoming notifications using Firebase Messaging.
   * It sets up a listener for new messages and refreshes the unread notifications count when a new notification is received.
   * The effect runs only once when the component mounts, as indicated by the empty dependency array.
   * It also cleans up the listener when the component unmounts to prevent memory leaks.
   */
  useEffect(() => {
    if (!isAuthenticated) return;

    let unsubscribe: (() => void) | undefined;

    async function listenForNotifications() {
      try {
        const messaging = await getFirebaseMessaging();

        if (!messaging) {
          return;
        }

        unsubscribe = onMessage(messaging, async (payload) => {
          console.log("New notification received:", payload);
          await refreshUnreadCount();
        });
      } catch (error) {
        console.error("Failed to attach FCM listener:", error);
      }
    }

    void listenForNotifications();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [isAuthenticated, refreshUnreadCount]);

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
