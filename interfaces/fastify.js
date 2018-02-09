const fastify = require('fastify')()

const sendMessage = require('../chat/sendMessage')

fastify.get('/', async (request, reply) => {
  const payload = {}
  const response = await sendMessage({ payload })
  reply.send(response)
})

fastify.listen(3000, '127.0.0.1', function (err) {
  if (err) throw err
  console.log(`server listening on ${fastify.server.address().port}`)
})
