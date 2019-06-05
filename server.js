'use strict';

require('dotenv').config();

const net = require('net');
const TCPEvent = require('./lib/tcp-event.js');

const port = process.env.PORT || 3001;
const server = net.createServer();

server.listen(port, () => console.log(`Server up on ${port}`));

let socketPool = {};

const allowedCommands = ['SAVE', 'ERROR'];

server.on('connection', socket => {
  const id = `Socket-${Math.random()}`;
  socketPool[id] = socket;
  socket.on('data', buffer => dispatchEvent(buffer));
  socket.on('close', () => {
    delete socketPool[id];
  });
});

let dispatchEvent = buffer => {
  const tcpEvent = TCPEvent.parse(buffer);
  if (allowedCommands.includes(tcpEvent.event)) {
    for (let socket in socketPool) {
      socketPool[socket].write(JSON.stringify(tcpEvent));
    }
  }
};
