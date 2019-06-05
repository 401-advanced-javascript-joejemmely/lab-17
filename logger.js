'use strict';

require('dotenv').config();

const net = require('net');
const TCPEvent = require('./lib/tcp-event.js');

const socket = new net.Socket();
const PORT = process.env.PORT;
const CLIENT_NAME = process.env.CLIENT_NAME || 'localhost';

socket.connect(PORT, CLIENT_NAME, () => {
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
