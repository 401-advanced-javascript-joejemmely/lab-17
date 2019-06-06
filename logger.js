'use strict';

require('dotenv').config();

const net = require('net');
const TCPEvent = require('./lib/tcp-event.js');

const socket = new net.Socket();
const PORT = process.env.PORT;
const SERVER = process.env.SERVER || 'localhost';

socket.connect(PORT, SERVER, () => {
  console.log(`Listening on ${PORT}`);
});

socket.on('data', buffer => {
  const { event, payload } = TCPEvent.parse(buffer);

  // Listen for specific events only
  switch (event) {
  case 'SAVE':
    console.log(`🤓  ${payload.message}`);
    break;
  case 'ERROR':
    console.error(`😱  ${payload.message}`);
    break;
  default:
    // handle the unsupported events
  }
});

socket.on('error', () => {
  console.log('connection closed');
});
