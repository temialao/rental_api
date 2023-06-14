const router = require('express').Router()

router.use('/cars', require('./cars'))
router.use('/users', require('./users'))
router.use('/rents', require('./rents'))

module.exports = router
