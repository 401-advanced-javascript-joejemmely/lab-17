# LAB - 17

## TCP Server / Message Application

### Author: Joé Jemmely

### Links and Resources

- [submission PR](https://github.com/401-advanced-javascript-joejemmely/lab-17/pull/1)
- [travis](https://travis-ci.com/401-advanced-javascript-joejemmely/lab-17)

### Documentation

<a name="TCPEvent"></a>

## TCPEvent

Class representing a TCPEvent

**Kind**: global class

- [TCPEvent](#TCPEvent)
  - [new TCPEvent(event, payload)](#new_TCPEvent_new)
  - [.parse(buffer)](#TCPEvent.parse)

<a name="new_TCPEvent_new"></a>

### new TCPEvent(event, payload)

Create a TCPEvent

| Param   | Type            |
| ------- | --------------- |
| event   | <code>\*</code> |
| payload | <code>\*</code> |

<a name="TCPEvent.parse"></a>

### TCPEvent.parse(buffer)

Parse a buffer into a new TCPEvent instance

**Kind**: static method of [<code>TCPEvent</code>](#TCPEvent)

| Param  | Type            |
| ------ | --------------- |
| buffer | <code>\*</code> |

### Setup

#### `.env` requirements

- `PORT` - Port Number
- `SERVER` - Server address

#### Running the app

!!! Run each of the command below in a new terminal and in the order they appear !!!

- `npm run server`
- `npm run logger`
- `npm run client <filename.ext>`

#### Tests

- How do you run tests? `npm test`
