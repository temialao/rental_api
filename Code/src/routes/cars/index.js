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

const carPatchSchema = Joi.object({
  maker: Joi.string(),
  model: Joi.string(),
  manufactured_at: Joi.date().iso(),
  milage: Joi.number().integer().positive(),
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

router.get('/:id/rents', async (req, res) => {
  const rents = await db('rents').where('car_id', req.params.id)
  res.json(rents)
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

router.patch('/:id', async (req, res) => {
  const { error } = carPatchSchema.validate(req.body)
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

router.delete('/:id', async (req, res) => {
  const car = await db('cars').where('id', req.params.id).first()
  if (!car) {
    res.status(404).json({ error: 'Car not found' })
    return
  }

  await db('cars').where('id', req.params.id).del()
  res.json({ message: 'Car deleted' })
})

module.exports = router
