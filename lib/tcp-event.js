/**
 * Class representing a TCPEvent
 */
class TCPEvent {
  /**
   * Create a TCPEvent
   * @param {*} event
   * @param {*} payload
   */
  constructor(event, payload) {
    this.event = event;
    this.payload = payload;
  }

  /**
   * Parse a buffer into a new TCPEvent instance
   * @param {*} buffer
   */
  static parse(buffer) {
    const { event, payload } = JSON.parse(buffer.toString());
    return new TCPEvent(event, payload);
  }
}

module.exports = TCPEvent;
