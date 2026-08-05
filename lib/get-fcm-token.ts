import { getToken } from "firebase/messaging";

import { getFirebaseMessaging } from "@/lib/firebase";

const SERVICE_WORKER_PATH = "/firebase-messaging-sw.js";

export async function getFcmToken(): Promise<string | null> {
  if (typeof window === "undefined") {
    return null;
  }

  if (!("Notification" in window) || !("serviceWorker" in navigator)) {
    console.warn("Notifications or Service Workers are not supported.");

    return null;
  }

  let permission = Notification.permission;

  if (permission === "default") {
    permission = await Notification.requestPermission();
  }

  if (permission !== "granted") {
    console.warn("Notification permission was not granted.");

    return null;
  }

  const messaging = await getFirebaseMessaging();

  if (!messaging) {
    console.warn("Firebase Messaging is not supported.");

    return null;
  }

  // تسجيل الـ Service Worker
  await navigator.serviceWorker.register(SERVICE_WORKER_PATH, {
    scope: "/",
  });

  // مهم: انتظر حتى يصبح الـ Service Worker Active
  const activeRegistration = await navigator.serviceWorker.ready;

  if (!activeRegistration.active) {
    throw new Error("Firebase Service Worker is not active.");
  }

  const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;

  if (!vapidKey) {
    throw new Error("NEXT_PUBLIC_FIREBASE_VAPID_KEY is missing.");
  }

  const token = await getToken(messaging, {
    vapidKey,
    serviceWorkerRegistration: activeRegistration,
  });

  if (!token) {
    console.warn("Firebase did not return an FCM token.");

    return null;
  }

  return token;
}
