const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 3300 })

const roomUsecases = require('../../domains/room/usecases')
const personUsecases = require('../../domains/person/usecases')

const commands = {
  createPerson: ({ name }) => personUsecases.createPerson({ name }),
  createRoom: ({ name }) => roomUsecases.createRoom({ name }),
  createRoomHandler: async ({ personName, roomName }) => {
    const person = await commands.createPerson({ name: personName })
    const room = await commands.createRoom({ name: roomName })

    return roomUsecases.addPerson({ roomName: room.name, person })
  },
  joinRoomHandler: async ({ personName, roomName }) => {
    const person = await commands.createPerson({ name: personName })

    return roomUsecases.addPerson({ roomName, person })
  },
}

const commandHandler = ({ cmd, payload }) => {
  console.log('command', cmd, payload)
  if(cmd in commands) {
    return commands[cmd](payload)
  }

  return Promise.reject()
}


wss.on('connection', (ws) => {

  ws.on('message', (message) => {
    const messageParse = JSON.parse(message)

    commandHandler(messageParse)
    .then((res) => {
      // console.log('res', res)
    })
    .catch((err) => {
      console.log('err', err)
    })

  })

})
