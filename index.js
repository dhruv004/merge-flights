const express = require('express')
const app = express()
const port = 3000

const flightsRouter = require('./routers/flights');

app.use(flightsRouter);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})