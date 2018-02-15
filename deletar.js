const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 3300 })

let idCounter = 0;

wss.on('connection', (ws) => {
  ws.id = idCounter++

  ws.on('message', (message) => {
    console.log(ws.id, message)
  })
})
