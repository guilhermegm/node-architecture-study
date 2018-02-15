const { Person } = require('./models')

const createPerson = ({ name }) => {
  const person = Person({ name })
  const event = {
    usecase: 'createPerson',
    person: person.name,
  }
  console.log(event);

  return person
}

module.exports = {
  createPerson,
}
