const Joi = require('joi')
const router = require('express').Router()
const { db } = require('../../database')

const rentStartSchema = Joi.object({
  car_id: Joi.number().required(),
  user_id: Joi.number().required(),
  rented_at: Joi.date().iso().required(),
})

const rentEndSchema = Joi.object({
  new_milage: Joi.number().required(),
  returned_at: Joi.date().iso().required(),
})

router.get('/', async (req, res) => {
  const rents = await db('rents')
  res.send(rents)
})

router.get('/:id', async (req, res) => {
  const rent = await db('rents').where('id', req.params.id).first()
  if (!rent) {
    res.status(404).send({ error: 'Rent not found' })
    return
  }
  res.send(rent)
})

router.post('/', async (req, res) => {
  const { error } = rentStartSchema.validate(req.body)
  if (error) {
    res.status(400).send({ error: error.details[0].message })
    return
  }

  const { car_id, user_id, rented_at } = req.body

  // Check if the car already rented
  const status = await db('cars').where('id', car_id).first()
  if (status.available === 0) {
    res.status(400).send({ error: 'This car is already rented.' })
    return
  }

  const [id] = await db('rents').insert({
    car_id,
    user_id,
    rented_at,
    milage_done: 0,
  })

  // Update the car's availability
  await db('cars').where('id', car_id).update({ available: 0 })

  const rent = await db('rents').where('id', id).first()
  res.send(rent)
})

router.patch('/:id', async (req, res) => {
  const { error } = rentEndSchema.validate(req.body)
  if (error) {
    res.status(400).send({ error: error.details[0].message })
    return
  }

  const { new_milage, returned_at } = req.body

  // Retrieve the current rent record
  const rent = await db('rents').where('id', req.params.id).first()
  if (!rent) {
    res.status(404).send({ error: 'Rent not found' })
    return
  }

  // Check if the car has been returned already
  if (rent.returned_at) {
    res.status(400).send({ error: 'This rent has already been completed.' })
    return
  }

  // Retrieve the current milage of the car
  const { milage: old_milage } = await db('cars')
    .where('id', rent.car_id)
    .first()

  const milage_done = new_milage - old_milage

  // Update rents table
  await db('rents').where('id', req.params.id).update({
    returned_at,
    milage_done,
  })

  // Update cars table
  await db('cars').where('id', rent.car_id).update({
    milage: new_milage,
    available: 1,
  })

  const updatedRent = await db('rents').where('id', req.params.id).first()
  res.send(updatedRent)
})

router.delete('/:id', async (req, res) => {
  const rent = await db('rents').where('id', req.params.id).first()
  if (!rent) {
    res.status(404).send({ error: 'Rent not found' })
    return
  }

  await db('rents').where('id', req.params.id).delete()
  res.send({ message: 'Rent deleted successfully' })
})

module.exports = router
