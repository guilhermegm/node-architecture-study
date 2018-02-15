const WebSocket = require('ws')
const person1 = new WebSocket('ws://localhost:3300')

person1.onopen = () => {
  console.log('Connection open!')

  const command = {
    cmd: 'createRoomHandler',
    payload: {
      personName: 'Person 1',
      roomName: 'Sala 1'
    }
  }

  person1.send(JSON.stringify(command))
}


const person2 = new WebSocket('ws://localhost:3300')

person2.onopen = () => {
  console.log('Connection open!')

  const command = {
    cmd: 'joinRoomHandler',
    payload: {
      personName: 'Person 2',
      roomName: 'Sala 1'
    }
  }

  person2.send(JSON.stringify(command))
}
