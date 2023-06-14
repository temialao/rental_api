const Joi = require('joi')
const router = require('express').Router()
const { db } = require('../../database')

// Define validation schema
const carSchema = Joi.object({
  maker: Joi.string().required(),
  model: Joi.string().required(),
  manufactured_at: Joi.date().iso(),
  milage: Joi.number().integer().positive().required(),
})

router.get('/', async (req, res) => {
  const cars = await db('cars')
  res.json(cars)
})

router.get('/:id', async (req, res) => {
  const car = await db('cars').where('id', req.params.id).first()
  if (!car) {
    res.status(404).json({ error: 'Car not found' })
    return
  }
  res.json(car)
})

router.post('/', async (req, res) => {
  const { error } = carSchema.validate(req.body)
  if (error) {
    res.status(400).json({ error: error.details[0].message })
    return
  }

  const { maker, model, manufactured_at, milage } = req.body

  const [id] = await db('cars').insert({
    maker,
    model,
    manufactured_at,
    milage,
  })
  const car = await db('cars').where('id', id).first()
  res.json(car)
})

router.put('/:id', async (req, res) => {
  const { error } = carSchema.validate(req.body)
  if (error) {
    res.status(400).json({ error: error.details[0].message })
    return
  }

  const updates = req.body
  const car = await db('cars').where('id', req.params.id).first()
  if (!car) {
    res.status(404).json({ error: 'Car not found' })
    return
  }

  await db('cars').where('id', req.params.id).update(updates)
  const updatedCar = await db('cars').where('id', req.params.id).first()
  res.json(updatedCar)
})

module.exports = router
