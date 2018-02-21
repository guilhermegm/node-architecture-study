const Moviment = ({ x, y }) => ({
  x,
  y,
})

const moveTo = async ({
  person,
  x,
  y,
  onMove = () => {},
}) => {
  await onMove({ person, x, y })

  const event = {
    usecase: 'moveTo',
    personId: person._id,
    x,
    y,
  }
  console.log(event);

  return event
}

module.exports = {
  Moviment,
  moveTo,
}
