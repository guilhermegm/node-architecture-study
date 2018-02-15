const WebSocket = require('ws')
const connection = new WebSocket('ws://localhost:3300')

connection.onopen = function(){
   console.log('Connection open!')
}

/* const person1 = new WebSocket('ws://localhost:3300')

person1.onopen = () => {
  const command = {
    cmd: 'createRoomHandler',
    payload: {
      personName: 'Eu',
      roomName: 'Sala 1'
    }
  }
  console.log(123)
  person1.send(JSON.stringify(command))
} */

test('adds 1 + 2 to equal 3', () => {
  expect(1+1).toBe(2)
});
