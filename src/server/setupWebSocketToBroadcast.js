const WebSocket = require('ws');
const pipeline = require('./pipeline');

function setupWebSocket(server) {
  const wss = new WebSocket.Server({ server });

  // what to do after a connection is established
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
}

module.exports = setupWebSocket;
