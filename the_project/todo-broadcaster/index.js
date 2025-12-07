import { initNats, subscribeToEvents } from "./utils/nats.js";
import { sendWebhook } from "./utils/webhook.js";

const NATS_URL = process.env.NATS_URL;
const WEBHOOK_URL = process.env.EXTERNAL_WEBHOOK_URL;

async function main() {
  const nc = await initNats(NATS_URL);

  await subscribeToEvents(nc, "todos.*", (subject, data) => {
    console.log(`[EVENT RECEIVED] ${subject}`, data);

    const [, event] = subject.split(".");
    const message = `A task was ${event}:\n\n${JSON.stringify(data, null, 2)}`;

    console.log("Message sent to Discord\n", message);

    sendWebhook(WEBHOOK_URL, { content: message });
  });
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
