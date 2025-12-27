// Background Service Worker
console.log("[SW] Started");

// VAPID Public Key - deve corrispondere a quella del server
const VAPID_PUBLIC_KEY =
  "BDoTm1hFSWl5b6a1cTvewvzqTYU-28JSShDUT-KNZyzZzy-q5H5fpT2eMXevZax5XVPlfwuQbQOxM3eXR0dVR5c";

// Push event listener - DEVE essere al top-level
self.addEventListener("push", (event: PushEvent) => {
  console.log("[SW] Push received:", event);

  const data = event.data?.json() ?? {
    title: "Notifica",
    body: "Nuovo messaggio",
  };

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "/public/icons/icon-128.png",
      badge: "/public/icons/icon-48.png",
      data: data.url || null,
    }),
  );
});

// Click su notifica
self.addEventListener("notificationclick", (event: NotificationEvent) => {
  console.log("[SW] Notification clicked:", event);
  event.notification.close();

  if (event.notification.data) {
    event.waitUntil(clients.openWindow(event.notification.data));
  }
});

chrome.runtime.onInstalled.addListener((details) => {
  console.log("[SW] Installed:", details.reason);
});

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  console.log("[SW] Message:", message);

  switch (message.type) {
    case "GET_STATUS":
      sendResponse({ status: "ok" });
      break;

    case "SUBSCRIBE_PUSH":
      subscribeToPush()
        .then((subscription) => sendResponse({ subscription }))
        .catch((error) => sendResponse({ error: error.message }));
      return true;

    case "GET_SUBSCRIPTION":
      getSubscription()
        .then((subscription) => sendResponse({ subscription }))
        .catch((error) => sendResponse({ error: error.message }));
      return true;

    default:
      sendResponse({ error: "Unknown type" });
  }

  return true;
});

// Subscribe to push notifications
async function subscribeToPush() {
  const registration = self.registration;

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: false, // Chrome 121+ supporta silent push
    applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
  });

  console.log("[SW] Push subscription:", JSON.stringify(subscription));
  return subscription.toJSON();
}

// Get existing subscription
async function getSubscription() {
  const registration = self.registration;
  const subscription = await registration.pushManager.getSubscription();
  return subscription?.toJSON() || null;
}

// Utility: convert VAPID key
function urlBase64ToUint8Array(base64String: string): Uint8Array<ArrayBuffer> {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  const buffer = new ArrayBuffer(rawData.length);
  const outputArray = new Uint8Array(buffer);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
