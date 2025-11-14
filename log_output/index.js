const randomId = crypto.randomUUID();

setInterval(() => {
  const timestamp = new Date().toISOString();
  console.log(`${timestamp}: ${randomId}`);
}, 5000);
