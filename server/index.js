const connectToMongo = require('./db.js')
const express = require('express')
const app = express()
const cors = require('cors')
connectToMongo()


//Available Routes
app.use(express.json())
app.use(cors())
app.use('/api/data', require('./routes/user'))

app.listen(4000, () => {
    console.log("Listening at port 4000")
})
