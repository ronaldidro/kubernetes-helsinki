import { connect, StringCodec } from "nats";

const sc = StringCodec();

export async function initNats(url) {
  try {
    const nc = await connect({ servers: url });
    console.log("[NATS] Connected to", url);
    return nc;
  } catch (err) {
    console.error("[NATS] Connection error:", err);
    throw err;
  }
}

export async function subscribeToEvents(nc, pattern, handler) {
  const sub = nc.subscribe(pattern, { queue: "broadcasters" });
  console.log(`[NATS] Listening on: ${pattern} (queue group: broadcasters)`);

  for await (const msg of sub) {
    try {
      const data = JSON.parse(sc.decode(msg.data));
      const subject = msg.subject;
      await handler(subject, data);
    } catch (err) {
      console.error("[NATS] Error processing message:", err);
    }
  }
}
