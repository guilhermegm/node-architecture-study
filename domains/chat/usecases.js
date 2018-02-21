const sendRoomMessage = async ({
  room,
  person,
  message,
  onSend = () => {},
}) => {
  room.participants.forEach((participant) =>
    onSend({ personFrom: person, personTo: participant, message }))
  
  const event = {
    usecase: 'sendRoomMessage',
    roomId: room._id,
    personId: person._id,
    message,
  }
  console.log(event);

  return event
}

module.exports = {
  sendRoomMessage,
}
