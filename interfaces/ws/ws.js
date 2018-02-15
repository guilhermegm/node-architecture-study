const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 3300 })

const roomUsecases = require('../../domains/room/usecases')
const personUsecases = require('../../domains/person/usecases')
const chatUsecases = require('../../domains/chat/usecases')

const commands = {
  createPerson: async ({ personName, personWs }) => {
    const person = await personUsecases.createPerson({
      name: personName,
      handlers: { ws: personWs },
    })
    personWs.person = person
    return person
  },
  createRoomHandler: async ({ personName, personWs, roomName }) => {
    const person = await commands.createPerson({ personName, personWs })
    const room = await roomUsecases.createRoom({ name: roomName })

    return roomUsecases.addPerson({ roomName: room.name, person })
  },
  joinRoomHandler: async ({ personName, personWs, roomName }) => {
    const person = await commands.createPerson({ personName, personWs })

    return roomUsecases.addPerson({ roomName, person })
  },
  sendRoomMessage: async ({ personName, personWs, roomName, message }) => {
    const person = personWs.person
    const room = await roomUsecases.getRoom({ roomName })

    return chatUsecases.sendRoomMessage({
      room,
      person,
      message,
      onSend: ({ personFrom, personTo, message }) => {
        personTo.handlers.ws.send(message)
      }
    })
  },
}

const commandHandler = ({ cmd, payload, ws: personWs }) => {
  console.log('command', cmd, payload)
  if(cmd in commands) {
    return commands[cmd]({ personWs, ...payload })
  }

  return Promise.reject()
}


wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    const messageParse = JSON.parse(message)

    commandHandler({ ws, ...messageParse })
    .then((res) => {
      // console.log('res', res)
    })
    .catch((err) => {
      console.log('err', err)
    })

  })

})
