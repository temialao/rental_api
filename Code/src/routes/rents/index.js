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

router.post('/', async (req, res) => {
  const { error } = rentStartSchema.validate(req.body)
  if (error) {
    res.status(400).send({ error: error.details[0].message })
    return
  }

  const { car_id, user_id, rented_at } = req.body

  const [id] = await db('rents').insert({
    car_id,
    user_id,
    rented_at,
    milage_done: 0,
  })
  const rent = await db('rents').where('id', id).first()
  res.send(rent)
})

router.put('/:id', async (req, res) => {
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
  })

  const updatedRent = await db('rents').where('id', req.params.id).first()
  res.send(updatedRent)
})

module.exports = router
