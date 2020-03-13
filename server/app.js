require('dotenv').config()
const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
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

// app.listen(port, () => console.log(`listening on port: ${port}`))
io.on('connection', socket => {
    console.log('a user connected')
    socket.on('show-data', data => {
        socket.broadcast.emit('realtime-data', data)
    })
})

http.listen(3000, () => console.log(`listening on port *3000`))