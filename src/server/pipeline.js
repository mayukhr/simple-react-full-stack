function individualPipeline(ctx) {
  let idx = 0;
  const interval = setInterval(() => {
    ctx.send(`ping pong ${idx}`);
    // eslint-disable-next-line no-plusplus
    idx++;
  }, 5000);
  return interval;
}

// Broadcast single message to all clients
function broadcastMessage(clients, message) {
  // eslint-disable-next-line no-restricted-syntax
  for (const c of clients.values()) {
    c.send(message);
  }
}

function broadcastPipeline(clients) {
  let idx = 0;
  const interval = setInterval(() => {
    // eslint-disable-next-line no-restricted-syntax
    for (const c of clients.values()) {
      c.send(`broadcast message ${idx}`);
    }
    // eslint-disable-next-line no-plusplus
    idx++;
  }, 3000);
  return interval;
}

module.exports = { individualPipeline, broadcastPipeline, broadcastMessage };
