#!/usr/bin/env node
/**
 * Script per inviare push notifications di test
 *
 * Usage:
 *   node send-push.js '<subscription-json>'
 *   node send-push.js '<subscription-json>' "Titolo" "Messaggio"
 *
 * Esempio:
 *   node send-push.js '{"endpoint":"https://...","keys":{"p256dh":"...","auth":"..."}}'
 */

import webpush from "web-push";

// VAPID Keys - DEVONO corrispondere a quelle dell'extension
const VAPID_PUBLIC_KEY =
  "BDoTm1hFSWl5b6a1cTvewvzqTYU-28JSShDUT-KNZyzZzy-q5H5fpT2eMXevZax5XVPlfwuQbQOxM3eXR0dVR5c";
const VAPID_PRIVATE_KEY = "lY4qWyjnIW215iIg5x3WvEhBbAU7Hqx5xwF1FEvhbTQ";

webpush.setVapidDetails(
  "mailto:test@example.com",
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY,
);

async function sendPush() {
  const args = process.argv.slice(2);

  if (args.length < 1) {
    console.log(
      "Usage: node send-push.js '<subscription-json>' [title] [body]",
    );
    console.log("\nEsempio:");
    console.log(
      '  node send-push.js \'{"endpoint":"...","keys":{...}}\' "Hello" "Test message"',
    );
    process.exit(1);
  }

  let subscription;
  try {
    subscription = JSON.parse(args[0]);
  } catch (e) {
    console.error("Errore parsing subscription JSON:", e.message);
    process.exit(1);
  }

  const title = args[1] || "Test Notification";
  const body = args[2] || "Questa è una notifica di test!";

  const payload = JSON.stringify({
    title,
    body,
    url: "https://example.com",
  });

  console.log("Invio push notification...");
  console.log("  Endpoint:", subscription.endpoint.slice(0, 60) + "...");
  console.log("  Title:", title);
  console.log("  Body:", body);

  try {
    const result = await webpush.sendNotification(subscription, payload);
    console.log("\n✅ Push inviata con successo!");
    console.log("  Status:", result.statusCode);
  } catch (error) {
    console.error("\n❌ Errore invio push:", error.message);
    if (error.statusCode) {
      console.error("  Status:", error.statusCode);
      console.error("  Body:", error.body);
    }
    process.exit(1);
  }
}

sendPush();
