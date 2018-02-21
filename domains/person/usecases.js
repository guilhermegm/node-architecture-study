const { Person } = require('./models')

const createPerson = async ({ name, meta }) => {
  const person = Person({ name, meta })
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
