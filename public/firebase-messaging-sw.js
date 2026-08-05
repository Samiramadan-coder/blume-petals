importScripts(
  "https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js",
);

importScripts(
  "https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js",
);

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

firebase.initializeApp({
  apiKey: "AIzaSyClU262rVU5JshignlDQGww5-9oQ8IOXlE",
  authDomain: "blumepatels.firebaseapp.com",
  projectId: "blumepatels",
  storageBucket: "blumepatels.firebasestorage.app",
  messagingSenderId: "850376005414",
  appId: "1:850376005414:web:597f44323fe8db681b93e7",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title =
    payload.notification?.title || payload.data?.title || "New notification";

  const options = {
    body: payload.notification?.body || payload.data?.body || "",
    icon:
      payload.notification?.icon ||
      payload.data?.icon ||
      "/icons/icon-192x192.png",
    data: {
      url: payload.data?.url || payload.fcmOptions?.link || "/notifications",
    },
  };

  self.registration.showNotification(title, options);
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const url = event.notification.data?.url || "/notifications";
  event.waitUntil(clients.openWindow(url));
});
