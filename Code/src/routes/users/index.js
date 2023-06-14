const Joi = require('joi')
const router = require('express').Router()
const { db } = require('../../database')

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email()
    .required()
    .external(async (email) => {
      const isEmailInUse = await checkEmailInUse(email)
      if (isEmailInUse) {
        throw new Error('email in use')
      }

      return email
    }),
  dob: Joi.date()
    .iso()
    .required()
    .custom((value, helper) => {
      const dob = new Date(value)
      const now = new Date()
      const eighteenYearsAgo = new Date(now.setFullYear(now.getFullYear() - 18))

      if (dob > eighteenYearsAgo) {
        return helper.message('User must be at least 18 years old')
      }

      return value
    }),
})

// This function is used to check if an email is already in use
const checkEmailInUse = async (email) => {
  const user = await db('users').where('email', email).first()
  return !!user
}

router.get('/', async (req, res) => {
  const users = await db('users')
  res.send(users)
})

router.get('/:id', async (req, res) => {
  const user = await db('users').where('id', req.params.id).first()
  if (!user) {
    res.status(404).send({ error: 'User not found' })
    return
  }

  res.send(user)
})

router.post('/', async (req, res) => {
  try {
    await userSchema.validateAsync(req.body)

    const { name, email, dob } = req.body

    const [id] = await db('users').insert({
      name,
      email,
      dob,
    })
    const user = await db('users').where('id', id).first()
    res.send(user)
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})

module.exports = router
