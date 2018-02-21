const { Room } = require('./models')

const roomsList = {}

const Error = {
  room: {
    notFound: { message: 'Room not found' },
    alreadyExists: { message: 'Room already exists' },
    alreadyJoined: { message: 'Person already joined' },
  }
}

const createRoom = async ({ name }) => {
  const room = Room({ name })
  
  roomsList[room._id] = room

  const event = {
    usecase: 'createRoom',
    roomId: room._id,
  }
  console.log(event);

  return room
}

const getRoom = async ({ roomId }) => {
  const room = roomsList[roomId]

  if (!room) {
    return Promise.reject(Error.room.notFound)
  }

  return room
}

const getRooms = async () => {
  return Object.values(roomsList)
}

const addPerson = async ({ roomId, person }) => {
  const room = await getRoom({ roomId })
  const alreadyJoined = !!room.participants.find((p) => p._id === person._id)

  if (alreadyJoined) {
    return Promise.reject(Error.room.alreadyJoined)
  }

  room.participants.push(person)

  const event = {
    usecase: 'joinRoom',
    personId: person._id,
    roomId: room._id,
    roomTotalParticipants: room.participants.length,
  }
  console.log(event);

  return event
}

module.exports = {
  createRoom,
  addPerson,
  getRoom,
  getRooms
}
