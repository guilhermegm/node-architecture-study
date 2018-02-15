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
  const room = roomsList[name]
    ? Promise.reject(Error.room.alreadyExists)
    : Room({ name })
  
  roomsList[room.name] = room

  const event = {
    usecase: 'createRoom',
    room: room.name,
  }
  console.log(event);

  return room
}

const getRoom = async ({ roomName }) => {
  const room = roomsList[roomName]

  if (!room) {
    return Promise.reject(Error.room.notFound)
  }

  return room
}

const addPerson = async ({ roomName, person }) => {
  const room = await getRoom({ roomName })
  const alreadyJoined = !!room.participants.find((p) => p.name === person.name)

  if (alreadyJoined) {
    return Promise.reject(Error.room.alreadyJoined)
  }

  room.participants.push(person)

  const event = {
    usecase: 'joinRoom',
    person: person.name,
    room: room.name,
    roomParticipants: room.participants.length,
  }
  console.log(event);

  return event
}

module.exports = {
  createRoom,
  addPerson,
  getRoom,
}
