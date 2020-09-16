const WebSocket = require('ws');
const pipeline = require('./pipeline');

function newWebSocket() {
  console.log('!!!!! NEW WEB SOCKET !!!!!');
  const wss = new WebSocket.Server({ noServer: true });
  wss.on('connection', (ctx) => {
    // print number of active connections
    console.log('#######connected##########', wss.clients.size);
    // sent a message that we're good to proceed
    ctx.send('connection established.');
    // receive a message and Broadcast to everyone
    ctx.on('message', (message) => {
      pipeline.broadcastMessage(wss.clients, message);
    });

    // handle close event
    ctx.on('close', () => {
      console.log('closed', wss.clients.size);
    });
  });
  return wss;
}

function setupWebSocket(server) {
  // const wss = new WebSocket.Server({ server });
  const wss1 = new WebSocket.Server({ noServer: true });
  const wss2 = new WebSocket.Server({ noServer: true });

  // what to do after a connection is established
  wss1.on('connection', (ctx) => {
    // print number of active connections
    console.log('#######connected##########', wss1.clients.size);
    // sent a message that we're good to proceed
    ctx.send('connection established.');
    // receive a message and Broadcast to everyone
    ctx.on('message', (message) => {
      pipeline.broadcastMessage(wss1.clients, message);
    });

    // handle close event
    ctx.on('close', () => {
      console.log('closed', wss1.clients.size);
    });
  });

  wss2.on('connection', (ctx) => {
    // print number of active connections
    console.log('#######connected##########', wss2.clients.size);
    // sent a message that we're good to proceed
    ctx.send('connection established.');
    // receive a message and Broadcast to everyone
    ctx.on('message', (message) => {
      pipeline.broadcastMessage(wss2.clients, message);
    });

    // handle close event
    ctx.on('close', () => {
      console.log('closed', wss2.clients.size);
    });
  });

  return { wss1, wss2 };
}

module.exports = { setupWebSocket, newWebSocket };
