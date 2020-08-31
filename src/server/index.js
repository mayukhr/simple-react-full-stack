const express = require('express');
const os = require('os');
const http = require('http');
// const setupWebSocket = require('./setupWebSocket');
const setupWebSocketToBroadcast = require('./setupWebSocketToBroadcast');

const app = express();

const server = http.createServer(app);
setupWebSocketToBroadcast(server);

app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));
server.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
