const uuidv4 = require('uuid/v4');

const Room = ({
  name,
}) => ({
  _id: uuidv4(),
  name,
  participants: [],
})

module.exports = {
  Room
}
