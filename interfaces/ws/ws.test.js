const Joi = require('joi')
const { commands } = require('./commands')
const { PersonSchema } = require('../../domains/person/models')

const wsSend = (message) => console.log('Room message:', message)
let person1Ws = { send: wsSend }
let person2Ws = { send: wsSend }
let room1

describe('WS', () => {
  it('should create person 1 and 2', async () => {
    const personName = 'Guilherme'
    const personStrKeysExpected = ['_id', 'name']

    const person1 = await commands.createPerson({ personName, personWs: person1Ws })
    const person2 = await commands.createPerson({ personName: 'Tai', personWs: person2Ws })
    console.log(person1)
    console.log(person2)

    Joi.assert(person1, PersonSchema)
    expect(Object.keys(JSON.parse(JSON.stringify(person1))))
      .toEqual(personStrKeysExpected)
  });

  it('should person 1 create and join in a room', async () => {
    const roomName = 'Sala Oi'

    const roomCreated = await commands.createRoomHandler({ personWs: person1Ws, roomName })
    console.log(roomCreated)
  })

  it('should list all created rooms', async () => {
    const rooms = await commands.getRooms()
    console.log(rooms)
    room1 = rooms[0]
  })
  
  it('should person 2 join in the created room', async () => {
    const roomId = room1._id

    const roomJoined = await commands.joinRoomHandler({ personWs: person2Ws, roomId })
    console.log(roomJoined)
  })

  it('should send couple of room messages', async () => {
    const messageSent = await commands.sendRoomMessage({
      personWs: person1Ws,
      roomId: room1._id,
      message: 'E ae'
    })

    const messageSent2 = await commands.sendRoomMessage({
      personWs: person2Ws,
      roomId: room1._id,
      message: 'Oi oi'
    })
  })
})
