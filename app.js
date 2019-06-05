'use strict';

require('dotenv').config();

const { promisify } = require('util');

const fs = require('fs');
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

const net = require('net');

const socket = new net.Socket();
const PORT = process.env.PORT;
const CLIENT_NAME = 'localhost';

socket.connect(PORT, CLIENT_NAME, () => {
  console.log(`Connected on ${PORT}`);
});

const alterFile = async file => {
  try {
    const data = await readFileAsync(file);
    const text = data.toString().toUpperCase();
    await writeFileAsync(file, Buffer.from(text));

    // It may be worth considering fs.watchFile instead of the following
    await socket.write(`WRITE:${text} was written to ${file}`);
  } catch (error) {
    socket.write(`ERROR:${error.code}`);
  }
};

const file = process.argv.slice(2).shift();

alterFile(file);
