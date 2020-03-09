require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')

const errorHandler = require('./middlewares/errorHandler')
const router = require('./routes')

// cors
app.use(cors())

// body parser 
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// routes
app.use(router)
app.use(errorHandler)

app.listen(port, () => console.log(`listening on port: ${port}`))