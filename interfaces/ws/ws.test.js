const Joi = require('joi')
const { commands } = require('./commands')
const { PersonSchema } = require('../../domains/person/models')


describe('createPerson', () => {
  it('should create a person', async () => {
    const personName = 'Guilherme'
    const personWs = {}
    const personStrKeysExpected = ['_id', 'name']

    const person = await commands.createPerson({ personName, personWs })

    Joi.assert(person, PersonSchema)
    expect(Object.keys(JSON.parse(JSON.stringify(person))))
      .toEqual(personStrKeysExpected)
  });
})
