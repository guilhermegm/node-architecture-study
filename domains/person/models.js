const Joi = require('joi')
const uuidv4 = require('uuid/v4');

const Person = ({ name, meta = {} }) => ({
  _id: uuidv4(),
  name,
  meta,
  toJSON: function () {
    const newState = { ...this }

    delete newState.meta

    return newState
  }
})

const PersonSchema = Joi.object().keys({
  _id: Joi.string(),
  name: Joi.string(),
  meta: Joi.object(),
  toJSON: Joi.func(),
})

module.exports = {
  Person,
  PersonSchema
}
