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
    room: room.name,
    message
  }
  console.log(event);
}

module.exports = {
  sendRoomMessage,
}
