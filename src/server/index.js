const express = require('express');
const os = require('os');
const http = require('http');
// const setupWebSocket = require('./setupWebSocket');
const url = require('url');
const setupWebSocketToBroadcast = require('./setupWebSocketToBroadcast');

const app = express();

const server = http.createServer(app);
const { wss1, wss2 } = setupWebSocketToBroadcast(server);

app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));
app.get('/projecs/:name', (req, res) => res.send({ projectname: req.params.name }));
// app.get('/projecs', (req, res) => res.send({ projectname: req.params.name }));

server.on('upgrade', (request, socket, head) => {
  const { pathname } = url.parse(request.url);
  console.log('=========UPGRADE FOO-------', request.params);
  if (pathname === '/foo') {
    wss1.handleUpgrade(request, socket, head, (ws) => {
      wss1.emit('connection', ws, request);
    });
  } else if (pathname === '/bar') {
    wss2.handleUpgrade(request, socket, head, (ws) => {
      wss2.emit('connection', ws, request);
    });
  } else {
    wss2.handleUpgrade(request, socket, head, (ws) => {
      wss2.emit('connection', ws, request);
    });
    // socket.destroy();
  }
});


server.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
