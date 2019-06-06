'use strict';

require('dotenv').config();

const fs = require('fs');
const { promisify } = require('util');

// Promisify readFile and writeFile
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

const net = require('net');
const TCPEvent = require('./lib/tcp-event.js');

// Create a new socket
const socket = new net.Socket();
const PORT = process.env.PORT || 3001;
const SERVER = process.env.SERVER || 'localhost';

socket.connect(PORT, SERVER, () => {
  console.log(`Connected on ${PORT}`);
});

const alterFile = async file => {
  try {
    const buffer = await readFileAsync(file);
    const upperCasedContent = buffer.toString().toUpperCase();
    await writeFileAsync(file, Buffer.from(upperCasedContent));

    // It may be worth considering fs.watchFile instead of the following
    await socket.write(
      JSON.stringify(
        new TCPEvent('SAVE', {
          data: upperCasedContent,
          file,
          message: 'This file was saved',
        })
      )
    );
    await socket.end();
  } catch (error) {
    socket.write(
      JSON.stringify(
        new TCPEvent('ERROR', {
          data: error,
          message: 'Something went horribly wrong...',
        })
      )
    );
    socket.end();
  }
};

const file = process.argv.slice(2).shift();

alterFile(file);
