const express = require('express')
const router = require('./src/routes/index')
const app = express()
const port = process.env.PORT || 3000 // use port 3000 if not specified
const { requestTime } = require('./src/middlewares/index')

app.use(express.json())

app.use(requestTime)

app.listen(port, async () => {
  console.log(`Car rental API running on port ${port}`)
})

app.use('/', router)
