const chatRepository = {
  broadcast: () => Promise.resolve('broadcast')
}

const validate = ({
  from,
  toList,
  message
}) => {
  const messageModel = {
    from,
    toList,
    message
  }

  return messageModel
}

const sendMessage = async ({
  payload,
  chatRepo = chatRepository
}) => {
  const messageModel = validate(payload)

  const sended = await chatRepo.broadcast(messageModel)

  return sended
}

module.exports = sendMessage
