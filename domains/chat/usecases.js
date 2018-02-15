const sendRoomMessage = ({
  room,
  person,
  message,
  onSend = () => {},
}) => {
  room.participants.forEach((participant) =>
    onSend({ personFrom: person.name, personTo: participant.name, message }))
}

module.exports = {
  sendRoomMessage,
}
