const WebSocket = require('ws');
const pipeline = require('./pipeline');

function setupWebSocket(server) {
  const wss = new WebSocket.Server({ server });

  // hookup broadcast pipeline
  pipeline.broadcastPipeline(wss.clients);

  // what to do after a connection is established
  wss.on('connection', (ctx) => {
    // print number of active connections
    console.log('#######connected##########', wss.clients.size);

    // handle message events
    // receive a message and echo it back
    ctx.on('message', (message) => {
      console.log(`Received message => ${message}`);
      ctx.send(`you said ${message}`);
    });

    // handle close event
    ctx.on('close', () => {
      console.log('closed', wss.clients.size);
    });

    // sent a message that we're good to proceed
    ctx.send('connection established.');

    const interval = pipeline.individualPipeline(ctx);
    // clear the interval on connection close event
    ctx.on('close', () => {
      console.log('closed', wss.clients.size);
      clearInterval(interval);
    });
  });
}

module.exports = setupWebSocket;
