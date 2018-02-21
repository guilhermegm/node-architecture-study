const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 3300 })

const { commands } = require('./commands')

const commandHandler = ({ cmd, payload, ws: personWs }) => {
  console.log('command', cmd, payload)
  if(cmd in commands) {
    return commands[cmd]({ personWs, ...payload })
  }

  return Promise.reject()
}


wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    const messageParse = JSON.parse(message)

    commandHandler({ ws, ...messageParse })
    .then((res) => {
      // console.log('res', res)
    })
    .catch((err) => {
      console.log('err', err)
    })

  })

})

module.exports = {
  commands
}
