const express = require('express')
const app = express()
const port = 3000

const findFlightsRouter = require('./routes/findFlight');

app.use('/flight', findFlightsRouter);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})