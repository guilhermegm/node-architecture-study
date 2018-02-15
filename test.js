const WebSocket = require('ws')

const init = () => {
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

    setTimeout(() => {
      const command2 = {
        cmd: 'sendRoomMessage',
        payload: {
          message: 'Blz???',
          roomName: 'Sala 1'
        }
      }
      person1.send(JSON.stringify(command2))
    }, 700)
  }

  person1.onmessage = (event) => {
    console.log('person1', event.data)
  }


  const person2 = new WebSocket('ws://localhost:3300')

  person2.onmessage = (event) => {
    console.log('person2', event.data)
  }

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

    setTimeout(() => {
      const command2 = {
        cmd: 'sendRoomMessage',
        payload: {
          message: 'Oi',
          roomName: 'Sala 1'
        }
      }
      person2.send(JSON.stringify(command2))
    }, 200)
  }
}

setTimeout(init, 500);
