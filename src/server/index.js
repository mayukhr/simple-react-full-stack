const express = require('express');
const os = require('os');
const http = require('http');
const url = require('url');
const setupWebSocketToBroadcast = require('./setupWebSocketToBroadcast');

const { setupWebSocket, newWebSocket } = setupWebSocketToBroadcast;
const app = express();
const server = http.createServer(app);
const wsServers = {};
const { wss1, wss2 } = setupWebSocket(server);

app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

server.on('upgrade', (request, socket, head) => {
  const { pathname } = url.parse(request.url);
  console.log('=========UPGRADE FOO-------', request.url);
  if (pathname === '/foo') {
    wss1.handleUpgrade(request, socket, head, (ws) => {
      wss1.emit('connection', ws, request);
    });
  } else if (pathname === '/bar') {
    wss2.handleUpgrade(request, socket, head, (ws) => {
      wss2.emit('connection', ws, request);
    });
  } else {
    wsServers[pathname] = wsServers[pathname] ? wsServers[pathname] : newWebSocket();
    wsServers[pathname].handleUpgrade(request, socket, head, (ws) => {
      wsServers[pathname].emit('connection', ws, request);
    });
    // socket.destroy();
  }
});


server.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
