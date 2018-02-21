const roomUsecases = require('../../domains/room/usecases')
const personUsecases = require('../../domains/person/usecases')
const chatUsecases = require('../../domains/chat/usecases')

const commands = {
  createPerson: async ({ personName, personWs }) => {
    const person = await personUsecases.createPerson({
      name: personName,
      meta: { ws: personWs },
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
        personTo.meta.ws.send(message)
      }
    })
  },
}

module.exports = {
  commands
}
