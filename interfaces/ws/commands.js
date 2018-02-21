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
  createRoomHandler: async ({ personWs, roomName }) => {
    const person = personWs.person
    const room = await roomUsecases.createRoom({ name: roomName })

    return roomUsecases.addPerson({ roomId: room._id, person })
  },
  getRooms: async () => {
    return roomUsecases.getRooms()
  },
  joinRoomHandler: async ({ personWs, roomId }) => {
    return roomUsecases.addPerson({ roomId, person: personWs.person })
  },
  sendRoomMessage: async ({ personWs, roomId, message }) => {
    const person = personWs.person
    const room = await roomUsecases.getRoom({ roomId })

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
