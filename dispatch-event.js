'use strict';

module.exports = buffer => {
  const text = buffer.toString().trim();
  const [eventType, eventPayload] = text.split(':');
  for (let socket in socketPool) {
    socketPool[socket].write(`${eventType} ${eventPayload}`);
  }
};
