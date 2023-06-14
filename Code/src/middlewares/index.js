const requestTime = function (req, res, next) {
  const startHrTime = process.hrtime()

  res.on('finish', () => {
    const elapsedHrTime = process.hrtime(startHrTime)
    const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6
    console.log(
      `Method: ${req.method}, Path: ${req.originalUrl}, Duration: ${elapsedTimeInMs}ms`
    )
  })

  next()
}

module.exports = {
  requestTime,
}
