const { Person } = require('./models')

const createPerson = async ({ name, handlers }) => {
  const person = Person({ name, handlers })
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
